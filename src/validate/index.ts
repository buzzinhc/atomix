export function isEmail(str: string): boolean {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return reg.test(str)
}

export function isPhone(str: string): boolean {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(str)
}

export function isUrl(str: string): boolean {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

export function isIdCard(str: string): boolean {
  if (!/^\d{17}[\dXx]$/.test(str)) {
    return false
  }
  const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += parseInt(str[i]) * factors[i]
  }
  const checkCode = checkCodes[sum % 11]
  return checkCode === str[17].toUpperCase()
}

export function isIP(str: string): boolean {
  const parts = str.split('.')
  if (parts.length !== 4) {
    return false
  }
  for (const part of parts) {
    if (!/^\d+$/.test(part)) {
      return false
    }
    const num = parseInt(part, 10)
    if (num < 0 || num > 255) {
      return false
    }
    if (part !== String(num) || (part.length > 1 && part[0] === '0')) {
      return false
    }
  }
  return true
}

export function isMacAddress(str: string): boolean {
  const reg = /^([A-Fa-f0-9]{2}[:-]){5}[A-Fa-f0-9]{2}$/
  return reg.test(str)
}

export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str)
}

export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str)
}

export function isChinese(str: string): boolean {
  return /^[\u4e00-\u9fa5]+$/.test(str)
}

export function isStrongPassword(str: string): boolean {
  if (str.length < 8) {
    return false
  }
  const hasLower = /[a-z]/.test(str)
  const hasUpper = /[A-Z]/.test(str)
  const hasDigit = /\d/.test(str)
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str)
  return hasLower && hasUpper && hasDigit && hasSpecial
}
