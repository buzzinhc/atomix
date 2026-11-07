import { describe, it, expect, vi } from 'vitest'
import {
  promisify,
  delay,
  timeout,
  retry,
  all,
  allSettled,
  race,
  any,
  debouncePromise,
  throttlePromise,
  waterfall,
  parallelLimit,
  withRetry,
  toAsyncIterable,
} from '../../src/promise'

describe('promisify', () => {
  it('should convert error-first callback to promise resolving result', async () => {
    const callbackFn = (val: string, cb: (err: any, res?: string) => void) => {
      cb(null, val.toUpperCase())
    }
    const promised = promisify(callbackFn)
    const result = await promised('hello')
    expect(result).toBe('HELLO')
  })

  it('should convert error-first callback to promise rejecting on error', async () => {
    const callbackFn = (cb: (err: any, res?: string) => void) => {
      cb(new Error('fail'))
    }
    const promised = promisify(callbackFn)
    await expect(promised()).rejects.toThrow('fail')
  })
})

describe('delay', () => {
  it('should resolve after specified duration', async () => {
    const start = Date.now()
    const val = await delay(50, 'ok')
    expect(Date.now() - start).toBeGreaterThanOrEqual(40)
    expect(val).toBe('ok')
  })
})

describe('timeout', () => {
  it('should resolve if promise completes before timeout', async () => {
    const p = delay(20, 'fast')
    const result = await timeout(p, 100)
    expect(result).toBe('fast')
  })

  it('should reject if promise exceeds timeout', async () => {
    const p = delay(100, 'slow')
    await expect(timeout(p, 20, 'timed out!')).rejects.toThrow('timed out!')
  })
})

describe('retry', () => {
  it('should resolve on first success', async () => {
    const fn = vi.fn().mockResolvedValue('ok')
    const result = await retry(fn, 3, 10)
    expect(result).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should retry until success', async () => {
    let count = 0
    const fn = vi.fn().mockImplementation(async () => {
      count++
      if (count < 3) throw new Error('not yet')
      return 'finally'
    })
    const result = await retry(fn, 4, 10)
    expect(result).toBe('finally')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('should throw after reaching max attempts', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('always fail'))
    await expect(retry(fn, 2, 10)).rejects.toThrow('always fail')
    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe('all, allSettled, race, any', () => {
  it('all resolves when all promises resolve', async () => {
    const res = await all([Promise.resolve(1), Promise.resolve(2)])
    expect(res).toEqual([1, 2])
  })

  it('allSettled returns status for all promises', async () => {
    const res = await allSettled([Promise.resolve(1), Promise.reject('err')])
    expect(res[0].status).toBe('fulfilled')
    expect(res[1].status).toBe('rejected')
  })

  it('race returns the first settled result', async () => {
    const res = await race([delay(10, 'first'), delay(50, 'second')])
    expect(res).toBe('first')
  })

  it('any returns the first fulfilled result', async () => {
    const res = await any([Promise.reject('fail'), delay(10, 'success')])
    expect(res).toBe('success')
  })
})

describe('debouncePromise', () => {
  it('should debounce async function calls and resolve with latest result', async () => {
    const fn = vi.fn().mockImplementation(async (x: number) => x * 2)
    const debounced = debouncePromise(fn, 30)

    const [r1, r2, r3] = await Promise.all([debounced(1), debounced(2), debounced(3)])

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(3)
    expect(r1).toBe(6)
    expect(r2).toBe(6)
    expect(r3).toBe(6)
  })

  it('should reject all waiters if call fails', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('boom'))
    const debounced = debouncePromise(fn, 20)

    const p1 = debounced()
    const p2 = debounced()

    await expect(Promise.all([p1, p2])).rejects.toThrow('boom')
  })
})

describe('throttlePromise', () => {
  it('should throttle async function calls within interval', async () => {
    const fn = vi.fn().mockImplementation(async (x: number) => x)
    const throttled = throttlePromise(fn, 50)

    const p1 = throttled(1)
    const p2 = throttled(2)

    expect(await p1).toBe(1)
    expect(await p2).toBe(1)
    expect(fn).toHaveBeenCalledTimes(1)

    await delay(60)
    const p3 = throttled(3)
    expect(await p3).toBe(3)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe('waterfall', () => {
  it('should execute promises in sequence passing previous result', async () => {
    const fns = [
      async (prev?: number) => (prev ?? 0) + 1,
      async (prev?: number) => (prev ?? 0) * 2,
      async (prev?: number) => (prev ?? 0) + 10,
    ]
    const result = await waterfall(fns)
    expect(result).toBe(12)
  })
})

describe('parallelLimit', () => {
  it('should preserve original order while respecting concurrency limit', async () => {
    const order: number[] = []
    const tasks = [
      () => delay(50, 'task 1').then(res => { order.push(1); return res }),
      () => delay(10, 'task 2').then(res => { order.push(2); return res }),
      () => delay(20, 'task 3').then(res => { order.push(3); return res }),
    ]

    const results = await parallelLimit(tasks, 2)
    expect(results).toEqual(['task 1', 'task 2', 'task 3'])
    expect(order[0]).toBe(2) // task 2 completes before task 1
  })

  it('should handle empty task array', async () => {
    const results = await parallelLimit([], 2)
    expect(results).toEqual([])
  })
})

describe('withRetry', () => {
  it('should succeed on first try with default options', async () => {
    const fn = vi.fn().mockResolvedValue('success')
    const result = await withRetry(fn)
    expect(result).toBe('success')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should retry with exponential backoff and invoke onRetry callback', async () => {
    let attempts = 0
    const onRetry = vi.fn()
    const fn = vi.fn().mockImplementation(async () => {
      attempts++
      if (attempts < 3) throw new Error('err')
      return 'done'
    })

    const result = await withRetry(fn, { maxRetries: 3, delayMs: 10, onRetry })
    expect(result).toBe('done')
    expect(fn).toHaveBeenCalledTimes(3)
    expect(onRetry).toHaveBeenCalledTimes(2)
  })

  it('should throw after exceeding max retries', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('fail'))
    await expect(withRetry(fn, { maxRetries: 2, delayMs: 10 })).rejects.toThrow('fail')
  })
})

describe('toAsyncIterable', () => {
  it('should convert promise to async iterable', async () => {
    const p = Promise.resolve('data')
    const iterable = toAsyncIterable(p)
    const items: string[] = []

    for await (const item of iterable) {
      items.push(item)
    }

    expect(items).toEqual(['data'])
  })
})
