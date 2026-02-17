# 服务器部署入门

## 部署方式演进

```
手动部署 → 脚本部署 → CI/CD 自动部署 → 容器化部署 → K8s 编排
```

## 最简单的部署：直接跑

```bash
# 在服务器上
git clone <repo>
npm install
npm run build
npm start
```

问题：进程退出就挂了，没有自动重启。

## PM2 进程管理

```bash
npm install -g pm2

pm2 start server.js --name myapp
pm2 list                    # 查看所有进程
pm2 logs myapp              # 查看日志
pm2 restart myapp           # 重启
pm2 save                    # 保存进程列表
pm2 startup                 # 开机自启
```

## Docker 部署

```bash
# 构建镜像
docker build -t myapp .

# 运行
docker run -d -p 80:3000 --restart always myapp
```

## 典型的部署架构

```
用户 → CDN → Nginx → 应用服务 → 数据库
                  ↘ 静态文件
```

- CDN：加速静态资源
- Nginx：反向代理、HTTPS、负载均衡
- 应用服务：你的后端程序
- 数据库：MySQL/PostgreSQL

## 部署清单

- HTTPS 配置（Let's Encrypt）
- 防火墙规则（只开放必要端口）
- 环境变量管理（不要硬编码密码）
- 日志收集
- 监控告警
- 自动备份数据库
- 健康检查接口

> 部署不是一次性的事，而是需要持续维护的系统工程。
