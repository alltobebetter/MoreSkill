# Node.js 基础

## 什么是 Node.js

Node.js 让 JavaScript 能在服务器上运行。以前 JS 只能在浏览器里跑，Node.js 把它带到了后端世界。

它基于 Chrome 的 V8 引擎，用事件驱动、非阻塞 I/O 模型，特别适合处理高并发的 I/O 密集型任务。

比喻：传统后端像餐厅里每桌配一个服务员（多线程），Node.js 像一个超级服务员同时服务所有桌（单线程 + 异步）。

## 核心模块

```javascript
import fs from 'fs/promises'       // 文件系统
import path from 'path'            // 路径处理
import http from 'http'            // HTTP 服务
import { EventEmitter } from 'events'  // 事件系统
```

## 创建一个 HTTP 服务

```javascript
import http from 'http'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World')
})

server.listen(3000, () => {
  console.log('服务运行在 http://localhost:3000')
})
```

实际项目中不会直接用 `http` 模块，而是用框架。

## 常用框架

| 框架 | 特点 |
|------|------|
| Express | 最经典，生态最大，简单灵活 |
| Koa | Express 团队新作，更现代，基于 async/await |
| Fastify | 性能最好，内置 JSON Schema 验证 |
| NestJS | 企业级，TypeScript 优先，类似 Spring |
| Hono | 超轻量，支持多运行时（Node/Deno/Bun） |

## Express 快速示例

```javascript
import express from 'express'

const app = express()
app.use(express.json())

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: '小明' }])
})

app.post('/api/users', (req, res) => {
  const { name } = req.body
  res.status(201).json({ id: 2, name })
})

app.listen(3000)
```

## 中间件

中间件是 Node.js 框架的核心概念。请求像流水线上的产品，经过一个个中间件处理。

```javascript
// 日志中间件
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next() // 传给下一个中间件
})

// 认证中间件
app.use('/api', (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: '未认证' })
  }
  next()
})
```

## 适合与不适合

适合：
- API 服务、实时应用（聊天、通知）
- 微服务、BFF（Backend for Frontend）
- 工具链、CLI 工具

不太适合：
- CPU 密集型计算（可以用 Worker Threads 缓解）
- 需要强类型系统的大型后端（考虑 NestJS 或 Go/Java）

> Node.js 的优势不在于"快"，而在于"用一种语言搞定前后端"。
