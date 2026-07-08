export function $(selector: string, context: Element | Document = document): HTMLElement | null {
  return context.querySelector(selector)
}

export function $$(selector: string, context: Element | Document = document): HTMLElement[] {
  return Array.from(context.querySelectorAll(selector))
}

export function addClass(element: HTMLElement, className: string | string[]): void {
  const classes = Array.isArray(className) ? className : className.split(' ')
  element.classList.add(...classes.filter(Boolean))
}

export function removeClass(element: HTMLElement, className: string | string[]): void {
  const classes = Array.isArray(className) ? className : className.split(' ')
  element.classList.remove(...classes.filter(Boolean))
}

export function toggleClass(element: HTMLElement, className: string, force?: boolean): void {
  element.classList.toggle(className, force)
}

export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className)
}

export function getStyle(element: HTMLElement, property: string): string {
  return window.getComputedStyle(element).getPropertyValue(property)
}

export function setStyle(element: HTMLElement, property: string | Record<string, string>, value?: string): void {
  if (typeof property === 'string' && value != null) {
    element.style.setProperty(property, value)
  } else if (typeof property === 'object') {
    for (const [key, val] of Object.entries(property)) {
      element.style.setProperty(key, val)
    }
  }
}

export function show(element: HTMLElement, display?: string): void {
  element.style.display = display ?? ''
}

export function hide(element: HTMLElement): void {
  element.style.display = 'none'
}

export function isHidden(element: HTMLElement): boolean {
  return getStyle(element, 'display') === 'none'
}

export function append(element: HTMLElement, ...children: Array<HTMLElement | string>): void {
  children.forEach((child) => {
    if (typeof child === 'string') {
      element.insertAdjacentHTML('beforeend', child)
    } else {
      element.appendChild(child)
    }
  })
}

export function prepend(element: HTMLElement, ...children: Array<HTMLElement | string>): void {
  children.forEach((child) => {
    if (typeof child === 'string') {
      element.insertAdjacentHTML('afterbegin', child)
    } else {
      element.insertBefore(child, element.firstChild)
    }
  })
}

export function remove(element: HTMLElement): void {
  element.remove()
}

export function empty(element: HTMLElement): void {
  element.innerHTML = ''
}

export function offset(element: HTMLElement): { top: number; left: number; width: number; height: number } {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  }
}

export function scrollIntoView(element: HTMLElement, options?: ScrollIntoViewOptions): void {
  element.scrollIntoView(options)
}

export function closest(element: HTMLElement, selector: string): HTMLElement | null {
  return element.closest(selector)
}

export function next(element: HTMLElement, selector?: string): HTMLElement | null {
  let nextEl = element.nextElementSibling as HTMLElement | null
  if (selector) {
    while (nextEl && !nextEl.matches(selector)) {
      nextEl = nextEl.nextElementSibling as HTMLElement | null
    }
  }
  return nextEl
}

export function prev(element: HTMLElement, selector?: string): HTMLElement | null {
  let prevEl = element.previousElementSibling as HTMLElement | null
  if (selector) {
    while (prevEl && !prevEl.matches(selector)) {
      prevEl = prevEl.previousElementSibling as HTMLElement | null
    }
  }
  return prevEl
}

export function siblings(element: HTMLElement, selector?: string): HTMLElement[] {
  const siblings: HTMLElement[] = []
  const parent = element.parentElement
  if (!parent) return siblings

  const children = parent.children
  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement
    if (child !== element && (!selector || child.matches(selector))) {
      siblings.push(child)
    }
  }
  return siblings
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: Partial<HTMLElementTagNameMap[K]> & { className?: string; style?: Record<string, string>; dataset?: Record<string, string> }
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName)

  if (options != null) {
    const { className, style, dataset, ...rest } = options

    if (className) {
      addClass(element, className)
    }

    if (style) {
      setStyle(element, style)
    }

    if (dataset) {
      for (const [key, value] of Object.entries(dataset)) {
        element.dataset[key] = value
      }
    }

    for (const [key, value] of Object.entries(rest) as Array<[keyof HTMLElementTagNameMap[K], unknown]>) {
      if (value != null) {
        ;(element as any)[key] = value
      }
    }
  }

  return element
}

export function getText(element: HTMLElement): string {
  return element.textContent || ''
}

export function setText(element: HTMLElement, text: string): void {
  element.textContent = text
}

export function getData(element: HTMLElement, key: string): string | undefined {
  return element.dataset[key]
}

export function setData(element: HTMLElement, key: string, value: string): void {
  element.dataset[key] = value
}