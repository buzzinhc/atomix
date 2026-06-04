import { describe, it, expect } from 'vitest'
import {
  isEmail,
  isPhone,
  isUrl,
  isIdCard,
  isIP,
  isMacAddress,
  isNumeric,
  isAlphanumeric,
  isChinese,
  isStrongPassword,
} from '../../src/validate'

describe('isEmail', () => {
  it('标准邮箱格式', () => {
    expect(isEmail('test@example.com')).toBe(true)
    expect(isEmail('user.name@domain.co.uk')).toBe(true)
  })

  it('无效邮箱', () => {
    expect(isEmail('notanemail')).toBe(false)
    expect(isEmail('@nodomain.com')).toBe(false)
    expect(isEmail('no@domain')).toBe(false)
  })
})

describe('isPhone', () => {
  it('有效手机号', () => {
    expect(isPhone('13812345678')).toBe(true)
    expect(isPhone('19912345678')).toBe(true)
    expect(isPhone('16612345678')).toBe(true)
  })

  it('无效手机号', () => {
    expect(isPhone('1381234567')).toBe(false)
    expect(isPhone('138123456789')).toBe(false)
    expect(isPhone('12812345678')).toBe(false)
    expect(isPhone('abc12345678')).toBe(false)
  })
})

describe('isUrl', () => {
  it('有效URL', () => {
    expect(isUrl('https://example.com')).toBe(true)
    expect(isUrl('http://example.com/path')).toBe(true)
    expect(isUrl('https://example.com:8080/path?query=1')).toBe(true)
  })

  it('无效URL', () => {
    expect(isUrl('not a url')).toBe(false)
    expect(isUrl('example.com')).toBe(false)
  })
})

describe('isIdCard', () => {
  it('有效身份证', () => {
    expect(isIdCard('110101199003074477')).toBe(true)
    expect(isIdCard('120101199003074479')).toBe(true)
  })

  it('无效身份证', () => {
    expect(isIdCard('110101199003074478')).toBe(false)
    expect(isIdCard('123456789012345678')).toBe(false)
    expect(isIdCard('1101011990030744')).toBe(false)
  })
})

describe('isIP', () => {
  it('有效IPv4', () => {
    expect(isIP('192.168.1.1')).toBe(true)
    expect(isIP('255.255.255.255')).toBe(true)
    expect(isIP('0.0.0.0')).toBe(true)
    expect(isIP('10.0.0.1')).toBe(true)
  })

  it('无效IPv4', () => {
    expect(isIP('256.1.1.1')).toBe(false)
    expect(isIP('192.168.1')).toBe(false)
    expect(isIP('192.168.1.1.1')).toBe(false)
    expect(isIP('192.168.1.a')).toBe(false)
    expect(isIP('01.1.1.1')).toBe(false)
  })
})

describe('isMacAddress', () => {
  it('有效MAC地址', () => {
    expect(isMacAddress('00:1A:2B:3C:4D:5E')).toBe(true)
    expect(isMacAddress('00-1A-2B-3C-4D-5E')).toBe(true)
    expect(isMacAddress('aa:bb:cc:dd:ee:ff')).toBe(true)
  })

  it('无效MAC地址', () => {
    expect(isMacAddress('00:1A:2B:3C:4D')).toBe(false)
    expect(isMacAddress('00-1A-2B-3C-4D-5E-FF')).toBe(false)
    expect(isMacAddress('gg:1A:2B:3C:4D:5E')).toBe(false)
  })
})

describe('isNumeric', () => {
  it('纯数字字符串', () => {
    expect(isNumeric('123456')).toBe(true)
    expect(isNumeric('0')).toBe(true)
  })

  it('非纯数字', () => {
    expect(isNumeric('123a')).toBe(false)
    expect(isNumeric('12.3')).toBe(false)
    expect(isNumeric('')).toBe(false)
  })
})

describe('isAlphanumeric', () => {
  it('字母数字混合', () => {
    expect(isAlphanumeric('abc123')).toBe(true)
    expect(isAlphanumeric('ABC123')).toBe(true)
  })

  it('非字母数字', () => {
    expect(isAlphanumeric('abc123!')).toBe(false)
    expect(isAlphanumeric('hello world')).toBe(false)
  })
})

describe('isChinese', () => {
  it('纯中文', () => {
    expect(isChinese('你好世界')).toBe(true)
    expect(isChinese('中文')).toBe(true)
  })

  it('非中文', () => {
    expect(isChinese('hello')).toBe(false)
    expect(isChinese('你好123')).toBe(false)
    expect(isChinese('')).toBe(false)
  })
})

describe('isStrongPassword', () => {
  it('强密码', () => {
    expect(isStrongPassword('Abc123!@')).toBe(true)
    expect(isStrongPassword('Passw0rd!')).toBe(true)
    expect(isStrongPassword('Aa1!Aa1!Aa1!')).toBe(true)
  })

  it('非强密码', () => {
    expect(isStrongPassword('abc123')).toBe(false)
    expect(isStrongPassword('Abcdefg')).toBe(false)
    expect(isStrongPassword('12345678')).toBe(false)
    expect(isStrongPassword('Abc12345')).toBe(false)
  })
})
