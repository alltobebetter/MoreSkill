# PostgreSQL 特性

## PostgreSQL 是什么

PostgreSQL（简称 PG）是功能最强大的开源关系型数据库。如果 MySQL 是"够用就好"，PG 就是"什么都能干"。

## 相比 MySQL 的优势

| 特性 | PostgreSQL | MySQL |
|------|-----------|-------|
| JSON 支持 | 原生 JSONB，可索引 | 基础 JSON 支持 |
| 全文搜索 | 内置 | 需要额外方案 |
| 数组类型 | 支持 | 不支持 |
| 地理信息 | PostGIS 扩展 | 有限 |
| 并发控制 | MVCC 更成熟 | InnoDB MVCC |

## JSONB：结构化 + 灵活

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT,
  attrs JSONB
);

INSERT INTO products (name, attrs) VALUES
  ('手机', '{"brand": "Apple", "storage": 256}');

SELECT name FROM products WHERE attrs->>'brand' = 'Apple';
CREATE INDEX idx_attrs ON products USING GIN (attrs);
```

## 什么时候选 PostgreSQL

- 需要存储和查询 JSON 数据
- 需要全文搜索或地理位置查询
- 数据模型复杂，需要高级 SQL 特性

> PostgreSQL 是"程序员的数据库"，功能强大但学习曲线稍陡。
