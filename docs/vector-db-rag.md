# 向量数据库与 RAG

## 什么是向量数据库

向量数据库专门存储和检索"向量"——高维数字数组。

传统数据库：搜索"精确匹配"（WHERE name = '小明'）
向量数据库：搜索"语义相似"（找和"如何学编程"意思最接近的内容）

## Embedding

把文本、图片等转换成向量的过程叫 Embedding。

```
"今天天气真好" → [0.12, -0.34, 0.56, ..., 0.78]  (1536维)
"天气不错"     → [0.11, -0.33, 0.55, ..., 0.77]  (很接近)
"我喜欢编程"   → [0.89, 0.12, -0.45, ..., 0.23]  (很远)
```

语义相似的文本，向量距离近。

## RAG 是什么

RAG（Retrieval-Augmented Generation）= 检索 + 生成。

LLM 的知识有截止日期，也不知道你的私有数据。RAG 让 LLM 先检索相关文档，再基于文档回答。

```
用户提问
  → 把问题转成向量
  → 在向量数据库中搜索相似文档
  → 把相关文档 + 问题一起发给 LLM
  → LLM 基于文档生成回答
```

## 简单实现

```python
from openai import OpenAI

client = OpenAI()

# 1. 文档切片并生成向量
chunks = split_document("knowledge_base.md")
for chunk in chunks:
    embedding = client.embeddings.create(
        model="text-embedding-3-small",
        input=chunk
    ).data[0].embedding
    vector_db.insert(chunk, embedding)

# 2. 用户提问时检索
question = "Redis 的缓存策略有哪些？"
q_embedding = client.embeddings.create(
    model="text-embedding-3-small",
    input=question
).data[0].embedding

relevant_docs = vector_db.search(q_embedding, top_k=3)

# 3. 把检索结果和问题一起发给 LLM
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": f"根据以下文档回答问题：\n{relevant_docs}"},
        {"role": "user", "content": question}
    ]
)
```

## 常用向量数据库

| 数据库 | 特点 |
|--------|------|
| Pinecone | 全托管，开箱即用 |
| Milvus | 开源，功能全面 |
| Chroma | 轻量，适合原型 |
| pgvector | PostgreSQL 扩展，不用额外部署 |
| Qdrant | Rust 写的，性能好 |

## 适用场景

- 智能客服（基于产品文档回答）
- 知识库问答
- 代码搜索
- 推荐系统
- 图片相似搜索

> RAG 是让 LLM "接地气"的关键技术——让它基于你的数据说话，而不是凭空编造。
