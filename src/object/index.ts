export function deepClone<T>(obj: T): T {
  if (obj == null || typeof obj != 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as T
  if (obj instanceof Map) {
    const map = new Map()
    obj.forEach((v, k) => map.set(deepClone(k), deepClone(v)))
    return map as T
  }
  if (obj instanceof Set) {
    const set = new Set()
    obj.forEach(v => set.add(deepClone(v)))
    return set as T
  }
  if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as T
  const result = {} as Record<string, any>
  for (const key of Object.keys(obj as Record<string, any>)) {
    result[key] = deepClone((obj as Record<string, any>)[key])
  }
  return result as T
}

export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  const result = deepClone(target) as Record<string, any>
  for (const source of sources) {
    if (source == null) continue
    for (const key of Object.keys(source)) {
      const srcVal = source[key as keyof T]
      const tgtVal = result[key]
      if (isPlainObject(srcVal) && isPlainObject(tgtVal)) {
        result[key] = deepMerge(tgtVal, srcVal)
      } else if (srcVal != undefined) {
        result[key] = srcVal
      }
    }
  }
  return result as T
}

function isPlainObject(val: any): val is Record<string, any> {
  return val != null && typeof val == 'object' && !Array.isArray(val) && Object.getPrototypeOf(val) == Object.prototype
}

export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) result[key] = obj[key]
  }
  return result
}

export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj } as any
  for (const key of keys) {
    delete result[key]
  }
  return result
}

export function mapKeys(obj: Record<string, any>, fn: (key: string, value: any) => string): Record<string, any> {
  const result: Record<string, any> = {}
  for (const key of Object.keys(obj)) {
    result[fn(key, obj[key])] = obj[key]
  }
  return result
}

export function mapValues<T, U>(obj: Record<string, T>, fn: (value: T, key: string) => U): Record<string, U> {
  const result = {} as Record<string, U>
  for (const key of Object.keys(obj)) {
    result[key] = fn(obj[key], key)
  }
  return result
}

export function invert(obj: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {}
  for (const key of Object.keys(obj)) {
    result[obj[key]] = key
  }
  return result
}

export function flattenObject(obj: Record<string, any>, prefix?: string): Record<string, any> {
  const result: Record<string, any> = {}
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (isPlainObject(obj[key])) {
      Object.assign(result, flattenObject(obj[key], fullKey))
    } else {
      result[fullKey] = obj[key]
    }
  }
  return result
}

export function get(obj: any, path: string, defaultValue?: any): any {
  if (obj == null) return defaultValue
  const keys = parsePath(path)
  let current = obj
  for (const key of keys) {
    if (current == null || typeof current != 'object') return defaultValue
    current = current[key]
  }
  return current == undefined ? defaultValue : current
}

function parsePath(path: string): string[] {
  const result: string[] = []
  const segments = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  for (const seg of segments) {
    if (seg != '') result.push(seg)
  }
  return result
}

export function set(obj: any, path: string, value: any): any {
  const keys = parsePath(path)
  if (keys.length == 0) return obj
  const cloned = deepClone(obj == null || typeof obj != 'object' ? {} : obj)
  let current: any = cloned
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]
    if (current[key] == null || typeof current[key] != 'object') {
      current[key] = /^\d+$/.test(nextKey) ? [] : {}
    } else {
      current[key] = deepClone(current[key])
    }
    current = current[key]
  }
  current[keys[keys.length - 1]] = value
  return cloned
}
