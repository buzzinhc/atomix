# Atomix-fe 示例项目

这是一个使用 React 编写的示例项目，展示了 atomix-fe 工具库的主要功能。

## 功能演示

- **String 模块**：字符串处理工具
- **Type 模块**：类型判断工具
- **Date 模块**：日期处理工具
- **Number 模块**：数字处理工具
- **Event 模块**：事件总线工具

## 运行项目

### 前置条件

1. 确保已经在根目录构建了 atomix-fe：
```bash
cd /workspace
npm run build
```

2. 在根目录运行 npm link（已执行）：
```bash
npm link
```

### 启动项目

```bash
cd /workspace/demo
npm install
npm link atomix-fe  # 如果还没有链接
npm run dev
```

然后在浏览器访问 http://localhost:5173 查看效果。

## 项目结构

```
demo/
├── public/
├── src/
│   ├── App.tsx       # 主要示例代码
│   └── main.tsx
├── index.html
└── package.json
```