<div align="center">

# 📚 MoreSkill

**面向 AI 时代的开发者技术知识库**

用人话讲清楚每项技术 / A developer knowledge base for the AI era

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-10b981.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

[在线阅读](https://alltobebetter.github.io/MoreSkill) · [参与贡献](#参与贡献)

</div>

---

## 这是什么

MoreSkill 是一个开源的技术知识库，覆盖 15 个技术领域、60+ 篇文档。

它不是教程，不是面试题集，而是一份**技术地图** —— 帮你快速理解每项技术"是什么"和"为什么要用它"。

## 为什么做这个

AI 时代技术迭代很快，工具越来越强大。但如果你不了解背后的技术，AI 对你来说就是一个黑盒。

MoreSkill 帮你建立基本的技术认知，让你在面对技术选型时不再心慌。

## 内容覆盖

| 领域 | 内容 |
|------|------|
| 前端 | HTML、CSS、JS、TS、React、Vue、工程化、浏览器原理 |
| 后端 | Node.js、Python、Go、Java / Spring Boot |
| 数据库 | SQL、MySQL、PostgreSQL、MongoDB、索引、事务 |
| 缓存 | Redis、缓存策略、分布式缓存 |
| API | REST、GraphQL、gRPC、WebSocket |
| 安全 | JWT / OAuth、HTTPS、Web 安全、CORS |
| 消息队列 | RabbitMQ、Kafka |
| 架构 | 微服务、DDD、事件驱动、设计模式、分布式系统 |
| 容器 | Docker、Compose、Kubernetes、Helm |
| DevOps | Git、CI/CD、GitHub Actions、Nginx |
| 云服务 | Linux、部署、Serverless、对象存储、CDN |
| 监控 | 日志、Prometheus + Grafana、链路追踪 |
| 测试 | 单元测试、集成测试 / E2E、TDD |
| AI | 机器学习、深度学习、LLM、向量数据库 / RAG、AI 应用开发 |

## 本地运行

```bash
git clone https://github.com/alltobebetter/MoreSkill.git
cd MoreSkill
npm install
npm run dev
```

## 参与贡献

这个项目目前可能很小众，但如果内容帮助到了你，哪怕只是一点点，欢迎一起参与。

**你不需要是专家。** 你可以：

- 修正错别字或不准确的描述
- 用更好的比喻重新解释一个概念
- 补充缺少的技术话题
- 翻译内容为其他语言

### 步骤

1. Fork 本仓库
2. 文档在 `docs/` 目录下，每篇是一个 `.md` 文件
3. 目录结构在 `docs/content.md` 中定义
4. 新增文档需同步复制到 `public/docs/`
5. 提交 Pull Request

### 写作风格

- 从"是什么"和"为什么"讲起
- 多用比喻和生活中的例子
- 不需要很深，讲清楚解决什么问题就好
- 保持轻松友好的语气

## 技术栈

React + TypeScript + Vite，纯 CSS 样式，Markdown 渲染。

## 协议

内容采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 协议，可自由分享与改编，需注明出处。
