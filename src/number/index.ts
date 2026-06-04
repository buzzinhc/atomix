export function clamp(val: number, min: number, max: number): number {
  if (val < min) return min
  if (val > max) return max
  return val
}

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomFloat(min: number, max: number, precision: number = 2): number {
  const result = Math.random() * (max - min) + min
  if (precision == null) return result
  return Number(result.toFixed(precision))
}

export function formatNumber(num: number, decimals: number = 0): string {
  const parts = num.toFixed(decimals).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export function toFixed(num: number, digits: number): number {
  return Number(num.toFixed(digits))
}

export function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0)
}

export function average(...nums: number[]): number {
  if (nums.length == 0) return 0
  return sum(...nums) / nums.length
}

export function percentage(part: number, total: number, decimals: number = 0): number {
  if (total == 0) return 0
  const result = (part / total) * 100
  if (decimals == null) return result
  return Number(result.toFixed(decimals))
}
