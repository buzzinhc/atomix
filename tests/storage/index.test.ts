import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import {
  Storage,
  localStore,
  sessionStore,
  createStorage,
  getStorageSize,
  clearAllStorage,
} from '../../src/storage'

describe('Storage', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('should set and get values of different types', () => {
    localStore.set('str', 'hello')
    localStore.set('num', 123)
    localStore.set('bool', true)
    localStore.set('obj', { a: 1 })
    localStore.set('arr', [1, 2, 3])

    expect(localStore.get('str')).toBe('hello')
    expect(localStore.get('num')).toBe(123)
    expect(localStore.get('bool')).toBe(true)
    expect(localStore.get('obj')).toEqual({ a: 1 })
    expect(localStore.get('arr')).toEqual([1, 2, 3])
  })

  it('should return null for non-existent key', () => {
    expect(localStore.get('nonexistent')).toBeNull()
  })

  it('should check existence with has', () => {
    localStore.set('key', 'val')
    expect(localStore.has('key')).toBe(true)
    expect(localStore.has('another')).toBe(false)
  })

  it('should remove item', () => {
    localStore.set('key', 'val')
    localStore.remove('key')
    expect(localStore.has('key')).toBe(false)
    expect(localStore.get('key')).toBeNull()
  })

  it('should clear all items', () => {
    localStore.set('k1', 'v1')
    localStore.set('k2', 'v2')
    localStore.clear()
    expect(localStore.size()).toBe(0)
  })

  it('should list keys and report size', () => {
    localStore.set('a', 1)
    localStore.set('b', 2)
    expect(localStore.size()).toBe(2)
    expect(localStore.keys()).toEqual(expect.arrayContaining(['a', 'b']))
  })

  describe('expiration', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should return value before expire and null after expire', () => {
      // expire in 2 seconds
      localStore.set('temp', 'secret', 2)

      expect(localStore.get('temp')).toBe('secret')
      expect(localStore.has('temp')).toBe(true)

      // advance 3 seconds
      vi.advanceTimersByTime(3000)

      expect(localStore.has('temp')).toBe(false)
      expect(localStore.get('temp')).toBeNull()
      // should also be removed from underlying localStorage
      expect(localStorage.getItem('temp')).toBeNull()
    })
  })
})

describe('sessionStore', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('should operate on sessionStorage', () => {
    sessionStore.set('sessionKey', 'sessionVal')
    expect(sessionStore.get('sessionKey')).toBe('sessionVal')
    expect(sessionStorage.getItem('sessionKey')).not.toBeNull()
  })
})

describe('createStorage', () => {
  it('should create new Storage instance', () => {
    const store = createStorage('local')
    expect(store).toBeInstanceOf(Storage)
  })
})

describe('getStorageSize and clearAllStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('should report both storage sizes', () => {
    localStore.set('l1', '1')
    sessionStore.set('s1', '1')
    sessionStore.set('s2', '2')

    const size = getStorageSize()
    expect(size.local).toBe(1)
    expect(size.session).toBe(2)
  })

  it('should clear both stores and return cleared count', () => {
    localStore.set('l1', '1')
    sessionStore.set('s1', '1')

    const cleared = clearAllStorage()
    expect(cleared.local).toBe(1)
    expect(cleared.session).toBe(1)
    expect(localStore.size()).toBe(0)
    expect(sessionStore.size()).toBe(0)
  })
})
