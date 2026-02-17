# WebSocket 实时通信

## 什么是 WebSocket

HTTP 是"你问我答"模式——客户端发请求，服务器才响应。WebSocket 是"双向对话"——连接建立后，双方可以随时发消息。

比喻：HTTP 像发短信（一来一回），WebSocket 像打电话（随时说话）。

## 为什么需要 WebSocket

有些场景需要服务器主动推送数据：
- 聊天应用
- 实时通知
- 股票行情
- 在线协作编辑
- 游戏

没有 WebSocket 之前，只能用轮询（每隔几秒请求一次），浪费资源。

## 基本使用

```javascript
// 客户端
const ws = new WebSocket('ws://localhost:3000')

ws.onopen = () => {
  console.log('连接成功')
  ws.send(JSON.stringify({ type: 'hello', data: '你好' }))
}

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data)
  console.log('收到消息:', msg)
}

ws.onclose = () => console.log('连接关闭')
```

```javascript
// 服务端（Node.js + ws 库）
import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 3000 })

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    // 广播给所有客户端
    wss.clients.forEach(client => {
      client.send(data.toString())
    })
  })
})
```

## WebSocket vs 其他方案

| 方案 | 实时性 | 复杂度 | 适用场景 |
|------|--------|--------|---------|
| 短轮询 | 差 | 低 | 简单通知 |
| 长轮询 | 中 | 中 | 兼容性要求高 |
| SSE | 好（单向） | 低 | 服务器推送 |
| WebSocket | 好（双向） | 中 | 双向实时通信 |

## 注意事项

- WebSocket 连接是有状态的，需要处理断线重连
- 负载均衡需要支持 WebSocket（sticky session 或用 Redis 做消息中转）
- 生产环境建议用 Socket.IO（自动降级、房间管理、重连机制）

> WebSocket 不是用来替代 HTTP 的，它解决的是"实时双向通信"这个特定问题。
