# 📦 atomix 发布指南

准备好了！atomix 现在可以上传到 npm 了~ ✨

## 📋 发布前检查清单

- [ ] package.json 的 `name` 是唯一的（不能和 npm 上已有的包重名）
- [ ] package.json 的 `version` 更新为想要发布的版本
- [ ] package.json 的 `author` 和 `repository` 信息已填写
- [ ] 所有测试 `npm run test` 都通过
- [ ] `npm run build` 成功生成 dist 目录

## 🚀 快速发布

### 1. 更新版本号

遵循 [语义化版本](https://semver.org/)：

```bash
# 修复 bug，小改动
npm version patch  # 0.1.0 → 0.1.1

# 新功能，兼容改动
npm version minor  # 0.1.0 → 0.2.0

# 重大更新，不兼容改动
npm version major  # 0.1.0 → 1.0.0
```

或者直接编辑 `package.json` 的 `version` 字段

### 2. 登录 npm

```bash
npm login
```

输入你的 npm 用户名、密码、邮箱（首次需要邮箱验证）

### 3. 发布！

```bash
npm run publish:local
```

就这么简单！🎉

## 🔧 可选：本地测试

在发布前，可以先用 npm link 本地测试：

```bash
# 在当前项目目录下
npm link

# 在另一个项目目录中测试
cd /path/to/test-project
npm link atomix
```

然后在测试项目里：

```typescript
import { debounce, uuid } from 'atomix'
```

测试完成后取消 link：

```bash
# 在测试项目
npm unlink atomix

# 在 atomix 项目
npm unlink
```

## 📝 完整发布流程

```bash
# 1. 清理旧文件
npm run clean

# 2. 安装依赖
npm install

# 3. 运行测试
npm run test

# 4. 构建
npm run build

# 5. 更新版本号
npm version patch

# 6. 发布到 npm
npm publish --access=public
```

## 📁 发布内容

通过 `package.json` 的 `files` 字段，只会发布以下内容：

- `dist/` - 打包后的代码
- `README.md` - 使用说明
- `LICENSE` - 许可证

其他开发文件（src/tests 等）会被 `.npmignore` 自动忽略

## ⚠️ 注意事项

1. **包名唯一性**：发布前先去 npm 上搜索一下 `atomix` 有没有被占用
2. **私有仓库**：如果是发布到自己的私有仓库，设置好 npm registry
3. **版本号管理**：同一个版本号只能发布一次，想要更新必须提升版本号
4. **`--access=public`**：如果是组织下的私有包，不需要这个参数

## 🌰 自定义包名

如果 `atomix` 被占用，可以改成这样的格式：

```json
{
  "name": "@your-username/atomix"
}
```

然后发布时会自动作为私有组织包（不过需要在 npm 上有组织）

---

祝你发布顺利！🎊
