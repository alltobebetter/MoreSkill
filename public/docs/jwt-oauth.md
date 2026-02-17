# JWT 与 OAuth 2.0

## 认证 vs 授权

- 认证（Authentication）：你是谁？（登录）
- 授权（Authorization）：你能做什么？（权限）

## JWT 是什么

JWT（JSON Web Token）是一种令牌格式，用于在客户端和服务器之间安全传递信息。

结构：`Header.Payload.Signature`

```
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImV4cCI6MTcwMH0.abc123signature
```

三部分都是 Base64 编码：
- Header：算法和类型
- Payload：用户信息和过期时间
- Signature：签名，防篡改

## JWT 工作流程

```
1. 用户登录 → 服务器验证密码 → 生成 JWT 返回
2. 客户端保存 JWT（通常在 localStorage 或 Cookie）
3. 后续请求带上 JWT：Authorization: Bearer <token>
4. 服务器验证 JWT 签名和过期时间
```

## JWT 的优缺点

| 优点 | 缺点 |
|------|------|
| 无状态，服务器不用存 session | 无法主动让 token 失效 |
| 跨域友好 | token 体积比 session ID 大 |
| 适合微服务 | 敏感信息不要放 payload |

## OAuth 2.0

OAuth 2.0 是授权框架，让第三方应用能安全地访问用户资源。

最常见的场景："用微信登录"、"用 GitHub 登录"。

### 授权码模式（最安全）

```
1. 用户点击"用 GitHub 登录"
2. 跳转到 GitHub 授权页面
3. 用户同意授权
4. GitHub 回调你的网站，带上授权码（code）
5. 你的后端用 code 换取 access_token
6. 用 access_token 获取用户信息
```

## 实际项目建议

- 简单项目：JWT 就够了
- 需要第三方登录：JWT + OAuth 2.0
- 需要精细权限控制：加上 RBAC（基于角色的访问控制）
- access_token 设短过期时间，配合 refresh_token 续期

> 安全不是功能，是底线。认证和授权是每个项目的必修课。
