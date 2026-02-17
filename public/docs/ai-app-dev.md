# AI 应用开发实践

## AI 应用的架构

```
用户界面
  → API 层
  → AI 编排层（LangChain / 自研）
  → LLM API / 本地模型
  → 向量数据库 / 工具调用
```

## 常用开发框架

| 框架 | 语言 | 特点 |
|------|------|------|
| LangChain | Python/JS | 最流行，功能全面 |
| LlamaIndex | Python | 专注 RAG |
| Vercel AI SDK | JS/TS | 前端友好，流式输出 |
| Semantic Kernel | C#/Python | 微软出品 |

## 流式输出

用户不想等 LLM 生成完整回答才看到结果。流式输出让文字逐字显示。

```typescript
// Vercel AI SDK 示例
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

const result = streamText({
  model: openai('gpt-4'),
  prompt: '解释什么是 Docker'
})

for await (const chunk of result.textStream) {
  process.stdout.write(chunk)
}
```

## Function Calling

让 LLM 调用外部工具：查天气、查数据库、执行代码。

```python
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "获取指定城市的天气",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "城市名"}
            }
        }
    }
}]

# LLM 会判断是否需要调用工具
# 如果用户问"北京天气怎么样"，LLM 会返回调用 get_weather 的请求
```

## 成本控制

| 策略 | 说明 |
|------|------|
| 缓存 | 相同问题直接返回缓存结果 |
| 模型选择 | 简单任务用小模型，复杂任务用大模型 |
| Prompt 优化 | 减少不必要的 token |
| 批处理 | 合并多个请求 |

## 安全注意事项

- Prompt 注入：用户可能通过输入操纵 LLM 行为
- 输出过滤：LLM 可能生成不当内容
- 数据隐私：敏感数据不要发送到第三方 API
- 幻觉：LLM 会编造不存在的信息，需要验证

## 评估

- 人工评估：最准确但最贵
- 自动评估：用另一个 LLM 评分
- 基准测试：在标准数据集上测试

> AI 应用开发的核心不是调 API，而是设计好的用户体验和可靠的系统架构。
