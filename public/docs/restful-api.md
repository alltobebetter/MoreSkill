# RESTful API 设计

## 什么是 REST

REST 是一种 API 设计风格，不是协议。核心思想：用 URL 表示资源，用 HTTP 方法表示操作。

比喻：URL 是"名词"（你要操作什么），HTTP 方法是"动词"（你要做什么）。

## HTTP 方法

| 方法 | 操作 | 示例 |
|------|------|------|
| GET | 获取资源 | `GET /api/users` |
| POST | 创建资源 | `POST /api/users` |
| PUT | 全量更新 | `PUT /api/users/1` |
| PATCH | 部分更新 | `PATCH /api/users/1` |
| DELETE | 删除资源 | `DELETE /api/users/1` |

## URL 设计规范

```
好的设计：
GET    /api/users          获取用户列表
GET    /api/users/1        获取单个用户
POST   /api/users          创建用户
PUT    /api/users/1        更新用户
DELETE /api/users/1        删除用户
GET    /api/users/1/orders 获取用户的订单

不好的设计：
GET    /api/getUsers
POST   /api/createUser
POST   /api/deleteUser?id=1
```

规则：
- URL 用名词复数（`users` 不是 `user`）
- 用连字符分隔（`user-profiles` 不是 `userProfiles`）
- 不要在 URL 里放动词

## 状态码

| 状态码 | 含义 | 使用场景 |
|--------|------|---------|
| 200 | 成功 | GET、PUT、PATCH 成功 |
| 201 | 已创建 | POST 创建成功 |
| 204 | 无内容 | DELETE 成功 |
| 400 | 请求错误 | 参数验证失败 |
| 401 | 未认证 | 没有登录 |
| 403 | 无权限 | 登录了但没权限 |
| 404 | 未找到 | 资源不存在 |
| 409 | 冲突 | 重复创建 |
| 500 | 服务器错误 | 后端 bug |

## 响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "name": "小明"
  }
}

{
  "code": 40001,
  "message": "邮箱格式不正确",
  "data": null
}
```

## 分页

```
GET /api/articles?page=2&size=20

响应：
{
  "data": [...],
  "pagination": {
    "page": 2,
    "size": 20,
    "total": 156
  }
}
```

## 版本控制

```
/api/v1/users
/api/v2/users
```

或者用 Header：`Accept: application/vnd.myapp.v2+json`

> 好的 API 设计让前后端协作更顺畅，也让 API 更容易被第三方使用。
