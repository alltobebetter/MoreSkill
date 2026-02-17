# Prometheus + Grafana

## 什么是 Prometheus

Prometheus 是开源的监控和告警系统。它定期拉取（scrape）应用暴露的指标数据，存储并支持查询。

## 什么是 Grafana

Grafana 是可视化平台，把 Prometheus 的数据变成漂亮的仪表盘。

## 工作流程

```
应用暴露 /metrics 端点
  → Prometheus 定期拉取指标
  → 存储时序数据
  → Grafana 查询并展示
  → 配置告警规则 → 触发通知
```

## 常见监控指标

| 类型 | 指标 | 说明 |
|------|------|------|
| RED | Rate | 请求速率 |
| RED | Errors | 错误率 |
| RED | Duration | 响应时间 |
| USE | Utilization | CPU/内存使用率 |
| USE | Saturation | 队列长度/等待数 |
| USE | Errors | 系统错误 |

## 应用接入

```javascript
// Node.js 示例（prom-client）
import { Counter, Histogram, register } from 'prom-client'

const httpRequests = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status']
})

const httpDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'path']
})

// 暴露指标端点
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})
```

## 告警

```yaml
# Prometheus 告警规则
groups:
  - name: app
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status="500"}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "错误率过高"
```

> 没有监控的系统就像没有仪表盘的汽车——你不知道它什么时候会出问题。
