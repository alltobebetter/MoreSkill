# 领域驱动设计 DDD

## 什么是 DDD

DDD（Domain-Driven Design）是一种软件设计方法，核心思想是：软件的结构应该反映业务领域的结构。

比喻：盖房子之前先了解住户的需求，而不是先画图纸。

## 为什么需要 DDD

传统开发：拿到需求 → 设计数据库表 → 写 CRUD。
问题：业务逻辑散落在各处，代码越来越难维护。

DDD：先理解业务 → 建立领域模型 → 代码反映业务概念。

## 核心概念

| 概念 | 说明 | 例子 |
|------|------|------|
| 实体（Entity） | 有唯一标识的对象 | 用户、订单 |
| 值对象（Value Object） | 没有标识，由属性定义 | 地址、金额 |
| 聚合（Aggregate） | 一组相关对象的集合 | 订单 + 订单项 |
| 聚合根（Aggregate Root） | 聚合的入口 | 订单（通过订单访问订单项） |
| 领域服务（Domain Service） | 不属于任何实体的业务逻辑 | 转账（涉及两个账户） |
| 仓储（Repository） | 持久化聚合的接口 | OrderRepository |
| 领域事件（Domain Event） | 业务中发生的事情 | 订单已支付、用户已注册 |

## 限界上下文

不同业务领域中，同一个词可能有不同含义。

"商品"在不同上下文中：
- 商品目录：名称、描述、图片
- 库存管理：SKU、数量、仓库
- 订单系统：价格、数量、折扣

每个限界上下文有自己的模型，通过明确的接口通信。

## 代码示例

```typescript
// 值对象
class Money {
  constructor(
    readonly amount: number,
    readonly currency: string
  ) {}

  add(other: Money): Money {
    if (this.currency !== other.currency) throw new Error('币种不同')
    return new Money(this.amount + other.amount, this.currency)
  }
}

// 实体
class Order {
  private items: OrderItem[] = []

  addItem(product: Product, quantity: number) {
    this.items.push(new OrderItem(product, quantity))
  }

  get totalAmount(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.subtotal),
      new Money(0, 'CNY')
    )
  }
}
```

## 什么时候用 DDD

- 业务逻辑复杂的项目
- 需要长期维护和演进的系统
- 团队需要和业务专家紧密协作

简单的 CRUD 项目不需要 DDD，那是杀鸡用牛刀。

> DDD 的价值不在于技术实现，而在于让代码"说业务的语言"。
