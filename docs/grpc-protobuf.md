# gRPC 与 Protocol Buffers

## 什么是 gRPC

gRPC 是 Google 开发的高性能 RPC 框架。RPC 就是"远程过程调用"——像调用本地函数一样调用远程服务。

比喻：REST 像写信（文本格式，通用但慢），gRPC 像打电话（二进制格式，快但需要双方约定协议）。

## Protocol Buffers

gRPC 用 Protocol Buffers（protobuf）定义接口和数据格式。

```protobuf
syntax = "proto3";

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (stream User);
}

message GetUserRequest {
  int32 id = 1;
}

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}
```

## gRPC vs REST

| | gRPC | REST |
|---|------|------|
| 协议 | HTTP/2 | HTTP/1.1 或 HTTP/2 |
| 数据格式 | Protobuf（二进制） | JSON（文本） |
| 性能 | 很快 | 一般 |
| 流式传输 | 原生支持 | 需要 WebSocket |
| 浏览器支持 | 需要 grpc-web | 原生支持 |
| 可读性 | 差（二进制） | 好（JSON） |

## 四种通信模式

1. 一元调用：请求-响应，最常见
2. 服务端流：客户端发一个请求，服务端返回一个流
3. 客户端流：客户端发送一个流，服务端返回一个响应
4. 双向流：双方同时发送和接收流

## 什么时候用 gRPC

- 微服务之间的内部通信（不需要浏览器直接调用）
- 对性能要求高的场景
- 需要流式传输
- 多语言服务之间的通信（protobuf 支持几乎所有语言）

> gRPC 适合服务间通信，REST 适合对外暴露 API。两者经常在同一个系统中共存。
