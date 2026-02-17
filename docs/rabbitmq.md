# RabbitMQ 入门

## 什么是 RabbitMQ

RabbitMQ 是最流行的开源消息代理。它实现了 AMQP 协议，支持复杂的消息路由。

比喻：RabbitMQ 是一个智能邮局。你可以指定信件的投递规则——按地址投、按类型投、广播给所有人。

## 核心概念

| 概念 | 说明 |
|------|------|
| Producer | 消息生产者，发送消息 |
| Consumer | 消息消费者，接收消息 |
| Queue | 队列，存储消息 |
| Exchange | 交换机，路由消息到队列 |
| Binding | 绑定，Exchange 和 Queue 的关系 |
| Routing Key | 路由键，决定消息去哪个队列 |

## Exchange 类型

| 类型 | 路由规则 |
|------|---------|
| Direct | 精确匹配 routing key |
| Fanout | 广播到所有绑定的队列 |
| Topic | 通配符匹配（`*.log`、`order.#`） |
| Headers | 根据消息头匹配 |

## 快速示例（Node.js）

```javascript
import amqp from 'amqplib'

// 生产者
const conn = await amqp.connect('amqp://localhost')
const ch = await conn.createChannel()
await ch.assertQueue('tasks')
ch.sendToQueue('tasks', Buffer.from(JSON.stringify({ type: 'email', to: 'user@example.com' })))

// 消费者
ch.consume('tasks', (msg) => {
  const task = JSON.parse(msg.content.toString())
  console.log('处理任务:', task)
  ch.ack(msg) // 确认消费
})
```

## 消息确认机制

- 生产者确认：消息成功到达 Exchange
- 消费者确认（ack）：消息成功处理后才从队列删除
- 如果消费者崩溃没有 ack，消息会重新投递给其他消费者

## 什么时候用 RabbitMQ

- 需要复杂的消息路由规则
- 消息量中等（每秒几千到几万）
- 需要消息确认和可靠投递
- 团队对 AMQP 协议熟悉

> RabbitMQ 的优势在于灵活的路由和可靠的消息投递。
