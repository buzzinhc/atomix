import { describe, it, expect } from 'vitest'
import { unique, uniqueBy, flatten, chunk, groupBy, sortBy, shuffle, intersection, union, difference, sample, compact, first, last, range } from '../../src/array/index'

describe('array 模块', () => {
  describe('unique', () => {
    it('应该去除重复元素', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
    })
    it('应该保持元素顺序', () => {
      expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2])
    })
    it('应该处理空数组', () => {
      expect(unique([])).toEqual([])
    })
    it('应该处理全是重复元素的情况', () => {
      expect(unique([5, 5, 5])).toEqual([5])
    })
  })

  describe('uniqueBy', () => {
    it('应该根据 keyFn 去重', () => {
      const arr = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 1, name: 'Charlie' }]
      expect(uniqueBy(arr, item => item.id)).toEqual([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }])
    })
    it('应该处理空数组', () => {
      expect(uniqueBy([], item => item)).toEqual([])
    })
    it('应该处理全部重复的情况', () => {
      const arr = [{ a: 1 }, { a: 1 }, { a: 1 }]
      expect(uniqueBy(arr, item => item.a)).toEqual([{ a: 1 }])
    })
  })

  describe('flatten', () => {
    it('应该展平一层嵌套数组', () => {
      expect(flatten([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, [5, 6]])
    })
    it('应该支持指定深度展平', () => {
      expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]])
    })
    it('深度为 0 时应该返回原数组', () => {
      expect(flatten([1, [2, 3]], 0)).toEqual([1, [2, 3]])
    })
    it('深度为负数时应该返回原数组', () => {
      expect(flatten([1, [2, 3]], -1)).toEqual([1, [2, 3]])
    })
  })

  describe('chunk', () => {
    it('应该将数组分块', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    })
    it('应该处理块大小大于数组长度的情况', () => {
      expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]])
    })
    it('应该处理空数组', () => {
      expect(chunk([], 2)).toEqual([])
    })
    it('块大小为 0 应该返回空数组', () => {
      expect(chunk([1, 2, 3], 0)).toEqual([])
    })
    it('块大小为负数应该返回空数组', () => {
      expect(chunk([1, 2, 3], -1)).toEqual([])
    })
  })

  describe('groupBy', () => {
    it('应该按 keyFn 分组', () => {
      const arr = [{ type: 'a', val: 1 }, { type: 'b', val: 2 }, { type: 'a', val: 3 }]
      expect(groupBy(arr, item => item.type)).toEqual({ a: [{ type: 'a', val: 1 }, { type: 'a', val: 3 }], b: [{ type: 'b', val: 2 }] })
    })
    it('应该处理空数组', () => {
      expect(groupBy([], item => item)).toEqual({})
    })
    it('所有元素 key 相同时应该只有一组', () => {
      const arr = [{ group: 'x' }, { group: 'x' }]
      expect(groupBy(arr, item => item.group)).toEqual({ x: [{ group: 'x' }, { group: 'x' }] })
    })
  })

  describe('sortBy', () => {
    it('应该按升序排序', () => {
      expect(sortBy([3, 1, 2], item => item)).toEqual([1, 2, 3])
    })
    it('应该支持降序排序', () => {
      expect(sortBy([3, 1, 2], item => item, 'desc')).toEqual([3, 2, 1])
    })
    it('应该处理空数组', () => {
      expect(sortBy([], item => item)).toEqual([])
    })
    it('应该处理对象数组', () => {
      const arr = [{ name: 'Charlie', age: 25 }, { name: 'Alice', age: 20 }, { name: 'Bob', age: 30 }]
      expect(sortBy(arr, item => item.age)).toEqual([{ name: 'Alice', age: 20 }, { name: 'Charlie', age: 25 }, { name: 'Bob', age: 30 }])
    })
    it('应该不修改原数组', () => {
      const original = [3, 1, 2]
      sortBy(original, item => item)
      expect(original).toEqual([3, 1, 2])
    })
  })

  describe('shuffle', () => {
    it('应该返回长度相同的数组', () => {
      const original = [1, 2, 3, 4, 5]
      expect(shuffle(original).length).toBe(5)
    })
    it('应该包含所有原数组元素', () => {
      const original = [1, 2, 3, 4, 5]
      const shuffled = shuffle(original)
      original.forEach(item => {
        expect(shuffled).toContain(item)
      })
    })
    it('应该不修改原数组', () => {
      const original = [1, 2, 3]
      shuffle(original)
      expect(original).toEqual([1, 2, 3])
    })
    it('应该处理空数组', () => {
      expect(shuffle([])).toEqual([])
    })
    it('应该处理单元素数组', () => {
      expect(shuffle([1])).toEqual([1])
    })
  })

  describe('intersection', () => {
    it('应该返回两个数组的交集', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
    })
    it('应该处理没有交集的情况', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([])
    })
    it('应该处理空数组', () => {
      expect(intersection([], [1, 2])).toEqual([])
      expect(intersection([1, 2], [])).toEqual([])
    })
    it('应该返回存在于两个数组的元素', () => {
      expect(intersection([1, 1, 2], [1, 2, 2])).toEqual([1, 1, 2])
    })
  })

  describe('union', () => {
    it('应该返回两个数组的并集', () => {
      expect(union([1, 2], [2, 3])).toEqual([1, 2, 3])
    })
    it('应该去重', () => {
      expect(union([1, 1, 2], [2, 2, 3])).toEqual([1, 2, 3])
    })
    it('应该处理空数组', () => {
      expect(union([], [1, 2])).toEqual([1, 2])
      expect(union([1, 2], [])).toEqual([1, 2])
    })
  })

  describe('difference', () => {
    it('应该返回存在于第一个数组但不存在于第二个数组的元素', () => {
      expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1])
    })
    it('应该处理没有差异的情况', () => {
      expect(difference([1, 2], [1, 2, 3])).toEqual([])
    })
    it('应该处理空数组', () => {
      expect(difference([], [1, 2])).toEqual([])
      expect(difference([1, 2], [])).toEqual([1, 2])
    })
  })

  describe('sample', () => {
    it('应该返回随机样本', () => {
      const arr = [1, 2, 3, 4, 5]
      const result = sample(arr, 2)
      expect(result.length).toBe(2)
      result.forEach(item => {
        expect(arr).toContain(item)
      })
    })
    it('样本数量大于数组长度时返回全部元素', () => {
      const arr = [1, 2, 3]
      expect(sample(arr, 10).sort()).toEqual([1, 2, 3])
    })
    it('应该处理空数组', () => {
      expect(sample([], 2)).toEqual([])
    })
    it('count 为 0 时应该返回空数组', () => {
      expect(sample([1, 2, 3], 0)).toEqual([])
    })
  })

  describe('compact', () => {
    it('应该移除假值', () => {
      expect(compact([0, 1, false, 2, '', 3, null, undefined])).toEqual([1, 2, 3])
    })
    it('应该处理全是真值的情况', () => {
      expect(compact([1, 2, 3])).toEqual([1, 2, 3])
    })
    it('应该处理全是假值的情况', () => {
      expect(compact([0, false, '', null, undefined])).toEqual([])
    })
    it('应该处理空数组', () => {
      expect(compact([])).toEqual([])
    })
  })

  describe('first', () => {
    it('应该返回第一个元素', () => {
      expect(first([1, 2, 3])).toBe(1)
    })
    it('应该处理空数组', () => {
      expect(first([])).toBeUndefined()
    })
  })

  describe('last', () => {
    it('应该返回最后一个元素', () => {
      expect(last([1, 2, 3])).toBe(3)
    })
    it('应该处理空数组', () => {
      expect(last([])).toBeUndefined()
    })
  })

  describe('range', () => {
    it('应该生成升序范围', () => {
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4])
    })
    it('应该支持自定义步长', () => {
      expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8])
    })
    it('应该支持负数步长', () => {
      expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1])
    })
    it('步长为 0 时应该返回空数组', () => {
      expect(range(0, 5, 0)).toEqual([])
    })
    it('应该处理 start === end 的情况', () => {
      expect(range(3, 3)).toEqual([])
    })
  })
})
