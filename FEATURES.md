# atomix-fe 功能清单

## 📦 版本：0.4.0

---

## 1. string 字符串处理

| 函数 | 说明 | 示例 |
|------|------|
| capitalize | 首字母大写 | capitalize('hello') → 'Hello' |
| camelCase | 转驼峰命名 | camelCase('hello-world') → 'helloWorld' |
| kebabCase | 转短横线命名 | kebabCase('helloWorld') → 'hello-world' |
| snakeCase | 转下划线命名 | snakeCase('helloWorld') → 'hello_world' |
| truncate | 截断字符串 | truncate('hello world', 8) → 'hello...' |
| trim | 去除两端字符 | trim('  hello  ') → 'hello' |
| repeat | 重复字符串 | repeat('ab', 3) → 'ababab' |
| padStart | 左侧填充 | padStart('5', 3, '0') → '005' |
| padEnd | 右侧填充 | padEnd('hi', 5, '-') → 'hi---' |
| escapeHtml | HTML 转义 | escapeHtml('<div>') → '&lt;div&gt;' |
| unescapeHtml | HTML 反转义 | unescapeHtml('&lt;div&gt;') → '<div>' |
| uuid | 生成 UUID v4 | uuid() → 'a1b2c3d4-...' |

---

## 2. type 类型判断

| 函数 | 说明 | 示例 |
|------|------|
| isString | 判断是否为字符串 | isString('hello') → true |
| isNumber | 判断是否为数字 | isNumber(123) → true |
| isBoolean | 判断是否为布尔值 | isBoolean(true) → true |
| isFunction | 判断是否为函数 | isFunction(() => {}) → true |
| isObject | 判断是否为纯对象 | isObject({}) → true |
| isArray | 判断是否为数组 | isArray([1, 2]) → true |
| isNull | 判断是否为 null | isNull(null) → true |
| isUndefined | 判断是否为 undefined | isUndefined(undefined) → true |
| isNullOrUndefined | 判断是否为 null 或 undefined | isNullOrUndefined(null) → true |
| isEmpty | 判断是否为空值 | isEmpty('') → true |
| isPrimitive | 判断是否为原始类型 | isPrimitive('str') → true |
| getType | 获取精确类型 | getType(new Date()) → 'Date' |

---

## 3. array 数组操作

| 函数 | 说明 | 示例 |
|------|------|
| unique | 数组去重 | unique([1, 2, 2, 3]) → [1, 2, 3] |
| uniqueBy | 按条件去重 | uniqueBy([{a:1},{a:2},{a:1}], x => x.a) |
| flatten | 数组扁平化 | flatten([[1,2],3]) → [1,2,3] |
| chunk | 数组分块 | chunk([1,2,3,4,5], 2) → [[1,2],[3,4],[5]] |
| groupBy | 数组分组 | 按指定 key 分组成对象 |
| sortBy | 数组排序 | 支持 asc/desc 顺序 |
| shuffle | 随机打乱 | Fisher-Yates 算法 |
| intersection | 交集 | 两数组共同元素 |
| union | 并集 | 合并去重 |
| difference | 差集 | 在A不在B的元素 |
| sample | 随机取样 | 随机取 N 个 |
| compact | 移除假值 | 移除 false/null/0/''/undefined |
| first | 获取第一个 | first([1, 2, 3]) → 1 |
| last | 获取最后一个 | last([1, 2, 3]) → 3 |
| range | 生成范围 | range(1, 5) → [1,2,3,4,5] |

---

## 4. object 对象操作

| 函数 | 说明 | 示例 |
|------|------|
| deepClone | 深拷贝 | 支持 Date/RegExp/Map/Set |
| deepMerge | 深合并 | 递归合并嵌套对象 |
| pick | 选取属性 | 从对象中挑选指定 key |
| omit | 排除属性 | 排除指定 key |
| mapKeys | 映射键名 | 遍历转换所有 key |
| mapValues | 映射值 | 遍历转换所有 value |
| invert | 键值互换 | key 和 value 互换 |
| flattenObject | 对象扁平化 | {a:{b:1}} → {'a.b':1} |
| get | 安全取值 | 支持 'a.b.c' 和 'a[0].b' 路径 |
| set | 安全设值 | 自动创建中间结构，不修改原对象 |

---

## 5. number 数字处理

| 函数 | 说明 | 示例 |
|------|------|
| clamp | 限制范围 | clamp(10, 0, 5) → 5 |
| random | 随机整数 | random(1, 100) → 1-100 随机整数 |
| randomFloat | 随机浮点数 | 可指定精度 |
| formatNumber | 千分位格式化 | formatNumber(1234567) → '1,234,567' |
| toFixed | 指定小数位 | 返回数字类型 |
| sum | 求和 | sum(1, 2, 3, 4, 5) → 15 |
| average | 求平均 | average(1, 2, 3) → 2 |
| percentage | 百分比 | percentage(25, 100) → 25 |

---

## 6. date 日期时间

| 函数 | 说明 | 示例 |
|------|------|
| formatDate | 格式化日期 | 支持 YYYY/MM/DD/HH/mm/ss |
| timeAgo | 相对时间 | '刚刚'/'3分钟前'/'2天前' |
| isToday | 是否今天 | 判断日期是否为今天 |
| isYesterday | 是否昨天 | 判断日期是否为昨天 |
| addDays | 日期加减 | 返回新的 Date 对象 |
| diffDays | 日期间隔 | 计算相差天数（绝对值） |
| startOfDay | 当天开始 | 00:00:00.000 |
| endOfDay | 当天结束 | 23:59:59.999 |
| isLeapYear | 是否闰年 | 四年一闰百年不闰 |
| getDaysInMonth | 月份天数 | 获取指定月的天数 |

---

## 7. browser 浏览器工具

| 函数 | 说明 | 示例 |
|------|------|
| debounce | 防抖 | 延迟执行，支持 cancel() |
| throttle | 节流 | 间隔执行，支持 cancel() |
| getCookie | 获取 Cookie | 按名称获取 |
| setCookie | 设置 Cookie | 支持 expires/path/secure/sameSite |
| removeCookie | 删除 Cookie | 设为过期 |
| getStorage | 读取存储 | 自动 JSON 解析 |
| setStorage | 写入存储 | 自动 JSON 序列化 |
| removeStorage | 删除存储 | |
| copyToClipboard | 复制到剪贴板 | async 函数 |
| getScrollPosition | 滚动位置 | { x: 0, y: 100 } |
| isMobile | 是否移动设备 | 基于 userAgent |
| getBrowserInfo | 浏览器信息 | { name: 'Chrome', version: '120' } |

---

## 8. url URL 工具

| 函数 | 说明 | 示例 |
|------|------|
| parseQuery | 解析查询字符串 | '?a=1&b=2' → { a: '1', b: '2' } |
| stringifyQuery | 序列化为查询字符串 | { a: 1 } → 'a=1' |
| addQuery | 添加查询参数 | 自动判断 '?' 或 '&' |
| removeQuery | 移除查询参数 | |
| parseUrl | 解析 URL | 各组成部分 |
| isAbsoluteUrl | 是否绝对路径 | 判断 http/https 等 |

---

## 9. validate 数据校验

| 函数 | 说明 | 示例 |
|------|------|
| isEmail | 邮箱校验 | isEmail('test@example.com') → true |
| isPhone | 中国大陆手机号 | 1 开头 11 位 |
| isUrl | URL 校验 | isUrl('https://example.com') → true |
| isIdCard | 身份证校验 | 18 位，含校验码验证 |
| isIP | IPv4 校验 | isIP('192.168.1.1') → true |
| isMacAddress | MAC 地址校验 | 支持 ':' 和 '-' |
| isNumeric | 纯数字字符串 | isNumeric('123456') → true |
| isAlphanumeric | 字母数字组合 | isAlphanumeric('abc123') → true |
| isChinese | 全中文判断 | 中文范围 |
| isStrongPassword | 强密码 | 至少 3 种字符类型，8 位以上 |

---

## 10. file 文件工具

| 函数 | 说明 | 示例 |
|------|------|
| downloadFile | 下载文件 | 支持 string/Blob/ArrayBuffer |
| getFileExtension | 获取扩展名 | 'image.png' → 'png' |
| formatFileSize | 格式化大小 | formatFileSize(1048576) → '1 MB' |
| readFileAsText | 读取为文本 | Promise<FileReader> |
| readFileAsDataURL | 读取为 DataURL | Promise<FileReader> |
| isImage | 是否图片文件 | jpg/png/gif/webp/svg/bmp/ico |

---

## 11. math 数学计算

| 函数 | 说明 | 示例 |
|------|------|
| radian | 角度转弧度 | radian(180) → 3.141592653589793 (π) |
| degree | 弧度转角度 | degree(Math.PI) → 180 |
| sin | 正弦（输入角度） | sin(30) → 0.5 |
| cos | 余弦（输入角度） | cos(60) → 0.5 |
| tan | 正切（输入角度） | tan(45) → 1 |
| mod | 取模（支持负数） | mod(-1, 3) → 2 |
| gcd | 最大公约数 | gcd(12, 8) → 4 |
| lcm | 最小公倍数 | lcm(4, 6) → 12 |
| factorial | 阶乘 | factorial(5) → 120 |
| fibonacci | 斐波那契数列 | fibonacci(10) → 55 |
| lerp | 线性插值 | lerp(0, 100, 0.5) → 50 |
| normalize | 归一化 | normalize(50, 0, 100) → 0.5 |
| map | 范围映射 | 从一个范围映射到另一个 |
| easeIn | 缓入 | 二次缓动 |
| easeOut | 缓出 | 二次缓动 |
| easeInOut | 缓入缓出 | 二次缓动 |
| isPowerOfTwo | 是否2的幂 | isPowerOfTwo(16) → true |
| nearestPowerOfTwo | 最近的2的幂 | nearestPowerOfTwo(10) → 8 |

---

## 12. color 颜色处理

| 函数 | 说明 | 示例 |
|------|------|
| hexToRgb | HEX 转 RGB | '#FF6B35' → { r: 255, g: 107, b: 53 } |
| rgbToHex | RGB 转 HEX | rgbToHex(255, 107, 53) → '#FF6B35' |
| hexToRgba | HEX 转 RGBA | 支持8位带透明度 |
| rgbaToHex | RGBA 转 HEX | 支持透明度编码 |
| rgbToHsl | RGB 转 HSL | 返回 { h, s, l } |
| hslToRgb | HSL 转 RGB | 返回 { r, g, b } |
| hexToHsl | HEX 转 HSL | 一步到位 |
| hslToHex | HSL 转 HEX | 一步到位 |
| parseColor | 智能解析颜色 | 支持 hex/rgb/hsl/hsla 格式 |
| lighten | 颜色变亮 | 调整 HSL 亮度 |
| darken | 颜色变暗 | 调整 HSL 亮度 |
| saturate | 增加饱和度 | |
| desaturate | 降低饱和度 | |
| invert | 反色 | RGB 各通道取反 |
| grayscale | 灰度化 | 加权灰度计算 |
| alpha | 设置透明度 | 返回带透明度的颜色 |
| mix | 混合两种颜色 | 支持权重参数 |
| randomHex | 随机 HEX 颜色 | |
| randomRgb | 随机 RGB 颜色 | |
| randomRgba | 随机 RGBA 颜色 | |
| isValidHex | 校验 HEX 格式 | |
| isValidRgb | 校验 RGB 格式 | |
| isValidHsl | 校验 HSL 格式 | |
| isValidColor | 校验颜色格式 | 支持 hex/rgb/hsl |

---

## 13. fp 函数式编程

| 函数 | 说明 | 示例 |
|------|------|
| compose | 函数组合（从右到左） | compose(f, g)(x) → f(g(x)) |
| pipe | 管道（从左到右） | pipe(f, g)(x) → g(f(x)) |
| curry | 柯里化 | curry(f)(a)(b) |
| partial | 偏函数 | partial(f, a)(b) |
| memoize | 记忆化缓存 | 相同参数直接返回缓存 |
| debounce | 防抖（函数式版） | |
| throttle | 节流（函数式版） | |
| once | 只执行一次 | |
| noop | 空函数 | () => {} |
| identity | 恒等函数 | x => x |
| constant | 常量函数 | () => value |
| flip | 参数翻转 | flip(f)(b, a) |
| not | 逻辑取反 | 返回新的谓词函数 |
| both | 逻辑与 | 两个谓词都满足 |
| either | 逻辑或 | 任一谓词满足 |
| tap | 副作用 | 执行副作用但返回原值 |
| apply | 应用函数 | apply(f, args) |
| call | 调用函数 | call(f, ...args) |
| spread | 展开参数 | spread(f)(args) |
| chain | 函数链接 | chain(f, g)(x) → g(f(x)) |
| juxt | 并行执行 | 对同一值应用多个函数 |
| converge | 收敛函数 | 使用多个函数的结果作为参数 |
| delay | 延迟执行 | Promise 延迟 |
| retry | 重试 | 失败自动重试 |
| times | 重复执行 | times(f, 3) → [f(0), f(1), f(2)] |
| iterate | 迭代函数 | iterate(f, n)(x) |
| until | 直到条件 | 直到 predicate 满足 |
| when | 条件执行 | 满足条件才执行 |
| unless | 反条件执行 | 不满足条件才执行 |
| cond | 多条件匹配 | 类似 switch |
| ifElse | 条件分支 | 根据条件执行不同函数 |

---

## 14. promise Promise 工具

| 函数 | 说明 | 示例 |
|------|------|
| delay | 延迟执行 | delay(1000) → 延迟1秒 |
| timeout | 超时控制 | timeout(promise, 5000) → 5秒超时 |
| retry | 重试机制 | retry(fn, 3) → 最多重试3次 |
| all | 等待全部 | all([p1, p2]) |
| allSettled | 全部完成（含失败） | allSettled([p1, p2]) |
| race | 竞态 | 等待第一个完成 |
| any | 任意成功 | 等待第一个成功 |
| promisify | 回调转Promise | promisify(fs.readFile) |
| debouncePromise | 防抖（异步版） | 延迟执行异步函数 |
| throttlePromise | 节流（异步版） | 间隔执行异步函数 |
| waterfall | 瀑布流 | 顺序执行，前一个输出作为后一个输入 |
| parallelLimit | 并发限制 | 限制同时执行的Promise数量 |
| withRetry | 智能重试 | 支持指数退避和回调 |
| toAsyncIterable | 转异步迭代器 | 将Promise转为AsyncIterable |

---

## 15. event 事件总线

| 类/函数 | 说明 | 示例 |
|--------|------|
| EventEmitter | 事件发射器类 | new EventEmitter() |
| eventBus | 全局事件总线 | 单例，跨模块通信 |
| createEmitter | 创建类型化发射器 | 基于接口定义事件类型 |
| createOnceEmitter | 创建一次性发射器 | 触发后自动清理 |

**EventEmitter 方法：

| 方法 | 说明 |
|------|------|
| on(event, handler) | 监听事件，返回取消订阅函数 |
| once(event, handler) | 一次性监听 |
| off(event, handler) | 移除监听 |
| emit(event, data?) | 触发事件 |
| clear(event?) | 清空监听（无参数清空全部） |
| listenerCount(event) | 监听器数量 |
| eventNames() | 所有事件名 |
| listeners(event) | 获取监听器列表 |

---

## 16. storage 本地存储

| 类/函数 | 说明 | 示例 |
|--------|------|
| localStore | localStorage 实例 | 永久存储 |
| sessionStore | sessionStorage 实例 | 会话存储 |
| createStorage | 创建存储实例 | createStorage('local') |
| getStorageSize | 获取存储大小 | { local: 5, session: 3 } |
| clearAllStorage | 清空所有存储 | 返回清空数量 |

**Storage 方法：

| 方法 | 说明 | 示例 |
|------|------|
| set(key, value, expire?) | 存储（支持过期秒数） | set('token', 'xxx', 3600) |
| get<T>(key) | 获取并自动反序列化 | get<User>('user') |
| has(key) | 检查 key 是否存在 | |
| remove(key) | 删除指定 key | |
| clear() | 清空当前存储 | |
| keys() | 获取所有 key | |
| size() | 获取存储数量 | |
