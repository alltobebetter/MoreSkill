# Docker 基础

## 什么是 Docker

Docker 是一个容器化平台。它把应用和所有依赖打包在一起，确保在任何环境都能一致运行。

比喻：以前发快递要自己找箱子、填充物。Docker 就是标准化的集装箱——不管里面装什么，运输方式都一样。

## 容器 vs 虚拟机

| | 容器 | 虚拟机 |
|---|------|--------|
| 启动速度 | 秒级 | 分钟级 |
| 资源占用 | MB 级 | GB 级 |
| 隔离级别 | 进程级 | 系统级 |
| 性能 | 接近原生 | 有损耗 |

容器共享宿主机的内核，虚拟机有自己的完整操作系统。

## Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
```

每一行是一层（layer），Docker 会缓存未变化的层，加速构建。

## 常用命令

```bash
# 构建镜像
docker build -t myapp:1.0 .

# 运行容器
docker run -d -p 3000:3000 --name myapp myapp:1.0

# 查看运行中的容器
docker ps

# 查看日志
docker logs myapp

# 进入容器
docker exec -it myapp sh

# 停止和删除
docker stop myapp
docker rm myapp
```

## 最佳实践

1. 使用 alpine 基础镜像（体积小）
2. 多阶段构建减小镜像体积
3. `.dockerignore` 排除不需要的文件
4. 不要在容器里存数据（用 Volume）
5. 一个容器只运行一个进程

```dockerfile
# 多阶段构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/server.js"]
```

> Docker 解决了"在我机器上能跑"的问题。学会 Docker，部署不再是噩梦。
