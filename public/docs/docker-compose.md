# Docker Compose 实战

## 什么是 Docker Compose

Docker Compose 用一个 YAML 文件定义和管理多个容器。

比喻：Docker 是管理单个集装箱，Docker Compose 是管理整个码头——数据库、缓存、后端、前端一起启动。

## 基本示例

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine

volumes:
  pgdata:
```

## 常用命令

```bash
# 启动所有服务
docker compose up -d

# 查看状态
docker compose ps

# 查看日志
docker compose logs -f web

# 停止所有服务
docker compose down

# 重新构建
docker compose up -d --build
```

## 开发环境配置

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app          # 挂载源码，修改实时生效
      - /app/node_modules  # 排除 node_modules
    command: npm run dev
```

## 网络

Compose 自动创建网络，服务之间用服务名访问。

```javascript
// web 服务里连接数据库
const db = new Pool({ host: 'db', port: 5432 })
// 'db' 就是 compose 里的服务名
```

## 实用技巧

- `depends_on` 只保证启动顺序，不保证服务就绪
- 用 `healthcheck` 检查服务是否真正可用
- 敏感信息用 `.env` 文件或 Docker secrets
- 生产环境不建议用 Compose，用 Kubernetes

> Docker Compose 是本地开发和测试的利器，一条命令启动整个技术栈。
