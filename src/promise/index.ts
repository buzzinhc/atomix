export function promisify<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T> extends [...infer A, infer _] ? A : never) => Promise<ReturnType<T>> {
  return (...args: any[]) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err: any, result: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

export function delay<T>(ms: number, value?: T): Promise<T | undefined> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms))
}

export function timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(message || `Promise timed out after ${ms}ms`))
    }, ms)
  })
  return Promise.race([promise, timeoutPromise])
}

export async function retry<T>(fn: () => Promise<T>, times: number, delayMs: number = 1000): Promise<T> {
  let lastError: Error | undefined
  for (let i = 0; i < times; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err as Error
      if (i < times - 1) {
        await delay(delayMs)
      }
    }
  }
  throw lastError
}

export function all<T>(promises: Promise<T>[]): Promise<T[]> {
  return Promise.all(promises)
}

export function allSettled<T>(promises: Promise<T>[]): Promise<PromiseSettledResult<T>[]> {
  return Promise.allSettled(promises)
}

export function race<T>(promises: Promise<T>[]): Promise<T> {
  return Promise.race(promises)
}

export function any<T>(promises: Promise<T>[]): Promise<T> {
  return Promise.any(promises)
}

export function debouncePromise<T extends (...args: any[]) => Promise<any>>(fn: T, delay: number): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(async () => {
        try {
          const result = await fn(...args)
          resolve(result)
        } catch (err) {
          reject(err)
        }
      }, delay)
    })
  }
}

export function throttlePromise<T extends (...args: any[]) => Promise<any>>(fn: T, interval: number): (...args: Parameters<T>) => Promise<ReturnType<T> | undefined> {
  let lastTime = 0
  let lastPromise: Promise<ReturnType<T>> | null = null
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      lastPromise = fn(...args)
      return lastPromise
    }
    return lastPromise as Promise<ReturnType<T>>
  }
}

export async function waterfall<T>(fns: Array<(prev: T | undefined) => Promise<T>>): Promise<T> {
  let result: T | undefined = undefined
  for (const fn of fns) {
    result = await fn(result)
  }
  return result!
}

export async function parallelLimit<T>(promises: Array<() => Promise<T>>, limit: number): Promise<T[]> {
  const results: T[] = []
  const executing: Promise<void>[] = []
  
  for (const promiseFn of promises) {
    const promise = promiseFn().then(result => {
      results.push(result)
    })
    executing.push(promise)
    
    if (executing.length >= limit) {
      await Promise.race(executing)
    }
  }
  
  await Promise.all(executing)
  return results
}

export function withRetry<T>(fn: () => Promise<T>, options: { maxRetries?: number; delayMs?: number; onRetry?: (attempt: number, error: Error) => void }): Promise<T> {
  const { maxRetries = 3, delayMs = 1000, onRetry } = options
  let attempt = 0
  
  const attemptFn = async (): Promise<T> => {
    try {
      return await fn()
    } catch (error) {
      attempt++
      if (attempt <= maxRetries) {
        onRetry?.(attempt, error as Error)
        await delay(delayMs * Math.pow(2, attempt - 1))
        return attemptFn()
      }
      throw error
    }
  }
  
  return attemptFn()
}

export function toAsyncIterable<T>(promise: Promise<T>): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator]() {
      let done = false
      return {
        async next() {
          if (done) {
            return { value: undefined, done: true }
          }
          done = true
          const value = await promise
          return { value, done: false }
        }
      }
    }
  }
}