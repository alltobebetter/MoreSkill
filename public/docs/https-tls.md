# HTTPS 与 TLS

## 为什么需要 HTTPS

HTTP 是明文传输的。你在咖啡店用 WiFi 登录网站，旁边的人可以用抓包工具看到你的密码。

HTTPS = HTTP + TLS 加密。数据在传输过程中是加密的，即使被截获也看不懂。

## TLS 握手过程（简化版）

```
1. 客户端：你好，我支持这些加密算法
2. 服务器：你好，我选这个算法，这是我的证书
3. 客户端：验证证书合法性，生成随机密钥，用证书公钥加密发送
4. 服务器：用私钥解密，得到随机密钥
5. 双方用这个随机密钥加密后续通信
```

比喻：你们约定了一个只有两人知道的暗号，之后的对话都用暗号加密。

## SSL 证书

| 类型 | 验证级别 | 适用 |
|------|---------|------|
| DV（域名验证） | 只验证域名所有权 | 个人网站、博客 |
| OV（组织验证） | 验证组织身份 | 企业网站 |
| EV（扩展验证） | 最严格验证 | 银行、金融 |

免费证书：Let's Encrypt（自动续期，90 天有效）

## 配置 HTTPS（Nginx）

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate     /etc/ssl/cert.pem;
    ssl_certificate_key /etc/ssl/key.pem;

    # 强制 HTTP 跳转 HTTPS
    if ($scheme = http) {
        return 301 https://$host$request_uri;
    }
}
```

## 注意事项

- 现代浏览器会标记 HTTP 网站为"不安全"
- 搜索引擎优先收录 HTTPS 网站
- 混合内容（HTTPS 页面加载 HTTP 资源）会被浏览器阻止

> 2026 年了，没有理由不用 HTTPS。Let's Encrypt 免费且自动化。
