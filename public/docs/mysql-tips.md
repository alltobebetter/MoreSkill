# MySQL 实战要点

## MySQL 的定位

MySQL 是全球最流行的开源关系型数据库。大部分互联网公司的核心数据都存在 MySQL 里。

## 存储引擎

MySQL 支持多种存储引擎，但你只需要知道一个：InnoDB。

| 引擎 | 特点 |
|------|------|
| InnoDB | 默认引擎，支持事务、行锁、外键 |
| MyISAM | 不支持事务，读取快，已过时 |

## 索引

索引就像书的目录。没有索引，查数据要从头翻到尾（全表扫描）。有了索引，直接翻到对应页码。

```sql
-- 创建索引
CREATE INDEX idx_email ON users(email);

-- 联合索引
CREATE INDEX idx_name_age ON users(name, age);

-- 查看查询是否用了索引
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
```

### 索引使用原则

- 经常出现在 WHERE、ORDER BY、JOIN 条件中的字段要建索引
- 联合索引遵循"最左前缀"原则
- 不要给每个字段都建索引（写入会变慢）
- 区分度低的字段（如性别）不适合单独建索引

## 慢查询优化

```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = ON;
SET GLOBAL long_query_time = 1;  -- 超过1秒的查询

-- 用 EXPLAIN 分析
EXPLAIN SELECT * FROM orders WHERE user_id = 100;
```

EXPLAIN 结果中关注：
- `type`：`ALL` 是全表扫描（差），`ref`/`const` 是用了索引（好）
- `rows`：扫描的行数，越少越好
- `Extra`：`Using filesort` 和 `Using temporary` 要注意

## 分页优化

```sql
-- 差：偏移量大时很慢
SELECT * FROM articles ORDER BY id DESC LIMIT 100000, 20;

-- 好：用游标分页
SELECT * FROM articles WHERE id < 100000 ORDER BY id DESC LIMIT 20;
```

## 连接池

不要每次请求都新建数据库连接，用连接池复用连接。

```javascript
// Node.js 示例
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
  connectionLimit: 10
})
```

> MySQL 的性能问题 90% 出在索引和查询语句上，而不是 MySQL 本身。
