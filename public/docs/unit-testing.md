# 单元测试入门

## 什么是单元测试

单元测试是对代码中最小可测试单元（通常是函数）的自动化测试。

比喻：出厂前检查每个零件是否合格，而不是等整台机器组装好了才发现问题。

## 为什么要写测试

- 重构时有信心（改了代码，跑一遍测试就知道有没有破坏什么）
- 文档作用（测试用例描述了函数的预期行为）
- 减少 bug（写测试时会思考边界情况）

## 常用测试框架

| 框架 | 语言 | 特点 |
|------|------|------|
| Vitest | JS/TS | 快，和 Vite 集成好 |
| Jest | JS/TS | 最流行，功能全面 |
| pytest | Python | 简洁强大 |
| Go test | Go | 内置，无需额外框架 |

## 基本示例（Vitest）

```typescript
import { describe, it, expect } from 'vitest'

function add(a: number, b: number) {
  return a + b
}

describe('add', () => {
  it('应该正确相加两个正数', () => {
    expect(add(1, 2)).toBe(3)
  })

  it('应该处理负数', () => {
    expect(add(-1, 1)).toBe(0)
  })

  it('应该处理零', () => {
    expect(add(0, 0)).toBe(0)
  })
})
```

## 测试原则

- 每个测试只测一件事
- 测试之间互相独立
- 测试要快（毫秒级）
- 测试命名要清晰描述预期行为
- 覆盖正常路径和边界情况

## AAA 模式

```typescript
it('应该从列表中移除指定项', () => {
  // Arrange（准备）
  const list = [1, 2, 3]

  // Act（执行）
  const result = removeItem(list, 2)

  // Assert（断言）
  expect(result).toEqual([1, 3])
})
```

> 测试不是浪费时间，而是节省未来调试 bug 的时间。
