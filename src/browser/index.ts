export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  const debounced = function (this: any, ...args: Parameters<T>) {
    if (timer != null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
  debounced.cancel = () => {
    if (timer != null) {
      clearTimeout(timer)
      timer = null
    }
  }
  return debounced
}

export function throttle<T extends (...args: any[]) => any>(fn: T, interval: number): (...args: Parameters<T>) => void {
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null
  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = interval - (now - lastTime)
    if (remaining <= 0) {
      if (timer != null) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = now
      fn.apply(this, args)
    } else if (timer == null) {
      timer = setTimeout(() => {
        lastTime = Date.now()
        timer = null
        fn.apply(this, args)
      }, remaining)
    }
  }
  throttled.cancel = () => {
    if (timer != null) {
      clearTimeout(timer)
      timer = null
    }
  }
  return throttled
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=')
    if (cookieName == name) {
      return decodeURIComponent(cookieValue)
    }
  }
  return null
}

export function setCookie(name: string, value: string, options?: { expires?: number | Date; path?: string; domain?: string; secure?: boolean; sameSite?: 'Strict' | 'Lax' | 'None' }): void {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  if (options != null) {
    if (options.expires != null) {
      if (typeof options.expires == 'number') {
        const date = new Date()
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000)
        cookieString += `; expires=${date.toUTCString()}`
      } else {
        cookieString += `; expires=${options.expires.toUTCString()}`
      }
    }
    if (options.path != null) {
      cookieString += `; path=${options.path}`
    }
    if (options.domain != null) {
      cookieString += `; domain=${options.domain}`
    }
    if (options.secure != null) {
      cookieString += `; secure`
    }
    if (options.sameSite != null) {
      cookieString += `; samesite=${options.sameSite}`
    }
  }
  document.cookie = cookieString
}

export function removeCookie(name: string, path?: string): void {
  setCookie(name, '', { expires: new Date(0), path })
}

export function getStorage(key: string, storage?: Storage): any {
  const storageInstance = storage ?? localStorage
  const value = storageInstance.getItem(key)
  if (value == null) {
    return null
  }
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export function setStorage(key: string, value: any, storage?: Storage): void {
  const storageInstance = storage ?? localStorage
  const stringValue = JSON.stringify(value)
  storageInstance.setItem(key, stringValue)
}

export function removeStorage(key: string, storage?: Storage): void {
  const storageInstance = storage ?? localStorage
  storageInstance.removeItem(key)
}

export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard != null) {
    await navigator.clipboard.writeText(text)
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-9999px'
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.scrollX ?? window.pageXOffset ?? document.documentElement.scrollLeft ?? 0,
    y: window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0,
  }
}

export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function getBrowserInfo(): { name: string; version: string } {
  const userAgent = navigator.userAgent
  let name = 'Unknown'
  let version = 'Unknown'
  if (userAgent.includes('Firefox')) {
    name = 'Firefox'
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/)
    if (match != null) {
      version = match[1]
    }
  } else if (userAgent.includes('Edg')) {
    name = 'Edge'
    const match = userAgent.match(/Edg\/(\d+\.\d+)/)
    if (match != null) {
      version = match[1]
    }
  } else if (userAgent.includes('Chrome')) {
    name = 'Chrome'
    const match = userAgent.match(/Chrome\/(\d+\.\d+)/)
    if (match != null) {
      version = match[1]
    }
  } else if (userAgent.includes('Safari')) {
    name = 'Safari'
    const match = userAgent.match(/Version\/(\d+\.\d+)/)
    if (match != null) {
      version = match[1]
    }
  }
  return { name, version }
}

export interface LazyLoadOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  placeholder?: string
  errorImage?: string
  srcAttr?: string
  srcsetAttr?: string
  onLoad?: (img: HTMLImageElement) => void
  onError?: (img: HTMLImageElement) => void
}

export function lazyLoadImage(
  images: HTMLImageElement | HTMLImageElement[] | string,
  options: LazyLoadOptions = {}
): () => void {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0.1,
    placeholder = '',
    errorImage = '',
    srcAttr = 'data-src',
    srcsetAttr = 'data-srcset',
    onLoad,
    onError,
  } = options

  let imageElements: HTMLImageElement[] = []

  if (typeof images === 'string') {
    imageElements = Array.from(document.querySelectorAll(images)) as HTMLImageElement[]
  } else if (images instanceof HTMLImageElement) {
    imageElements = [images]
  } else {
    imageElements = Array.from(images)
  }

  if (placeholder) {
    imageElements.forEach((img) => {
      if (!img.src && !img.getAttribute('src')) {
        img.src = placeholder
      }
    })
  }

  if (typeof IntersectionObserver === 'undefined') {
    imageElements.forEach((img) => {
      loadImage(img, srcAttr, srcsetAttr, onLoad, onError, errorImage)
    })
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          loadImage(img, srcAttr, srcsetAttr, onLoad, onError, errorImage)
          observer.unobserve(img)
        }
      })
    },
    { root, rootMargin, threshold }
  )

  imageElements.forEach((img) => {
    observer.observe(img)
  })

  return () => {
    observer.disconnect()
  }
}

function loadImage(
  img: HTMLImageElement,
  srcAttr: string,
  srcsetAttr: string,
  onLoad?: (img: HTMLImageElement) => void,
  onError?: (img: HTMLImageElement) => void,
  errorImage?: string
): void {
  const src = img.getAttribute(srcAttr)
  const srcset = img.getAttribute(srcsetAttr)

  if (!src && !srcset) return

  const tempImg = new Image()

  tempImg.onload = () => {
    if (src) img.src = src
    if (srcset) img.srcset = srcset
    img.removeAttribute(srcAttr)
    img.removeAttribute(srcsetAttr)
    onLoad?.(img)
  }

  tempImg.onerror = () => {
    if (errorImage) {
      img.src = errorImage
    }
    onError?.(img)
  }

  if (src) tempImg.src = src
  if (srcset) tempImg.srcset = srcset
}

export function observeIntersection(
  target: Element | Element[] | string,
  callback: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void,
  options?: IntersectionObserverInit
): () => void {
  let elements: Element[] = []

  if (typeof target === 'string') {
    elements = Array.from(document.querySelectorAll(target))
  } else if (target instanceof Element) {
    elements = [target]
  } else {
    elements = Array.from(target)
  }

  if (typeof IntersectionObserver === 'undefined') {
    elements.forEach((el) => {
      callback({ isIntersecting: true, target: el } as IntersectionObserverEntry, {} as IntersectionObserver)
    })
    return () => {}
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      callback(entry, obs)
    })
  }, options)

  elements.forEach((el) => {
    observer.observe(el)
  })

  return () => {
    observer.disconnect()
  }
}