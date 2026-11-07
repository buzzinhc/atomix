import { describe, it, expect, vi } from 'vitest'
import { EventEmitter, eventBus, createEmitter, createOnceEmitter } from '../../src/event'

describe('EventEmitter', () => {
  it('should register and trigger listeners with on', () => {
    const emitter = new EventEmitter()
    const fn = vi.fn()

    emitter.on('test', fn)
    emitter.emit('test', 'hello')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('hello')
  })

  it('should support unsubscribing via returned function', () => {
    const emitter = new EventEmitter()
    const fn = vi.fn()

    const unsubscribe = emitter.on('test', fn)
    emitter.emit('test', '1')
    unsubscribe()
    emitter.emit('test', '2')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('1')
  })

  it('should support once listeners', () => {
    const emitter = new EventEmitter()
    const fn = vi.fn()

    emitter.once('test', fn)
    emitter.emit('test', 'first')
    emitter.emit('test', 'second')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('first')
  })

  it('should support unsubscribing once listeners', () => {
    const emitter = new EventEmitter()
    const fn = vi.fn()

    const unsubscribe = emitter.once('test', fn)
    unsubscribe()
    emitter.emit('test', 'first')

    expect(fn).not.toHaveBeenCalled()
  })

  it('should remove listener with off', () => {
    const emitter = new EventEmitter()
    const fn1 = vi.fn()
    const fn2 = vi.fn()

    emitter.on('test', fn1)
    emitter.on('test', fn2)
    emitter.off('test', fn1)
    emitter.emit('test', 'data')

    expect(fn1).not.toHaveBeenCalled()
    expect(fn2).toHaveBeenCalledWith('data')
  })

  it('should remove once listener with off', () => {
    const emitter = new EventEmitter()
    const fn = vi.fn()

    emitter.once('test', fn)
    emitter.off('test', fn)
    emitter.emit('test', 'data')

    expect(fn).not.toHaveBeenCalled()
  })

  it('should handle clearing specific event or all events', () => {
    const emitter = new EventEmitter()
    const fn1 = vi.fn()
    const fn2 = vi.fn()

    emitter.on('event1', fn1)
    emitter.on('event2', fn2)
    emitter.clear('event1')

    emitter.emit('event1', 1)
    emitter.emit('event2', 2)
    expect(fn1).not.toHaveBeenCalled()
    expect(fn2).toHaveBeenCalledWith(2)

    emitter.clear()
    emitter.emit('event2', 3)
    expect(fn2).toHaveBeenCalledTimes(1)
  })

  it('should count listeners correctly', () => {
    const emitter = new EventEmitter()
    const fn1 = () => {}
    const fn2 = () => {}

    expect(emitter.listenerCount('evt')).toBe(0)
    emitter.on('evt', fn1)
    emitter.once('evt', fn2)
    expect(emitter.listenerCount('evt')).toBe(2)
  })

  it('should list event names and listeners', () => {
    const emitter = new EventEmitter()
    const fn1 = () => {}
    const fn2 = () => {}

    emitter.on('a', fn1)
    emitter.once('b', fn2)

    expect(emitter.eventNames()).toEqual(expect.arrayContaining(['a', 'b']))
    expect(emitter.listeners('a')).toEqual([fn1])
    expect(emitter.listeners('b')).toEqual([fn2])
    expect(emitter.listeners('nonexistent')).toEqual([])
  })
})

describe('eventBus', () => {
  it('should be a shared EventEmitter instance', () => {
    expect(eventBus).toBeInstanceOf(EventEmitter)
  })
})

describe('createEmitter', () => {
  it('should create typed emitter wrapper', () => {
    interface Events {
      login: { user: string }
      logout: void
    }

    const emitter = createEmitter<Events>()
    const fn = vi.fn()

    const unsub = emitter.on('login', fn)
    emitter.emit('login', { user: 'Alice' })
    expect(fn).toHaveBeenCalledWith({ user: 'Alice' })

    unsub()
    emitter.emit('login', { user: 'Bob' })
    expect(fn).toHaveBeenCalledTimes(1)

    const onceFn = vi.fn()
    emitter.once('logout', onceFn)
    emitter.emit('logout', undefined as any)
    emitter.emit('logout', undefined as any)
    expect(onceFn).toHaveBeenCalledTimes(1)

    const offFn = vi.fn()
    emitter.on('logout', offFn)
    emitter.off('logout', offFn)
    emitter.emit('logout', undefined as any)
    expect(offFn).not.toHaveBeenCalled()
  })
})

describe('createOnceEmitter', () => {
  it('should emit only once to existing listeners', () => {
    const onceEmitter = createOnceEmitter<string>()
    const fn = vi.fn()

    const unsub = onceEmitter.on(fn)
    expect(onceEmitter.fired).toBe(false)

    onceEmitter.emit('ready')
    onceEmitter.emit('second')

    expect(onceEmitter.fired).toBe(true)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('ready')

    unsub()
  })

  it('should immediately call handlers registered after fired', () => {
    const onceEmitter = createOnceEmitter<number>()
    onceEmitter.emit(42)

    const lateFn = vi.fn()
    const unsub = onceEmitter.on(lateFn)

    expect(lateFn).toHaveBeenCalledWith(42)
    unsub()
  })

  it('should allow unsubscribing before emit', () => {
    const onceEmitter = createOnceEmitter<string>()
    const fn = vi.fn()

    const unsub = onceEmitter.on(fn)
    unsub()
    onceEmitter.emit('hello')

    expect(fn).not.toHaveBeenCalled()
  })
})
