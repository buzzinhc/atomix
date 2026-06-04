import { describe, it, expect } from 'vitest'
import { capitalize, camelCase, kebabCase, snakeCase, truncate, trim, repeat, padStart, padEnd, escapeHtml, unescapeHtml, uuid } from '../../src/string/index'

describe('string 模块', () => {
  describe('capitalize', () => {
    it('应该将首字母大写', () => {
      expect(capitalize('hello')).toBe('Hello')
    })
    it('应该处理全大写字符串', () => {
      expect(capitalize('HELLO')).toBe('HELLO')
    })
    it('应该处理空字符串', () => {
      expect(capitalize('')).toBe('')
    })
    it('应该处理单字符字符串', () => {
      expect(capitalize('a')).toBe('A')
    })
  })

  describe('camelCase', () => {
    it('应该转换为驼峰命名', () => {
      expect(camelCase('hello world')).toBe('helloWorld')
    })
    it('应该处理下划线分隔', () => {
      expect(camelCase('hello_world')).toBe('helloWorld')
    })
    it('应该处理 kebab-case', () => {
      expect(camelCase('hello-world')).toBe('helloWorld')
    })
    it('应该处理混合分隔符', () => {
      expect(camelCase('hello-World_Foo')).toBe('helloWorldFoo')
    })
    it('应该处理空字符串', () => {
      expect(camelCase('')).toBe('')
    })
    it('应该处理全大写', () => {
      expect(camelCase('HELLO WORLD')).toBe('helloWorld')
    })
  })

  describe('kebabCase', () => {
    it('应该转换为 kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world')
    })
    it('应该处理下划线分隔', () => {
      expect(kebabCase('hello_world')).toBe('hello-world')
    })
    it('应该处理空格分隔', () => {
      expect(kebabCase('hello world')).toBe('hello-world')
    })
    it('应该处理混合分隔符', () => {
      expect(kebabCase('HelloWorld')).toBe('hello-world')
    })
    it('应该处理空字符串', () => {
      expect(kebabCase('')).toBe('')
    })
  })

  describe('snakeCase', () => {
    it('应该转换为 snake_case', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world')
    })
    it('应该处理 kebab-case', () => {
      expect(snakeCase('hello-world')).toBe('hello_world')
    })
    it('应该处理空格分隔', () => {
      expect(snakeCase('hello world')).toBe('hello_world')
    })
    it('应该处理空字符串', () => {
      expect(snakeCase('')).toBe('')
    })
  })

  describe('truncate', () => {
    it('应该截断长字符串并添加后缀', () => {
      expect(truncate('hello world', 5)).toBe('hello...')
    })
    it('字符串长度小于等于限制时应该返回原字符串', () => {
      expect(truncate('hello', 10)).toBe('hello')
    })
    it('应该等于限制长度时返回原字符串', () => {
      expect(truncate('hello', 5)).toBe('hello')
    })
    it('应该支持自定义后缀', () => {
      expect(truncate('hello world', 5, '>>>')).toBe('hello>>>')
    })
    it('应该处理空字符串', () => {
      expect(truncate('', 5)).toBe('')
    })
  })

  describe('trim', () => {
    it('应该去除首尾空白字符', () => {
      expect(trim('  hello  ')).toBe('hello')
    })
    it('应该支持自定义要去除的字符', () => {
      expect(trim('xxhelloxx', 'x')).toBe('hello')
    })
    it('应该处理没有空白字符的情况', () => {
      expect(trim('hello')).toBe('hello')
    })
    it('应该处理空字符串', () => {
      expect(trim('')).toBe('')
    })
  })

  describe('repeat', () => {
    it('应该重复字符串', () => {
      expect(repeat('a', 3)).toBe('aaa')
    })
    it('count 为 0 时应该返回空字符串', () => {
      expect(repeat('a', 0)).toBe('')
    })
    it('count 为负数时应该返回空字符串', () => {
      expect(repeat('a', -1)).toBe('')
    })
    it('应该处理空字符串', () => {
      expect(repeat('', 3)).toBe('')
    })
  })

  describe('padStart', () => {
    it('应该在前面填充字符', () => {
      expect(padStart('hello', 10, '0')).toBe('00000hello')
    })
    it('字符串长度大于等于 length 时应该返回原字符串', () => {
      expect(padStart('hello', 3, '0')).toBe('hello')
    })
    it('应该使用空格作为默认填充字符', () => {
      expect(padStart('hello', 10)).toBe('     hello')
    })
    it('应该处理空字符串', () => {
      expect(padStart('', 5, '0')).toBe('00000')
    })
  })

  describe('padEnd', () => {
    it('应该在后面填充字符', () => {
      expect(padEnd('hello', 10, '0')).toBe('hello00000')
    })
    it('字符串长度大于等于 length 时应该返回原字符串', () => {
      expect(padEnd('hello', 3, '0')).toBe('hello')
    })
    it('应该使用空格作为默认填充字符', () => {
      expect(padEnd('hello', 10)).toBe('hello     ')
    })
    it('应该处理空字符串', () => {
      expect(padEnd('', 5, '0')).toBe('00000')
    })
  })

  describe('escapeHtml', () => {
    it('应该转义 HTML 特殊字符', () => {
      expect(escapeHtml('<div>"test"&</div>')).toBe('&lt;div&gt;&quot;test&quot;&amp;&lt;/div&gt;')
    })
    it('应该处理没有特殊字符的字符串', () => {
      expect(escapeHtml('hello')).toBe('hello')
    })
    it('应该处理空字符串', () => {
      expect(escapeHtml('')).toBe('')
    })
    it('应该转义单引号', () => {
      expect(escapeHtml("it's")).toBe('it&#39;s')
    })
  })

  describe('unescapeHtml', () => {
    it('应该反转义 HTML 实体', () => {
      expect(unescapeHtml('&lt;div&gt;&quot;test&quot;&amp;&lt;/div&gt;')).toBe('<div>"test"&</div>')
    })
    it('应该处理没有 HTML 实体的字符串', () => {
      expect(unescapeHtml('hello')).toBe('hello')
    })
    it('应该处理空字符串', () => {
      expect(unescapeHtml('')).toBe('')
    })
    it('应该反转义单引号实体', () => {
      expect(unescapeHtml('it&#39;s')).toBe("it's")
    })
  })

  describe('uuid', () => {
    it('应该生成正确格式的 UUID', () => {
      const result = uuid()
      expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    })
    it('每次调用应该生成不同的 UUID', () => {
      const uuid1 = uuid()
      const uuid2 = uuid()
      expect(uuid1).not.toBe(uuid2)
    })
  })
})
