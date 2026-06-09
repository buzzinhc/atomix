| `eventNames()` | 所有事件名 | |
| `listeners(event)` | 获取监听器列表 | |

---

### storage 本地存储

localStorage/sessionStorage 封装，支持过期时间和类型自动转换~

```typescript
import { localStore, sessionStore, createStorage } from 'atomix-fe/storage'

// localStorage（永久存储）
localStore.set('user', { name: 'Tom', age: 18 })
localStore.set('token', 'abc123', 3600) // 1小时后过期
const user = localStore.get('user')  // 自动解析为对象

// sessionStorage（会话存储）
sessionStore.set('tempData', 'hello')
const temp = sessionStore.get('tempData')

// 其他操作
localStore.has('user')      // true
localStore.remove('user')    // 删除
localStore.keys()            // ['token', ...]
localStore.size()            // 数量
localStore.clear()           // 清空
```

| 类/函数 | 说明 | 示例 |
|--------|------|------|
| `localStore` | localStorage 实例 | 永久存储 |
| `sessionStore` | sessionStorage 实例 | 会话存储 |
| `createStorage` | 创建存储实例 | `createStorage('local')` |
| `getStorageSize` | 获取存储大小 | `{ local: 5, session: 3 }` |
| `clearAllStorage` | 清空所有存储 | 返回清空数量 |

**Storage 方法：**

| 方法 | 说明 | 示例 |
|------|------|------|
| `set(key, value, expire?)` | 存储（支持过期秒数） | `set('token', 'xxx', 3600)` |
| `get<T>(key)` | 获取并自动反序列化 | `get<User>('user')` |
| `has(key)` | 检查 key 是否存在 | |
| `remove(key)` | 删除指定 key | |
| `clear()` | 清空当前存储 | |
| `keys()` | 获取所有 key | |
| `size()` | 获取存储数量 | |

---

## 脚本命令