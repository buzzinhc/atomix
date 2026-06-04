export function capitalize(str: string): string {
  if (str.length === 0) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function camelCase(str: string): string {
  const words = str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_\s]+/g, ' ')
    .trim()
    .toLowerCase()
    .split(/\s+/)

  if (words.length === 0) return ''
  return words[0] + words.slice(1).map(w => capitalize(w)).join('')
}

export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '')
}

export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '')
}

export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str
  return str.slice(0, length) + suffix
}

export function trim(str: string, chars?: string): string {
  if (chars == undefined) return str.trim()
  const pattern = new RegExp(`^[${escapeRegExpChars(chars)}]+|[${escapeRegExpChars(chars)}]+$`, 'g')
  return str.replace(pattern, '')
}

function escapeRegExpChars(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function repeat(str: string, count: number): string {
  if (count < 0) return ''
  return str.repeat(count)
}

export function padStart(str: string, length: number, char: string = ' '): string {
  if (str.length >= length) return str
  const padLen = length - str.length
  const padStr = char.repeat(Math.ceil(padLen / char.length)).slice(0, padLen)
  return padStr + str
}

export function padEnd(str: string, length: number, char: string = ' '): string {
  if (str.length >= length) return str
  const padLen = length - str.length
  const padStr = char.repeat(Math.ceil(padLen / char.length)).slice(0, padLen)
  return str + padStr
}

export function escapeHtml(str: string): string {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return str.replace(/[&<>"']/g, char => escapeMap[char])
}

export function unescapeHtml(str: string): string {
  const unescapeMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }
  return str.replace(/&(amp|lt|gt|quot|#39);/g, entity => unescapeMap[entity])
}

export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
