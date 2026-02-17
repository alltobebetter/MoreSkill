# MongoDB 文档数据库

## 什么是 MongoDB

MongoDB 是最流行的 NoSQL 数据库。它用 JSON 格式（BSON）存储数据，没有固定的表结构。

比喻：关系型数据库像 Excel 表格（每行格式固定），MongoDB 像一个文件柜（每个文件夹里的文件格式可以不同）。

## 核心概念对比

| 关系型数据库 | MongoDB |
|------------|---------|
| 数据库 | 数据库 |
| 表（Table） | 集合（Collection） |
| 行（Row） | 文档（Document） |
| 列（Column） | 字段（Field） |
| JOIN | 嵌套文档 / $lookup |

## 基本操作

```javascript
// 插入
db.users.insertOne({
  name: "小明",
  age: 20,
  hobbies: ["编程", "游戏"],
  address: { city: "北京", district: "海淀" }
})

// 查询
db.users.find({ age: { $gt: 18 } })
db.users.find({ "address.city": "北京" })

// 更新
db.users.updateOne(
  { name: "小明" },
  { $set: { age: 21 }, $push: { hobbies: "读书" } }
)

// 删除
db.users.deleteOne({ name: "小明" })
```

## 什么时候用 MongoDB

适合：
- 数据结构不固定或经常变化
- 需要存储嵌套的复杂对象
- 读多写多，需要水平扩展
- 日志、内容管理、物联网数据

不适合：
- 需要复杂的关联查询
- 需要强事务支持
- 数据关系复杂且固定

> MongoDB 不是 MySQL 的替代品，它们解决不同的问题。
