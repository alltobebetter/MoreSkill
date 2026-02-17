# 集成测试与 E2E

## 测试金字塔

```
        /  E2E  \        少量，慢，贵
       / 集成测试 \       适量
      /  单元测试   \     大量，快，便宜
```

## 集成测试

测试多个模块协同工作是否正确。比如：API 接口 + 数据库。

```typescript
describe('POST /api/users', () => {
  it('应该创建用户并返回 201', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: '小明', email: 'xm@test.com' })

    expect(res.status).toBe(201)
    expect(res.body.name).toBe('小明')

    // 验证数据库中确实有这条记录
    const user = await db.query('SELECT * FROM users WHERE email = $1', ['xm@test.com'])
    expect(user.rows).toHaveLength(1)
  })
})
```

## E2E 测试

模拟真实用户操作，测试整个应用流程。

```typescript
// Playwright 示例
import { test, expect } from '@playwright/test'

test('用户登录流程', async ({ page }) => {
  await page.goto('/login')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="password"]', 'password123')
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('.welcome')).toContainText('欢迎')
})
```

## 常用 E2E 工具

| 工具 | 特点 |
|------|------|
| Playwright | 微软出品，多浏览器，推荐 |
| Cypress | 开发体验好，单浏览器 |
| Puppeteer | Chrome 专用，适合爬虫 |

## 实用建议

- 单元测试覆盖核心业务逻辑
- 集成测试覆盖关键 API
- E2E 测试覆盖核心用户流程（登录、下单、支付）
- 不要追求 100% 覆盖率，关注关键路径

> 不同层级的测试解决不同的问题，组合使用才能有效保障质量。
