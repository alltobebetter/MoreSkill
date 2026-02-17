# 日志管理

## 为什么需要日志

日志是系统的"黑匣子"。出了问题，日志是你唯一的线索。

## 日志级别

| 级别 | 用途 |
|------|------|
| DEBUG | 开发调试信息 |
| INFO | 正常运行信息 |
| WARN | 警告，不影响运行 |
| ERROR | 错误，需要关注 |
| FATAL | 致命错误，系统崩溃 |

生产环境通常设置为 INFO 或 WARN。

## 结构化日志

```json
{
  "timestamp": "2026-02-17T10:30:00Z",
  "level": "ERROR",
  "message": "数据库连接失败",
  "service": "user-service",
  "traceId": "abc-123",
  "error": "Connection refused",
  "duration": 3000
}
```

结构化日志（JSON 格式）比纯文本更容易搜索和分析。

## ELK Stack

经典的日志收集方案：

```
应用 → Filebeat（收集）→ Logstash（处理）→ Elasticsearch（存储）→ Kibana（可视化）
```

轻量替代：Loki + Grafana（资源占用少，适合中小项目）

## 日志最佳实践

1. 用结构化日志，不要 `console.log("出错了")`
2. 包含请求 ID / 链路 ID，方便追踪
3. 不要记录敏感信息（密码、token）
4. 日志要有轮转（避免磁盘写满）
5. 错误日志要包含上下文（参数、用户 ID）

> 好的日志习惯能让你在凌晨 3 点被叫醒时，5 分钟内定位问题。
