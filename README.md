# Atomix 前端开发者通用工具类库

> 轻量、模块化、零依赖的 TypeScript 工具库，让前端开发更愉快~ ✨

## 特性

- **零外部依赖** - 纯 TypeScript 实现，无运行时依赖
- **模块化设计** - 13 大功能模块，按需引入，Tree-shaking 友好
- **类型安全** - 完整的 TypeScript 类型定义
- **测试完备** - 500+ 个测试用例，覆盖全面
- **多格式输出** - 支持 ESM、CJS、UMD 三种模块格式

## 安装

```bash
npm install atomix-fe
```

## 快速开始

```typescript
// 引入全部函数
import { debounce, formatDate, isEmail, deepClone } from 'atomix-fe'

// 按需引入（推荐）
import { debounce } from 'atomix-fe/browser'
import { formatDate } from 'atomix-fe/date'
import { isEmail } from 'atomix-fe/validate'
```

---

## 模块一览

### type 类型判断

类型判断工具，处理各种值类型的判断~

```typescript
import { isString, isArray, isEmpty, getType } from 'atomix-fe/type'

isString('hello')           // true
isString(123)               // false
isArray([1, 2, 3])          // true
isEmpty('')                 // true
isEmpty([])                 // true
isEmpty({})                 // true
isEmpty(null)               // true
isEmpty('hello')            // false
getType(new Date())         // 'Date'
getType(/abc/)              // 'RegExp'
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `isString` | 判断是否为字符串 | `isString('hi')` → `true` |
| `isNumber` | 判断是否为数字 | `isNumber(123)` → `true` |
| `isBoolean` | 判断是否为布尔值 | `isBoolean(true)` → `true` |
| `isFunction` | 判断是否为函数 | `isFunction(() => {})` → `true` |
| `isObject` | 判断是否为纯对象 | `isObject({})` → `true` |
| `isArray` | 判断是否为数组 | `isArray([])` → `true` |
| `isNull` | 判断是否为 null | `isNull(null)` → `true` |
| `isUndefined` | 判断是否为 undefined | `isUndefined(undefined)` → `true` |
| `isNullOrUndefined` | 判断是否为 null 或 undefined | `isNullOrUndefined(null)` → `true` |
| `isEmpty` | 判断是否为空值 | `isEmpty([])` → `true` |
| `isPrimitive` | 判断是否为原始类型 | `isPrimitive('str')` → `true` |
| `getType` | 获取精确类型字符串 | `getType(new Date())` → `'Date'` |

---

### string 字符串处理

字符串格式化与转换工具~

```typescript
import { camelCase, kebabCase, truncate, uuid } from 'atomix-fe/string'

camelCase('hello-world')     // 'helloWorld'
camelCase('hello_world')    // 'helloWorld'
kebabCase('helloWorld')     // 'hello-world'
snakeCase('helloWorld')     // 'hello_world'
capitalize('hello')         // 'Hello'
truncate('hello world', 8)  // 'hello...'
truncate('hello', 10, '...') // 'hello'
uuid()                      // 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
escapeHtml('<div>&</div>')  // '&lt;div&gt;&amp;&lt;/div&gt;'
unescapeHtml('&lt;div&gt;')  // '<div>'
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `capitalize` | 首字母大写 | `capitalize('hello')` → `'Hello'` |
| `camelCase` | 转驼峰命名 | `camelCase('hello-world')` → `'helloWorld'` |
| `kebabCase` | 转短横线命名 | `kebabCase('helloWorld')` → `'hello-world'` |
| `snakeCase` | 转下划线命名 | `snakeCase('helloWorld')` → `'hello_world'` |
| `truncate` | 截断字符串 | `truncate('hello world', 8)` → `'hello...'` |
| `trim` | 去除两端字符 | `trim('  hello  ')` → `'hello'` |
| `repeat` | 重复字符串 | `repeat('ab', 3)` → `'ababab'` |
| `padStart` | 左侧填充 | `padStart('5', 3, '0')` → `'005'` |
| `padEnd` | 右侧填充 | `padEnd('hi', 5, '-')` → `'hi---'` |
| `escapeHtml` | HTML 转义 | `escapeHtml('<div>')` → `'&lt;div&gt;'` |
| `unescapeHtml` | HTML 反转义 | `unescapeHtml('&lt;div&gt;')` → `'<div>'` |
| `uuid` | 生成 UUID v4 | `uuid()` → `'a1b2c3d4-...'` |

---

### array 数组操作

强大的数组处理工具，让数据操作更简单~

```typescript
import { unique, chunk, groupBy, shuffle } from 'atomix-fe/array'

unique([1, 2, 2, 3, 3, 3])  // [1, 2, 3]
chunk([1, 2, 3, 4, 5], 2)   // [[1, 2], [3, 4], [5]]
groupBy([{type: 'a', v: 1}, {type: 'b', v: 2}, {type: 'a', v: 3}], x => x.type)
// { a: [{type:'a', v:1}, {type:'a', v:3}], b: [{type:'b', v:2}] }
flatten([[1, 2], [3, [4, 5]]])  // [1, 2, 3, [4, 5]]
flatten([[1, 2], [3, [4, 5]]], 2)  // [1, 2, 3, 4, 5]
compact([1, false, 0, '', null, undefined])  // [1]
difference([1, 2, 3], [2, 4])    // [1, 3]
intersection([1, 2, 3], [2, 3, 4])  // [2, 3]
union([1, 2], [3, 4])           // [1, 2, 3, 4]
sample([1, 2, 3, 4, 5], 2)     // 随机取2个
range(1, 5)                     // [1, 2, 3, 4, 5]
range(0, 10, 2)                 // [0, 2, 4, 6, 8, 10]
first([1, 2, 3])                // 1
last([1, 2, 3])                 // 3
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `unique` | 数组去重 | `unique([1,2,2])` → `[1,2]` |
| `uniqueBy` | 按条件去重 | `uniqueBy([{a:1},{a:2},{a:1}], x=>x.a)` |
| `flatten` | 数组扁平化 | `flatten([[1,2],[3]])` → `[1,2,3]` |
| `chunk` | 数组分块 | `chunk([1,2,3,4,5], 2)` → `[[1,2],[3,4],[5]]` |
| `groupBy` | 数组分组 | 按指定 key 分组成对象 |
| `sortBy` | 数组排序 | 支持 asc/desc 顺序 |
| `shuffle` | 随机打乱 | Fisher-Yates 算法 |
| `intersection` | 交集 | 两数组共同元素 |
| `union` | 并集 | 合并去重 |
| `difference` | 差集 | 在A不在B的元素 |
| `sample` | 随机取样 | 随机取 N 个 |
| `compact` | 移除假值 | 移除 false/null/0/''/undefined |
| `first` | 获取第一个 | `first([1,2,3])` → `1` |
| `last` | 获取最后一个 | `last([1,2,3])` → `3` |
| `range` | 生成范围 | `range(1, 5)` → `[1,2,3,4,5]` |

---

### object 对象操作

对象处理神器，深度操作无压力~

```typescript
import { deepClone, deepMerge, pick, get, set } from 'atomix-fe/object'

deepClone({ a: { b: 1 } })           // 完全独立的深拷贝
deepMerge({ a: 1 }, { a: 2, b: 3 }) // { a: 2, b: 3 }
pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])  // { a: 1, c: 3 }
omit({ a: 1, b: 2, c: 3 }, ['b'])    // { a: 1, c: 3 }
get({ a: { b: { c: 1 } } }, 'a.b.c')  // 1
get({ a: {} }, 'a.b.c', 'default')   // 'default'
set({}, 'a.b.c', 1)                   // { a: { b: { c: 1 } } }
flattenObject({ a: { b: 1 } })        // { 'a.b': 1 }
mapValues({ a: 1, b: 2 }, v => v * 2) // { a: 2, b: 4 }
invert({ a: 'x', b: 'y' })           // { x: 'a', y: 'b' }
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `deepClone` | 深拷贝 | 支持 Date/RegExp/Map/Set |
| `deepMerge` | 深合并 | 递归合并嵌套对象 |
| `pick` | 选取属性 | 从对象中挑选指定 key |
| `omit` | 排除属性 | 排除指定 key |
| `mapKeys` | 映射键名 | 遍历转换所有 key |
| `mapValues` | 映射值 | 遍历转换所有 value |
| `invert` | 键值互换 | key 和 value 互换 |
| `flattenObject` | 对象扁平化 | `{a:{b:1}}` → `{'a.b':1}` |
| `get` | 安全取值 | 支持 `a.b.c` 和 `a[0].b` 路径 |
| `set` | 安全设值 | 自动创建中间结构，不修改原对象 |

---

### number 数字处理

数字计算与格式化工具~

```typescript
import { clamp, formatNumber, random, percentage } from 'atomix-fe/number'

clamp(10, 0, 5)                    // 5
clamp(-5, 0, 10)                   // 0
random(1, 100)                     // 1-100 随机整数
randomFloat(0, 10, 2)              // 0-10 随机浮点数，保留2位
formatNumber(1234567)              // '1,234,567'
formatNumber(1234567.89, 2)        // '1,234,567.89'
toFixed(1.23456, 2)                // 1.23 (number类型)
sum(1, 2, 3, 4, 5)                 // 15
average(1, 2, 3, 4, 5)             // 3
percentage(25, 100)                // 25
percentage(1, 3, 2)                // 33.33
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `clamp` | 限制范围 | 确保值在 min~max 之间 |
| `random` | 随机整数 | 包含 min 和 max |
| `randomFloat` | 随机浮点数 | 可指定精度 |
| `formatNumber` | 千分位格式化 | `1234567` → `'1,234,567'` |
| `toFixed` | 指定小数位 | 返回数字类型（非字符串） |
| `sum` | 求和 | 支持任意多个参数 |
| `average` | 求平均 | 支持任意多个参数 |
| `percentage` | 百分比 | 支持指定精度 |

---

### date 日期时间

日期处理与格式化工具~

```typescript
import { formatDate, timeAgo, addDays, isToday } from 'atomix-fe/date'

formatDate(new Date('2024-01-15T10:30:00'))
// '2024-01-15 10:30:00'
formatDate(new Date(), 'YYYY/MM/DD')
// '2024/01/15'
formatDate(new Date(), 'YYYY-MM-DD HH:mm')
// '2024-01-15 10:30'

timeAgo(Date.now() - 60000)        // '刚刚'
timeAgo(Date.now() - 3600000)       // '1小时前'
timeAgo(Date.now() - 86400000)      // '1天前'

isToday(new Date())                 // true
isYesterday(new Date() - 86400000)  // true
addDays(new Date('2024-01-15'), 5)  // 2024-01-20
diffDays('2024-01-15', '2024-01-20')  // 5
isLeapYear(2024)                   // true
getDaysInMonth(2024, 2)            // 29 (闰年二月)
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `formatDate` | 格式化日期 | 支持 YYYY/MM/DD/HH/mm/ss |
| `timeAgo` | 相对时间 | `'刚刚'`/`'3分钟前'`/`'2天前'` |
| `isToday` | 是否今天 | 判断日期是否为今天 |
| `isYesterday` | 是否昨天 | 判断日期是否为昨天 |
| `addDays` | 日期加减 | 返回新的 Date 对象 |
| `diffDays` | 日期间隔 | 计算相差天数（绝对值） |
| `startOfDay` | 当天开始 | `00:00:00.000` |
| `endOfDay` | 当天结束 | `23:59:59.999` |
| `isLeapYear` | 是否闰年 | 四年一闰百年不闰 |
| `getDaysInMonth` | 月份天数 | 获取指定月的天数 |

---

### browser 浏览器工具

浏览器/DOM 相关工具，处理常见的浏览器操作~

```typescript
import { debounce, throttle, copyToClipboard, isMobile } from 'atomix-fe/browser'

// 防抖
const debouncedFn = debounce(() => {
  console.log('执行了')
}, 500)
debouncedFn()  // 500ms 后才执行
debouncedFn()  // 重置计时器
debouncedFn.cancel()  // 取消执行

// 节流
const throttledFn = throttle(() => {
  console.log('执行了')
}, 1000)
throttledFn()  // 立即执行
throttledFn()  // 忽略
throttledFn.cancel()

// 复制到剪贴板
await copyToClipboard('hello')

// 设备判断
isMobile()  // true/false

// 存储
setStorage('token', { token: 'xxx' })
const token = getStorage('token')

// Cookie
setCookie('name', 'value', { expires: 7, path: '/' })
getCookie('name')
removeCookie('name')

// 浏览器信息
getBrowserInfo()  // { name: 'Chrome', version: '120' }
getScrollPosition()  // { x: 0, y: 100 }
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `debounce` | 防抖 | 延迟执行，支持 `cancel()` |
| `throttle` | 节流 | 间隔执行，支持 `cancel()` |
| `getCookie` | 获取 Cookie | 按名称获取 |
| `setCookie` | 设置 Cookie | 支持 expires/path/secure |
| `removeCookie` | 删除 Cookie | 设为过期 |
| `getStorage` | 读取存储 | 自动 JSON 解析 |
| `setStorage` | 写入存储 | 自动 JSON 序列化 |
| `removeStorage` | 删除存储 | |
| `copyToClipboard` | 复制到剪贴板 | async 函数 |
| `getScrollPosition` | 滚动位置 | `{ x, y }` |
| `isMobile` | 是否移动设备 | 基于 userAgent |
| `getBrowserInfo` | 浏览器信息 | `{ name, version }` |

---

### url URL 工具

URL 解析与处理工具~

```typescript
import { parseQuery, stringifyQuery, parseUrl } from 'atomix-fe/url'

parseQuery('name=tom&age=18')
// { name: 'tom', age: '18' }
parseQuery('?name=tom&age=18')
// { name: 'tom', age: '18' }

stringifyQuery({ name: 'tom', age: 18 })
// 'name=tom&age=18'

addQuery('/api/users', { page: 1, size: 10 })
// '/api/users?page=1&size=10'
removeQuery('/api/users?page=1&size=10', ['page'])
// '/api/users?size=10'

parseUrl('https://example.com:8080/path?query=1#hash')
// { protocol: 'https', host: 'example.com', port: '8080', path: '/path', query: 'query=1', hash: 'hash' }

isAbsoluteUrl('https://example.com')  // true
isAbsoluteUrl('/api/users')           // false
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `parseQuery` | 解析查询字符串 | `?a=1&b=2` → `{ a: '1', b: '2' }` |
| `stringifyQuery` | 序列化为查询字符串 | `{ a: 1 }` → `a=1` |
| `addQuery` | 添加查询参数 | 自动判断 `?` 或 `&` |
| `removeQuery` | 移除查询参数 | |
| `parseUrl` | 解析 URL | 各组成部分 |
| `isAbsoluteUrl` | 是否绝对路径 | 判断 http/https// 等 |

---

### validate 数据校验

常见数据格式校验工具，表单验证好帮手~

```typescript
import { isEmail, isPhone, isIdCard, isStrongPassword } from 'atomix-fe/validate'

isEmail('test@example.com')         // true
isEmail('invalid-email')             // false

isPhone('13812345678')               // true (中国大陆)
isPhone('12345678901')               // false

isUrl('https://example.com')         // true
isUrl('not-a-url')                   // false

isIdCard('11010119900101123X')       // true (带校验码验证)
isIdCard('110101199001011234')       // false

isIP('192.168.1.1')                  // true
isIP('256.1.1.1')                    // false

isMacAddress('00:1B:44:11:3A:B7')    // true
isMacAddress('00-1B-44-11-3A-B7')    // true

isNumeric('123456')                  // true
isNumeric('123a')                    // false

isAlphanumeric('abc123')             // true
isChinese('你好')                    // true
isChinese('hello')                   // false

isStrongPassword('Abc123!@#')       // true
isStrongPassword('abc123')           // false (缺大写和特殊字符)
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `isEmail` | 邮箱校验 | |
| `isPhone` | 中国大陆手机号 | 1 开头 11 位 |
| `isUrl` | URL 校验 | |
| `isIdCard` | 身份证校验 | 18 位，含校验码验证 |
| `isIP` | IPv4 校验 | |
| `isMacAddress` | MAC 地址校验 | 支持 `:` 和 `-` |
| `isNumeric` | 纯数字字符串 | |
| `isAlphanumeric` | 字母数字组合 | |
| `isChinese` | 全中文判断 | `\u4e00-\u9fa5` |
| `isStrongPassword` | 强密码 | 至少 3 种字符类型，8 位以上 |

---

### file 文件工具

文件处理与下载工具~

```typescript
import { downloadFile, formatFileSize, isImage, getFileExtension } from 'atomix-fe/file'

downloadFile('hello world', 'test.txt', 'text/plain')

getFileExtension('image.png')        // 'png'
getFileExtension('file.tar.gz')     // 'gz'

formatFileSize(0)                    // '0 B'
formatFileSize(1024)                 // '1 KB'
formatFileSize(1048576)              // '1 MB'
formatFileSize(1073741824)          // '1 GB'

isImage('photo.jpg')                 // true
isImage('document.pdf')              // false
isImage('avatar.png')                // true

// 读取文件内容
const text = await readFileAsText(file)
const dataUrl = await readFileAsDataURL(file)
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `downloadFile` | 下载文件 | 支持 string/Blob/ArrayBuffer |
| `getFileExtension` | 获取扩展名 | `'image.png'` → `'png'` |
| `formatFileSize` | 格式化大小 | `1048576` → `'1 MB'` |
| `readFileAsText` | 读取为文本 | Promise<FileReader> |
| `readFileAsDataURL` | 读取为 DataURL | Promise<FileReader> |
| `isImage` | 是否图片文件 | jpg/png/gif/webp/svg... |

---

### math 数学计算

数学计算与三角函数工具，动画开发必备~

```typescript
import { radian, sin, gcd, factorial, lerp, map, easeInOut } from 'atomix-fe/math'

radian(180)                // 3.141592653589793 (π)
degree(Math.PI)            // 180
sin(30)                    // 0.5
cos(60)                    // 0.5
gcd(12, 8)                 // 4
lcm(4, 6)                  // 12
factorial(5)               // 120
fibonacci(10)              // 55
lerp(0, 100, 0.5)         // 50
map(50, 0, 100, 0, 1)    // 0.5
easeInOut(0.5)            // 0.5
isPowerOfTwo(16)          // true
nearestPowerOfTwo(10)     // 8
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `radian` | 角度转弧度 | `radian(180)` → `π` |
| `degree` | 弧度转角度 | `degree(π)` → `180` |
| `sin` | 正弦（输入角度） | `sin(30)` → `0.5` |
| `cos` | 余弦（输入角度） | `cos(60)` → `0.5` |
| `tan` | 正切（输入角度） | `tan(45)` → `1` |
| `gcd` | 最大公约数 | `gcd(12, 8)` → `4` |
| `lcm` | 最小公倍数 | `lcm(4, 6)` → `12` |
| `factorial` | 阶乘 | `factorial(5)` → `120` |
| `fibonacci` | 斐波那契数列 | `fibonacci(10)` → `55` |
| `lerp` | 线性插值 | `lerp(0, 100, 0.5)` → `50` |
| `normalize` | 归一化 | `normalize(50, 0, 100)` → `0.5` |
| `map` | 范围映射 | 从一个范围映射到另一个 |
| `easeIn` | 缓入 | 二次缓动 |
| `easeOut` | 缓出 | 二次缓动 |
| `easeInOut` | 缓入缓出 | 二次缓动 |
| `isPowerOfTwo` | 是否2的幂 | `isPowerOfTwo(16)` → `true` |
| `nearestPowerOfTwo` | 最近的2的幂 | `nearestPowerOfTwo(10)` → `8` |
| `mod` | 取模（支持负数） | `mod(-1, 3)` → `2` |
| `clamp` | 限制范围 | `clamp(10, 0, 5)` → `5` |

---

### color 颜色处理

颜色转换与操作工具，设计开发必备~

```typescript
import { hexToRgb, rgbToHex, parseColor, lighten, darken, mix } from 'atomix-fe/color'

hexToRgb('#FF6B35')           // { r: 255, g: 107, b: 53 }
rgbToHex(255, 107, 53)       // '#FF6B35'

parseColor('#ff6b35')         // { r: 255, g: 107, b: 53, a: 1 }
parseColor('rgb(255, 107, 53)')  // { r: 255, g: 107, b: 53, a: 1 }
parseColor('rgba(255, 107, 53, 0.5)')  // { r: 255, g: 107, b: 53, a: 0.5 }
parseColor('hsl(20, 100%, 60%)')       // 自动转为 RGBA

lighten('#333333', 20)        // 更亮的颜色
darken('#EEEEEE', 30)         // 更暗的颜色
saturate('#888888', 50)       // 增加饱和度
desaturate('#FF0000', 50)     // 降低饱和度
invert('#FF0000')              // '#00FFFF'
grayscale('#FF0000')           // 灰度颜色
alpha('#FF0000', 0.5)         // 设置透明度
mix('#FF0000', '#0000FF', 0.5)  // 混合颜色
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `hexToRgb` | HEX 转 RGB | `'#FF6B35'` → `{ r: 255, g: 107, b: 53 }` |
| `rgbToHex` | RGB 转 HEX | `rgbToHex(255, 107, 53)` → `'#FF6B35'` |
| `hexToRgba` | HEX 转 RGBA | 支持8位带透明度 |
| `rgbaToHex` | RGBA 转 HEX | 支持透明度编码 |
| `rgbToHsl` | RGB 转 HSL | 返回 `{ h, s, l }` |
| `hslToRgb` | HSL 转 RGB | 返回 `{ r, g, b }` |
| `hexToHsl` | HEX 转 HSL | 一步到位 |
| `hslToHex` | HSL 转 HEX | 一步到位 |
| `parseColor` | 智能解析颜色 | 支持 hex/rgb/hsl/hsla 格式 |
| `lighten` | 颜色变亮 | 调整 HSL 亮度 |
| `darken` | 颜色变暗 | 调整 HSL 亮度 |
| `saturate` | 增加饱和度 | |
| `desaturate` | 降低饱和度 | |
| `invert` | 反色 | RGB 各通道取反 |
| `grayscale` | 灰度化 | 加权灰度计算 |
| `alpha` | 设置透明度 | 返回带透明度的颜色 |
| `mix` | 混合两种颜色 | 支持权重参数 |
| `randomHex` | 随机 HEX 颜色 | |
| `randomRgb` | 随机 RGB 颜色 | |
| `isValidColor` | 校验颜色格式 | 支持 hex/rgb/hsl |

---

### fp 函数式编程

函数式编程工具，让代码更优雅~

```typescript
import { compose, pipe, curry, memoize, once } from 'atomix-fe/fp'

// 组合函数
const add1 = (x: number) => x + 1
const double = (x: number) => x * 2
const add1ThenDouble = compose(double, add1)
add1ThenDouble(3)            // 8 (3+1=4, 4*2=8)

// 管道函数（从左到右执行）
const doubleThenAdd1 = pipe(double, add1)
doubleThenAdd1(3)            // 7 (3*2=6, 6+1=7)

// 柯里化
const add = curry((a: number, b: number) => a + b)
const add5 = add(5)
add5(3)                      // 8

// 记忆化
const expensiveFn = memoize((n: number) => {
  console.log('计算中...')
  return n * n
})
expensiveFn(5)               // '计算中...' 25
expensiveFn(5)               // 25 (直接返回缓存)

// 只执行一次
const init = once(() => {
  console.log('初始化!')
  return true
})
init()                       // '初始化!' true
init()                       // true (不再执行)
```

| 函数 | 说明 | 示例 |
|------|------|------|
| `compose` | 函数组合（从右到左） | `compose(f, g)(x)` → `f(g(x))` |
| `pipe` | 管道（从左到右） | `pipe(f, g)(x)` → `g(f(x))` |
| `curry` | 柯里化 | `curry(f)(a)(b)` |
| `partial` | 偏函数 | `partial(f, a)(b)` |
| `memoize` | 记忆化缓存 | 相同参数直接返回缓存 |
| `debounce` | 防抖（函数式版） | |
| `throttle` | 节流（函数式版） | |
| `once` | 只执行一次 | |
| `noop` | 空函数 | `() => {}` |
| `identity` | 恒等函数 | `x => x` |
| `constant` | 常量函数 | `() => value` |
| `flip` | 参数翻转 | `flip(f)(b, a)` |
| `not` | 逻辑取反 | 返回新的谓词函数 |
| `both` | 逻辑与 | 两个谓词都满足 |
| `either` | 逻辑或 | 任一谓词满足 |
| `tap` | 副作用 | 执行副作用但返回原值 |
| `chain` | 函数链接 | `chain(f, g)(x)` |
| `juxt` | 并行执行 | 对同一值应用多个函数 |
| `delay` | 延迟执行 | Promise 延迟 |
| `retry` | 重试 | 失败自动重试 |
| `times` | 重复执行 | `times(f, 3)` → `[f(0), f(1), f(2)]` |
| `ifElse` | 条件分支 | 根据条件执行不同函数 |
| `cond` | 多条件匹配 | 类似 switch |
| `when` | 条件执行 | 满足条件才执行 |
| `unless` | 反条件执行 | 不满足条件才执行 |

---

## 脚本命令

```bash
# 开发模式（监听构建）
npm run dev

# 生产构建
npm run build

# 运行测试
npm run test

# 监听测试
npm run test:watch

# 测试覆盖率
npm run test:coverage
```

---

## 扩展库

想添加新功能？超简单~

1. 在对应模块目录创建新函数文件，如 `src/string/myFunc.ts`
2. 在模块的 `index.ts` 中导出
3. 在 `src/index.ts` 中添加导出
4. 添加对应的测试用例
5. 运行 `npm run test` 确保测试通过

```typescript
// src/string/myFunc.ts
export function myFunc(str: string): string {
  return str.toUpperCase()
}

// src/string/index.ts
export * from './myFunc'  // 添加这行

// src/index.ts
export * from './string'  // 已经有了，会自动包含
```

---

## License

MIT
