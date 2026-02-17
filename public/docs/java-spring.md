# Java / Spring Boot 概览

## Java 在后端的地位

Java 是企业级后端的"老大哥"。全球大量银行、电商、政府系统都跑在 Java 上。

它不是最酷的语言，但胜在稳定、生态成熟、人才多。

## Spring Boot 是什么

Spring Boot 是 Java 后端的事实标准框架。它把复杂的 Spring 框架简化了，让你能快速启动一个项目。

比喻：Spring 是一个巨大的工具箱，Spring Boot 帮你把常用工具提前摆好了。

## 快速示例

```java
@RestController
public class UserController {

    @GetMapping("/api/users/{id}")
    public User getUser(@PathVariable Long id) {
        return new User(id, "小明");
    }

    @PostMapping("/api/users")
    public User createUser(@RequestBody User user) {
        return user;
    }
}
```

## 核心概念

| 概念 | 说明 |
|------|------|
| IoC 容器 | 对象的创建和管理交给框架 |
| 依赖注入 | 需要什么，框架自动给你 |
| AOP | 切面编程，统一处理日志、事务等 |
| JPA | 对象关系映射，用 Java 对象操作数据库 |
| Spring Security | 认证和授权框架 |

## 什么时候选 Java

- 大型企业项目，需要长期维护
- 团队有 Java 经验
- 需要强类型、强规范的代码
- 微服务架构（Spring Cloud 生态完善）

## Java vs 其他后端语言

| | Java | Go | Node.js | Python |
|---|------|-----|---------|--------|
| 性能 | 好 | 很好 | 一般 | 一般 |
| 启动速度 | 慢 | 快 | 快 | 快 |
| 生态 | 最丰富 | 增长中 | 丰富 | AI 最强 |
| 学习曲线 | 陡 | 平 | 平 | 平 |

> Java 不性感，但它可靠。在需要"稳"的场景下，它依然是首选。
