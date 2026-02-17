# 设计模式精选

## 什么是设计模式

设计模式是前人总结的"解题套路"。遇到特定问题时，不用从零思考，直接套用经过验证的方案。

## 常用模式

### 单例模式

全局只有一个实例。适合数据库连接池、配置管理。

```typescript
class Database {
  private static instance: Database

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}
```

### 观察者模式

一个对象状态变化时，自动通知所有关注它的对象。

```typescript
class EventEmitter {
  private listeners = new Map<string, Function[]>()

  on(event: string, fn: Function) {
    const fns = this.listeners.get(event) || []
    fns.push(fn)
    this.listeners.set(event, fns)
  }

  emit(event: string, ...args: unknown[]) {
    this.listeners.get(event)?.forEach(fn => fn(...args))
  }
}
```

### 策略模式

把算法封装成独立的策略，运行时可以切换。

```typescript
interface PaymentStrategy {
  pay(amount: number): void
}

class WechatPay implements PaymentStrategy {
  pay(amount: number) { console.log(`微信支付 ${amount} 元`) }
}

class AliPay implements PaymentStrategy {
  pay(amount: number) { console.log(`支付宝支付 ${amount} 元`) }
}

class PaymentContext {
  constructor(private strategy: PaymentStrategy) {}
  execute(amount: number) { this.strategy.pay(amount) }
}
```

### 工厂模式

把对象的创建逻辑封装起来。

```typescript
function createLogger(type: 'console' | 'file') {
  switch (type) {
    case 'console': return new ConsoleLogger()
    case 'file': return new FileLogger()
  }
}
```

### 装饰器模式

不修改原有代码，动态添加功能。

```typescript
function withLogging(fn: Function) {
  return function (...args: unknown[]) {
    console.log(`调用 ${fn.name}，参数:`, args)
    const result = fn(...args)
    console.log(`返回:`, result)
    return result
  }
}
```

## 前端常见模式

| 模式 | 应用 |
|------|------|
| 观察者 | 事件系统、状态管理 |
| 发布订阅 | EventBus、消息通知 |
| 策略 | 表单验证、支付方式 |
| 组合 | React 组件树 |
| 代理 | Vue 响应式、API 拦截 |

> 不要为了用设计模式而用。先写出能工作的代码，发现重复或复杂时再重构。
