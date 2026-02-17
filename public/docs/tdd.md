# 测试驱动开发 TDD

## 什么是 TDD

TDD 是一种开发方法：先写测试，再写代码。

流程：红 → 绿 → 重构

1. 红：写一个失败的测试
2. 绿：写最少的代码让测试通过
3. 重构：优化代码，保持测试通过

## 为什么用 TDD

- 强迫你先思考"要做什么"，再思考"怎么做"
- 代码天然有测试覆盖
- 设计出更好的接口（因为你先从使用者角度写测试）
- 小步前进，减少 bug

## 示例：实现一个密码验证器

```typescript
// 第一步：写测试（红）
describe('validatePassword', () => {
  it('长度小于 8 应该返回 false', () => {
    expect(validatePassword('abc')).toBe(false)
  })
})

// 第二步：写最少的代码（绿）
function validatePassword(pwd: string): boolean {
  return pwd.length >= 8
}

// 第三步：加更多测试
it('没有数字应该返回 false', () => {
  expect(validatePassword('abcdefgh')).toBe(false)
})

// 第四步：更新代码
function validatePassword(pwd: string): boolean {
  if (pwd.length < 8) return false
  if (!/\d/.test(pwd)) return false
  return true
}

// 继续循环...
```

## TDD 的节奏

每个循环应该很短——几分钟内完成。如果你发现一个循环要写很多代码，说明步子迈太大了。

## 什么时候适合 TDD

- 业务逻辑复杂的模块
- 工具函数和库
- 需要高可靠性的代码

不太适合：UI 开发、探索性编程、原型验证

> TDD 不是教条，而是一种思维方式。即使不严格遵循，"先想清楚再写"的习惯也很有价值。
