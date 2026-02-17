# Python 后端入门

## 为什么用 Python 做后端

Python 的哲学是"人生苦短，我用 Python"。它的语法简洁、生态丰富，特别在数据处理和 AI 领域有绝对优势。

如果你的项目涉及机器学习、数据分析，Python 后端是天然的选择。

## 主流框架

| 框架 | 特点 |
|------|------|
| FastAPI | 现代、高性能、自动生成 API 文档 |
| Django | 全功能框架，自带 ORM、Admin、认证 |
| Flask | 轻量灵活，适合小项目和微服务 |

## FastAPI 快速示例

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    age: int

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id, "name": "小明"}

@app.post("/users")
async def create_user(user: User):
    return {"message": f"创建用户 {user.name}"}
```

FastAPI 的亮点：
- 基于类型注解自动验证请求参数
- 自动生成 Swagger 文档（访问 `/docs`）
- 原生支持 async/await
- 性能接近 Go 和 Node.js

## Django 适合什么

Django 是"全家桶"框架，适合需要快速搭建完整应用的场景：

- 自带 ORM（不用写 SQL）
- 自带 Admin 后台（数据管理界面）
- 自带用户认证系统
- 自带表单验证、CSRF 防护

```python
# Django 模型定义
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
```

## 虚拟环境

Python 项目必须用虚拟环境隔离依赖，否则不同项目的依赖会冲突。

```bash
# 推荐用 uv（最快的 Python 包管理器）
uv venv
uv pip install fastapi uvicorn

# 或者传统方式
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate     # Windows
pip install fastapi uvicorn
```

## Python vs Node.js 后端

| | Python | Node.js |
|---|--------|---------|
| 语法 | 简洁优雅 | 灵活但容易混乱 |
| 性能 | 一般（FastAPI 除外） | I/O 密集型很强 |
| AI/ML | 绝对优势 | 需要调用 Python 服务 |
| 生态 | 数据科学、AI | Web 开发、全栈 |

> 选 Python 还是 Node.js 不是信仰问题，是场景问题。
