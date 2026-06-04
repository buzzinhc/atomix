import { describe, it, expect } from 'vitest'
import * as color from '../../src/color'

describe('hexToRgb', () => {
  it('小可爱 HEX 转 RGB', () => {
    expect(color.hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 })
    expect(color.hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 })
    expect(color.hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 })
    expect(color.hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 })
    expect(color.hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 })
  })

  it('不带 # 号也能识别哦', () => {
    expect(color.hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('小写 HEX 也没问题哒', () => {
    expect(color.hexToRgb('#ff8800')).toEqual({ r: 255, g: 136, b: 0 })
  })

  it('各种颜色混合值也不怕', () => {
    expect(color.hexToRgb('#1A2B3C')).toEqual({ r: 26, g: 43, b: 60 })
    expect(color.hexToRgb('#abcdef')).toEqual({ r: 171, g: 205, b: 239 })
  })

  it('无效 HEX 就乖乖返回 null', () => {
      expect(color.hexToRgb('')).toBeNull()
    expect(color.hexToRgb('#GGG')).toBeNull()
    expect(color.hexToRgb('#12345')).toBeNull()
    expect(color.hexToRgb('hello')).toBeNull()
  })
})

describe('rgbToHex', () => {
  it('RGB 转 HEX 好简单呀', () => {
    expect(color.rgbToHex(255, 0, 0)).toBe('#FF0000')
    expect(color.rgbToHex(0, 255, 0)).toBe('#00FF00')
    expect(color.rgbToHex(0, 0, 255)).toBe('#0000FF')
    expect(color.rgbToHex(0, 0, 0)).toBe('#000000')
    expect(color.rgbToHex(255, 255, 255)).toBe('#FFFFFF')
  })

  it('中间值也能完美转换', () => {
    expect(color.rgbToHex(128, 128, 128)).toBe('#808080')
    expect(color.rgbToHex(255, 136, 0)).toBe('#FF8800')
  })

  it('带小数的 RGB 会四舍五入哦', () => {
    expect(color.rgbToHex(127.4, 127.6, 0)).toBe('#7F8000')
  })

  it('单通道取值', () => {
    expect(color.rgbToHex(255, 0, 0)).toBe('#FF0000')
    expect(color.rgbToHex(0, 255, 0)).toBe('#00FF00')
    expect(color.rgbToHex(0, 0, 255)).toBe('#0000FF')
  })
})

describe('hexToRgba', () => {
  it('六位 HEX 默认 alpha 是 1 呢', () => {
    expect(color.hexToRgba('#FF0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
  })

  it('八位 HEX 可以带透明度', () => {
    const result = color.hexToRgba('#FF000080')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
    expect(result!.g).toBe(0)
    expect(result!.b).toBe(0)
    expect(result!.a).toBeCloseTo(128 / 255, 2)
  })

  it('无效 HEX 返回 null 哟', () => {
    expect(color.hexToRgba('')).toBeNull()
    expect(color.hexToRgba('#GGG')).toBeNull()
  })

  it('不带 # 号的八位 HEX 也能解析', () => {
    const result = color.hexToRgba('FF000080')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
  })
})

describe('rgbaToHex', () => {
  it('alpha 为 1 时当作普通 RGB 处理', () => {
    expect(color.rgbaToHex(255, 0, 0, 1)).toBe('#FF0000')
    expect(color.rgbaToHex(255, 0, 0)).toBe('#FF0000')
  })

  it('alpha 小于 1 时带上透明通道', () => {
    const result = color.rgbaToHex(255, 0, 0, 0.5)
    expect(result).toBe('#FF000080')
  })

  it('完全透明也能表示', () => {
    const result = color.rgbaToHex(0, 0, 0, 0)
    expect(result).toBe('#00000000')
  })
})

describe('rgbToHsl', () => {
  it('纯红色的 HSL', () => {
    const hsl = color.rgbToHsl(255, 0, 0)
    expect(hsl.h).toBe(0)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })

  it('纯绿色的 HSL', () => {
    const hsl = color.rgbToHsl(0, 255, 0)
    expect(hsl.h).toBe(120)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })

  it('纯蓝色的 HSL', () => {
    const hsl = color.rgbToHsl(0, 0, 255)
    expect(hsl.h).toBe(240)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })

  it('黑白灰的 HSL', () => {
    const black = color.rgbToHsl(0, 0, 0)
    expect(black.l).toBe(0)

    const white = color.rgbToHsl(255, 255, 255)
    expect(white.l).toBe(100)

    const gray = color.rgbToHsl(128, 128, 128)
    expect(gray.s).toBe(0)
  })

  it('黄色的 HSL', () => {
    const hsl = color.rgbToHsl(255, 255, 0)
    expect(hsl.h).toBe(60)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })

  it('青色的 HSL', () => {
    const hsl = color.rgbToHsl(0, 255, 255)
    expect(hsl.h).toBe(180)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })
})

describe('hslToRgb', () => {
  it('纯红色从 HSL 转回来', () => {
    const rgb = color.hslToRgb(0, 100, 50)
    expect(rgb.r).toBe(255)
    expect(rgb.g).toBe(0)
    expect(rgb.b).toBe(0)
  })

  it('纯绿色从 HSL 转回来', () => {
    const rgb = color.hslToRgb(120, 100, 50)
    expect(rgb.r).toBe(0)
    expect(rgb.g).toBe(255)
    expect(rgb.b).toBe(0)
  })

  it('纯蓝色从 HSL 转回来', () => {
    const rgb = color.hslToRgb(240, 100, 50)
    expect(rgb.r).toBe(0)
    expect(rgb.g).toBe(0)
    expect(rgb.b).toBe(255)
  })

  it('灰色饱和度为 0', () => {
    const rgb = color.hslToRgb(0, 0, 50)
    expect(rgb.r).toBe(128)
    expect(rgb.g).toBe(128)
    expect(rgb.b).toBe(128)
  })

  it('黑色和白色', () => {
    const black = color.hslToRgb(0, 0, 0)
    expect(black).toEqual({ r: 0, g: 0, b: 0 })

    const white = color.hslToRgb(0, 0, 100)
    expect(white).toEqual({ r: 255, g: 255, b: 255 })
  })

  it('黄色从 HSL 转回来', () => {
    const rgb = color.hslToRgb(60, 100, 50)
    expect(rgb.r).toBe(255)
    expect(rgb.g).toBe(255)
    expect(rgb.b).toBe(0)
  })

  it('青色从 HSL 转回来', () => {
    const rgb = color.hslToRgb(180, 100, 50)
    expect(rgb.r).toBe(0)
    expect(rgb.g).toBe(255)
    expect(rgb.b).toBe(255)
  })
})

describe('hexToHsl', () => {
  it('红色 HEX 转 HSL', () => {
    const hsl = color.hexToHsl('#FF0000')
    expect(hsl).not.toBeNull()
    expect(hsl!.h).toBe(0)
    expect(hsl!.s).toBe(100)
    expect(hsl!.l).toBe(50)
  })

  it('无效 HEX 返回 null', () => {
    expect(color.hexToHsl('xyz')).toBeNull()
  })

  it('绿色 HEX 转 HSL', () => {
    const hsl = color.hexToHsl('#00FF00')
    expect(hsl).not.toBeNull()
    expect(hsl!.h).toBe(120)
    expect(hsl!.s).toBe(100)
    expect(hsl!.l).toBe(50)
  })
})

describe('hslToHex', () => {
  it('红色 HSL 转 HEX', () => {
    expect(color.hslToHex(0, 100, 50)).toBe('#FF0000')
  })

  it('绿色 HSL 转 HEX', () => {
    expect(color.hslToHex(120, 100, 50)).toBe('#00FF00')
  })

  it('灰色 HSL 转 HEX', () => {
    expect(color.hslToHex(0, 0, 50)).toBe('#808080')
  })

  it('黑色 HSL 转 HEX', () => {
    expect(color.hslToHex(0, 0, 0)).toBe('#000000')
  })

  it('白色 HSL 转 HEX', () => {
    expect(color.hslToHex(0, 0, 100)).toBe('#FFFFFF')
  })
})

describe('rgbToString', () => {
  it('生成标准 rgb 字符串', () => {
    expect(color.rgbToString(255, 0, 0)).toBe('rgb(255, 0, 0)')
    expect(color.rgbToString(0, 128, 255)).toBe('rgb(0, 128, 255)')
  })

  it('边界值也能正确生成', () => {
    expect(color.rgbToString(0, 0, 0)).toBe('rgb(0, 0, 0)')
    expect(color.rgbToString(255, 255, 255)).toBe('rgb(255, 255, 255)')
  })
})

describe('rgbaToString', () => {
  it('生成标准 rgba 字符串', () => {
    expect(color.rgbaToString(255, 0, 0, 0.5)).toBe('rgba(255, 0, 0, 0.5)')
    expect(color.rgbaToString(0, 0, 0, 1)).toBe('rgba(0, 0, 0, 1)')
  })

  it('默认 alpha 是 1', () => {
    expect(color.rgbaToString(255, 255, 255)).toBe('rgba(255, 255, 255, 1)')
  })
})

describe('hslToString', () => {
  it('生成标准 hsl 字符串', () => {
    expect(color.hslToString(0, 100, 50)).toBe('hsl(0, 100%, 50%)')
    expect(color.hslToString(240, 50, 80)).toBe('hsl(240, 50%, 80%)')
  })
})

describe('hslaToString', () => {
  it('生成标准 hsla 字符串', () => {
    expect(color.hslaToString(0, 100, 50, 0.5)).toBe('hsla(0, 100%, 50%, 0.5)')
  })

  it('默认 alpha 是 1', () => {
    expect(color.hslaToString(120, 60, 40)).toBe('hsla(120, 60%, 40%, 1)')
  })
})

describe('parseColor', () => {
  it('解析六位 HEX', () => {
    const result = color.parseColor('#FF0000')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
    expect(result!.g).toBe(0)
    expect(result!.b).toBe(0)
    expect(result!.a).toBe(1)
  })

  it('解析三位 HEX 小可爱', () => {
    const result = color.parseColor('#F00')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
    expect(result!.g).toBe(0)
    expect(result!.b).toBe(0)
    expect(result!.a).toBe(1)
  })

  it('解析四位 HEX 带透明', () => {
    const result = color.parseColor('#F00F')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
    expect(result!.g).toBe(0)
    expect(result!.b).toBe(0)
    expect(result!.a).toBe(1)
  })

  it('解析八位 HEX 带透明', () => {
    const result = color.parseColor('#FF000080')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
    expect(result!.a).toBeCloseTo(128 / 255, 2)
  })

  it('解析 rgb 字符串', () => {
    const result = color.parseColor('rgb(255, 128, 0)')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
    expect(result!.g).toBe(128)
    expect(result!.b).toBe(0)
    expect(result!.a).toBe(1)
  })

  it('解析 rgba 字符串', () => {
    const result = color.parseColor('rgba(255, 128, 0, 0.5)')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
    expect(result!.g).toBe(128)
    expect(result!.b).toBe(0)
    expect(result!.a).toBe(0.5)
  })

  it('解析 hsl 字符串', () => {
    const result = color.parseColor('hsl(120, 100%, 50%)')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(0)
    expect(result!.g).toBe(255)
    expect(result!.b).toBe(0)
    expect(result!.a).toBe(1)
  })

  it('解析 hsla 字符串', () => {
    const result = color.parseColor('hsla(0, 100%, 50%, 0.8)')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(255)
    expect(result!.g).toBe(0)
    expect(result!.b).toBe(0)
    expect(result!.a).toBe(0.8)
  })

  it('无法识别的字符串返回 null', () => {
    expect(color.parseColor('')).toBeNull()
    expect(color.parseColor('notacolor')).toBeNull()
    expect(color.parseColor('rgb()')).toBeNull()
  })

  it('解析带空格的 rgb 字符串', () => {
    const result = color.parseColor('rgb( 10 , 20 , 30 )')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(10)
    expect(result!.g).toBe(20)
    expect(result!.b).toBe(30)
  })

  it('解析三位 HEX 各种颜色', () => {
    const result = color.parseColor('#0F0')
    expect(result).not.toBeNull()
    expect(result!.r).toBe(0)
    expect(result!.g).toBe(255)
    expect(result!.b).toBe(0)
  })
})

describe('lighten', () => {
  it('把颜色变亮一点', () => {
    const result = color.lighten('#808080', 20)
    expect(result).not.toBeNull()
    expect(result!.length).toBe(7)
  })

  it('无效颜色返回 null', () => {
    expect(color.lighten('xyz', 10)).toBeNull()
  })

  it('已经很亮的颜色不会超过 100', () => {
    const result = color.lighten('#FFFFFF', 50)
    expect(result).toBe('#FFFFFF')
  })

  it('带透明度的颜色也能变亮', () => {
    const result = color.lighten('#FF000080', 20)
    expect(result).not.toBeNull()
    expect(result!.length).toBe(9)
  })

  it('变亮 0% 不会改变颜色', () => {
    const result = color.lighten('#FF0000', 0)
    expect(result).toBe('#FF0000')
  })
})

describe('darken', () => {
  it('把颜色变暗一点', () => {
    const result = color.darken('#808080', 20)
    expect(result).not.toBeNull()
    expect(result!.length).toBe(7)
  })

  it('无效颜色返回 null', () => {
    expect(color.darken('xyz', 10)).toBeNull()
  })

  it('已经很暗的颜色不会低于 0', () => {
    const result = color.darken('#000000', 50)
    expect(result).toBe('#000000')
  })

  it('变暗 0% 不会改变颜色', () => {
    const result = color.darken('#FF0000', 0)
    expect(result).toBe('#FF0000')
  })

  it('带透明度的颜色也能变暗', () => {
    const result = color.darken('#FF000080', 20)
    expect(result).not.toBeNull()
    expect(result!.length).toBe(9)
  })
})

describe('saturate', () => {
  it('增加饱和度', () => {
    const result = color.saturate('#808080', 20)
    expect(result).not.toBeNull()
  })

  it('无效颜色返回 null', () => {
    expect(color.saturate('xyz', 10)).toBeNull()
  })

  it('饱和度到顶不会溢出', () => {
    const result = color.saturate('#FF0000', 50)
    expect(result).not.toBeNull()
  })

  it('带透明度也能增加饱和度', () => {
    const result = color.saturate('#80808080', 30)
    expect(result).not.toBeNull()
    expect(result!.length).toBe(9)
  })
})

describe('desaturate', () => {
  it('降低饱和度', () => {
    const result = color.desaturate('#FF0000', 50)
    expect(result).not.toBeNull()
  })

  it('无效颜色返回 null', () => {
    expect(color.desaturate('xyz', 10)).toBeNull()
  })

  it('完全去饱和变成灰色', () => {
    const result = color.desaturate('#FF0000', 100)
    expect(result).not.toBeNull()
  })

  it('带透明度也能降低饱和度', () => {
    const result = color.desaturate('#FF000080', 50)
    expect(result).not.toBeNull()
    expect(result!.length).toBe(9)
  })

  it('降低 0% 不改变颜色', () => {
    const result = color.desaturate('#FF0000', 0)
    expect(result).toBe('#FF0000')
  })
})

describe('invert', () => {
  it('红色反转变成青色', () => {
    expect(color.invert('#FF0000')).toBe('#00FFFF')
  })

  it('黑色反转变成白色', () => {
    expect(color.invert('#000000')).toBe('#FFFFFF')
  })

  it('白色反转变成黑色', () => {
    expect(color.invert('#FFFFFF')).toBe('#000000')
  })

  it('无效颜色返回 null', () => {
    expect(color.invert('xyz')).toBeNull()
  })

  it('绿色反转变成紫色', () => {
    expect(color.invert('#00FF00')).toBe('#FF00FF')
  })

  it('蓝色反转变成黄色', () => {
    expect(color.invert('#0000FF')).toBe('#FFFF00')
  })

  it('带透明度的颜色也能反转', () => {
    const result = color.invert('#FF000080')
    expect(result).not.toBeNull()
    expect(result!.length).toBe(9)
  })
})

describe('grayscale', () => {
  it('彩色变成灰度', () => {
    const result = color.grayscale('#FF0000')
    expect(result).not.toBeNull()
    const parsed = color.hexToRgb(result!)
    expect(parsed!.r).toBe(parsed!.g)
    expect(parsed!.g).toBe(parsed!.b)
  })

  it('灰色还是灰色', () => {
    const result = color.grayscale('#808080')
    expect(result).not.toBeNull()
  })

  it('无效颜色返回 null', () => {
    expect(color.grayscale('xyz')).toBeNull()
  })

  it('带透明度也能灰度化', () => {
    const result = color.grayscale('#FF000080')
    expect(result).not.toBeNull()
    expect(result!.length).toBe(9)
  })

  it('蓝色灰度化', () => {
    const result = color.grayscale('#0000FF')
    expect(result).not.toBeNull()
    const parsed = color.hexToRgb(result!)
    expect(parsed!.r).toBe(parsed!.g)
    expect(parsed!.g).toBe(parsed!.b)
  })
})

describe('alpha', () => {
  it('设置透明度', () => {
    const result = color.alpha('#FF0000', 0.5)
    expect(result).not.toBeNull()
    const parsed = color.hexToRgba(result!)
    expect(parsed!.a).toBeCloseTo(0.5, 1)
  })

  it('透明度会被钳制在 0-1', () => {
    const result1 = color.alpha('#FF0000', -0.5)
    expect(result1).not.toBeNull()
    const parsed1 = color.hexToRgba(result1!)
    expect(parsed1!.a).toBe(0)

    const result2 = color.alpha('#FF0000', 1.5)
    expect(result2).not.toBeNull()
  })

  it('无效颜色返回 null', () => {
    expect(color.alpha('xyz', 0.5)).toBeNull()
  })

  it('完全透明', () => {
    const result = color.alpha('#FF0000', 0)
    expect(result).not.toBeNull()
    const parsed = color.hexToRgba(result!)
    expect(parsed!.a).toBe(0)
  })

  it('完全不透明', () => {
    const result = color.alpha('#FF0000', 1)
    expect(result).not.toBeNull()
    const parsed = color.hexToRgba(result!)
    expect(parsed!.a).toBe(1)
  })
})

describe('mix', () => {
  it('等比例混合红和蓝', () => {
    const result = color.mix('#FF0000', '#0000FF')
    expect(result).not.toBeNull()
    const parsed = color.hexToRgb(result!)
    expect(parsed!.r).toBeCloseTo(128, 0)
    expect(parsed!.b).toBeCloseTo(128, 0)
  })

  it('权重为 0 时偏向第一个颜色', () => {
    const result = color.mix('#FF0000', '#0000FF', 0)
    expect(result).toBe('#FF0000')
  })

  it('权重为 1 时偏向第二个颜色', () => {
    const result = color.mix('#FF0000', '#0000FF', 1)
    expect(result).toBe('#0000FF')
  })

  it('无效颜色返回 null', () => {
    expect(color.mix('xyz', '#FF0000')).toBeNull()
    expect(color.mix('#FF0000', 'xyz')).toBeNull()
    expect(color.mix('abc', 'xyz')).toBeNull()
  })

  it('超出范围的权重会被钳制', () => {
    const result = color.mix('#FF0000', '#0000FF', -1)
    expect(result).toBe('#FF0000')

    const result2 = color.mix('#FF0000', '#0000FF', 2)
    expect(result2).toBe('#0000FF')
  })

  it('混合相同颜色还是原来的颜色', () => {
    const result = color.mix('#FF0000', '#FF0000')
    expect(result).toBe('#FF0000')
  })

  it('混合黑白得到灰色', () => {
    const result = color.mix('#000000', '#FFFFFF')
    expect(result).not.toBeNull()
    const parsed = color.hexToRgb(result!)
    expect(parsed!.r).toBeCloseTo(128, 0)
    expect(parsed!.g).toBeCloseTo(128, 0)
    expect(parsed!.b).toBeCloseTo(128, 0)
  })
})

describe('randomHex', () => {
  it('生成的随机 HEX 格式正确', () => {
    for (let i = 0; i < 20; i++) {
      const hex = color.randomHex()
      expect(hex.length).toBe(7)
      expect(hex[0]).toBe('#')
      expect(color.isValidHex(hex)).toBe(true)
    }
  })

  it('每次生成的结果都不一样呢', () => {
    const hexes = new Set<string>()
    for (let i = 0; i < 50; i++) {
      hexes.add(color.randomHex())
    }
    expect(hexes.size).toBeGreaterThan(1)
  })
})

describe('randomRgb', () => {
  it('生成的随机 RGB 值在范围内', () => {
    for (let i = 0; i < 20; i++) {
      const rgb = color.randomRgb()
      expect(rgb.r).toBeGreaterThanOrEqual(0)
      expect(rgb.r).toBeLessThanOrEqual(255)
      expect(rgb.g).toBeGreaterThanOrEqual(0)
      expect(rgb.g).toBeLessThanOrEqual(255)
      expect(rgb.b).toBeGreaterThanOrEqual(0)
      expect(rgb.b).toBeLessThanOrEqual(255)
    }
  })

  it('返回的是整数', () => {
    const rgb = color.randomRgb()
    expect(Number.isInteger(rgb.r)).toBe(true)
    expect(Number.isInteger(rgb.g)).toBe(true)
    expect(Number.isInteger(rgb.b)).toBe(true)
  })
})

describe('randomRgba', () => {
  it('生成的随机 RGBA 值在范围内', () => {
    for (let i = 0; i < 20; i++) {
      const rgba = color.randomRgba()
      expect(rgba.r).toBeGreaterThanOrEqual(0)
      expect(rgba.r).toBeLessThanOrEqual(255)
      expect(rgba.g).toBeGreaterThanOrEqual(0)
      expect(rgba.g).toBeLessThanOrEqual(255)
      expect(rgba.b).toBeGreaterThanOrEqual(0)
      expect(rgba.b).toBeLessThanOrEqual(255)
      expect(rgba.a).toBeGreaterThanOrEqual(0)
      expect(rgba.a).toBeLessThanOrEqual(1)
    }
  })
})

describe('isValidHex', () => {
  it('有效的 HEX 格式', () => {
    expect(color.isValidHex('#FFF')).toBe(true)
    expect(color.isValidHex('#FFFFFF')).toBe(true)
    expect(color.isValidHex('#FFFF')).toBe(true)
    expect(color.isValidHex('#FFFFFFFF')).toBe(true)
    expect(color.isValidHex('#000')).toBe(true)
    expect(color.isValidHex('#abcdef')).toBe(true)
    expect(color.isValidHex('#ABCDEF')).toBe(true)
  })

  it('无效的 HEX 格式', () => {
    expect(color.isValidHex('')).toBe(false)
    expect(color.isValidHex('#')).toBe(false)
    expect(color.isValidHex('#FF')).toBe(false)
    expect(color.isValidHex('#FFFFF')).toBe(false)
    expect(color.isValidHex('#FFFFFFF')).toBe(false)
    expect(color.isValidHex('FFF')).toBe(false)
    expect(color.isValidHex('#GGG')).toBe(false)
    expect(color.isValidHex('#ZZZZZZ')).toBe(false)
  })
})

describe('isValidRgb', () => {
  it('有效的 RGB 格式', () => {
    expect(color.isValidRgb('rgb(255, 0, 0)')).toBe(true)
    expect(color.isValidRgb('rgb(0, 0, 0)')).toBe(true)
    expect(color.isValidRgb('rgba(255, 128, 0, 0.5)')).toBe(true)
    expect(color.isValidRgb('rgba(0, 0, 0, 1)')).toBe(true)
    expect(color.isValidRgb('rgb( 255 , 128 , 64 )')).toBe(true)
  })

  it('无效的 RGB 格式', () => {
    expect(color.isValidRgb('')).toBe(false)
    expect(color.isValidRgb('rgb()')).toBe(false)
    expect(color.isValidRgb('rgb(255, 0)')).toBe(false)
    expect(color.isValidRgb('hsl(0, 100%, 50%)')).toBe(false)
    expect(color.isValidRgb('#FF0000')).toBe(false)
    expect(color.isValidRgb('red')).toBe(false)
  })
})

describe('isValidHsl', () => {
  it('有效的 HSL 格式', () => {
    expect(color.isValidHsl('hsl(0, 100%, 50%)')).toBe(true)
    expect(color.isValidHsl('hsl(120, 50%, 80%)')).toBe(true)
    expect(color.isValidHsl('hsla(0, 100%, 50%, 0.5)')).toBe(true)
    expect(color.isValidHsl('hsla(240, 60%, 40%, 1)')).toBe(true)
  })

  it('无效的 HSL 格式', () => {
    expect(color.isValidHsl('')).toBe(false)
    expect(color.isValidHsl('hsl()')).toBe(false)
    expect(color.isValidHsl('hsl(0, 100, 50)')).toBe(false)
    expect(color.isValidHsl('rgb(255, 0, 0)')).toBe(false)
    expect(color.isValidHsl('#FF0000')).toBe(false)
  })
})

describe('isValidColor', () => {
  it('识别各种有效颜色格式', () => {
    expect(color.isValidColor('#FF0000')).toBe(true)
    expect(color.isValidColor('#F00')).toBe(true)
    expect(color.isValidColor('rgb(255, 0, 0)')).toBe(true)
    expect(color.isValidColor('rgba(255, 0, 0, 0.5)')).toBe(true)
    expect(color.isValidColor('hsl(0, 100%, 50%)')).toBe(true)
    expect(color.isValidColor('hsla(0, 100%, 50%, 0.5)')).toBe(true)
  })

  it('无效颜色统统不行', () => {
    expect(color.isValidColor('')).toBe(false)
    expect(color.isValidColor('notacolor')).toBe(false)
    expect(color.isValidColor('#GGG')).toBe(false)
    expect(color.isValidColor('rgb()')).toBe(false)
    expect(color.isValidColor('hsl()')).toBe(false)
  })
})
