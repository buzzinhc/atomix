export function parseQuery(str: string): Record<string, string> {
  const result: Record<string, string> = {}
  const query = str.startsWith('?') ? str.slice(1) : str
  if (!query) return result
  const pairs = query.split('&')
  for (const pair of pairs) {
    const eqIdx = pair.indexOf('=')
    const key = eqIdx == -1 ? pair : pair.slice(0, eqIdx)
    const value = eqIdx == -1 ? undefined : pair.slice(eqIdx + 1)
    if (key) {
      result[decodeURIComponent(key)] = value == undefined ? '' : decodeURIComponent(value)
    }
  }
  return result
}

export function stringifyQuery(obj: Record<string, any>): string {
  const parts: string[] = []
  for (const key in obj) {
    if (obj[key] == undefined || obj[key] == null) continue
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(obj[key]))}`)
  }
  return parts.join('&')
}

export function addQuery(url: string, params: Record<string, any>): string {
  const queryString = stringifyQuery(params)
  if (!queryString) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${queryString}`
}

export function removeQuery(url: string, keys: string[]): string {
  const questionIdx = url.indexOf('?')
  if (questionIdx == -1) return url
  const base = url.slice(0, questionIdx)
  const hashIdx = url.indexOf('#', questionIdx)
  const queryStr = url.slice(questionIdx + 1, hashIdx == -1 ? undefined : hashIdx)
  const hashStr = hashIdx == -1 ? '' : url.slice(hashIdx)
  const params = parseQuery(queryStr)
  for (const key of keys) {
    delete params[key]
  }
  const newQuery = stringifyQuery(params)
  if (!newQuery) return `${base}${hashStr}`
  return `${base}?${newQuery}${hashStr}`
}

export interface ParsedUrl {
  protocol: string
  host: string
  port: string
  path: string
  query: string
  hash: string
}

export function parseUrl(url: string): ParsedUrl {
  const result: ParsedUrl = { protocol: '', host: '', port: '', path: '', query: '', hash: '' }
  const hashIdx = url.indexOf('#')
  if (hashIdx != -1) {
    result.hash = url.slice(hashIdx + 1)
    url = url.slice(0, hashIdx)
  }
  const queryIdx = url.indexOf('?')
  if (queryIdx != -1) {
    result.query = url.slice(queryIdx + 1)
    url = url.slice(0, queryIdx)
  }
  const protocolIdx = url.indexOf('://')
  if (protocolIdx != -1) {
    result.protocol = url.slice(0, protocolIdx)
    url = url.slice(protocolIdx + 3)
    const slashIdx = url.indexOf('/')
    const hostPart = slashIdx == -1 ? url : url.slice(0, slashIdx)
    const pathPart = slashIdx == -1 ? '' : url.slice(slashIdx)
    const colonIdx = hostPart.indexOf(':')
    if (colonIdx != -1) {
      result.host = hostPart.slice(0, colonIdx)
      result.port = hostPart.slice(colonIdx + 1)
    } else {
      result.host = hostPart
    }
    result.path = pathPart
  } else {
    result.path = url
  }
  return result
}

export function isAbsoluteUrl(url: string): boolean {
  return /^[a-z][a-z\d+\-.]*:/i.test(url) || url.startsWith('//')
}
