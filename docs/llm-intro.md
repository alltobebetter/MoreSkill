# 大语言模型 LLM

## 什么是 LLM

大语言模型（Large Language Model）是基于 Transformer 架构、用海量文本训练的 AI 模型。它能理解和生成自然语言。

ChatGPT、Claude、Gemini 都是 LLM 的应用。

## 工作原理（简化版）

LLM 本质上是一个"下一个词预测器"。

```
输入：今天天气真
模型预测下一个词的概率：好(0.6) 差(0.2) 热(0.1) ...
选择"好"
继续：今天天气真好
```

通过海量文本训练，模型学会了语言的模式、知识和推理能力。

## 核心概念

| 概念 | 说明 |
|------|------|
| Token | 文本的最小单位（大约 1 个汉字或 0.75 个英文单词） |
| Context Window | 模型能处理的最大 token 数 |
| Temperature | 控制输出的随机性（0=确定，1=创意） |
| Prompt | 给模型的输入/指令 |
| Fine-tuning | 在特定数据上微调模型 |
| RAG | 检索增强生成，结合外部知识 |

## 使用方式

### API 调用

```python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "你是一个编程助手"},
        {"role": "user", "content": "解释什么是 Redis"}
    ]
)
print(response.choices[0].message.content)
```

### 本地部署

用 Ollama 在本地运行开源模型：

```bash
ollama run llama3
```

## Prompt Engineering

好的 prompt 能大幅提升输出质量：

```
差：写一个函数
好：用 TypeScript 写一个函数，接收一个字符串数组，返回去重后按字母排序的结果。包含类型注解和边界处理。
```

技巧：
- 明确角色和任务
- 提供示例（Few-shot）
- 指定输出格式
- 分步骤思考（Chain of Thought）

## 开源 vs 闭源

| | 开源模型 | 闭源模型 |
|---|---------|---------|
| 代表 | Llama、Qwen、DeepSeek | GPT-4、Claude |
| 数据隐私 | 本地运行，数据不外传 | 数据发送到云端 |
| 成本 | 需要 GPU 硬件 | 按 token 付费 |
| 定制性 | 可以微调 | 只能通过 prompt |

> LLM 是工具，不是魔法。理解它的能力边界，才能用好它。
