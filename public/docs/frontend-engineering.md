# 前端工程化

## 什么是前端工程化

前端工程化就是用工具和规范，把"手工作坊"变成"现代工厂"。

以前写前端：新建一个 HTML 文件，引入几个 JS 和 CSS，完事。
现在的前端项目：模块化、组件化、自动构建、代码检查、自动测试、持续部署。

## 包管理器

管理项目依赖的工具。

| 工具 | 特点 |
|------|------|
| npm | Node.js 自带，最广泛 |
| yarn | Facebook 出品，速度快 |
| pnpm | 硬链接节省磁盘，速度最快 |

```bash
# 安装依赖
npm install
pnpm install

# 添加依赖
npm install react
pnpm add react

# 开发依赖
npm install -D typescript
pnpm add -D typescript
```

## 构建工具

把你写的源代码（TypeScript、JSX、Sass 等）转换成浏览器能运行的 JS/CSS/HTML。

| 工具 | 定位 |
|------|------|
| Vite | 开发体验极好，启动快，现代项目首选 |
| Webpack | 功能最全，生态最大，配置复杂 |
| esbuild | 极快的打包器，常被其他工具内部使用 |
| Rollup | 库打包首选，tree-shaking 好 |
| Turbopack | Vercel 出品，Webpack 继任者 |

Vite 为什么快？开发时不打包，利用浏览器原生 ES Module 按需加载。

## 代码规范

```bash
# ESLint：检查代码质量
npm install -D eslint

# Prettier：统一代码格式
npm install -D prettier

# 两者配合使用
# ESLint 管逻辑，Prettier 管格式
```

## 模块化

```javascript
// CommonJS（Node.js 传统方式）
const fs = require('fs')
module.exports = { readFile }

// ES Module（现代标准）
import fs from 'fs'
export { readFile }
```

现代项目统一用 ES Module。

## CSS 方案

| 方案 | 特点 |
|------|------|
| CSS Modules | 局部作用域，避免命名冲突 |
| Tailwind CSS | 原子化 CSS，直接在 HTML 写样式 |
| Sass/Less | CSS 预处理器，支持变量、嵌套 |
| CSS-in-JS | 在 JS 里写 CSS（styled-components） |
| 原生 CSS | CSS 变量 + 嵌套已经很强了 |

## Monorepo

一个仓库管理多个项目/包。

```
my-monorepo/
  packages/
    shared/        # 共享工具库
    web/           # 前端应用
    mobile/        # 移动端应用
    server/        # 后端服务
```

工具：pnpm workspace、Turborepo、Nx

好处：代码共享方便、统一版本管理、原子化提交。

> 工程化的目标不是增加复杂度，而是让团队能高效、稳定地交付产品。
