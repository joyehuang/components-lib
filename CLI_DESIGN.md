# Components CLI 设计文档

## 概述

类似于 shadcn/ui 的组件安装系统，让用户通过 CLI 命令一键安装组件。

## 用户体验

### 网站端
用户在组件文档页面看到三个标签：
- **Preview** - 实时预览组件
- **Code** - 查看和复制源代码
- **CLI** - 显示安装命令和依赖信息

### CLI 标签内容
```
Installation
┌─────────────────────────────────────┐
│ npx components-cli add blur-highlight │
└─────────────────────────────────────┘

Manual Installation
1. Install dependencies
   ┌──────────────────┐
   │ pnpm add react   │
   └──────────────────┘

2. Copy component code
   [View code to copy →]

Component Files
- components/ui/blur-highlight.tsx
```

## CLI 工具实现计划

### 第一阶段：基础架构

#### 1. 组件注册系统
创建 `components-registry.json`：
```json
{
  "blur-highlight": {
    "name": "blur-highlight",
    "description": "A text animation component with blur-in effect",
    "files": [
      {
        "path": "components/ui/blur-highlight.tsx",
        "type": "component",
        "source": "https://raw.githubusercontent.com/.../blur-highlight.tsx"
      }
    ],
    "dependencies": ["react"],
    "devDependencies": [],
    "type": "component"
  }
}
```

#### 2. CLI 工具结构
```
components-cli/
├── src/
│   ├── commands/
│   │   ├── add.ts       # 添加组件命令
│   │   ├── init.ts      # 初始化项目
│   │   └── list.ts      # 列出所有组件
│   ├── utils/
│   │   ├── registry.ts  # 读取组件注册表
│   │   ├── download.ts  # 下载组件文件
│   │   ├── install.ts   # 安装依赖
│   │   └── prompts.ts   # 交互式提示
│   └── index.ts
├── package.json
└── tsconfig.json
```

### 第二阶段：核心功能

#### `npx components-cli add <component>`

流程：
1. 从注册表读取组件信息
2. 检查目标目录是否存在
3. 提示用户确认覆盖（如果文件已存在）
4. 下载组件文件到 `components/ui/`
5. 安装依赖（如果需要）
6. 显示成功消息和使用示例

#### 命令示例
```bash
# 添加单个组件
npx components-cli add blur-highlight

# 添加多个组件
npx components-cli add blur-highlight credit-card

# 列出所有可用组件
npx components-cli list

# 初始化配置
npx components-cli init
```

### 第三阶段：高级功能

#### 1. 配置文件支持
`components.json`：
```json
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css"
  },
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui"
  }
}
```

#### 2. 交互式安装
```bash
npx components-cli add

? Which component would you like to add? (Use arrow keys)
❯ blur-highlight - Text animation with blur effect
  credit-card - Interactive 3D credit card
  line-graph - Animated chart component

? Install dependencies? (Y/n) y
? Overwrite existing files? (y/N) n
```

#### 3. 批量操作
```bash
# 安装所有组件
npx components-cli add --all

# 更新组件
npx components-cli update blur-highlight

# 移除组件
npx components-cli remove blur-highlight
```

## 技术栈

### CLI 工具
- **Commander.js** - CLI 框架
- **Inquirer.js** - 交互式提示
- **Chalk** - 终端颜色
- **Ora** - 加载动画
- **Axios** - HTTP 请求

### 组件来源
- **GitHub Raw URLs** - 直接从仓库获取文件
- **CDN** - 备用方案
- **本地缓存** - 加速重复安装

## 实现步骤

### Step 1: 创建组件注册表
1. 为每个组件创建配置
2. 生成 JSON 注册表
3. 托管在 GitHub/CDN

### Step 2: 开发 CLI 工具
```typescript
// src/commands/add.ts
import { program } from 'commander';
import { addComponent } from '../utils/add';

program
  .command('add [components...]')
  .description('Add components to your project')
  .action(async (components: string[]) => {
    for (const component of components) {
      await addComponent(component);
    }
  });
```

### Step 3: 发布到 npm
```json
{
  "name": "components-cli",
  "version": "0.1.0",
  "bin": {
    "components-cli": "./dist/index.js"
  }
}
```

### Step 4: 网站集成
- 更新 `ComponentPreview` 显示正确的 CLI 命令
- 添加"复制命令"按钮
- 提供手动安装的后备方案

## 优势

### 对比纯复制粘贴
- ✅ **自动安装依赖** - 不需要手动查看和安装
- ✅ **版本管理** - 可以更新组件到最新版本
- ✅ **路径自动处理** - 根据项目配置自动调整导入路径
- ✅ **批量操作** - 一次安装多个组件
- ✅ **更好的 DX** - 开发者体验更流畅

### 对比 npm 包
- ✅ **完全控制** - 代码在你的项目中，可以随意修改
- ✅ **无版本冲突** - 不会被锁定在特定版本
- ✅ **减少依赖** - 只添加需要的组件
- ✅ **类型安全** - TypeScript 完全支持

## 示例输出

```bash
$ npx components-cli add blur-highlight

✔ Downloading blur-highlight component...
✔ Installing dependencies...
✔ Component added successfully!

Files created:
  - components/ui/blur-highlight.tsx

Dependencies installed:
  - react

Usage:
  import { BlurHighlight } from '@/components/ui/blur-highlight';

  <BlurHighlight highlightedBits={["text"]}>
    Your content here
  </BlurHighlight>
```

## 下一步

1. ✅ 创建组件注册表结构
2. ✅ 实现 ComponentPreview CLI 标签
3. ⏳ 开发 CLI 工具原型
4. ⏳ 测试和完善
5. ⏳ 发布到 npm
6. ⏳ 编写文档和使用指南

## 参考

- [shadcn/ui CLI](https://github.com/shadcn/ui/tree/main/packages/cli)
- [Commander.js](https://github.com/tj/commander.js)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
