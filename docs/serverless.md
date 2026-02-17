# Serverless 概念

## 什么是 Serverless

Serverless 不是"没有服务器"，而是"你不用管服务器"。你只写业务代码，云平台负责运行、扩缩容、运维。

比喻：传统部署像自己买车（买服务器、维护、加油），Serverless 像打车（用多少付多少，不用管车的维护）。

## 核心特点

- 按调用次数计费（不用不花钱）
- 自动扩缩容（从 0 到无限）
- 无需管理服务器
- 事件驱动（HTTP 请求、定时任务、文件上传等触发）

## 函数即服务（FaaS）

```javascript
// 一个 Serverless 函数
export async function handler(event) {
  const { name } = JSON.parse(event.body)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello, ${name}` })
  }
}
```

## 适合与不适合

| 适合 | 不适合 |
|------|--------|
| API 接口 | 长时间运行的任务 |
| 定时任务 | WebSocket 长连接 |
| 文件处理 | 需要本地状态的应用 |
| Webhook | 高性能计算 |
| 低流量应用 | 冷启动敏感的场景 |

## 冷启动问题

函数长时间不调用会被回收，下次调用需要重新初始化（冷启动），可能增加几百毫秒到几秒的延迟。

缓解方案：预热、保持最小实例数、选择轻量运行时。

> Serverless 适合"用完即走"的场景。对于持续运行的服务，传统部署可能更合适。
