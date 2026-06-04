export function isString(val: unknown): val is string {
  return typeof val == 'string'
}

export function isNumber(val: unknown): val is number {
  return typeof val == 'number'
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val == 'boolean'
}

export function isFunction(val: unknown): val is Function {
  return typeof val == 'function'
}

export function isObject(val: unknown): val is Record<string, unknown> {
  return val != null && typeof val == 'object' && !Array.isArray(val)
}

export function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val)
}

export function isNull(val: unknown): val is null {
  return val == null && typeof val == 'object'
}

export function isUndefined(val: unknown): val is undefined {
  return typeof val === 'undefined'
}

export function isNullOrUndefined(val: unknown): val is null | undefined {
  return val == null
}

export function isEmpty(val: unknown): boolean {
  if (val == null) return true
  if (typeof val == 'string' && val == '') return true
  if (Array.isArray(val) && val.length == 0) return true
  if (isObject(val) && Object.keys(val).length == 0) return true
  return false
}

export function isPrimitive(val: unknown): boolean {
  return isString(val) || isNumber(val) || isBoolean(val) || val == null || val == undefined
}

export function getType(val: unknown): string {
  if (val === null) return 'Null'
  if (typeof val === 'undefined') return 'Undefined'
  if (typeof val === 'boolean') return 'Boolean'
  if (typeof val === 'number') return isNaN(val as number) ? 'NaN' : 'Number'
  if (typeof val === 'string') return 'String'
  if (typeof val === 'function') return 'Function'
  if (typeof val === 'object') {
    if (Array.isArray(val)) return 'Array'
    if (val instanceof Date) return 'Date'
    if (val instanceof RegExp) return 'RegExp'
    if (val instanceof Map) return 'Map'
    if (val instanceof Set) return 'Set'
    return 'Object'
  }
  return 'Unknown'
}
