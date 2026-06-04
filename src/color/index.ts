export interface RGB {
  r: number
  g: number
  b: number
}

export interface RGBA extends RGB {
  a: number
}

export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('').toUpperCase()
}

export function hexToRgba(hex: string): RGBA | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex)
  if (!result) return null
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: result[4] ? parseInt(result[4], 16) / 255 : 1
  }
}

export function rgbaToHex(r: number, g: number, b: number, a: number = 1): string {
  if (a >= 1) return rgbToHex(r, g, b)
  return '#' + [r, g, b, Math.round(a * 255)].map(x => {
    const hex = Math.round(x).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('').toUpperCase()
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  return rgbToHsl(rgb.r, rgb.g, rgb.b)
}

export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

export function rgbToString(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`
}

export function rgbaToString(r: number, g: number, b: number, a: number = 1): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function hslToString(h: number, s: number, l: number): string {
  return `hsl(${h}, ${s}%, ${l}%)`
}

export function hslaToString(h: number, s: number, l: number, a: number = 1): string {
  return `hsla(${h}, ${s}%, ${l}%, ${a})`
}

export function parseColor(color: string): RGBA | null {
  const hexMatch = /^#([a-f\d]{3,8})$/i.exec(color)
  if (hexMatch) {
    const hex = hexMatch[1]
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
        a: 1
      }
    }
    if (hex.length === 4) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
        a: parseInt(hex[3] + hex[3], 16) / 255
      }
    }
    if (hex.length === 6) {
      return { ...hexToRgb(color)!, a: 1 }
    }
    if (hex.length === 8) {
      return hexToRgba(color)
    }
  }

  const rgbMatch = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i.exec(color)
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3]),
      a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1
    }
  }

  const hslMatch = /^hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([\d.]+)\s*)?\)$/i.exec(color)
  if (hslMatch) {
    const rgb = hslToRgb(
      parseInt(hslMatch[1]),
      parseInt(hslMatch[2]),
      parseInt(hslMatch[3])
    )
    return { ...rgb, a: hslMatch[4] ? parseFloat(hslMatch[4]) : 1 }
  }

  return null
}

export function lighten(color: string, percent: number): string | null {
  const rgba = parseColor(color)
  if (!rgba) return null
  const hsl = rgbToHsl(rgba.r, rgba.g, rgba.b)
  hsl.l = Math.min(100, hsl.l + percent)
  const rgb = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgba.a < 1 ? rgbaToHex(rgb.r, rgb.g, rgb.b, rgba.a) : rgbToHex(rgb.r, rgb.g, rgb.b)
}

export function darken(color: string, percent: number): string | null {
  const rgba = parseColor(color)
  if (!rgba) return null
  const hsl = rgbToHsl(rgba.r, rgba.g, rgba.b)
  hsl.l = Math.max(0, hsl.l - percent)
  const rgb = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgba.a < 1 ? rgbaToHex(rgb.r, rgb.g, rgb.b, rgba.a) : rgbToHex(rgb.r, rgb.g, rgb.b)
}

export function saturate(color: string, percent: number): string | null {
  const rgba = parseColor(color)
  if (!rgba) return null
  const hsl = rgbToHsl(rgba.r, rgba.g, rgba.b)
  hsl.s = Math.min(100, hsl.s + percent)
  const rgb = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgba.a < 1 ? rgbaToHex(rgb.r, rgb.g, rgb.b, rgba.a) : rgbToHex(rgb.r, rgb.g, rgb.b)
}

export function desaturate(color: string, percent: number): string | null {
  const rgba = parseColor(color)
  if (!rgba) return null
  const hsl = rgbToHsl(rgba.r, rgba.g, rgba.b)
  hsl.s = Math.max(0, hsl.s - percent)
  const rgb = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgba.a < 1 ? rgbaToHex(rgb.r, rgb.g, rgb.b, rgba.a) : rgbToHex(rgb.r, rgb.g, rgb.b)
}

export function invert(color: string): string | null {
  const rgba = parseColor(color)
  if (!rgba) return null
  return rgba.a < 1
    ? rgbaToHex(255 - rgba.r, 255 - rgba.g, 255 - rgba.b, rgba.a)
    : rgbToHex(255 - rgba.r, 255 - rgba.g, 255 - rgba.b)
}

export function grayscale(color: string): string | null {
  const rgba = parseColor(color)
  if (!rgba) return null
  const avg = Math.round((rgba.r * 0.299 + rgba.g * 0.587 + rgba.b * 0.114))
  return rgba.a < 1
    ? rgbaToHex(avg, avg, avg, rgba.a)
    : rgbToHex(avg, avg, avg)
}

export function alpha(color: string, alphaValue: number): string | null {
  const rgba = parseColor(color)
  if (!rgba) return null
  return rgbaToHex(rgba.r, rgba.g, rgba.b, Math.max(0, Math.min(1, alphaValue)))
}

export function mix(color1: string, color2: string, weight: number = 0.5): string | null {
  const c1 = parseColor(color1)
  const c2 = parseColor(color2)
  if (!c1 || !c2) return null

  const w = Math.max(0, Math.min(1, weight))
  const r = Math.round(c1.r * (1 - w) + c2.r * w)
  const g = Math.round(c1.g * (1 - w) + c2.g * w)
  const b = Math.round(c1.b * (1 - w) + c2.b * w)
  const a = c1.a * (1 - w) + c2.a * w

  return a < 1 ? rgbaToHex(r, g, b, a) : rgbToHex(r, g, b)
}

export function randomHex(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
}

export function randomRgb(): RGB {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  }
}

export function randomRgba(): RGBA {
  return {
    ...randomRgb(),
    a: Math.random()
  }
}

export function isValidHex(hex: string): boolean {
  return /^#([a-f\d]{3}){1,2}$/i.test(hex) || /^#([a-f\d]{4}){1,2}$/i.test(hex)
}

export function isValidRgb(rgb: string): boolean {
  return /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/i.test(rgb)
}

export function isValidHsl(hsl: string): boolean {
  return /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)$/i.test(hsl)
}

export function isValidColor(color: string): boolean {
  return isValidHex(color) || isValidRgb(color) || isValidHsl(color)
}
