# 链路追踪

## 什么是链路追踪

在微服务架构中，一个请求可能经过多个服务。链路追踪记录请求在各个服务之间的流转路径和耗时。

比喻：快递追踪——你能看到包裹从发货到签收经过了哪些站点，每站花了多久。

## 核心概念

| 概念 | 说明 |
|------|------|
| Trace | 一次完整请求的链路 |
| Span | 链路中的一个操作（如一次 API 调用） |
| Trace ID | 链路唯一标识，贯穿所有服务 |
| Span ID | 单个操作的标识 |
| Parent Span | 父操作，形成调用树 |

## 一个请求的链路

```
[API Gateway] ──→ [User Service] ──→ [Database]
      │
      └──→ [Order Service] ──→ [Payment Service]
                                      │
                                      └──→ [Redis Cache]
```

每个箭头是一个 Span，整条链路是一个 Trace。

## OpenTelemetry

OpenTelemetry 是链路追踪的标准。它提供统一的 SDK，支持多种语言和后端。

```javascript
// Node.js 接入 OpenTelemetry
import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://jaeger:4318/v1/traces'
  })
})

sdk.start()
```

## 常用工具

| 工具 | 特点 |
|------|------|
| Jaeger | Uber 开源，功能全面 |
| Zipkin | Twitter 开源，轻量 |
| Grafana Tempo | 和 Grafana 生态集成 |

## 什么时候需要链路追踪

- 微服务架构（3 个以上服务）
- 需要定位跨服务的性能瓶颈
- 需要排查分布式系统的故障

> 日志告诉你"发生了什么"，指标告诉你"有多严重"，链路追踪告诉你"在哪里出了问题"。
