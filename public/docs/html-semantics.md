# HTML 语义化

## 什么是语义化

语义化就是"让标签说人话"。

比如你写一篇文章，标题用 `<h1>`，段落用 `<p>`，导航用 `<nav>`。浏览器、搜索引擎、屏幕阅读器看到这些标签，就知道每块内容是什么角色。

反面例子：全页面都用 `<div>`，虽然视觉上能通过 CSS 调成一样，但机器完全不知道哪块是标题、哪块是正文。

## 为什么重要

- 搜索引擎能更好地理解你的页面结构，有利于 SEO
- 屏幕阅读器能正确朗读内容，提升无障碍体验
- 代码可读性更好，团队协作更顺畅
- 浏览器可以提供默认的交互行为（比如 `<button>` 自带键盘焦点）

## 常用语义标签

| 标签 | 用途 | 替代了什么 |
|------|------|-----------|
| `<header>` | 页面或区块的头部 | `<div class="header">` |
| `<nav>` | 导航区域 | `<div class="nav">` |
| `<main>` | 页面主要内容（唯一） | `<div class="main">` |
| `<article>` | 独立的内容块 | `<div class="post">` |
| `<section>` | 主题性的内容分组 | `<div class="section">` |
| `<aside>` | 侧边栏/辅助内容 | `<div class="sidebar">` |
| `<footer>` | 页面或区块的底部 | `<div class="footer">` |
| `<figure>` | 图片/图表及其说明 | `<div class="image-wrapper">` |
| `<time>` | 日期时间 | `<span>` |

## 一个简单的对比

```html
<!-- 不语义化 -->
<div class="header">
  <div class="logo">MoreSkill</div>
  <div class="nav">
    <div class="nav-item">首页</div>
  </div>
</div>

<!-- 语义化 -->
<header>
  <h1>MoreSkill</h1>
  <nav>
    <a href="/">首页</a>
  </nav>
</header>
```

两段代码视觉上可以完全一样，但第二种写法，搜索引擎和辅助工具能直接理解结构。

## 实用建议

1. 能用语义标签就不用 `<div>`，`<div>` 是"没有语义"的容器
2. `<h1>` 到 `<h6>` 按层级使用，不要跳级
3. 交互元素用 `<button>` 和 `<a>`，不要用 `<div onclick>`
4. 表单元素配合 `<label>` 使用，提升可访问性

> 语义化不是为了好看，是为了让你的页面能被"理解"。
