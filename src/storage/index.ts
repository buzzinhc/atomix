interface StorageData<T = unknown> {
  value: T
  expire?: number
}

function isExpired(data: StorageData): boolean {
  if (data.expire === undefined) return false
  return Date.now() > data.expire
}

function serialize<T>(value: T, expire?: number): string {
  const data: StorageData<T> = { value, expire }
  return JSON.stringify(data)
}

function deserialize<T>(str: string): T | null {
  try {
    const data = JSON.parse(str) as StorageData<T>
    if (isExpired(data)) return null
    return data.value
  } catch {
    return null
  }
}

class Storage {
  private type: 'local' | 'session'
  private instance: globalThis.Storage | null = null

  constructor(type: 'local' | 'session') {
    this.type = type
  }

  private get storage(): globalThis.Storage {
    if (this.instance === null) {
      const storage = this.type === 'local' ? globalThis.localStorage : globalThis.sessionStorage
      if (storage == null) {
        throw new Error(`atomix-fe storage: ${this.type}Storage is not available in this environment`)
      }
      this.instance = storage
    }
    return this.instance
  }

  set<T>(key: string, value: T, expire?: number): void {
    const expireTime = expire ? Date.now() + expire * 1000 : undefined
    this.storage.setItem(key, serialize(value, expireTime))
  }

  get<T>(key: string): T | null {
    const str = this.storage.getItem(key)
    if (str === null) return null
    return deserialize<T>(str)
  }

  has(key: string): boolean {
    return this.storage.getItem(key) !== null
  }

  remove(key: string): void {
    this.storage.removeItem(key)
  }

  clear(): void {
    this.storage.clear()
  }

  keys(): string[] {
    return Object.keys(this.storage)
  }

  size(): number {
    return this.storage.length
  }
}

export const localStore = new Storage('local')
export const sessionStore = new Storage('session')

export function createStorage(type: 'local' | 'session'): Storage {
  return new Storage(type)
}

export function getStorageSize(): { local: number; session: number } {
  return {
    local: localStore.size(),
    session: sessionStore.size()
  }
}

export function clearAllStorage(): { local: number; session: number } {
  const localSize = localStore.size()
  const sessionSize = sessionStore.size()
  localStore.clear()
  sessionStore.clear()
  return { local: localSize, session: sessionSize }
}

export { Storage }