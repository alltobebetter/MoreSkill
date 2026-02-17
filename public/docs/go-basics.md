# Go 语言入门

## 什么是 Go

Go（Golang）是 Google 开发的编程语言。它的设计目标是：简单、高效、适合大规模并发。

如果 Python 是瑞士军刀（什么都能干），Go 就是一把锋利的菜刀——功能不多，但在它擅长的领域极其高效。

## 为什么学 Go

- 编译成单个二进制文件，部署极其简单（不需要运行时环境）
- 原生支持并发（goroutine），轻松处理高并发
- 编译速度快，开发体验好
- Docker、Kubernetes、Prometheus 都是 Go 写的

## 基础语法

```go
package main

import "fmt"

func main() {
    // 变量声明
    name := "小明"  // 短声明
    var age int = 20

    fmt.Printf("%s 今年 %d 岁\n", name, age)

    // 条件
    if age >= 18 {
        fmt.Println("成年了")
    }

    // 循环（Go 只有 for）
    for i := 0; i < 5; i++ {
        fmt.Println(i)
    }
}
```

## 结构体与方法

Go 没有类，用结构体 + 方法实现面向对象。

```go
type User struct {
    Name string
    Age  int
}

func (u User) Greet() string {
    return fmt.Sprintf("你好，我是 %s", u.Name)
}

func main() {
    user := User{Name: "小明", Age: 20}
    fmt.Println(user.Greet())
}
```

## Goroutine：轻量级并发

```go
func fetchURL(url string) {
    resp, _ := http.Get(url)
    fmt.Println(url, resp.StatusCode)
}

func main() {
    urls := []string{
        "https://example.com",
        "https://google.com",
        "https://github.com",
    }

    for _, url := range urls {
        go fetchURL(url)  // 启动 goroutine，并发执行
    }

    time.Sleep(time.Second * 3) // 等待完成
}
```

一个 goroutine 只占几 KB 内存，可以轻松创建数十万个。

## HTTP 服务

```go
package main

import (
    "encoding/json"
    "net/http"
)

func main() {
    http.HandleFunc("/api/hello", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{
            "message": "Hello World",
        })
    })

    http.ListenAndServe(":8080", nil)
}
```

常用框架：Gin（最流行）、Echo、Fiber

## Go 适合什么

| 适合 | 不太适合 |
|------|---------|
| 微服务 | 快速原型开发 |
| CLI 工具 | 数据科学/AI |
| 高并发服务 | 复杂业务逻辑（泛型支持有限） |
| 基础设施工具 | 前端开发 |
| API 网关 | 脚本任务 |

> Go 的哲学是"少即是多"。它故意不提供很多特性，让代码保持简单直接。
