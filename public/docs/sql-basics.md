# 关系型数据库与 SQL

## 什么是关系型数据库

关系型数据库就是"用表格存数据"。每张表有固定的列（字段），每行是一条记录。

想象 Excel 表格：列是"姓名、年龄、邮箱"，每行是一个人的信息。关系型数据库就是一个更强大、更可靠的 Excel。

## 为什么需要数据库

- 数据持久化（程序重启数据不丢）
- 支持并发访问（多人同时读写）
- 数据完整性（约束、事务）
- 高效查询（索引）

## SQL 基础

### 创建表

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200) UNIQUE,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 增删改查（CRUD）

```sql
-- 插入
INSERT INTO users (name, email, age) VALUES ('小明', 'xm@example.com', 20);

-- 查询
SELECT * FROM users WHERE age > 18;
SELECT name, email FROM users ORDER BY created_at DESC LIMIT 10;

-- 更新
UPDATE users SET age = 21 WHERE name = '小明';

-- 删除
DELETE FROM users WHERE id = 1;
```

### 关联查询

```sql
-- 内连接：两张表都有匹配的数据
SELECT u.name, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- 左连接：左表全部 + 右表匹配的
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

### 聚合查询

```sql
-- 统计每个用户的订单数
SELECT user_id, COUNT(*) as order_count, SUM(amount) as total
FROM orders
GROUP BY user_id
HAVING total > 1000;
```

## 主流关系型数据库

| 数据库 | 特点 |
|--------|------|
| MySQL | 最流行，互联网公司首选 |
| PostgreSQL | 功能最强，支持 JSON、全文搜索 |
| SQLite | 嵌入式，无需服务器，适合小项目 |
| SQL Server | 微软生态 |
| Oracle | 企业级，贵 |

## 数据库设计原则

1. 每张表有主键（通常是自增 ID 或 UUID）
2. 字段类型选择合适的（别什么都用 VARCHAR）
3. 适当建立索引（查询快，但写入变慢）
4. 遵循范式，但不要过度规范化

> SQL 是和数据打交道的通用语言，不管你用什么后端框架，SQL 都是必修课。
