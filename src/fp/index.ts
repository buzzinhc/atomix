export function compose<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  return (x: T) => fns.reduceRight((acc, fn) => fn(acc), x)
}

export function pipe<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  return (x: T) => fns.reduce((acc, fn) => fn(acc), x)
}

export function curry<T extends any[], R>(fn: (...args: T) => R): (...args: Partial<T>) => any {
  const curried = (...args: any[]) => {
    if (args.length >= fn.length) {
      return fn(...args as T)
    }
    return (...nextArgs: any[]) => curried(...args.concat(nextArgs))
  }
  return curried
}

export function partial<T extends any[], R>(fn: (...args: T) => R, ...partialArgs: Partial<T>): (...args: any[]) => R {
  return (...args: any[]) => fn(...partialArgs.concat(args) as T)
}

export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>()
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)!
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function throttle<T extends (...args: any[]) => any>(fn: T, interval: number): (...args: Parameters<T>) => void {
  let lastTime = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn(...args)
    }
  }
}

export function once<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let called = false
  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true
      return fn(...args)
    }
  }) as (...args: Parameters<T>) => ReturnType<T> | undefined
}

export function noop(): void {}

export function identity<T>(x: T): T {
  return x
}

export function constant<T>(value: T): () => T {
  return () => value
}

export function flip<T, U, R>(fn: (a: T, b: U) => R): (b: U, a: T) => R {
  return (b: U, a: T) => fn(a, b)
}

export function not<T>(fn: (x: T) => boolean): (x: T) => boolean {
  return (x: T) => !fn(x)
}

export function both<T>(fn1: (x: T) => boolean, fn2: (x: T) => boolean): (x: T) => boolean {
  return (x: T) => fn1(x) && fn2(x)
}

export function either<T>(fn1: (x: T) => boolean, fn2: (x: T) => boolean): (x: T) => boolean {
  return (x: T) => fn1(x) || fn2(x)
}

export function tap<T>(fn: (x: T) => void): (x: T) => T {
  return (x: T) => {
    fn(x)
    return x
  }
}

export function apply<T extends any[], R>(fn: (...args: T) => R, args: T): R {
  return fn(...args)
}

export function call<T extends any[], R>(fn: (...args: T) => R, ...args: T): R {
  return fn(...args)
}

export function spread<T extends any[], R>(fn: (...args: T) => R): (args: T) => R {
  return (args: T) => fn(...args)
}

export function chain<T, U>(fn1: (x: T) => U, fn2: (x: U) => U): (x: T) => U {
  return (x: T) => fn2(fn1(x))
}

export function juxt<T, R>(...fns: Array<(x: T) => R>): (x: T) => R[] {
  return (x: T) => fns.map(fn => fn(x))
}

export function converge<T, U, R>(
  fn: (...args: U[]) => R,
  ...fns: Array<(x: T) => U>
): (x: T) => R {
  return (x: T) => fn(...fns.map(f => f(x)))
}

export function delay<T extends (...args: any[]) => any>(fn: T, ms: number): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>) => {
    await new Promise(resolve => setTimeout(resolve, ms))
    return fn(...args)
  }
}

export function retry<T extends (...args: any[]) => any>(
  fn: T,
  times: number,
  delayMs: number = 0
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>) => {
    let lastError: Error | undefined
    for (let i = 0; i < times; i++) {
      try {
        return fn(...args)
      } catch (err) {
        lastError = err as Error
        if (i < times - 1 && delayMs > 0) {
          await new Promise(resolve => setTimeout(resolve, delayMs))
        }
      }
    }
    throw lastError
  }
}

export function times<T>(fn: (index: number) => T, n: number): T[] {
  const result: T[] = []
  for (let i = 0; i < n; i++) {
    result.push(fn(i))
  }
  return result
}

export function iterate<T>(fn: (x: T) => T, n: number): (x: T) => T {
  return (x: T) => {
    let result = x
    for (let i = 0; i < n; i++) {
      result = fn(result)
    }
    return result
  }
}

export function until<T>(predicate: (x: T) => boolean, fn: (x: T) => T): (x: T) => T {
  return (x: T) => {
    let result = x
    while (!predicate(result)) {
      result = fn(result)
    }
    return result
  }
}

export function when<T>(predicate: (x: T) => boolean, fn: (x: T) => T): (x: T) => T {
  return (x: T) => predicate(x) ? fn(x) : x
}

export function unless<T>(predicate: (x: T) => boolean, fn: (x: T) => T): (x: T) => T {
  return (x: T) => predicate(x) ? x : fn(x)
}

export function cond<T, R>(pairs: Array<[(x: T) => boolean, (x: T) => R]>): (x: T) => R | undefined {
  return (x: T) => {
    for (const [predicate, fn] of pairs) {
      if (predicate(x)) {
        return fn(x)
      }
    }
  }
}

export function ifElse<T, R>(
  predicate: (x: T) => boolean,
  onTrue: (x: T) => R,
  onFalse: (x: T) => R
): (x: T) => R {
  return (x: T) => predicate(x) ? onTrue(x) : onFalse(x)
}
