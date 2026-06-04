export function radian(degree: number): number {
  return (degree * Math.PI) / 180
}

export function degree(radian: number): number {
  return (radian * 180) / Math.PI
}

export function sin(degree: number): number {
  return Math.sin(radian(degree))
}

export function cos(degree: number): number {
  return Math.cos(radian(degree))
}

export function tan(degree: number): number {
  return Math.tan(radian(degree))
}

export function asin(value: number): number {
  return degree(Math.asin(value))
}

export function acos(value: number): number {
  return degree(Math.acos(value))
}

export function atan(value: number): number {
  return degree(Math.atan(value))
}

export function atan2(y: number, x: number): number {
  return degree(Math.atan2(y, x))
}

export function pow(base: number, exponent: number): number {
  return Math.pow(base, exponent)
}

export function sqrt(num: number): number {
  return Math.sqrt(num)
}

export function cbrt(num: number): number {
  return Math.cbrt(num)
}

export function abs(num: number): number {
  return Math.abs(num)
}

export function floor(num: number): number {
  return Math.floor(num)
}

export function ceil(num: number): number {
  return Math.ceil(num)
}

export function round(num: number): number {
  return Math.round(num)
}

export function trunc(num: number): number {
  return Math.trunc(num)
}

export function sign(num: number): number {
  return Math.sign(num)
}

export function mod(a: number, b: number): number {
  return ((a % b) + b) % b
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return Math.abs(a * b) / gcd(a, b)
}

export function factorial(n: number): number {
  if (n < 0) return NaN
  if (n === 0 || n === 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

export function fibonacci(n: number): number {
  if (n <= 0) return 0
  if (n === 1) return 1
  let a = 0, b = 1
  for (let i = 2; i <= n; i++) {
    const temp = a + b
    a = b
    b = temp
  }
  return b
}

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

export function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min)
}

export function map(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number {
  return lerp(toMin, toMax, normalize(value, fromMin, fromMax))
}

export function easeIn(t: number): number {
  return t * t
}

export function easeOut(t: number): number {
  return t * (2 - t)
}

export function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export function isPowerOfTwo(num: number): boolean {
  return num > 0 && (num & (num - 1)) === 0
}

export function nearestPowerOfTwo(num: number): number {
  if (num <= 0) return 1
  const log2 = Math.log2(num)
  const floor = Math.floor(log2)
  const ceil = floor + 1
  const floorVal = Math.pow(2, floor)
  const ceilVal = Math.pow(2, ceil)
  return num - floorVal <= ceilVal - num ? floorVal : ceilVal
}
