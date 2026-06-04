import { describe, it, expect } from 'vitest'
import {
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isObject,
  isArray,
  isNull,
  isUndefined,
  isNullOrUndefined,
  isEmpty,
  isPrimitive,
  getType,
} from '../../src/type'

describe('isString', () => {
  it('正确识别字符串', () => {
    expect(isString('hello')).toBe(true)
    expect(isString('')).toBe(true)
    expect(isString(`template`)).toBe(true)
  })

  it('拒绝非字符串', () => {
    expect(isString(123)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString({})).toBe(false)
  })
})

describe('isNumber', () => {
  it('正确识别数字', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(-1)).toBe(true)
    expect(isNumber(3.14)).toBe(true)
    expect(isNumber(NaN)).toBe(true)
    expect(isNumber(Infinity)).toBe(true)
  })

  it('拒绝非数字', () => {
    expect(isNumber('123')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber([])).toBe(false)
  })
})

describe('isBoolean', () => {
  it('正确识别布尔值', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })

  it('拒绝非布尔值', () => {
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean('true')).toBe(false)
    expect(isBoolean(null)).toBe(false)
  })
})

describe('isFunction', () => {
  it('正确识别函数', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function() {})).toBe(true)
    expect(isFunction(Math.floor)).toBe(true)
  })

  it('拒绝非函数', () => {
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction('fn')).toBe(false)
  })
})

describe('isObject', () => {
  it('正确识别普通对象', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
    expect(isObject(new Object())).toBe(true)
  })

  it('拒绝 null', () => {
    expect(isObject(null)).toBe(false)
  })

  it('拒绝数组', () => {
    expect(isObject([])).toBe(false)
    expect(isObject([1, 2, 3])).toBe(false)
  })

  it('拒绝原始类型', () => {
    expect(isObject('str')).toBe(false)
    expect(isObject(123)).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })
})

describe('isArray', () => {
  it('正确识别数组', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray(new Array())).toBe(true)
  })

  it('拒绝非数组', () => {
    expect(isArray({})).toBe(false)
    expect(isArray('array')).toBe(false)
    expect(isArray(123)).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
  })
})

describe('isNull', () => {
  it('正确识别 null', () => {
    expect(isNull(null)).toBe(true)
  })

  it('拒绝非 null', () => {
    expect(isNull(undefined)).toBe(false)
    expect(isNull(0)).toBe(false)
    expect(isNull('')).toBe(false)
    expect(isNull(false)).toBe(false)
    expect(isNull({})).toBe(false)
    expect(isNull([])).toBe(false)
  })
})

describe('isUndefined', () => {
  it('正确识别 undefined', () => {
    expect(isUndefined(undefined)).toBe(true)
  })

  it('拒绝非 undefined', () => {
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined(0)).toBe(false)
    expect(isUndefined('')).toBe(false)
    expect(isUndefined(false)).toBe(false)
  })
})

describe('isNullOrUndefined', () => {
  it('正确识别 null 和 undefined', () => {
    expect(isNullOrUndefined(null)).toBe(true)
    expect(isNullOrUndefined(undefined)).toBe(true)
  })

  it('拒绝非 null/undefined', () => {
    expect(isNullOrUndefined(0)).toBe(false)
    expect(isNullOrUndefined('')).toBe(false)
    expect(isNullOrUndefined(false)).toBe(false)
    expect(isNullOrUndefined({})).toBe(false)
    expect(isNullOrUndefined([])).toBe(false)
  })
})

describe('isEmpty', () => {
  it('识别空字符串', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('识别空数组', () => {
    expect(isEmpty([])).toBe(true)
  })

  it('识别空对象', () => {
    expect(isEmpty({})).toBe(true)
  })

  it('识别 null 和 undefined', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })

  it('非空值返回 false', () => {
    expect(isEmpty('hello')).toBe(false)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({ a: 1 })).toBe(false)
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(false)
  })
})

describe('isPrimitive', () => {
  it('正确识别原始类型', () => {
    expect(isPrimitive('str')).toBe(true)
    expect(isPrimitive(123)).toBe(true)
    expect(isPrimitive(true)).toBe(true)
    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive(undefined)).toBe(true)
  })

  it('拒绝非原始类型', () => {
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive([])).toBe(false)
    expect(isPrimitive(() => {})).toBe(false)
    expect(isPrimitive(new Date())).toBe(false)
  })
})

describe('getType', () => {
  it('返回正确的类型字符串', () => {
    expect(getType('hello')).toBe('String')
    expect(getType(123)).toBe('Number')
    expect(getType(true)).toBe('Boolean')
    expect(getType(null)).toBe('Null')
    expect(getType(undefined)).toBe('Undefined')
    expect(getType([])).toBe('Array')
    expect(getType({})).toBe('Object')
    expect(getType(() => {})).toBe('Function')
    expect(getType(new Date())).toBe('Date')
    expect(getType(/regex/)).toBe('RegExp')
    expect(getType(new Map())).toBe('Map')
    expect(getType(new Set())).toBe('Set')
  })

  it('NaN 返回 NaN', () => {
    expect(getType(NaN)).toBe('NaN')
  })
})
