export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

export function uniqueBy<T>(arr: T[], keyFn: (item: T) => string | number): T[] {
  const seen = new Set<string | number>()
  return arr.filter((item) => {
    const key = keyFn(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function flatten<T>(arr: (T | T[])[], depth: number = 1): T[] {
  if (depth <= 0) return arr as T[]
  return arr.reduce<T[]>((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...flatten(item as T[], depth - 1))
    } else {
      acc.push(item as T)
    }
    return acc
  }, [])
}

export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return []
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const key = keyFn(item)
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})
}

export function sortBy<T>(arr: T[], keyFn: (item: T) => number | string, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...arr].sort((a, b) => {
    const keyA = keyFn(a)
    const keyB = keyFn(b)
    if (keyA < keyB) return order == 'asc' ? -1 : 1
    if (keyA > keyB) return order == 'asc' ? 1 : -1
    return 0
  })
}

export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2)
  return arr1.filter((item) => set2.has(item))
}

export function union<T>(arr1: T[], arr2: T[]): T[] {
  return unique([...arr1, ...arr2])
}

export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2)
  return arr1.filter((item) => !set2.has(item))
}

export function sample<T>(arr: T[], count: number = 1): T[] {
  if (arr.length == 0) return []
  const n = Math.min(count, arr.length)
  const indices = new Set<number>()
  while (indices.size < n) {
    indices.add(Math.floor(Math.random() * arr.length))
  }
  return [...indices].map((i) => arr[i])
}

export function compact<T>(arr: (T | null | undefined | false | 0 | '')[]): T[] {
  return arr.filter(Boolean) as T[]
}

export function first<T>(arr: T[]): T | undefined {
  return arr[0]
}

export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}

export function range(start: number, end: number, step: number = 1): number[] {
  if (step == 0) return []
  const result: number[] = []
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i)
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i)
    }
  }
  return result
}
