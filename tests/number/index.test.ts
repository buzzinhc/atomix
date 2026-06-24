import { describe, it, expect } from 'vitest'
import { clamp, random, randomFloat, formatNumber, toFixed, sum, average, percentage, formatCurrency } from '../../src/number'

describe('clamp', () => {
  it('should return val when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it('should return min when val is less than min', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('should return max when val is greater than max', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('should handle edge cases', () => {
    expect(clamp(0, 0, 10)).toBe(0)
    expect(clamp(10, 0, 10)).toBe(10)
  })
})

describe('random', () => {
  it('should return integer within range', () => {
    for (let i = 0; i < 100; i++) {
      const result = random(5, 10)
      expect(result).toBeGreaterThanOrEqual(5)
      expect(result).toBeLessThanOrEqual(10)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should include both min and max', () => {
    const results = new Set<number>()
    for (let i = 0; i < 100; i++) {
      results.add(random(1, 1))
    }
    expect(results.size).toBe(1)
    expect(results.has(1)).toBe(true)
  })
})

describe('randomFloat', () => {
  it('should return float within range', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomFloat(1.5, 10.5)
      expect(result).toBeGreaterThanOrEqual(1.5)
      expect(result).toBeLessThanOrEqual(10.5)
    }
  })

  it('should respect precision', () => {
    const result = randomFloat(0, 100, 2)
    const decimal = result.toString().split('.')[1]
    expect(decimal.length).toBe(2)
  })

  it('should default to 2 decimal places', () => {
    const result = randomFloat(0.5, 0.6)
    const str = result.toFixed(2)
    expect(str.split('.')[1].length).toBe(2)
  })
})

describe('formatNumber', () => {
  it('should format number with thousand separators', () => {
    expect(formatNumber(1234567)).toBe('1,234,567')
    expect(formatNumber(1234567, 2)).toBe('1,234,567.00')
  })

  it('should format decimal numbers', () => {
    expect(formatNumber(1234.567, 2)).toBe('1,234.57')
    expect(formatNumber(1234567.89, 2)).toBe('1,234,567.89')
  })

  it('should handle zero', () => {
    expect(formatNumber(0)).toBe('0')
    expect(formatNumber(0, 2)).toBe('0.00')
  })

  it('should handle small numbers', () => {
    expect(formatNumber(999)).toBe('999')
  })
})

describe('toFixed', () => {
  it('should return number type', () => {
    const result = toFixed(1.2345, 2)
    expect(typeof result).toBe('number')
  })

  it('should round correctly', () => {
    expect(toFixed(1.234, 2)).toBe(1.23)
    expect(toFixed(1.235, 2)).toBe(1.24)
    expect(toFixed(1.236, 2)).toBe(1.24)
  })

  it('should handle different digit counts', () => {
    expect(toFixed(1.5, 0)).toBe(2)
    expect(toFixed(1.23456, 3)).toBe(1.235)
  })
})

describe('sum', () => {
  it('should sum numbers', () => {
    expect(sum(1, 2, 3, 4, 5)).toBe(15)
  })

  it('should handle single number', () => {
    expect(sum(5)).toBe(5)
  })

  it('should handle empty', () => {
    expect(sum()).toBe(0)
  })

  it('should handle decimals', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3)
  })
})

describe('average', () => {
  it('should calculate average', () => {
    expect(average(1, 2, 3, 4, 5)).toBe(3)
  })

  it('should handle single number', () => {
    expect(average(5)).toBe(5)
  })

  it('should return 0 for empty', () => {
    expect(average()).toBe(0)
  })

  it('should handle decimals', () => {
    expect(average(0.1, 0.2)).toBeCloseTo(0.15)
  })
})

describe('percentage', () => {
  it('should calculate percentage', () => {
    expect(percentage(25, 100)).toBe(25)
    expect(percentage(1, 4)).toBe(25)
  })

  it('should respect decimals', () => {
    expect(percentage(1, 3, 2)).toBeCloseTo(33.33)
    expect(percentage(1, 6, 2)).toBe(16.67)
  })

  it('should return 0 when total is 0', () => {
    expect(percentage(5, 0)).toBe(0)
  })

  it('should handle percentages over 100', () => {
    expect(percentage(150, 100)).toBe(150)
  })

  it('should default to 0 decimals', () => {
    const result = percentage(1, 3)
    expect(result).toBe(33)
    expect(Number.isInteger(result)).toBe(true)
  })
})

describe('formatCurrency', () => {
  it('should format with default options (¥ and 2 decimals)', () => {
    expect(formatCurrency(1234567)).toBe('¥1,234,567.00')
    expect(formatCurrency(1234.5)).toBe('¥1,234.50')
    expect(formatCurrency(1000000)).toBe('¥1,000,000.00')
  })

  it('should format integer without decimals', () => {
    expect(formatCurrency(100, { precision: 'min' })).toBe('¥100')
    expect(formatCurrency(100.5, { precision: 'min' })).toBe('¥100.50')
  })

  it('should format with max precision', () => {
    expect(formatCurrency(100)).toBe('¥100.00')
    expect(formatCurrency(100.12345, { precision: 'max' })).toBe('¥100.12345')
  })

  it('should format with fixed decimals', () => {
    expect(formatCurrency(100, { decimals: 0 })).toBe('¥100')
    expect(formatCurrency(100.567, { decimals: 1 })).toBe('¥100.6')
    expect(formatCurrency(100.567, { precision: 3 })).toBe('¥100.567')
  })

  it('should format with custom symbol', () => {
    expect(formatCurrency(100, { symbol: '$' })).toBe('$100.00')
    expect(formatCurrency(100, { symbol: '€' })).toBe('€100.00')
    expect(formatCurrency(100, { symbol: 'USD ' })).toBe('USD 100.00')
  })

  it('should format with custom separator', () => {
    expect(formatCurrency(1234567, { separator: ' ' })).toBe('¥1 234 567.00')
    expect(formatCurrency(1234567, { separator: '.' })).toBe('¥1.234.567.00')
  })

  it('should format with custom decimal point', () => {
    expect(formatCurrency(100.99, { decimalPoint: ',' })).toBe('¥100,99')
  })

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('¥0.00')
    expect(formatCurrency(0, { precision: 'min' })).toBe('¥0')
  })

  it('should handle negative amounts', () => {
    expect(formatCurrency(-1000)).toBe('¥-1,000.00')
    expect(formatCurrency(-1234.56)).toBe('¥-1,234.56')
  })

  it('should handle small amounts', () => {
    expect(formatCurrency(0.01)).toBe('¥0.01')
    expect(formatCurrency(0.1)).toBe('¥0.10')
  })

  it('should handle large amounts', () => {
    expect(formatCurrency(999999999)).toBe('¥999,999,999.00')
  })

  it('should round correctly', () => {
    expect(formatCurrency(100.125, { decimals: 2 })).toBe('¥100.13')
    expect(formatCurrency(100.124, { decimals: 2 })).toBe('¥100.12')
  })
})
