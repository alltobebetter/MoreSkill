# CORS 跨域详解

## 什么是跨域

浏览器有个安全策略叫"同源策略"：只允许网页访问同协议、同域名、同端口的资源。

```
https://example.com → https://example.com/api  ✅ 同源
https://example.com → https://api.example.com  ❌ 不同域名
https://example.com → http://example.com       ❌ 不同协议
http://localhost:3000 → http://localhost:8080   ❌ 不同端口
```

## CORS 是什么

CORS（Cross-Origin Resource Sharing）是浏览器和服务器之间的一种协商机制，让服务器声明"我允许哪些来源访问我"。

## 简单请求 vs 预检请求

简单请求（GET/POST，常见 Content-Type）直接发送，浏览器检查响应头。

非简单请求（PUT/DELETE，自定义 Header）会先发一个 OPTIONS 预检请求。

```
浏览器：OPTIONS /api/users （我想用 PUT 方法，可以吗？）
服务器：Access-Control-Allow-Methods: PUT （可以）
浏览器：PUT /api/users （正式请求）
```

## 服务端配置

```javascript
// Express
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})
```

```nginx
# Nginx
location /api {
    add_header Access-Control-Allow-Origin https://example.com;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE";
    add_header Access-Control-Allow-Headers "Content-Type, Authorization";
}
```

## 常见问题

- `Access-Control-Allow-Origin: *` 不能和 `Credentials: true` 同时用
- 预检请求可以缓存：`Access-Control-Max-Age: 86400`
- 开发环境可以用 Vite/Webpack 的 proxy 绕过跨域

> 跨域是浏览器的安全限制，不是服务器的。服务器之间的请求不存在跨域问题。
