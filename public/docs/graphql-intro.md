# GraphQL 入门

## 什么是 GraphQL

GraphQL 是 Facebook 开发的 API 查询语言。和 REST 不同，客户端可以精确指定需要什么数据。

比喻：REST 像套餐（服务器决定给你什么），GraphQL 像自助餐（你自己选要什么）。

## 解决了什么问题

REST 的痛点：
- 过度获取：只需要用户名，但 API 返回了整个用户对象
- 获取不足：一个页面需要调 3 个接口才能拿齐数据
- 接口爆炸：不同场景需要不同的接口

GraphQL 的方案：一个端点，客户端声明需要什么。

## 基本查询

```graphql
# 客户端请求
query {
  user(id: 1) {
    name
    email
    orders {
      id
      amount
    }
  }
}

# 服务端返回（只返回请求的字段）
{
  "data": {
    "user": {
      "name": "小明",
      "email": "xm@example.com",
      "orders": [
        { "id": 1, "amount": 99.9 }
      ]
    }
  }
}
```

## Schema 定义

```graphql
type User {
  id: ID!
  name: String!
  email: String
  orders: [Order!]!
}

type Order {
  id: ID!
  amount: Float!
  createdAt: String!
}

type Query {
  user(id: ID!): User
  users: [User!]!
}

type Mutation {
  createUser(name: String!, email: String): User!
}
```

## GraphQL vs REST

| | REST | GraphQL |
|---|------|---------|
| 端点 | 多个 URL | 单个 `/graphql` |
| 数据获取 | 服务端决定 | 客户端决定 |
| 版本控制 | URL 版本号 | Schema 演进 |
| 缓存 | HTTP 缓存简单 | 需要额外处理 |
| 学习曲线 | 低 | 中等 |

## 什么时候用 GraphQL

适合：移动端（带宽敏感）、复杂数据关系、多客户端（Web/App/小程序）
不适合：简单 CRUD、文件上传、实时性要求极高的场景

> GraphQL 不是 REST 的替代品，而是另一种选择。
