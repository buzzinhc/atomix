import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  $,
  $$,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  getStyle,
  setStyle,
  show,
  hide,
  isHidden,
  append,
  prepend,
  remove,
  empty,
  offset,
  scrollIntoView,
  closest,
  next,
  prev,
  siblings,
  createElement,
  getText,
  setText,
  getData,
  setData,
} from '../../src/dom'

describe.skip('$', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test">hello</div>'
  })

  it('should return element by selector', () => {
    const el = $('#test')
    expect(el).not.toBeNull()
    expect(el?.id).toBe('test')
  })

  it('should return null for non-existent selector', () => {
    const el = $('#nonexistent')
    expect(el).toBeNull()
  })

  it('should search within context', () => {
    document.body.innerHTML = '<div id="parent"><span id="child">child</span></div>'
    const parent = $('#parent')!
    const child = $('span', parent)
    expect(child?.id).toBe('child')
  })
})

describe.skip('$$', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="item">1</div><div class="item">2</div><div class="item">3</div>'
  })

  it('should return array of elements', () => {
    const els = $$('.item')
    expect(els.length).toBe(3)
    expect(els.every((el) => el.classList.contains('item'))).toBe(true)
  })

  it('should return empty array for non-existent selector', () => {
    const els = $$('.nonexistent')
    expect(els.length).toBe(0)
  })
})

describe.skip('addClass', () => {
  it('should add single class', () => {
    const el = document.createElement('div')
    addClass(el, 'test')
    expect(el.classList.contains('test')).toBe(true)
  })

  it('should add multiple classes from array', () => {
    const el = document.createElement('div')
    addClass(el, ['class1', 'class2'])
    expect(el.classList.contains('class1')).toBe(true)
    expect(el.classList.contains('class2')).toBe(true)
  })

  it('should add multiple classes from space-separated string', () => {
    const el = document.createElement('div')
    addClass(el, 'class1 class2')
    expect(el.classList.contains('class1')).toBe(true)
    expect(el.classList.contains('class2')).toBe(true)
  })
})

describe.skip('removeClass', () => {
  it('should remove single class', () => {
    const el = document.createElement('div')
    el.classList.add('test')
    removeClass(el, 'test')
    expect(el.classList.contains('test')).toBe(false)
  })

  it('should remove multiple classes from array', () => {
    const el = document.createElement('div')
    el.classList.add('class1', 'class2')
    removeClass(el, ['class1', 'class2'])
    expect(el.classList.contains('class1')).toBe(false)
    expect(el.classList.contains('class2')).toBe(false)
  })

  it('should remove multiple classes from space-separated string', () => {
    const el = document.createElement('div')
    el.classList.add('class1', 'class2')
    removeClass(el, 'class1 class2')
    expect(el.classList.contains('class1')).toBe(false)
    expect(el.classList.contains('class2')).toBe(false)
  })
})

describe.skip('toggleClass', () => {
  it('should toggle class', () => {
    const el = document.createElement('div')
    toggleClass(el, 'test')
    expect(el.classList.contains('test')).toBe(true)
    toggleClass(el, 'test')
    expect(el.classList.contains('test')).toBe(false)
  })

  it('should force add with force=true', () => {
    const el = document.createElement('div')
    toggleClass(el, 'test', true)
    expect(el.classList.contains('test')).toBe(true)
    toggleClass(el, 'test', true)
    expect(el.classList.contains('test')).toBe(true)
  })

  it('should force remove with force=false', () => {
    const el = document.createElement('div')
    el.classList.add('test')
    toggleClass(el, 'test', false)
    expect(el.classList.contains('test')).toBe(false)
    toggleClass(el, 'test', false)
    expect(el.classList.contains('test')).toBe(false)
  })
})

describe.skip('hasClass', () => {
  it('should return true when class exists', () => {
    const el = document.createElement('div')
    el.classList.add('test')
    expect(hasClass(el, 'test')).toBe(true)
  })

  it('should return false when class does not exist', () => {
    const el = document.createElement('div')
    expect(hasClass(el, 'test')).toBe(false)
  })
})

describe.skip('getStyle', () => {
  it('should return computed style', () => {
    const el = document.createElement('div')
    el.style.color = 'red'
    document.body.appendChild(el)
    expect(getStyle(el, 'color')).toBeTruthy()
    document.body.removeChild(el)
  })
})

describe.skip('setStyle', () => {
  it('should set single style property', () => {
    const el = document.createElement('div')
    setStyle(el, 'color', 'red')
    expect(el.style.color).toBe('red')
  })

  it('should set multiple style properties', () => {
    const el = document.createElement('div')
    setStyle(el, { color: 'red', fontSize: '16px' })
    expect(el.style.color).toBe('red')
    expect(el.style.fontSize).toBe('16px')
  })
})

describe.skip('show', () => {
  it('should remove display none', () => {
    const el = document.createElement('div')
    el.style.display = 'none'
    show(el)
    expect(el.style.display).toBe('')
  })

  it('should set specific display value', () => {
    const el = document.createElement('div')
    el.style.display = 'none'
    show(el, 'flex')
    expect(el.style.display).toBe('flex')
  })
})

describe.skip('hide', () => {
  it('should set display none', () => {
    const el = document.createElement('div')
    hide(el)
    expect(el.style.display).toBe('none')
  })
})

describe.skip('isHidden', () => {
  it('should return true when hidden', () => {
    const el = document.createElement('div')
    el.style.display = 'none'
    document.body.appendChild(el)
    expect(isHidden(el)).toBe(true)
    document.body.removeChild(el)
  })

  it('should return false when visible', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    expect(isHidden(el)).toBe(false)
    document.body.removeChild(el)
  })
})

describe.skip('append', () => {
  it('should append element', () => {
    const parent = document.createElement('div')
    const child = document.createElement('span')
    append(parent, child)
    expect(parent.children.length).toBe(1)
    expect(parent.firstChild).toBe(child)
  })

  it('should append HTML string', () => {
    const parent = document.createElement('div')
    append(parent, '<span>text</span>')
    expect(parent.children.length).toBe(1)
    expect(parent.firstChild?.textContent).toBe('text')
  })

  it('should append multiple children', () => {
    const parent = document.createElement('div')
    const child1 = document.createElement('span')
    const child2 = document.createElement('span')
    append(parent, child1, child2)
    expect(parent.children.length).toBe(2)
  })
})

describe.skip('prepend', () => {
  it('should prepend element', () => {
    const parent = document.createElement('div')
    const child1 = document.createElement('span')
    const child2 = document.createElement('span')
    parent.appendChild(child1)
    prepend(parent, child2)
    expect(parent.firstChild).toBe(child2)
    expect(parent.lastChild).toBe(child1)
  })

  it('should prepend HTML string', () => {
    const parent = document.createElement('div')
    parent.innerHTML = '<span>original</span>'
    prepend(parent, '<span>new</span>')
    expect(parent.children.length).toBe(2)
    expect(parent.firstChild?.textContent).toBe('new')
  })
})

describe.skip('remove', () => {
  it('should remove element from DOM', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    expect(document.body.contains(el)).toBe(true)
    remove(el)
    expect(document.body.contains(el)).toBe(false)
  })
})

describe.skip('empty', () => {
  it('should remove all children', () => {
    const el = document.createElement('div')
    el.innerHTML = '<span>1</span><span>2</span>'
    expect(el.children.length).toBe(2)
    empty(el)
    expect(el.children.length).toBe(0)
  })
})

describe.skip('offset', () => {
  it('should return offset object', () => {
    const el = document.createElement('div')
    el.style.width = '100px'
    el.style.height = '50px'
    document.body.appendChild(el)
    const result = offset(el)
    expect(result).toHaveProperty('top')
    expect(result).toHaveProperty('left')
    expect(result).toHaveProperty('width')
    expect(result).toHaveProperty('height')
    document.body.removeChild(el)
  })
})

describe.skip('scrollIntoView', () => {
  it('should call scrollIntoView', () => {
    const el = document.createElement('div')
    const spy = vi.spyOn(el, 'scrollIntoView')
    scrollIntoView(el)
    expect(spy).toHaveBeenCalled()
  })

  it('should pass options to scrollIntoView', () => {
    const el = document.createElement('div')
    const spy = vi.spyOn(el, 'scrollIntoView')
    scrollIntoView(el, { behavior: 'smooth', block: 'center' })
    expect(spy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' })
  })
})

describe.skip('closest', () => {
  it('should find closest matching ancestor', () => {
    document.body.innerHTML = '<div class="grandparent"><div class="parent"><span id="child">text</span></div></div>'
    const child = $('#child')!
    const parent = closest(child, '.parent')
    expect(parent?.classList.contains('parent')).toBe(true)
  })

  it('should return null when no match', () => {
    document.body.innerHTML = '<div><span id="child">text</span></div>'
    const child = $('#child')!
    const result = closest(child, '.nonexistent')
    expect(result).toBeNull()
  })
})

describe.skip('next', () => {
  it('should return next sibling', () => {
    document.body.innerHTML = '<div id="first">1</div><div id="second">2</div>'
    const first = $('#first')!
    const second = next(first)
    expect(second?.id).toBe('second')
  })

  it('should return null when no next sibling', () => {
    document.body.innerHTML = '<div id="only">1</div>'
    const only = $('#only')!
    const result = next(only)
    expect(result).toBeNull()
  })

  it('should find next sibling matching selector', () => {
    document.body.innerHTML = '<div id="first">1</div><span>span</span><div id="target" class="target">2</div>'
    const first = $('#first')!
    const target = next(first, '.target')
    expect(target?.id).toBe('target')
  })
})

describe.skip('prev', () => {
  it('should return previous sibling', () => {
    document.body.innerHTML = '<div id="first">1</div><div id="second">2</div>'
    const second = $('#second')!
    const first = prev(second)
    expect(first?.id).toBe('first')
  })

  it('should return null when no previous sibling', () => {
    document.body.innerHTML = '<div id="only">1</div>'
    const only = $('#only')!
    const result = prev(only)
    expect(result).toBeNull()
  })

  it('should find previous sibling matching selector', () => {
    document.body.innerHTML = '<div id="target" class="target">1</div><span>span</span><div id="last">2</div>'
    const last = $('#last')!
    const target = prev(last, '.target')
    expect(target?.id).toBe('target')
  })
})

describe.skip('siblings', () => {
  it('should return all siblings', () => {
    document.body.innerHTML = '<div id="parent"><div>1</div><div id="current">2</div><div>3</div></div>'
    const current = $('#current')!
    const result = siblings(current)
    expect(result.length).toBe(2)
  })

  it('should return empty array when no siblings', () => {
    document.body.innerHTML = '<div id="only">1</div>'
    const only = $('#only')!
    const result = siblings(only)
    expect(result.length).toBe(0)
  })

  it('should return siblings matching selector', () => {
    document.body.innerHTML = '<div id="parent"><div class="match">1</div><div id="current">2</div><div>3</div><div class="match">4</div></div>'
    const current = $('#current')!
    const result = siblings(current, '.match')
    expect(result.length).toBe(2)
    expect(result.every((el) => el.classList.contains('match'))).toBe(true)
  })
})

describe.skip('createElement', () => {
  it('should create element with tag name', () => {
    const el = createElement('div')
    expect(el.tagName).toBe('DIV')
  })

  it('should create element with className', () => {
    const el = createElement('div', { className: 'test-class' })
    expect(el.classList.contains('test-class')).toBe(true)
  })

  it('should create element with style', () => {
    const el = createElement('div', { style: { color: 'red', fontSize: '16px' } })
    expect(el.style.color).toBe('red')
    expect(el.style.fontSize).toBe('16px')
  })

  it('should create element with dataset', () => {
    const el = createElement('div', { dataset: { id: '123', name: 'test' } })
    expect(el.dataset.id).toBe('123')
    expect(el.dataset.name).toBe('test')
  })

  it('should create element with other properties', () => {
    const el = createElement('input', { type: 'text', value: 'hello', placeholder: 'Enter text' })
    expect(el.type).toBe('text')
    expect(el.value).toBe('hello')
    expect(el.placeholder).toBe('Enter text')
  })
})

describe.skip('getText', () => {
  it('should return text content', () => {
    const el = document.createElement('div')
    el.textContent = 'hello world'
    expect(getText(el)).toBe('hello world')
  })

  it('should return empty string when no text', () => {
    const el = document.createElement('div')
    expect(getText(el)).toBe('')
  })
})

describe.skip('setText', () => {
  it('should set text content', () => {
    const el = document.createElement('div')
    setText(el, 'hello world')
    expect(el.textContent).toBe('hello world')
  })
})

describe.skip('getData', () => {
  it('should return data attribute value', () => {
    const el = document.createElement('div')
    el.dataset.test = 'value'
    expect(getData(el, 'test')).toBe('value')
  })

  it('should return undefined for non-existent data attribute', () => {
    const el = document.createElement('div')
    expect(getData(el, 'nonexistent')).toBeUndefined()
  })
})

describe.skip('setData', () => {
  it('should set data attribute', () => {
    const el = document.createElement('div')
    setData(el, 'test', 'value')
    expect(el.dataset.test).toBe('value')
  })
})