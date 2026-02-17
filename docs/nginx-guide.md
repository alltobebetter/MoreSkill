# Nginx 配置指南

## 什么是 Nginx

Nginx 是高性能的 Web 服务器和反向代理。全球超过 30% 的网站使用 Nginx。

它能做什么：静态文件服务、反向代理、负载均衡、HTTPS 终端、缓存。

## 基本配置

```nginx
server {
    listen 80;
    server_name example.com;

    # 静态文件
    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;  # SPA 路由支持
    }

    # API 反向代理
    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 负载均衡

```nginx
upstream backend {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

server {
    location /api {
        proxy_pass http://backend;
    }
}
```

## Gzip 压缩

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

## 缓存静态资源

```nginx
location ~* \.(js|css|png|jpg|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 常用场景

| 场景 | 配置 |
|------|------|
| SPA 部署 | `try_files` 回退到 index.html |
| API 代理 | `proxy_pass` 转发请求 |
| HTTPS | `ssl_certificate` 配置证书 |
| 限流 | `limit_req_zone` 限制请求频率 |
| WebSocket | `proxy_set_header Upgrade` |

> Nginx 是部署 Web 应用的标配。掌握基本配置，能解决 90% 的部署需求。
