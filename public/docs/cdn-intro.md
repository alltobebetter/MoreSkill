# CDN 加速原理

## 什么是 CDN

CDN（Content Delivery Network）是内容分发网络。它在全球各地部署节点，把你的内容缓存到离用户最近的节点。

比喻：你的服务器在北京，广州用户访问要跨越半个中国。CDN 在广州放了一个副本，广州用户直接从本地拿，快得多。

## 工作原理

```
用户请求 → DNS 解析到最近的 CDN 节点
  → CDN 节点有缓存 → 直接返回（命中）
  → CDN 节点没缓存 → 回源到你的服务器 → 缓存后返回
```

## 适合加速的内容

| 类型 | 示例 |
|------|------|
| 静态资源 | JS、CSS、图片、字体 |
| 视频/音频 | 点播、直播 |
| 下载文件 | 安装包、文档 |
| API 响应 | 不常变化的数据 |

## 缓存策略

```nginx
# 静态资源长期缓存
Cache-Control: public, max-age=31536000, immutable

# API 响应短期缓存
Cache-Control: public, max-age=60

# 不缓存
Cache-Control: no-cache, no-store
```

## 缓存更新

文件内容变了，怎么让 CDN 更新？

- 文件名加 hash：`app.abc123.js`（推荐，Vite/Webpack 自动做）
- 手动刷新 CDN 缓存
- 设置较短的缓存时间

## 主流 CDN

| 服务 | 特点 |
|------|------|
| Cloudflare | 免费套餐，全球节点多 |
| 阿里云 CDN | 国内节点多 |
| AWS CloudFront | 和 S3 集成好 |
| Vercel/Netlify | 前端项目自带 CDN |

> CDN 是提升网站性能最简单有效的方式。静态资源上 CDN，首屏加载速度立竿见影。
