import { describe, it, expect } from 'vitest'
import { parseQuery, stringifyQuery, addQuery, removeQuery, parseUrl, isAbsoluteUrl } from '../../src/url'

describe('parseQuery', () => {
  it('parses basic query string', () => {
    expect(parseQuery('a=1&b=2')).toEqual({ a: '1', b: '2' })
  })

  it('parses query string with leading ?', () => {
    expect(parseQuery('?a=1&b=2')).toEqual({ a: '1', b: '2' })
  })

  it('returns empty object for empty string', () => {
    expect(parseQuery('')).toEqual({})
  })

  it('returns empty object for single ?', () => {
    expect(parseQuery('?')).toEqual({})
  })

  it('handles value-less keys', () => {
    expect(parseQuery('a&b=2')).toEqual({ a: '', b: '2' })
  })

  it('handles URL-encoded values', () => {
    expect(parseQuery('name=%E4%B8%AD%E6%96%87&msg=hello%20world')).toEqual({
      name: '中文',
      msg: 'hello world',
    })
  })

  it('handles URL-encoded keys', () => {
    expect(parseQuery('%E9%94%AE=value')).toEqual({ '键': 'value' })
  })

  it('handles multiple = in value', () => {
    expect(parseQuery('a=b=c')).toEqual({ a: 'b=c' })
  })

  it('handles empty value', () => {
    expect(parseQuery('a=&b=2')).toEqual({ a: '', b: '2' })
  })

  it('handles special characters', () => {
    expect(parseQuery('q=hello+world&lang=js')).toEqual({ q: 'hello+world', lang: 'js' })
  })
})

describe('stringifyQuery', () => {
  it('stringifies basic object', () => {
    expect(stringifyQuery({ a: '1', b: '2' })).toBe('a=1&b=2')
  })

  it('returns empty string for empty object', () => {
    expect(stringifyQuery({})).toBe('')
  })

  it('skips undefined values', () => {
    expect(stringifyQuery({ a: '1', b: undefined, c: '3' })).toBe('a=1&c=3')
  })

  it('skips null values', () => {
    expect(stringifyQuery({ a: null, b: '2' })).toBe('b=2')
  })

  it('encodes special characters', () => {
    expect(stringifyQuery({ msg: 'hello world' })).toBe('msg=hello%20world')
  })

  it('encodes keys with special characters', () => {
    expect(stringifyQuery({ 'a&b': '1' })).toBe('a%26b=1')
  })

  it('converts numbers to string', () => {
    expect(stringifyQuery({ count: 42 })).toBe('count=42')
  })

  it('converts boolean to string', () => {
    expect(stringifyQuery({ active: true })).toBe('active=true')
  })

  it('keeps empty string values', () => {
    expect(stringifyQuery({ a: '' })).toBe('a=')
  })
})

describe('addQuery', () => {
  it('adds params to URL without query', () => {
    expect(addQuery('https://example.com', { a: '1' })).toBe('https://example.com?a=1')
  })

  it('appends params to URL with existing query', () => {
    expect(addQuery('https://example.com?a=1', { b: '2' })).toBe('https://example.com?a=1&b=2')
  })

  it('returns original URL when params is empty', () => {
    expect(addQuery('https://example.com', {})).toBe('https://example.com')
  })

  it('handles URL with path', () => {
    expect(addQuery('https://example.com/path', { key: 'val' })).toBe('https://example.com/path?key=val')
  })

  it('handles multiple params', () => {
    expect(addQuery('https://example.com', { a: '1', b: '2', c: '3' })).toBe('https://example.com?a=1&b=2&c=3')
  })
})

describe('removeQuery', () => {
  it('removes specified keys', () => {
    expect(removeQuery('https://example.com?a=1&b=2&c=3', ['b'])).toBe('https://example.com?a=1&c=3')
  })

  it('removes multiple keys', () => {
    expect(removeQuery('https://example.com?a=1&b=2&c=3', ['a', 'c'])).toBe('https://example.com?b=2')
  })

  it('returns URL without ? when all params removed', () => {
    expect(removeQuery('https://example.com?a=1', ['a'])).toBe('https://example.com')
  })

  it('returns original URL when no query string', () => {
    expect(removeQuery('https://example.com', ['a'])).toBe('https://example.com')
  })

  it('handles removing non-existent key', () => {
    expect(removeQuery('https://example.com?a=1', ['b'])).toBe('https://example.com?a=1')
  })

  it('preserves hash', () => {
    expect(removeQuery('https://example.com?a=1&b=2#hash', ['b'])).toBe('https://example.com?a=1#hash')
  })

  it('preserves hash when all query removed', () => {
    expect(removeQuery('https://example.com?a=1#hash', ['a'])).toBe('https://example.com#hash')
  })
})

describe('parseUrl', () => {
  it('parses full URL', () => {
    expect(parseUrl('https://example.com:8080/path?query=1#hash')).toEqual({
      protocol: 'https',
      host: 'example.com',
      port: '8080',
      path: '/path',
      query: 'query=1',
      hash: 'hash',
    })
  })

  it('parses URL without port', () => {
    expect(parseUrl('https://example.com/path?q=1')).toEqual({
      protocol: 'https',
      host: 'example.com',
      port: '',
      path: '/path',
      query: 'q=1',
      hash: '',
    })
  })

  it('parses URL without query and hash', () => {
    expect(parseUrl('https://example.com/path')).toEqual({
      protocol: 'https',
      host: 'example.com',
      port: '',
      path: '/path',
      query: '',
      hash: '',
    })
  })

  it('parses URL with only hash', () => {
    expect(parseUrl('https://example.com#section')).toEqual({
      protocol: 'https',
      host: 'example.com',
      port: '',
      path: '',
      query: '',
      hash: 'section',
    })
  })

  it('parses URL with only query', () => {
    expect(parseUrl('https://example.com?key=val')).toEqual({
      protocol: 'https',
      host: 'example.com',
      port: '',
      path: '',
      query: 'key=val',
      hash: '',
    })
  })

  it('parses relative path', () => {
    expect(parseUrl('/path/to/resource')).toEqual({
      protocol: '',
      host: '',
      port: '',
      path: '/path/to/resource',
      query: '',
      hash: '',
    })
  })

  it('parses http protocol', () => {
    expect(parseUrl('http://example.com')).toEqual({
      protocol: 'http',
      host: 'example.com',
      port: '',
      path: '',
      query: '',
      hash: '',
    })
  })

  it('parses URL with custom protocol', () => {
    expect(parseUrl('ftp://files.example.com/pub')).toEqual({
      protocol: 'ftp',
      host: 'files.example.com',
      port: '',
      path: '/pub',
      query: '',
      hash: '',
    })
  })
})

describe('isAbsoluteUrl', () => {
  it('returns true for http', () => {
    expect(isAbsoluteUrl('http://example.com')).toBe(true)
  })

  it('returns true for https', () => {
    expect(isAbsoluteUrl('https://example.com/path')).toBe(true)
  })

  it('returns true for protocol-relative URL', () => {
    expect(isAbsoluteUrl('//example.com/path')).toBe(true)
  })

  it('returns true for custom protocol', () => {
    expect(isAbsoluteUrl('ftp://example.com')).toBe(true)
  })

  it('returns true for mailto', () => {
    expect(isAbsoluteUrl('mailto:test@example.com')).toBe(true)
  })

  it('returns false for relative path', () => {
    expect(isAbsoluteUrl('/path/to/resource')).toBe(false)
  })

  it('returns false for relative path without leading slash', () => {
    expect(isAbsoluteUrl('path/to/resource')).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(isAbsoluteUrl('')).toBe(false)
  })

  it('returns false for query-only string', () => {
    expect(isAbsoluteUrl('?key=val')).toBe(false)
  })

  it('returns false for hash-only string', () => {
    expect(isAbsoluteUrl('#section')).toBe(false)
  })
})
