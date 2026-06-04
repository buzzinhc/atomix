import { describe, it, expect } from 'vitest'
import {
  deepClone,
  deepMerge,
  pick,
  omit,
  mapKeys,
  mapValues,
  invert,
  flattenObject,
  get,
  set,
} from '../../src/object'

describe('deepClone', () => {
  it('基本类型直接返回', () => {
    expect(deepClone(1)).toBe(1)
    expect(deepClone('hello')).toBe('hello')
    expect(deepClone(true)).toBe(true)
    expect(deepClone(null)).toBe(null)
    expect(deepClone(undefined)).toBe(undefined)
  })

  it('克隆普通对象', () => {
    const obj = { a: 1, b: { c: 2 } }
    const cloned = deepClone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.b).not.toBe(obj.b)
  })

  it('克隆数组', () => {
    const arr = [1, [2, 3], { a: 4 }]
    const cloned = deepClone(arr)
    expect(cloned).toEqual(arr)
    expect(cloned).not.toBe(arr)
    expect(cloned[1]).not.toBe(arr[1])
    expect(cloned[2]).not.toBe(arr[2])
  })

  it('克隆 Date', () => {
    const date = new Date('2025-01-01')
    const cloned = deepClone(date)
    expect(cloned).toEqual(date)
    expect(cloned).not.toBe(date)
    expect(cloned instanceof Date).toBe(true)
  })

  it('克隆 RegExp', () => {
    const reg = /test/gi
    const cloned = deepClone(reg)
    expect(cloned.source).toBe(reg.source)
    expect(cloned.flags).toBe(reg.flags)
    expect(cloned).not.toBe(reg)
  })

  it('克隆 Map', () => {
    const map = new Map([['a', 1], ['b', { c: 2 }]])
    const cloned = deepClone(map)
    expect(cloned).not.toBe(map)
    expect(cloned.get('a')).toBe(1)
    expect(cloned.get('b')).toEqual({ c: 2 })
    expect(cloned.get('b')).not.toBe(map.get('b'))
  })

  it('克隆 Set', () => {
    const set = new Set([1, { a: 2 }, [3]])
    const cloned = deepClone(set)
    expect(cloned).not.toBe(set)
    expect(cloned.size).toBe(3)
    const arr = Array.from(cloned)
    expect(arr[0]).toBe(1)
    expect(arr[1]).toEqual({ a: 2 })
    expect(arr[2]).toEqual([3])
  })

  it('嵌套复杂对象', () => {
    const obj = {
      date: new Date(),
      arr: [new Map([['k', new Set([1, 2])]])],
      reg: /abc/i,
    }
    const cloned = deepClone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.date).not.toBe(obj.date)
    expect(cloned.arr).not.toBe(obj.arr)
    expect(cloned.arr[0]).not.toBe(obj.arr[0])
  })
})

describe('deepMerge', () => {
  it('合并简单对象', () => {
    const target = { a: 1, b: 2 }
    const source = { b: 3, c: 4 }
    expect(deepMerge(target, source)).toEqual({ a: 1, b: 3, c: 4 })
  })

  it('深合并嵌套对象', () => {
    const target = { a: { x: 1, y: 2 }, b: 1 }
    const source = { a: { y: 3, z: 4 } }
    expect(deepMerge(target, source)).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 1 })
  })

  it('多个 source 合并', () => {
    const target = { a: 1 }
    const s1 = { b: 2 }
    const s2 = { c: 3 }
    expect(deepMerge(target, s1, s2)).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('source 为 null 或 undefined 时跳过', () => {
    const target = { a: 1 }
    expect(deepMerge(target, null as any, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it('不修改原对象', () => {
    const target = { a: { x: 1 } }
    const source = { a: { y: 2 } }
    const result = deepMerge(target, source)
    expect(target).toEqual({ a: { x: 1 } })
    expect(result.a).not.toBe(target.a)
  })

  it('数组不进行深合并而是直接替换', () => {
    const target = { a: [1, 2] }
    const source = { a: [3] }
    expect(deepMerge(target, source)).toEqual({ a: [3] })
  })
})

describe('pick', () => {
  it('选取指定属性', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })

  it('keys 为空数组返回空对象', () => {
    const obj = { a: 1 }
    expect(pick(obj, [])).toEqual({})
  })

  it('选取不存在的属性忽略', () => {
    const obj = { a: 1, b: 2 }
    const result = pick(obj, ['a', 'c' as any])
    expect(result).toEqual({ a: 1 })
  })
})

describe('omit', () => {
  it('排除指定属性', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 })
  })

  it('keys 为空数组返回原对象副本', () => {
    const obj = { a: 1 }
    const result = omit(obj, [])
    expect(result).toEqual({ a: 1 })
    expect(result).not.toBe(obj)
  })

  it('排除不存在的属性无影响', () => {
    const obj = { a: 1 }
    expect(omit(obj, ['b' as any])).toEqual({ a: 1 })
  })
})

describe('mapKeys', () => {
  it('映射键名', () => {
    const obj = { a: 1, b: 2 }
    expect(mapKeys(obj, (k) => k.toUpperCase())).toEqual({ A: 1, B: 2 })
  })

  it('空对象返回空对象', () => {
    expect(mapKeys({}, (k) => k)).toEqual({})
  })

  it('fn 可以使用 value', () => {
    const obj = { a: 1, b: 2 }
    expect(mapKeys(obj, (k, v) => `${k}${v}`)).toEqual({ a1: 1, b2: 2 })
  })

  it('键名冲突时后者覆盖', () => {
    const obj = { a: 1, b: 2 }
    expect(mapKeys(obj, () => 'same')).toEqual({ same: 2 })
  })
})

describe('mapValues', () => {
  it('映射值', () => {
    const obj = { a: 1, b: 2 }
    expect(mapValues(obj, (v) => v * 2)).toEqual({ a: 2, b: 4 })
  })

  it('空对象返回空对象', () => {
    expect(mapValues({}, (v) => v)).toEqual({})
  })

  it('fn 可以使用 key', () => {
    const obj = { a: 1, b: 2 }
    expect(mapValues(obj, (v, k) => `${k}:${v}`)).toEqual({ a: 'a:1', b: 'b:2' })
  })
})

describe('invert', () => {
  it('键值互换', () => {
    const obj = { a: 'x', b: 'y' }
    expect(invert(obj)).toEqual({ x: 'a', y: 'b' })
  })

  it('空对象返回空对象', () => {
    expect(invert({})).toEqual({})
  })

  it('值重复时后者覆盖', () => {
    const obj = { a: 'same', b: 'same' }
    expect(invert(obj)).toEqual({ same: 'b' })
  })
})

describe('flattenObject', () => {
  it('扁平化嵌套对象', () => {
    const obj = { a: { b: 1 }, c: 2 }
    expect(flattenObject(obj)).toEqual({ 'a.b': 1, c: 2 })
  })

  it('多层嵌套', () => {
    const obj = { a: { b: { c: 1 } } }
    expect(flattenObject(obj)).toEqual({ 'a.b.c': 1 })
  })

  it('空对象返回空对象', () => {
    expect(flattenObject({})).toEqual({})
  })

  it('带前缀', () => {
    const obj = { a: 1 }
    expect(flattenObject(obj, 'root')).toEqual({ 'root.a': 1 })
  })

  it('数组不展开', () => {
    const obj = { a: [1, 2] }
    expect(flattenObject(obj)).toEqual({ a: [1, 2] })
  })
})

describe('get', () => {
  it('简单路径取值', () => {
    const obj = { a: { b: { c: 1 } } }
    expect(get(obj, 'a.b.c')).toBe(1)
  })

  it('数组索引取值', () => {
    const obj = { a: [{ b: 1 }] }
    expect(get(obj, 'a[0].b')).toBe(1)
  })

  it('路径不存在返回默认值', () => {
    const obj = { a: 1 }
    expect(get(obj, 'b', 'default')).toBe('default')
  })

  it('路径不存在且无默认值返回 undefined', () => {
    expect(get({ a: 1 }, 'b')).toBeUndefined()
  })

  it('obj 为 null 返回默认值', () => {
    expect(get(null, 'a', 'default')).toBe('default')
  })

  it('中间路径为 null 返回默认值', () => {
    const obj = { a: null }
    expect(get(obj, 'a.b', 'default')).toBe('default')
  })

  it('值为 0 时不应返回默认值', () => {
    expect(get({ a: 0 }, 'a', 'default')).toBe(0)
  })

  it('值为空字符串时不应返回默认值', () => {
    expect(get({ a: '' }, 'a', 'default')).toBe('')
  })

  it('值为 false 时不应返回默认值', () => {
    expect(get({ a: false }, 'a', 'default')).toBe(false)
  })
})

describe('set', () => {
  it('简单路径设值', () => {
    const obj = { a: 1 }
    expect(set(obj, 'b', 2)).toEqual({ a: 1, b: 2 })
  })

  it('嵌套路径设值', () => {
    const obj = { a: { b: 1 } }
    expect(set(obj, 'a.b', 2)).toEqual({ a: { b: 2 } })
  })

  it('不修改原对象', () => {
    const obj = { a: 1 }
    set(obj, 'a', 2)
    expect(obj.a).toBe(1)
  })

  it('obj 为 null 时创建新对象', () => {
    expect(set(null, 'a', 1)).toEqual({ a: 1 })
  })

  it('创建嵌套结构', () => {
    expect(set({}, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } })
  })

  it('数组索引设值', () => {
    const obj = { a: [1, 2, 3] }
    expect(set(obj, 'a[1]', 99)).toEqual({ a: [1, 99, 3] })
  })

  it('自动创建数组', () => {
    const obj = {}
    expect(set(obj, 'a[0]', 1)).toEqual({ a: [1] })
  })

  it('path 为空返回原对象', () => {
    const obj = { a: 1 }
    const result = set(obj, '', 2)
    expect(result).toEqual({ a: 1 })
  })
})
