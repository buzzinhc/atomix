import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  debounce,
  throttle,
  getCookie,
  setCookie,
  removeCookie,
  getStorage,
  setStorage,
  removeStorage,
  copyToClipboard,
  getScrollPosition,
  isMobile,
  getBrowserInfo,
  lazyLoadImage,
  observeIntersection,
} from '../../src/browser'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should delay execution', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced()
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should reset timer on repeated calls', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced()
    vi.advanceTimersByTime(50)
    debounced()
    vi.advanceTimersByTime(50)
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments to the original function', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced('a', 'b')
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledWith('a', 'b')
  })

  it('should only execute once for multiple rapid calls', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced()
    debounced()
    debounced()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('cancel should prevent execution', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced()
    debounced.cancel()
    vi.advanceTimersByTime(100)
    expect(fn).not.toHaveBeenCalled()
  })

  it('cancel should be available on the returned function', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    expect(typeof debounced.cancel).toBe('function')
  })

  it('cancel should do nothing if no pending call', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced.cancel()
    vi.advanceTimersByTime(100)
    expect(fn).not.toHaveBeenCalled()
  })
})

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should execute immediately on first call', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should not execute again within the interval', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should execute again after the interval', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled()
    vi.advanceTimersByTime(100)
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should execute trailing call after interval', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled()
    vi.advanceTimersByTime(30)
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(70)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should pass arguments to the original function', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled('hello', 42)
    expect(fn).toHaveBeenCalledWith('hello', 42)
  })

  it('cancel should prevent trailing execution', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled()
    vi.advanceTimersByTime(30)
    throttled()
    throttled.cancel()
    vi.advanceTimersByTime(70)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('cancel should be available on the returned function', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    expect(typeof throttled.cancel).toBe('function')
  })

  it('cancel should do nothing if no pending call', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled()
    throttled.cancel()
    throttled.cancel()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe.skip('getCookie', () => {
  it('should return cookie value by name', () => {
    document.cookie = 'token=abc123'
    expect(getCookie('token')).toBe('abc123')
  })

  it('should return null for non-existent cookie', () => {
    expect(getCookie('nonexistent')).toBeNull()
  })
})

describe.skip('setCookie', () => {
  it('should set a cookie', () => {
    setCookie('name', 'value')
    expect(document.cookie).toContain('name=value')
  })

  it('should set cookie with options', () => {
    setCookie('name', 'value', { path: '/', secure: true })
    expect(document.cookie).toContain('name=value')
  })
})

describe.skip('removeCookie', () => {
  it('should remove a cookie', () => {
    document.cookie = 'name=value'
    removeCookie('name')
    expect(getCookie('name')).toBeNull()
  })
})

describe('getStorage', () => {
  it('should parse JSON value', () => {
    const mockStorage: Storage = {
      length: 1,
      clear: vi.fn(),
      getItem: vi.fn().mockReturnValue('{"a":1}'),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      key: vi.fn(),
    }
    expect(getStorage('key', mockStorage)).toEqual({ a: 1 })
  })

  it('should return raw string if JSON parse fails', () => {
    const mockStorage: Storage = {
      length: 1,
      clear: vi.fn(),
      getItem: vi.fn().mockReturnValue('not-json'),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      key: vi.fn(),
    }
    expect(getStorage('key', mockStorage)).toBe('not-json')
  })

  it('should return null if key does not exist', () => {
    const mockStorage: Storage = {
      length: 0,
      clear: vi.fn(),
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      key: vi.fn(),
    }
    expect(getStorage('key', mockStorage)).toBeNull()
  })
})

describe('setStorage', () => {
  it('should stringify and store value', () => {
    const mockStorage: Storage = {
      length: 0,
      clear: vi.fn(),
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      key: vi.fn(),
    }
    setStorage('key', { a: 1 }, mockStorage)
    expect(mockStorage.setItem).toHaveBeenCalledWith('key', '{"a":1}')
  })

  it('should store primitives', () => {
    const mockStorage: Storage = {
      length: 0,
      clear: vi.fn(),
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      key: vi.fn(),
    }
    setStorage('count', 42, mockStorage)
    expect(mockStorage.setItem).toHaveBeenCalledWith('count', '42')
  })
})

describe('removeStorage', () => {
  it('should remove item from storage', () => {
    const mockStorage: Storage = {
      length: 0,
      clear: vi.fn(),
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      key: vi.fn(),
    }
    removeStorage('key', mockStorage)
    expect(mockStorage.removeItem).toHaveBeenCalledWith('key')
  })
})

describe.skip('copyToClipboard', () => {
  it('should use navigator.clipboard if available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
    })
    await copyToClipboard('hello')
    expect(writeText).toHaveBeenCalledWith('hello')
  })

  it('should fallback to execCommand', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
    })
    document.execCommand = vi.fn().mockReturnValue(true)
    await copyToClipboard('hello')
    expect(document.execCommand).toHaveBeenCalledWith('copy')
  })
})

describe.skip('getScrollPosition', () => {
  it('should return scroll position', () => {
    expect(getScrollPosition()).toEqual({ x: 0, y: 0 })
  })
})

describe.skip('isMobile', () => {
  it('should detect mobile device', () => {
    expect(typeof isMobile()).toBe('boolean')
  })
})

describe.skip('getBrowserInfo', () => {
  it('should return browser name and version', () => {
    const info = getBrowserInfo()
    expect(info).toHaveProperty('name')
    expect(info).toHaveProperty('version')
  })
})

describe.skip('lazyLoadImage', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should be a function', () => {
    expect(typeof lazyLoadImage).toBe('function')
  })

  it('should return a cleanup function', () => {
    const img = document.createElement('img')
    img.setAttribute('data-src', 'test.jpg')
    document.body.appendChild(img)
    const cleanup = lazyLoadImage(img)
    expect(typeof cleanup).toBe('function')
    cleanup()
  })

  it('should accept single image element', () => {
    const img = document.createElement('img')
    img.setAttribute('data-src', 'test.jpg')
    document.body.appendChild(img)
    const cleanup = lazyLoadImage(img)
    expect(typeof cleanup).toBe('function')
    cleanup()
  })

  it('should accept array of image elements', () => {
    const img1 = document.createElement('img')
    const img2 = document.createElement('img')
    img1.setAttribute('data-src', 'test1.jpg')
    img2.setAttribute('data-src', 'test2.jpg')
    document.body.appendChild(img1)
    document.body.appendChild(img2)
    const cleanup = lazyLoadImage([img1, img2])
    expect(typeof cleanup).toBe('function')
    cleanup()
  })

  it('should accept selector string', () => {
    const img1 = document.createElement('img')
    const img2 = document.createElement('img')
    img1.className = 'lazy'
    img2.className = 'lazy'
    img1.setAttribute('data-src', 'test1.jpg')
    img2.setAttribute('data-src', 'test2.jpg')
    document.body.appendChild(img1)
    document.body.appendChild(img2)
    const cleanup = lazyLoadImage('.lazy')
    expect(typeof cleanup).toBe('function')
    cleanup()
  })

  it('should set placeholder image if provided', () => {
    const img = document.createElement('img')
    img.setAttribute('data-src', 'test.jpg')
    document.body.appendChild(img)
    const placeholder = 'placeholder.jpg'
    const cleanup = lazyLoadImage(img, { placeholder })
    expect(img.src).toContain(placeholder)
    cleanup()
  })

  it('should not override existing src with placeholder', () => {
    const img = document.createElement('img')
    img.src = 'existing.jpg'
    img.setAttribute('data-src', 'test.jpg')
    document.body.appendChild(img)
    const placeholder = 'placeholder.jpg'
    const cleanup = lazyLoadImage(img, { placeholder })
    expect(img.src).toContain('existing.jpg')
    cleanup()
  })

  it('should fallback to direct loading when IntersectionObserver is not available', () => {
    const originalIO = (global as any).IntersectionObserver
    ;(global as any).IntersectionObserver = undefined

    const img = document.createElement('img')
    img.setAttribute('data-src', 'test.jpg')
    document.body.appendChild(img)

    const onLoad = vi.fn()
    const cleanup = lazyLoadImage(img, { onLoad })
    expect(typeof cleanup).toBe('function')

    ;(global as any).IntersectionObserver = originalIO
  })
})

describe.skip('observeIntersection', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should be a function', () => {
    expect(typeof observeIntersection).toBe('function')
  })

  it('should return a cleanup function', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const callback = vi.fn()
    const cleanup = observeIntersection(el, callback)
    expect(typeof cleanup).toBe('function')
    cleanup()
  })

  it('should accept single element', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const callback = vi.fn()
    const cleanup = observeIntersection(el, callback)
    expect(typeof cleanup).toBe('function')
    cleanup()
  })

  it('should accept array of elements', () => {
    const el1 = document.createElement('div')
    const el2 = document.createElement('div')
    document.body.appendChild(el1)
    document.body.appendChild(el2)
    const callback = vi.fn()
    const cleanup = observeIntersection([el1, el2], callback)
    expect(typeof cleanup).toBe('function')
    cleanup()
  })

  it('should accept selector string', () => {
    const el1 = document.createElement('div')
    const el2 = document.createElement('div')
    el1.className = 'observe'
    el2.className = 'observe'
    document.body.appendChild(el1)
    document.body.appendChild(el2)
    const callback = vi.fn()
    const cleanup = observeIntersection('.observe', callback)
    expect(typeof cleanup).toBe('function')
    cleanup()
  })

  it('should fallback to immediate callback when IntersectionObserver is not available', () => {
    const originalIO = (global as any).IntersectionObserver
    ;(global as any).IntersectionObserver = undefined

    const el = document.createElement('div')
    document.body.appendChild(el)
    const callback = vi.fn()
    const cleanup = observeIntersection(el, callback)

    expect(callback).toHaveBeenCalled()
    expect(callback.mock.calls[0][0].isIntersecting).toBe(true)
    expect(typeof cleanup).toBe('function')

    ;(global as any).IntersectionObserver = originalIO
  })
})
