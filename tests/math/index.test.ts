import { describe, it, expect } from 'vitest'
import * as math from '../../src/math'

describe('radian', () => {
  it('0度转为0弧度', () => {
    expect(math.radian(0)).toBe(0)
  })

  it('180度转为PI弧度', () => {
    expect(math.radian(180)).toBeCloseTo(Math.PI)
  })

  it('360度转为2PI弧度', () => {
    expect(math.radian(360)).toBeCloseTo(2 * Math.PI)
  })

  it('90度转为PI/2弧度', () => {
    expect(math.radian(90)).toBeCloseTo(Math.PI / 2)
  })

  it('负角度转换', () => {
    expect(math.radian(-90)).toBeCloseTo(-Math.PI / 2)
  })
})

describe('degree', () => {
  it('0弧度转为0度', () => {
    expect(math.degree(0)).toBe(0)
  })

  it('PI弧度转为180度', () => {
    expect(math.degree(Math.PI)).toBeCloseTo(180)
  })

  it('2PI弧度转为360度', () => {
    expect(math.degree(2 * Math.PI)).toBeCloseTo(360)
  })

  it('PI/2弧度转为90度', () => {
    expect(math.degree(Math.PI / 2)).toBeCloseTo(90)
  })

  it('负弧度转换', () => {
    expect(math.degree(-Math.PI)).toBeCloseTo(-180)
  })
})

describe('sin', () => {
  it('sin(0) == 0', () => {
    expect(math.sin(0)).toBeCloseTo(0)
  })

  it('sin(90) == 1', () => {
    expect(math.sin(90)).toBeCloseTo(1)
  })

  it('sin(180) == 0', () => {
    expect(math.sin(180)).toBeCloseTo(0)
  })

  it('sin(270) == -1', () => {
    expect(math.sin(270)).toBeCloseTo(-1)
  })

  it('sin(30) == 0.5', () => {
    expect(math.sin(30)).toBeCloseTo(0.5)
  })
})

describe('cos', () => {
  it('cos(0) == 1', () => {
    expect(math.cos(0)).toBeCloseTo(1)
  })

  it('cos(90) == 0', () => {
    expect(math.cos(90)).toBeCloseTo(0)
  })

  it('cos(180) == -1', () => {
    expect(math.cos(180)).toBeCloseTo(-1)
  })

  it('cos(60) == 0.5', () => {
    expect(math.cos(60)).toBeCloseTo(0.5)
  })
})

describe('tan', () => {
  it('tan(0) == 0', () => {
    expect(math.tan(0)).toBeCloseTo(0)
  })

  it('tan(45) == 1', () => {
    expect(math.tan(45)).toBeCloseTo(1)
  })

  it('tan(135) == -1', () => {
    expect(math.tan(135)).toBeCloseTo(-1)
  })
})

describe('asin', () => {
  it('asin(0) == 0', () => {
    expect(math.asin(0)).toBeCloseTo(0)
  })

  it('asin(1) == 90', () => {
    expect(math.asin(1)).toBeCloseTo(90)
  })

  it('asin(-1) == -90', () => {
    expect(math.asin(-1)).toBeCloseTo(-90)
  })

  it('asin(0.5) == 30', () => {
    expect(math.asin(0.5)).toBeCloseTo(30)
  })
})

describe('acos', () => {
  it('acos(1) == 0', () => {
    expect(math.acos(1)).toBeCloseTo(0)
  })

  it('acos(0) == 90', () => {
    expect(math.acos(0)).toBeCloseTo(90)
  })

  it('acos(-1) == 180', () => {
    expect(math.acos(-1)).toBeCloseTo(180)
  })

  it('acos(0.5) == 60', () => {
    expect(math.acos(0.5)).toBeCloseTo(60)
  })
})

describe('atan', () => {
  it('atan(0) == 0', () => {
    expect(math.atan(0)).toBeCloseTo(0)
  })

  it('atan(1) == 45', () => {
    expect(math.atan(1)).toBeCloseTo(45)
  })

  it('atan(-1) == -45', () => {
    expect(math.atan(-1)).toBeCloseTo(-45)
  })
})

describe('atan2', () => {
  it('atan2(1, 1) == 45', () => {
    expect(math.atan2(1, 1)).toBeCloseTo(45)
  })

  it('atan2(0, 1) == 0', () => {
    expect(math.atan2(0, 1)).toBeCloseTo(0)
  })

  it('atan2(1, 0) == 90', () => {
    expect(math.atan2(1, 0)).toBeCloseTo(90)
  })

  it('atan2(-1, -1) == -135', () => {
    expect(math.atan2(-1, -1)).toBeCloseTo(-135)
  })
})

describe('pow', () => {
  it('2的3次方 == 8', () => {
    expect(math.pow(2, 3)).toBe(8)
  })

  it('5的0次方 == 1', () => {
    expect(math.pow(5, 0)).toBe(1)
  })

  it('2的-1次方 == 0.5', () => {
    expect(math.pow(2, -1)).toBeCloseTo(0.5)
  })

  it('10的2次方 == 100', () => {
    expect(math.pow(10, 2)).toBe(100)
  })
})

describe('sqrt', () => {
  it('sqrt(0) == 0', () => {
    expect(math.sqrt(0)).toBe(0)
  })

  it('sqrt(1) == 1', () => {
    expect(math.sqrt(1)).toBe(1)
  })

  it('sqrt(4) == 2', () => {
    expect(math.sqrt(4)).toBe(2)
  })

  it('sqrt(9) == 3', () => {
    expect(math.sqrt(9)).toBe(3)
  })

  it('sqrt(2) == 1.414...', () => {
    expect(math.sqrt(2)).toBeCloseTo(1.41421356)
  })
})

describe('cbrt', () => {
  it('cbrt(0) == 0', () => {
    expect(math.cbrt(0)).toBe(0)
  })

  it('cbrt(1) == 1', () => {
    expect(math.cbrt(1)).toBe(1)
  })

  it('cbrt(8) == 2', () => {
    expect(math.cbrt(8)).toBe(2)
  })

  it('cbrt(27) == 3', () => {
    expect(math.cbrt(27)).toBe(3)
  })

  it('cbrt(-8) == -2', () => {
    expect(math.cbrt(-8)).toBe(-2)
  })
})

describe('abs', () => {
  it('正数不变', () => {
    expect(math.abs(5)).toBe(5)
  })

  it('负数取反', () => {
    expect(math.abs(-5)).toBe(5)
  })

  it('0的绝对值 == 0', () => {
    expect(math.abs(0)).toBe(0)
  })

  it('浮点数取绝对值', () => {
    expect(math.abs(-3.14)).toBeCloseTo(3.14)
  })
})

describe('floor', () => {
  it('正数向下取整', () => {
    expect(math.floor(3.7)).toBe(3)
  })

  it('负数向下取整', () => {
    expect(math.floor(-3.2)).toBe(-4)
  })

  it('整数不变', () => {
    expect(math.floor(5)).toBe(5)
  })

  it('0不变', () => {
    expect(math.floor(0)).toBe(0)
  })
})

describe('ceil', () => {
  it('正数向上取整', () => {
    expect(math.ceil(3.2)).toBe(4)
  })

  it('负数向上取整', () => {
    expect(math.ceil(-3.7)).toBe(-3)
  })

  it('整数不变', () => {
    expect(math.ceil(5)).toBe(5)
  })

  it('0不变', () => {
    expect(math.ceil(0)).toBe(0)
  })
})

describe('round', () => {
  it('四舍五入 - 进位', () => {
    expect(math.round(3.6)).toBe(4)
  })

  it('四舍五入 - 舍去', () => {
    expect(math.round(3.4)).toBe(3)
  })

  it('四舍五入 - 正好一半', () => {
    expect(math.round(3.5)).toBe(4)
  })

  it('负数四舍五入', () => {
    expect(math.round(-3.6)).toBe(-4)
  })
})

describe('trunc', () => {
  it('正数截断', () => {
    expect(math.trunc(3.7)).toBe(3)
  })

  it('负数截断', () => {
    expect(math.trunc(-3.7)).toBe(-3)
  })

  it('整数不变', () => {
    expect(math.trunc(5)).toBe(5)
  })

  it('0不变', () => {
    expect(math.trunc(0)).toBe(0)
  })
})

describe('sign', () => {
  it('正数返回1', () => {
    expect(math.sign(5)).toBe(1)
  })

  it('负数返回-1', () => {
    expect(math.sign(-5)).toBe(-1)
  })

  it('0返回0', () => {
    expect(math.sign(0)).toBe(0)
  })

  it('正0返回0', () => {
    expect(math.sign(+0)).toBe(0)
  })
})

describe('mod', () => {
  it('正数取模', () => {
    expect(math.mod(7, 3)).toBe(1)
  })

  it('整除返回0', () => {
    expect(math.mod(6, 3)).toBe(0)
  })

  it('负数取模返回正值', () => {
    expect(math.mod(-1, 3)).toBe(2)
  })

  it('被除数为负', () => {
    expect(math.mod(7, -3)).toBe(-2)
  })

  it('两个负数取模', () => {
    expect(math.mod(-7, -3)).toBe(-1)
  })
})

describe('gcd', () => {
  it('gcd(12, 8) == 4', () => {
    expect(math.gcd(12, 8)).toBe(4)
  })

  it('gcd(15, 5) == 5', () => {
    expect(math.gcd(15, 5)).toBe(5)
  })

  it('gcd(7, 13) == 1', () => {
    expect(math.gcd(7, 13)).toBe(1)
  })

  it('gcd(0, 5) == 5', () => {
    expect(math.gcd(0, 5)).toBe(5)
  })

  it('负数取gcd', () => {
    expect(math.gcd(-12, 8)).toBe(4)
  })
})

describe('lcm', () => {
  it('lcm(4, 6) == 12', () => {
    expect(math.lcm(4, 6)).toBe(12)
  })

  it('lcm(3, 7) == 21', () => {
    expect(math.lcm(3, 7)).toBe(21)
  })

  it('lcm(0, 5) == 0', () => {
    expect(math.lcm(0, 5)).toBe(0)
  })

  it('lcm(5, 0) == 0', () => {
    expect(math.lcm(5, 0)).toBe(0)
  })

  it('负数取lcm', () => {
    expect(math.lcm(-4, 6)).toBe(12)
  })
})

describe('factorial', () => {
  it('0的阶乘 == 1', () => {
    expect(math.factorial(0)).toBe(1)
  })

  it('1的阶乘 == 1', () => {
    expect(math.factorial(1)).toBe(1)
  })

  it('5的阶乘 == 120', () => {
    expect(math.factorial(5)).toBe(120)
  })

  it('10的阶乘 == 3628800', () => {
    expect(math.factorial(10)).toBe(3628800)
  })

  it('负数返回NaN', () => {
    expect(math.factorial(-1)).toBeNaN()
  })
})

describe('fibonacci', () => {
  it('fibonacci(0) == 0', () => {
    expect(math.fibonacci(0)).toBe(0)
  })

  it('fibonacci(1) == 1', () => {
    expect(math.fibonacci(1)).toBe(1)
  })

  it('fibonacci(2) == 1', () => {
    expect(math.fibonacci(2)).toBe(1)
  })

  it('fibonacci(5) == 5', () => {
    expect(math.fibonacci(5)).toBe(5)
  })

  it('fibonacci(10) == 55', () => {
    expect(math.fibonacci(10)).toBe(55)
  })

  it('负数返回0', () => {
    expect(math.fibonacci(-1)).toBe(0)
  })
})

describe('clamp', () => {
  it('值在范围内返回原值', () => {
    expect(math.clamp(5, 0, 10)).toBe(5)
  })

  it('值小于最小值返回最小值', () => {
    expect(math.clamp(-5, 0, 10)).toBe(0)
  })

  it('值大于最大值返回最大值', () => {
    expect(math.clamp(15, 0, 10)).toBe(10)
  })

  it('值等于边界值', () => {
    expect(math.clamp(0, 0, 10)).toBe(0)
    expect(math.clamp(10, 0, 10)).toBe(10)
  })
})

describe('lerp', () => {
  it('t == 0 返回 start', () => {
    expect(math.lerp(0, 10, 0)).toBeCloseTo(0)
  })

  it('t == 1 返回 end', () => {
    expect(math.lerp(0, 10, 1)).toBeCloseTo(10)
  })

  it('t == 0.5 返回中间值', () => {
    expect(math.lerp(0, 10, 0.5)).toBeCloseTo(5)
  })

  it('t == 0.25', () => {
    expect(math.lerp(0, 100, 0.25)).toBeCloseTo(25)
  })
})

describe('normalize', () => {
  it('最小值归一化为0', () => {
    expect(math.normalize(0, 0, 10)).toBeCloseTo(0)
  })

  it('最大值归一化为1', () => {
    expect(math.normalize(10, 0, 10)).toBeCloseTo(1)
  })

  it('中间值归一化为0.5', () => {
    expect(math.normalize(5, 0, 10)).toBeCloseTo(0.5)
  })

  it('范围外的值', () => {
    expect(math.normalize(15, 0, 10)).toBeCloseTo(1.5)
  })
})

describe('map', () => {
  it('从[0,10]映射到[0,100]', () => {
    expect(math.map(5, 0, 10, 0, 100)).toBeCloseTo(50)
  })

  it('从[0,1]映射到[0,255]', () => {
    expect(math.map(0.5, 0, 1, 0, 255)).toBeCloseTo(127.5)
  })

  it('边界值映射', () => {
    expect(math.map(0, 0, 10, 100, 200)).toBeCloseTo(100)
    expect(math.map(10, 0, 10, 100, 200)).toBeCloseTo(200)
  })

  it('反转范围映射', () => {
    expect(math.map(0, 0, 10, 100, 0)).toBeCloseTo(100)
    expect(math.map(10, 0, 10, 100, 0)).toBeCloseTo(0)
  })
})

describe('easeIn', () => {
  it('t == 0 返回 0', () => {
    expect(math.easeIn(0)).toBe(0)
  })

  it('t == 1 返回 1', () => {
    expect(math.easeIn(1)).toBe(1)
  })

  it('t == 0.5 返回 0.25', () => {
    expect(math.easeIn(0.5)).toBeCloseTo(0.25)
  })

  it('t == 0.3 返回 0.09', () => {
    expect(math.easeIn(0.3)).toBeCloseTo(0.09)
  })
})

describe('easeOut', () => {
  it('t == 0 返回 0', () => {
    expect(math.easeOut(0)).toBe(0)
  })

  it('t == 1 返回 1', () => {
    expect(math.easeOut(1)).toBe(1)
  })

  it('t == 0.5 返回 0.75', () => {
    expect(math.easeOut(0.5)).toBeCloseTo(0.75)
  })
})

describe('easeInOut', () => {
  it('t == 0 返回 0', () => {
    expect(math.easeInOut(0)).toBe(0)
  })

  it('t == 1 返回 1', () => {
    expect(math.easeInOut(1)).toBeCloseTo(1)
  })

  it('t == 0.5 返回 0.5', () => {
    expect(math.easeInOut(0.5)).toBeCloseTo(0.5)
  })

  it('t == 0.25 使用前半段公式', () => {
    expect(math.easeInOut(0.25)).toBeCloseTo(0.125)
  })
})

describe('isPowerOfTwo', () => {
  it('1是2的幂', () => {
    expect(math.isPowerOfTwo(1)).toBe(true)
  })

  it('2是2的幂', () => {
    expect(math.isPowerOfTwo(2)).toBe(true)
  })

  it('4是2的幂', () => {
    expect(math.isPowerOfTwo(4)).toBe(true)
  })

  it('1024是2的幂', () => {
    expect(math.isPowerOfTwo(1024)).toBe(true)
  })

  it('3不是2的幂', () => {
    expect(math.isPowerOfTwo(3)).toBe(false)
  })

  it('0不是2的幂', () => {
    expect(math.isPowerOfTwo(0)).toBe(false)
  })

  it('负数不是2的幂', () => {
    expect(math.isPowerOfTwo(-4)).toBe(false)
  })
})

describe('nearestPowerOfTwo', () => {
  it('已经是2的幂返回自身', () => {
    expect(math.nearestPowerOfTwo(8)).toBe(8)
  })

  it('最近的2的幂 - 较小', () => {
    expect(math.nearestPowerOfTwo(5)).toBe(4)
  })

  it('最近的2的幂 - 较大', () => {
    expect(math.nearestPowerOfTwo(7)).toBe(8)
  })

  it('0返回1', () => {
    expect(math.nearestPowerOfTwo(0)).toBe(1)
  })

  it('负数返回1', () => {
    expect(math.nearestPowerOfTwo(-5)).toBe(1)
  })

  it('正好在中间取较小的', () => {
    expect(math.nearestPowerOfTwo(6)).toBe(4)
  })

  it('较大的数', () => {
    expect(math.nearestPowerOfTwo(1000)).toBe(1024)
  })
})
