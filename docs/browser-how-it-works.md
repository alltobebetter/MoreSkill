# 浏览器工作原理

## 从输入 URL 到页面显示

这是面试经典题，但理解它对日常开发也很有帮助。

### 1. DNS 解析

浏览器拿到域名（如 `example.com`），需要找到对应的 IP 地址。就像你知道餐厅名字，但需要查地图找到具体地址。

查找顺序：浏览器缓存 → 系统缓存 → 路由器缓存 → DNS 服务器

### 2. TCP 连接

找到 IP 后，浏览器和服务器建立 TCP 连接（三次握手）。

就像打电话：
- "喂，能听到吗？"（SYN）
- "能听到，你呢？"（SYN + ACK）
- "我也能听到，开始说吧"（ACK）

### 3. 发送 HTTP 请求

连接建立后，浏览器发送 HTTP 请求，服务器返回 HTML 文档。

### 4. 解析与渲染

这是重点：

```
HTML → DOM 树
CSS  → CSSOM 树
DOM + CSSOM → 渲染树 → 布局 → 绘制 → 合成
```

## 渲染流程详解

### DOM 树

浏览器逐行解析 HTML，构建 DOM（Document Object Model）树。每个标签变成一个节点。

### CSSOM 树

同时解析 CSS，构建 CSSOM 树。每个节点带上计算后的样式。

### 渲染树

DOM + CSSOM 合并成渲染树。注意：`display: none` 的元素不会出现在渲染树中。

### 布局（Layout/Reflow）

计算每个元素的位置和大小。这一步很耗性能。

### 绘制（Paint）

把元素画到屏幕上：颜色、边框、阴影、文字等。

### 合成（Composite）

把不同层合并成最终画面。`transform` 和 `opacity` 的动画只触发合成，所以性能好。

## 重排与重绘

| | 重排（Reflow） | 重绘（Repaint） |
|---|---------------|----------------|
| 触发 | 改变布局（宽高、位置） | 改变外观（颜色、阴影） |
| 性能 | 很贵 | 较贵 |
| 示例 | 改 width、添加元素 | 改 color、background |

### 优化建议

```javascript
// 差：多次触发重排
el.style.width = '100px'
el.style.height = '200px'
el.style.margin = '10px'

// 好：一次性修改
el.classList.add('new-style')
```

## 事件循环（Event Loop）

JavaScript 是单线程的，但能处理异步操作，靠的就是事件循环。

```
调用栈（同步代码）
  ↓ 执行完毕
微任务队列（Promise.then、MutationObserver）
  ↓ 清空
宏任务队列（setTimeout、setInterval、I/O）
  ↓ 取一个执行
回到微任务队列...循环
```

```javascript
console.log('1')           // 同步
setTimeout(() => console.log('2'), 0)  // 宏任务
Promise.resolve().then(() => console.log('3'))  // 微任务
console.log('4')           // 同步

// 输出：1 4 3 2
```

## 浏览器存储

| 方式 | 容量 | 生命周期 | 用途 |
|------|------|---------|------|
| Cookie | 4KB | 可设过期时间 | 身份认证 |
| localStorage | 5-10MB | 永久 | 用户偏好设置 |
| sessionStorage | 5-10MB | 标签页关闭 | 临时数据 |
| IndexedDB | 无限制 | 永久 | 大量结构化数据 |

> 理解浏览器的工作原理，能帮你写出更快、更流畅的前端应用。
