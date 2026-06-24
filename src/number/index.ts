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

export interface FormatCurrencyOptions {
  symbol?: string      // 货币符号，默认 '¥'
  decimals?: number     // 小数位数，默认 2
  separator?: string   // 千分位分隔符，默认 ','
  decimalPoint?: string // 小数点，默认 '.'
  precision?: 'min' | 'max' | number // 精度模式或固定小数位
}

const defaultCurrencyOptions: FormatCurrencyOptions = {
  symbol: '¥',
  decimals: 2,
  separator: ',',
  decimalPoint: '.',
  precision: 'max'
}

function getDecimals(num: number, mode: 'min' | 'max' | number, explicitDecimals?: number): number {
  if (typeof mode === 'number') {
    return mode
  }
  if (mode === 'min') {
    return num % 1 === 0 ? 0 : 2
  }
  // 'max' mode
  if (explicitDecimals !== undefined) {
    return explicitDecimals
  }
  const actualDecimals = num.toString().split('.')[1]?.length ?? 0
  return Math.max(actualDecimals, 2)
}

export function formatCurrency(amount: number, options: FormatCurrencyOptions = {}): string {
  const { decimals: explicitDecimals, ...restOptions } = options
  const opts = { ...defaultCurrencyOptions, ...restOptions }

  const decimals = explicitDecimals !== undefined
    ? explicitDecimals
    : (typeof opts.precision === 'number'
        ? opts.precision
        : opts.precision === 'min'
          ? (amount % 1 === 0 ? 0 : 2)
          : Math.max(amount.toString().split('.')[1]?.length ?? 0, opts.decimals))

  const fixedAmount = Number(amount.toFixed(decimals))
  const parts = fixedAmount.toFixed(decimals).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, opts.separator)

  const integerPart = parts[0]
  const decimalPart = decimals > 0 ? opts.decimalPoint + parts[1] : ''

  return opts.symbol + integerPart + decimalPart
}
