type EventHandler<T = unknown> = (data: T) => void

interface Listener<T = unknown> {
  handler: EventHandler<T>
  once: boolean
}

export class EventEmitter {
  private events: Map<string, Listener[]>
  private onceEvents: Map<string, Listener[]>

  constructor() {
    this.events = new Map()
    this.onceEvents = new Map()
  }

  on<T = unknown>(event: string, handler: EventHandler<T>): () => void {
    const listeners = this.events.get(event) || []
    listeners.push({ handler: handler as EventHandler, once: false })
    this.events.set(event, listeners)
    return () => this.off(event, handler)
  }

  once<T = unknown>(event: string, handler: EventHandler<T>): () => void {
    const listeners = this.onceEvents.get(event) || []
    listeners.push({ handler: handler as EventHandler, once: true })
    this.onceEvents.set(event, listeners)
    return () => this.off(event, handler)
  }

  off<T = unknown>(event: string, handler: EventHandler<T>): void {
    const listeners = this.events.get(event) || []
    const filtered = listeners.filter(l => l.handler !== handler)
    if (filtered.length > 0) {
      this.events.set(event, filtered)
    } else {
      this.events.delete(event)
    }

    const onceListeners = this.onceEvents.get(event) || []
    const onceFiltered = onceListeners.filter(l => l.handler !== handler)
    if (onceFiltered.length > 0) {
      this.onceEvents.set(event, onceFiltered)
    } else {
      this.onceEvents.delete(event)
    }
  }

  emit<T = unknown>(event: string, data?: T): void {
    const listeners = this.events.get(event) || []
    listeners.forEach(listener => listener.handler(data))

    const onceListeners = this.onceEvents.get(event) || []
    onceListeners.forEach(listener => listener.handler(data))
    this.onceEvents.delete(event)
  }

  clear(event?: string): void {
    if (event) {
      this.events.delete(event)
      this.onceEvents.delete(event)
    } else {
      this.events.clear()
      this.onceEvents.clear()
    }
  }

  listenerCount(event: string): number {
    const regular = this.events.get(event)?.length || 0
    const once = this.onceEvents.get(event)?.length || 0
    return regular + once
  }

  eventNames(): string[] {
    const regularEvents = Array.from(this.events.keys())
    const onceEventsList = Array.from(this.onceEvents.keys())
    return [...new Set([...regularEvents, ...onceEventsList])]
  }

  listeners<T = unknown>(event: string): EventHandler<T>[] {
    const regular = this.events.get(event)?.map(l => l.handler as EventHandler<T>) || []
    const once = this.onceEvents.get(event)?.map(l => l.handler as EventHandler<T>) || []
    return [...regular, ...once]
  }
}

export const eventBus = new EventEmitter()

export function createEmitter<T extends Record<string, unknown>>(): {
  on<K extends keyof T>(event: K, handler: EventHandler<T[K]>): () => void
  once<K extends keyof T>(event: K, handler: EventHandler<T[K]>): () => void
  off<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void
  emit<K extends keyof T>(event: K, data: T[K]): void
} {
  const emitter = new EventEmitter()
  return {
    on: (event: keyof T, handler: EventHandler<any>) => emitter.on(event as string, handler),
    once: (event: keyof T, handler: EventHandler<any>) => emitter.once(event as string, handler),
    off: (event: keyof T, handler: EventHandler<any>) => emitter.off(event as string, handler),
    emit: (event: keyof T, data: any) => emitter.emit(event as string, data)
  }
}

export function createOnceEmitter<T>(): {
  on(handler: EventHandler<T>): () => void
  emit(data: T): void
  fired: boolean
} {
  let fired = false
  const handlers: Array<EventHandler<T>> = []

  return {
    on(handler: EventHandler<T>) {
      if (fired) {
        handler(undefined as T)
        return () => {}
      }
      handlers.push(handler)
      return () => {
        const index = handlers.indexOf(handler)
        if (index > -1) handlers.splice(index, 1)
      }
    },
    emit(data: T) {
      if (fired) return
      fired = true
      handlers.forEach(handler => handler(data))
      handlers.length = 0
    },
    get fired() {
      return fired
    }
  }
}
