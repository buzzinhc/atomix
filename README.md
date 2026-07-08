# atomix-fe

> 轻量、模块化、零依赖的 TypeScript 前端工具库，让前端开发更愉快~

## 特性

- **零依赖** - 纯原生实现，无第三方依赖
- **模块化** - 按需引入，支持 ESM/CJS 双格式
- **TypeScript** - 完整类型定义，类型安全
- **轻量高效** - 最小化打包体积
- **功能丰富** - 17 个模块，800+ 个单元测试

## 安装

```bash
npm install atomix-fe
# 或
pnpm add atomix-fe
# 或
yarn add atomix-fe
```

## 使用方式

```typescript
// 完整引入
import { capitalize, formatDate, debounce } from 'atomix-fe'

// 按模块引入（推荐，减少打包体积）
import { capitalize, camelCase } from 'atomix-fe/string'
import { formatDate, timeAgo } from 'atomix-fe/date'
import { debounce, throttle } from 'atomix-fe/browser'
import { addClass, createElement } from 'atomix-fe/dom'
```

## 功能列表

### 📝 string 字符串处理

| 函数 | 说明 | 示例 |
|------|------|------|
| `capitalize` | 首字母大写 | `capitalize('hello')` → `'Hello'` |
| `camelCase` | 转驼峰命名 | `camelCase('hello-world')` → `'helloWorld'` |
| `kebabCase` | 转短横线命名 | `kebabCase('helloWorld')` → `'hello-world'` |
| `snakeCase` | 转下划线命名 | `snakeCase('helloWorld')` → `'hello_world'` |
| `truncate` | 截断字符串 | `truncate('hello world', 8)` → `'hello...'` |
| `trim` | 去除两端空白 | `trim('  hello  ')` → `'hello'` |
| `repeat` | 重复字符串 | `repeat('ab', 3)` → `'ababab'` |
| `padStart` | 左侧填充 | `padStart('5', 3, '0')` → `'005'` |
| `padEnd` | 右侧填充 | `padEnd('hi', 5, '-')` → `'hi---'` |
| `escapeHtml` | HTML 转义 | `escapeHtml('<div>')` → `'&lt;div&gt;'` |
| `unescapeHtml` | HTML 反转义 | `unescapeHtml('&lt;div&gt;')` → `'<'` |
| `uuid` | 生成 UUID v4 | `uuid()` → `'a1b2c3d4-...'` |

### 🔍 type 类型判断

| 函数 | 说明 | 示例 |
|------|------|------|
| `isString` | 判断字符串 | `isString('hello')` → `true` |
| `isNumber` | 判断数字 | `isNumber(123)` → `true` |
| `isBoolean` | 判断布尔值 | `isBoolean(true)` → `true` |
| `isFunction` | 判断函数 | `isFunction(() => {})` → `true` |
| `isObject` | 判断纯对象 | `isObject({})` → `true` |
| `isArray` | 判断数组 | `isArray([1, 2])` → `true` |
| `isNull` | 判断 null | `isNull(null)` → `true` |
| `isUndefined` | 判断 undefined | `isUndefined(undefined)` → `true` |
| `isNullOrUndefined` | 判断 null 或 undefined | `isNullOrUndefined(null)` → `true` |
| `isEmpty` | 判断空值 | `isEmpty('')` → `true` |
| `isPrimitive` | 判断原始类型 | `isPrimitive('str')` → `true` |
| `getType` | 获取精确类型 | `getType(new Date())` → `'Date'` |

### 📦 array 数组操作

| 函数 | 说明 | 示例 |
|------|------|------|
| `unique` | 数组去重 | `unique([1, 2, 2, 3])` → `[1, 2, 3]` |
| `uniqueBy` | 按条件去重 | `uniqueBy([{a:1},{a:2},{a:1}], x => x.a)` |
| `flatten` | 数组扁平化 | `flatten([[1,2],3])` → `[1, 2, 3]` |
| `chunk` | 数组分块 | `chunk([1,2,3,4,5], 2)` → `[[1,2],[3,4],[5]]` |
| `groupBy` | 数组分组 | 按指定 key 分组成对象 |
| `sortBy` | 数组排序 | 支持 asc/desc 顺序 |
| `shuffle` | 随机打乱 | Fisher-Yates 算法 |
| `intersection` | 交集 | 两数组共同元素 |
| `union` | 并集 | 合并去重 |
| `difference` | 差集 | 在 A 不在 B 的元素 |
| `sample` | 随机取样 | 随机取 N 个 |
| `compact` | 移除假值 | 移除 `false/null/0/''/undefined` |
| `first` | 获取第一个 | `first([1, 2, 3])` → `1` |
| `last` | 获取最后一个 | `last([1, 2, 3])` → `3` |
| `range` | 生成范围 | `range(1, 5)` → `[1, 2, 3, 4, 5]` |

### 🗂️ object 对象操作

| 函数 | 说明 | 示例 |
|------|------|------|
| `deepClone` | 深拷贝 | 支持 `Date/RegExp/Map/Set` |
| `deepMerge` | 深合并 | 递归合并嵌套对象 |
| `pick` | 选取属性 | 从对象中挑选指定 key |
| `omit` | 排除属性 | 排除指定 key |
| `mapKeys` | 映射键名 | 遍历转换所有 key |
| `mapValues` | 映射值 | 遍历转换所有 value |
| `invert` | 键值互换 | key 和 value 互换 |
| `flattenObject` | 对象扁平化 | `{a:{b:1}}` → `{'a.b':1}` |
| `get` | 安全取值 | 支持 `'a.b.c'` 和 `'a[0].b'` 路径 |
| `set` | 安全设值 | 自动创建中间结构 |

### 🔢 number 数字处理

| 函数 | 说明 | 示例 |
|------|------|------|
| `clamp` | 限制范围 | `clamp(10, 0, 5)` → `5` |
| `random` | 随机整数 | `random(1, 100)` → 1-100 随机整数 |
| `randomFloat` | 随机浮点数 | 可指定精度 |
| `formatNumber` | 千分位格式化 | `formatNumber(1234567)` → `'1,234,567'` |
| `formatCurrency` | 货币格式化 | `formatCurrency(1234)` → `'¥1,234.00'` |
| `toFixed` | 指定小数位 | 返回数字类型 |
| `sum` | 求和 | `sum(1, 2, 3, 4, 5)` → `15` |
| `average` | 求平均 | `average(1, 2, 3)` → `2` |
| `percentage` | 百分比 | `percentage(25, 100)` → `25` |

### 📅 date 日期时间

| 函数 | 说明 | 示例 |
|------|------|------|
| `formatDate` | 格式化日期 | 支持 `YYYY/MM/DD/HH/mm/ss` |
| `timeAgo` | 相对时间 | `'刚刚'/'3分钟前'/'2天前'` |
| `isToday` | 是否今天 | 判断日期是否为今天 |
| `isYesterday` | 是否昨天 | 判断日期是否为昨天 |
| `addDays` | 日期加减 | 返回新的 Date 对象 |
| `diffDays` | 日期间隔 | 计算相差天数 |
| `startOfDay` | 当天开始 | `00:00:00.000` |
| `endOfDay` | 当天结束 | `23:59:59.999` |
| `isLeapYear` | 是否闰年 | 四年一闰百年不闰 |
| `getDaysInMonth` | 月份天数 | 获取指定月的天数 |

### 🌐 browser 浏览器工具

| 函数 | 说明 |
|------|------|
| `debounce` | 防抖，延迟执行，支持 `cancel()` |
| `throttle` | 节流，间隔执行，支持 `cancel()` |
| `getCookie` / `setCookie` / `removeCookie` | Cookie 操作 |
| `copyToClipboard` | 复制到剪贴板（async） |
| `getScrollPosition` | 获取滚动位置 `{ x, y }` |
| `isMobile` | 是否移动设备 |
| `getBrowserInfo` | 浏览器信息 `{ name, version }` |
| `lazyLoadImage` | 图片懒加载，基于 IntersectionObserver |
| `observeIntersection` | 元素可见性观察，返回清理函数 |

### 🔗 url URL 工具

| 函数 | 说明 | 示例 |
|------|------|------|
| `parseQuery` | 解析查询字符串 | `'?a=1&b=2'` → `{ a: '1', b: '2' }` |
| `stringifyQuery` | 序列化查询字符串 | `{ a: 1 }` → `'a=1'` |
| `addQuery` | 添加查询参数 | 自动判断 `?` 或 `&` |
| `removeQuery` | 移除查询参数 | |
| `parseUrl` | 解析 URL | 各组成部分 |
| `isAbsoluteUrl` | 是否绝对路径 | 判断 `http/https` 等 |
| `getQueryParam` | 获取指定参数 | `getQueryParam('?a=1', 'a')` → `'1'` |
| `setQueryParam` | 设置参数 | `setQueryParam(url, 'a', '2')` |
| `hasQueryParam` | 是否包含参数 | 返回 `boolean` |

### ✅ validate 数据校验

| 函数 | 说明 | 示例 |
|------|------|------|
| `isEmail` | 邮箱校验 | `isEmail('test@example.com')` → `true` |
| `isPhone` | 中国大陆手机号 | 1 开头 11 位 |
| `isUrl` | URL 校验 | `isUrl('https://example.com')` → `true` |
| `isIdCard` | 身份证校验 | 18 位，含校验码验证 |
| `isIP` | IPv4 校验 | `isIP('192.168.1.1')` → `true` |
| `isMacAddress` | MAC 地址校验 | 支持 `:` 和 `-` |
| `isNumeric` | 纯数字字符串 | `isNumeric('123456')` → `true` |
| `isAlphanumeric` | 字母数字组合 | `isAlphanumeric('abc123')` → `true` |
| `isChinese` | 全中文判断 | |
| `isStrongPassword` | 强密码 | 至少 3 种字符类型，8 位以上 |

### 📁 file 文件工具

| 函数 | 说明 |
|------|------|
| `downloadFile` | 下载文件，支持 `string/Blob/ArrayBuffer` |
| `getFileExtension` | 获取扩展名，`'image.png'` → `'png'` |
| `formatFileSize` | 格式化大小，`formatFileSize(1048576)` → `'1 MB'` |
| `readFileAsText` | 读取为文本（Promise） |
| `readFileAsDataURL` | 读取为 DataURL（Promise） |
| `isImage` | 是否图片文件 |

### 🧮 math 数学计算

| 函数 | 说明 | 示例 |
|------|------|------|
| `radian` / `degree` | 角度弧度转换 | `radian(180)` → `π` |
| `sin` / `cos` / `tan` | 三角函数（角度输入） | `sin(30)` → `0.5` |
| `mod` | 取模（支持负数） | `mod(-1, 3)` → `2` |
| `gcd` / `lcm` | 最大公约数/最小公倍数 | `gcd(12, 8)` → `4` |
| `factorial` | 阶乘 | `factorial(5)` → `120` |
| `fibonacci` | 斐波那契数列 | `fibonacci(10)` → `55` |
| `lerp` | 线性插值 | `lerp(0, 100, 0.5)` → `50` |
| `normalize` | 归一化 | `normalize(50, 0, 100)` → `0.5` |
| `map` | 范围映射 | 从一个范围映射到另一个 |
| `easeIn` / `easeOut` / `easeInOut` | 缓动函数 | 二次缓动 |
| `isPowerOfTwo` | 是否 2 的幂 | `isPowerOfTwo(16)` → `true` |
| `nearestPowerOfTwo` | 最近的 2 的幂 | `nearestPowerOfTwo(10)` → `8` |

### 🎨 color 颜色处理

| 函数 | 说明 |
|------|------|
| `hexToRgb` / `rgbToHex` | HEX ↔ RGB 转换 |
| `hexToRgba` / `rgbaToHex` | HEX ↔ RGBA 转换 |
| `rgbToHsl` / `hslToRgb` | RGB ↔ HSL 转换 |
| `hexToHsl` / `hslToHex` | HEX ↔ HSL 转换 |
| `parseColor` | 智能解析颜色 |
| `lighten` / `darken` | 颜色变亮/变暗 |
| `saturate` / `desaturate` | 增加/降低饱和度 |
| `grayscale` | 灰度化 |
| `alpha` | 设置透明度 |
| `mix` | 混合两种颜色 |
| `randomHex` / `randomRgb` / `randomRgba` | 随机颜色 |
| `isValidHex` / `isValidRgb` / `isValidHsl` / `isValidColor` | 颜色格式校验 |

### 🔧 fp 函数式编程

| 函数 | 说明 |
|------|------|
| `compose` | 函数组合（从右到左） |
| `pipe` | 管道（从左到右） |
| `curry` | 柯里化 |
| `partial` | 偏函数 |
| `memoize` | 记忆化缓存 |
| `once` | 只执行一次 |
| `noop` | 空函数 `() => {}` |
| `identity` | 恒等函数 `x => x` |
| `constant` | 常量函数 `() => value` |
| `flip` | 参数翻转 |
| `not` / `both` / `either` | 逻辑函数 |
| `tap` | 副作用 |
| `delay` | 延迟执行（Promise） |
| `retry` | 重试机制 |
| `when` / `unless` / `cond` / `ifElse` | 条件执行 |

### ⏳ promise Promise 工具

| 函数 | 说明 |
|------|------|
| `delay` | 延迟执行 |
| `timeout` | 超时控制 |
| `retry` | 重试机制 |
| `all` / `allSettled` / `race` / `any` | Promise 静态方法 |
| `promisify` | 回调转 Promise |
| `debouncePromise` / `throttlePromise` | 异步防抖/节流 |
| `waterfall` | 瀑布流执行 |
| `parallelLimit` | 并发限制 |
| `withRetry` | 智能重试（支持指数退避） |

### 📡 event 事件总线

```typescript
import { EventEmitter, eventBus } from 'atomix-fe/event'

// 创建实例
const emitter = new EventEmitter()

// 监听事件（返回取消订阅函数）
const unsubscribe = emitter.on('message', (data) => console.log(data))

// 触发事件
emitter.emit('message', 'Hello!')

// 取消订阅
unsubscribe()
// 或 emitter.off('message', handler)

// 全局事件总线
eventBus.emit('global-event', data)
eventBus.on('global-event', handler)
```

**EventEmitter 方法：**
- `on(event, handler)` - 监听事件，返回取消订阅函数
- `once(event, handler)` - 一次性监听
- `off(event, handler)` - 移除监听
- `emit(event, data?)` - 触发事件
- `clear(event?)` - 清空监听
- `listenerCount(event)` - 监听器数量

### 💾 storage 本地存储

```typescript
import { localStore, sessionStore } from 'atomix-fe/storage'

// 存储（支持过期时间，单位秒）
localStore.set('token', 'xxx', 3600)  // 1小时后过期

// 获取（自动反序列化）
const token = localStore.get<string>('token')

// 其他方法
localStore.has('token')    // 检查是否存在
localStore.remove('token') // 删除
localStore.keys()          // 获取所有 key
localStore.size()          // 获取存储数量
localStore.clear()         // 清空
```

### 🖱️ dom DOM 操作

```typescript
import { $, $$, addClass, removeClass, createElement } from 'atomix-fe/dom'

// 选择器
const el = $('#my-element')
const els = $$('.item')

// 类名操作
addClass(el, 'active')
removeClass(el, 'active')
toggleClass(el, 'active')
hasClass(el, 'active')  // → boolean

// 样式操作
setStyle(el, 'color', 'red')
setStyle(el, { color: 'red', fontSize: '16px' })
show(el)   // 或 show(el, 'flex')
hide(el)

// 创建元素
const btn = createElement('button', {
  className: 'btn-primary',
  style: { padding: '0.5rem 1rem' },
  dataset: { id: '123' },
})

// DOM 操作
append(parent, child)
prepend(parent, child)
remove(el)
empty(parent)

// 文本和数据
setText(el, 'hello')
getText(el)          // → 'hello'
setData(el, 'id', '1')
getData(el, 'id')    // → '1'
```

**完整 DOM 函数列表：**

| 函数 | 说明 |
|------|------|
| `$` / `$$` | 选择器查询 |
| `addClass` / `removeClass` / `toggleClass` / `hasClass` | 类名操作 |
| `getStyle` / `setStyle` | 样式操作 |
| `show` / `hide` / `isHidden` | 显示/隐藏 |
| `append` / `prepend` / `remove` / `empty` | DOM 操作 |
| `offset` / `scrollIntoView` | 元素定位 |
| `closest` / `next` / `prev` / `siblings` | 遍历 |
| `createElement` | 创建元素 |
| `getText` / `setText` / `getData` / `setData` | 文本和数据 |

## 开发

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 构建
npm run build

# 运行 demo
cd demo && npm install && npm run dev
```

## License

MIT