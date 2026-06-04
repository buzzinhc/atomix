import { describe, it, expect, vi } from 'vitest'
import * as fp from '../../src/fp'

describe('compose', () => {
  it('从右到左组合函数', () => {
    const add1 = (x: number) => x + 1
    const double = (x: number) => x * 2
    const composed = fp.compose(add1, double)
    expect(composed(3)).toBe(7)
  })

  it('单个函数组合', () => {
    const add1 = (x: number) => x + 1
    expect(fp.compose(add1)(5)).toBe(6)
  })

  it('多个函数组合', () => {
    const add1 = (x: number) => x + 1
    const double = (x: number) => x * 2
    const square = (x: number) => x * x
    expect(fp.compose(square, double, add1)(2)).toBe(36)
  })

  it('字符串变换组合', () => {
    const upper = (x: string) => x.toUpperCase()
    const exclaim = (x: string) => x + '!'
    expect(fp.compose(upper, exclaim)('hello')).toBe('HELLO!')
  })
})

describe('pipe', () => {
  it('从左到右管道', () => {
    const add1 = (x: number) => x + 1
    const double = (x: number) => x * 2
    const piped = fp.pipe(add1, double)
    expect(piped(3)).toBe(8)
  })

  it('单个函数管道', () => {
    const add1 = (x: number) => x + 1
    expect(fp.pipe(add1)(5)).toBe(6)
  })

  it('多个函数管道', () => {
    const add1 = (x: number) => x + 1
    const double = (x: number) => x * 2
    const square = (x: number) => x * x
    expect(fp.pipe(add1, double, square)(2)).toBe(36)
  })

  it('字符串变换管道', () => {
    const trim = (x: string) => x.trim()
    const lower = (x: string) => x.toLowerCase()
    expect(fp.pipe(trim, lower)('  HELLO  ')).toBe('hello')
  })
})

describe('curry', () => {
  it('基本柯里化', () => {
    const add = (a: number, b: number) => a + b
    const curried = fp.curry(add)
    expect(curried(1)(2)).toBe(3)
  })

  it('一次性传入所有参数', () => {
    const add = (a: number, b: number) => a + b
    const curried = fp.curry(add)
    expect(curried(1, 2)).toBe(3)
  })

  it('三参数柯里化', () => {
    const sum = (a: number, b: number, c: number) => a + b + c
    const curried = fp.curry(sum)
    expect(curried(1)(2)(3)).toBe(6)
    expect(curried(1, 2)(3)).toBe(6)
    expect(curried(1)(2, 3)).toBe(6)
  })
})

describe('partial', () => {
  it('预填充部分参数', () => {
    const add = (a: number, b: number) => a + b
    const add10 = fp.partial(add, 10)
    expect(add10(5)).toBe(15)
  })

  it('预填充全部参数', () => {
    const add = (a: number, b: number) => a + b
    const add10 = fp.partial(add, 10, 20)
    expect(add10()).toBe(30)
  })
})

describe('memoize', () => {
  it('缓存函数结果', () => {
    let callCount = 0
    const add = (a: number, b: number) => {
      callCount++
      return a + b
    }
    const memoized = fp.memoize(add)
    expect(memoized(1, 2)).toBe(3)
    expect(memoized(1, 2)).toBe(3)
    expect(callCount).toBe(1)
  })

  it('不同参数会重新计算', () => {
    let callCount = 0
    const add = (a: number, b: number) => {
      callCount++
      return a + b
    }
    const memoized = fp.memoize(add)
    expect(memoized(1, 2)).toBe(3)
    expect(memoized(3, 4)).toBe(7)
    expect(callCount).toBe(2)
  })
})

describe('debounce', () => {
  it('延迟执行函数', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = fp.debounce(fn, 100)
    debounced()
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledOnce()
    vi.useRealTimers()
  })

  it('多次调用只执行最后一次', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = fp.debounce(fn, 100)
    debounced()
    debounced()
    debounced()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledOnce()
    vi.useRealTimers()
  })

  it('传递参数给函数', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = fp.debounce(fn, 100)
    debounced('a', 'b')
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledWith('a', 'b')
    vi.useRealTimers()
  })
})

describe('throttle', () => {
  it('在间隔内只执行一次', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = fp.throttle(fn, 100)
    throttled()
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledOnce()
    vi.useRealTimers()
  })

  it('间隔后可以再次执行', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = fp.throttle(fn, 100)
    throttled()
    vi.advanceTimersByTime(100)
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
    vi.useRealTimers()
  })
})

describe('once', () => {
  it('只执行一次', () => {
    let callCount = 0
    const fn = fp.once(() => ++callCount)
    expect(fn()).toBe(1)
    expect(fn()).toBeUndefined()
    expect(fn()).toBeUndefined()
    expect(callCount).toBe(1)
  })

  it('返回第一次调用的结果', () => {
    const fn = fp.once((x: number) => x * 2)
    expect(fn(5)).toBe(10)
    expect(fn(10)).toBeUndefined()
  })
})

describe('noop', () => {
  it('返回 undefined', () => {
    expect(fp.noop()).toBeUndefined()
  })

  it('可以作为默认回调', () => {
    const cb: () => void = fp.noop
    expect(cb()).toBeUndefined()
  })
})

describe('identity', () => {
  it('返回输入值本身', () => {
    expect(fp.identity(42)).toBe(42)
    expect(fp.identity('hello')).toBe('hello')
    expect(fp.identity(null)).toBeNull()
  })

  it('对对象返回引用', () => {
    const obj = { a: 1 }
    expect(fp.identity(obj)).toBe(obj)
  })

  it('对数组返回引用', () => {
    const arr = [1, 2, 3]
    expect(fp.identity(arr)).toBe(arr)
  })

  it('布尔值原样返回', () => {
    expect(fp.identity(true)).toBe(true)
    expect(fp.identity(false)).toBe(false)
  })
})

describe('constant', () => {
  it('返回一个总是返回给定值的函数', () => {
    const always42 = fp.constant(42)
    expect(always42()).toBe(42)
    expect(always42()).toBe(42)
  })

  it('返回对象引用', () => {
    const obj = { a: 1 }
    const alwaysObj = fp.constant(obj)
    expect(alwaysObj()).toBe(obj)
  })

  it('多次调用返回相同原始值', () => {
    const alwaysHello = fp.constant('hello')
    expect(alwaysHello()).toBe('hello')
    expect(alwaysHello()).toBe('hello')
  })
})

describe('flip', () => {
  it('翻转两个参数', () => {
    const subtract = (a: number, b: number) => a - b
    const flipped = fp.flip(subtract)
    expect(flipped(2, 5)).toBe(3)
  })

  it('翻转字符串拼接参数', () => {
    const concat = (a: string, b: string) => a + b
    const flipped = fp.flip(concat)
    expect(flipped('world', 'hello ')).toBe('hello world')
  })
})

describe('not', () => {
  it('取反返回 true 的函数', () => {
    const isEven = (x: number) => x % 2 === 0
    const isOdd = fp.not(isEven)
    expect(isOdd(3)).toBe(true)
    expect(isOdd(4)).toBe(false)
  })

  it('取反返回 false 的函数', () => {
    const isPositive = (x: number) => x > 0
    const isNonPositive = fp.not(isPositive)
    expect(isNonPositive(-1)).toBe(true)
    expect(isNonPositive(1)).toBe(false)
  })
})

describe('both', () => {
  it('两个条件都满足时返回 true', () => {
    const isPositive = (x: number) => x > 0
    const isEven = (x: number) => x % 2 === 0
    const isPositiveEven = fp.both(isPositive, isEven)
    expect(isPositiveEven(4)).toBe(true)
  })

  it('一个条件不满足时返回 false', () => {
    const isPositive = (x: number) => x > 0
    const isEven = (x: number) => x % 2 === 0
    const isPositiveEven = fp.both(isPositive, isEven)
    expect(isPositiveEven(3)).toBe(false)
    expect(isPositiveEven(-2)).toBe(false)
  })
})

describe('either', () => {
  it('任一条件满足时返回 true', () => {
    const isPositive = (x: number) => x > 0
    const isEven = (x: number) => x % 2 === 0
    const isPositiveOrEven = fp.either(isPositive, isEven)
    expect(isPositiveOrEven(3)).toBe(true)
    expect(isPositiveOrEven(-2)).toBe(true)
    expect(isPositiveOrEven(4)).toBe(true)
  })

  it('两个条件都不满足时返回 false', () => {
    const isPositive = (x: number) => x > 0
    const isEven = (x: number) => x % 2 === 0
    const isPositiveOrEven = fp.either(isPositive, isEven)
    expect(isPositiveOrEven(-3)).toBe(false)
  })
})

describe('tap', () => {
  it('执行副作用并返回原值', () => {
    let sideEffect = 0
    const tapped = fp.tap((x: number) => { sideEffect = x })
    expect(tapped(42)).toBe(42)
    expect(sideEffect).toBe(42)
  })

  it('在管道中使用', () => {
    const log: number[] = []
    const add1 = (x: number) => x + 1
    const double = (x: number) => x * 2
    const result = fp.pipe(
      add1,
      fp.tap((x: number) => log.push(x)),
      double
    )(5)
    expect(result).toBe(12)
    expect(log).toEqual([6])
  })
})

describe('apply', () => {
  it('使用数组参数调用函数', () => {
    const add = (a: number, b: number) => a + b
    expect(fp.apply(add, [3, 4])).toBe(7)
  })

  it('传递多参数数组', () => {
    const sum = (...args: number[]) => args.reduce((a, b) => a + b, 0)
    expect(fp.apply(sum, [1, 2, 3, 4])).toBe(10)
  })
})

describe('call', () => {
  it('使用参数调用函数', () => {
    const add = (a: number, b: number) => a + b
    expect(fp.call(add, 3, 4)).toBe(7)
  })

  it('传递多参数', () => {
    const sum = (a: number, b: number, c: number) => a + b + c
    expect(fp.call(sum, 1, 2, 3)).toBe(6)
  })
})

describe('spread', () => {
  it('展开数组作为参数', () => {
    const add = (a: number, b: number) => a + b
    const spreaded = fp.spread(add)
    expect(spreaded([3, 4])).toBe(7)
  })

  it('与 map 配合使用', () => {
    const add = (a: number, b: number) => a + b
    const pairs = [[1, 2], [3, 4]]
    expect(pairs.map(fp.spread(add))).toEqual([3, 7])
  })
})

describe('chain', () => {
  it('链接两个函数', () => {
    const add1 = (x: number) => x + 1
    const double = (x: number) => x * 2
    const chained = fp.chain(add1, double)
    expect(chained(3)).toBe(8)
  })

  it('字符串变换链接', () => {
    const trim = (x: string) => x.trim()
    const upper = (x: string) => x.toUpperCase()
    const chained = fp.chain(trim, upper)
    expect(chained('  hello  ')).toBe('HELLO')
  })
})

describe('juxt', () => {
  it('并行执行多个函数', () => {
    const add1 = (x: number) => x + 1
    const double = (x: number) => x * 2
    const square = (x: number) => x * x
    const applied = fp.juxt(add1, double, square)
    expect(applied(5)).toEqual([6, 10, 25])
  })

  it('单个函数', () => {
    const add1 = (x: number) => x + 1
    expect(fp.juxt(add1)(3)).toEqual([4])
  })
})

describe('converge', () => {
  it('收敛多个函数结果', () => {
    const add = (...args: number[]) => args.reduce((a, b) => a + b, 0)
    const double = (x: number) => x * 2
    const triple = (x: number) => x * 3
    const converged = fp.converge(add, double, triple)
    expect(converged(5)).toBe(25)
  })

  it('单个分支函数', () => {
    const identity = (...args: number[]) => args[0]
    const double = (x: number) => x * 2
    const converged = fp.converge(identity, double)
    expect(converged(3)).toBe(6)
  })
})

describe('delay', () => {
  it('延迟执行后返回结果', async () => {
    const add = (a: number, b: number) => a + b
    const delayed = fp.delay(add, 50)
    const result = await delayed(3, 4)
    expect(result).toBe(7)
  })

  it('延迟 0ms 也能正确返回', async () => {
    const double = (x: number) => x * 2
    const delayed = fp.delay(double, 0)
    expect(await delayed(5)).toBe(10)
  })
})

describe('retry', () => {
  it('第一次成功时直接返回', async () => {
    const fn = vi.fn(() => 42)
    const retried = fp.retry(fn, 3, 0)
    expect(await retried()).toBe(42)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('失败后重试直到成功', async () => {
    let callCount = 0
    const fn = vi.fn(() => {
      callCount++
      if (callCount < 3) throw new Error('fail')
      return 'ok'
    })
    const retried = fp.retry(fn, 3, 0)
    expect(await retried()).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('全部失败后抛出最后一个错误', async () => {
    const fn = vi.fn(() => {
      throw new Error('always fail')
    })
    const retried = fp.retry(fn, 3, 0)
    await expect(retried()).rejects.toThrow('always fail')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('只重试 1 次时成功', async () => {
    const fn = vi.fn(() => 99)
    const retried = fp.retry(fn, 1, 0)
    expect(await retried()).toBe(99)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('传递参数给重试函数', async () => {
    let count = 0
    const fn = vi.fn((a: number, b: number) => {
      count++
      if (count < 2) throw new Error('nope')
      return a + b
    })
    const retried = fp.retry(fn, 3, 0)
    expect(await retried(3, 4)).toBe(7)
  })
})

describe('times', () => {
  it('执行 n 次并收集结果', () => {
    const result = fp.times((i: number) => i * 2, 5)
    expect(result).toEqual([0, 2, 4, 6, 8])
  })

  it('执行 0 次返回空数组', () => {
    expect(fp.times((i: number) => i, 0)).toEqual([])
  })

  it('索引从 0 开始', () => {
    const result = fp.times((i: number) => i, 3)
    expect(result).toEqual([0, 1, 2])
  })

  it('执行 1 次', () => {
    expect(fp.times((i: number) => i + 10, 1)).toEqual([10])
  })

  it('字符串拼接', () => {
    const result = fp.times((i: number) => `item${i}`, 3)
    expect(result).toEqual(['item0', 'item1', 'item2'])
  })
})

describe('iterate', () => {
  it('迭代函数 n 次', () => {
    const double = (x: number) => x * 2
    const iterated = fp.iterate(double, 3)
    expect(iterated(1)).toBe(8)
  })

  it('迭代 0 次返回原值', () => {
    const double = (x: number) => x * 2
    const iterated = fp.iterate(double, 0)
    expect(iterated(5)).toBe(5)
  })

  it('字符串变换迭代', () => {
    const appendA = (x: string) => x + 'a'
    const iterated = fp.iterate(appendA, 3)
    expect(iterated('x')).toBe('xaaa')
  })

  it('迭代 1 次', () => {
    const double = (x: number) => x * 2
    const iterated = fp.iterate(double, 1)
    expect(iterated(3)).toBe(6)
  })
})

describe('until', () => {
  it('直到条件满足时停止', () => {
    const isEven = (x: number) => x % 2 === 0
    const add1 = (x: number) => x + 1
    const result = fp.until(isEven, add1)
    expect(result(3)).toBe(4)
  })

  it('条件一开始就满足则返回原值', () => {
    const isPositive = (x: number) => x > 0
    const double = (x: number) => x * 2
    const result = fp.until(isPositive, double)
    expect(result(5)).toBe(5)
  })

  it('多次迭代直到满足', () => {
    const isTen = (x: number) => x >= 10
    const add3 = (x: number) => x + 3
    const result = fp.until(isTen, add3)
    expect(result(1)).toBe(10)
  })
})

describe('when', () => {
  it('条件为 true 时执行函数', () => {
    const isPositive = (x: number) => x > 0
    const double = (x: number) => x * 2
    const result = fp.when(isPositive, double)
    expect(result(5)).toBe(10)
  })

  it('条件为 false 时返回原值', () => {
    const isPositive = (x: number) => x > 0
    const double = (x: number) => x * 2
    const result = fp.when(isPositive, double)
    expect(result(-5)).toBe(-5)
  })

  it('字符串条件执行', () => {
    const hasExclaim = (x: string) => x.endsWith('!')
    const addMore = (x: string) => x + '!!'
    const result = fp.when(hasExclaim, addMore)
    expect(result('hello!')).toBe('hello!!!')
    expect(result('hello')).toBe('hello')
  })
})

describe('unless', () => {
  it('条件为 false 时执行函数', () => {
    const isPositive = (x: number) => x > 0
    const negate = (x: number) => -x
    const result = fp.unless(isPositive, negate)
    expect(result(-5)).toBe(5)
  })

  it('条件为 true 时返回原值', () => {
    const isPositive = (x: number) => x > 0
    const negate = (x: number) => -x
    const result = fp.unless(isPositive, negate)
    expect(result(5)).toBe(5)
  })

  it('字符串反条件执行', () => {
    const isString = (x: unknown) => typeof x === 'string'
    const toString = (x: unknown) => String(x)
    const result = fp.unless(isString, toString)
    expect(result(123)).toBe('123')
    expect(result('hello')).toBe('hello')
  })
})

describe('cond', () => {
  it('匹配第一个满足条件的分支', () => {
    const isZero = (x: number) => x === 0
    const isPositive = (x: number) => x > 0
    const classify = fp.cond([
      [isZero, () => 'zero'],
      [isPositive, () => 'positive'],
      [() => true, () => 'negative'],
    ])
    expect(classify(0)).toBe('zero')
    expect(classify(5)).toBe('positive')
    expect(classify(-3)).toBe('negative')
  })

  it('没有匹配条件时返回 undefined', () => {
    const never = (x: number) => false
    const classify = fp.cond([
      [never, (x: number) => x],
    ])
    expect(classify(42)).toBeUndefined()
  })

  it('只有一个条件分支', () => {
    const isPositive = (x: number) => x > 0
    const classify = fp.cond([
      [isPositive, (x: number) => x * 2],
    ])
    expect(classify(5)).toBe(10)
    expect(classify(-5)).toBeUndefined()
  })
})

describe('ifElse', () => {
  it('条件为 true 时执行 onTrue', () => {
    const isPositive = (x: number) => x > 0
    const double = (x: number) => x * 2
    const negate = (x: number) => -x
    const result = fp.ifElse(isPositive, double, negate)
    expect(result(5)).toBe(10)
  })

  it('条件为 false 时执行 onFalse', () => {
    const isPositive = (x: number) => x > 0
    const double = (x: number) => x * 2
    const negate = (x: number) => -x
    const result = fp.ifElse(isPositive, double, negate)
    expect(result(-5)).toBe(5)
  })

  it('返回正确的类型', () => {
    const isEven = (x: number) => x % 2 === 0
    const result = fp.ifElse(
      isEven,
      (x: number) => 'even',
      (x: number) => 'odd'
    )
    expect(result(2)).toBe('even')
    expect(result(3)).toBe('odd')
  })

  it('对字符串条件分支', () => {
    const isEmpty = (x: string) => x.length === 0
    const result = fp.ifElse(
      isEmpty,
      () => '空的',
      (x: string) => x
    )
    expect(result('')).toBe('空的')
    expect(result('hi')).toBe('hi')
  })
})
