# Redis 基础

## 什么是 Redis

Redis 是一个基于内存的键值存储数据库。它把数据放在内存里，所以读写速度非常快。

## 为什么要用 Redis

传统数据库（如 MySQL）把数据存在硬盘上，每次查询都要读硬盘，速度相对慢。而 Redis 把数据放在内存中：

- 内存读取速度是硬盘的 **10 万倍**以上
- 适合存放频繁访问的"热数据"
- 常见用途：缓存、会话管理、排行榜、消息队列

## 一个简单的例子

假设你的网站首页需要展示热门文章列表。每次用户访问都去查数据库，压力很大。

用 Redis 的思路：
1. 第一次查询数据库，把结果存到 Redis
2. 后续请求直接从 Redis 读取
3. 设置过期时间，比如 5 分钟后自动失效，重新从数据库加载

```python
import redis

r = redis.Redis()

# 先尝试从缓存读
cached = r.get("hot_articles")
if cached:
    return json.loads(cached)

# 缓存没有，查数据库
articles = db.query("SELECT * FROM articles ORDER BY views DESC LIMIT 10")

# 写入缓存，5分钟过期
r.setex("hot_articles", 300, json.dumps(articles))
return articles
```

## 核心概念

| 概念 | 说明 |
|------|------|
| Key-Value | 所有数据都是键值对 |
| TTL | 数据可以设置过期时间 |
| 持久化 | 虽然基于内存，但支持数据落盘 |
| 数据结构 | 支持字符串、列表、哈希、集合等 |

理解了这些，你就能判断什么场景适合用 Redis 了。
