# CSS 布局：Flexbox 与 Grid

## 为什么需要它们

以前用 CSS 布局，靠的是 `float`、`position`、`margin` 各种 hack。就像用胶带和铁丝搭房子——能住，但不优雅。

Flexbox 和 Grid 是 CSS 原生的布局系统，专门为"排列元素"而生。

## Flexbox：一维布局

Flexbox 擅长处理"一行"或"一列"的排列。

想象一根绳子，上面挂着几件衣服。你可以控制衣服之间的间距、对齐方式、排列方向。

```css
.container {
  display: flex;
  justify-content: space-between; /* 水平分布 */
  align-items: center;            /* 垂直居中 */
  gap: 16px;                      /* 间距 */
}
```

### 核心属性

| 属性 | 作用 | 常用值 |
|------|------|--------|
| `flex-direction` | 排列方向 | `row`、`column` |
| `justify-content` | 主轴对齐 | `center`、`space-between`、`flex-start` |
| `align-items` | 交叉轴对齐 | `center`、`stretch`、`flex-start` |
| `flex-wrap` | 是否换行 | `nowrap`、`wrap` |
| `gap` | 元素间距 | `8px`、`1rem` |

### 子元素属性

```css
.item {
  flex: 1;          /* 平分剩余空间 */
  flex-shrink: 0;   /* 不缩小 */
  flex-basis: 200px; /* 初始宽度 */
}
```

## Grid：二维布局

Grid 擅长处理"行和列"同时存在的布局。

想象一个棋盘，你可以精确控制每个格子的大小和位置。

```css
.container {
  display: grid;
  grid-template-columns: 260px 1fr;  /* 左侧固定，右侧自适应 */
  grid-template-rows: 60px 1fr;      /* 顶部固定，下方自适应 */
  gap: 0;
}
```

### 核心属性

| 属性 | 作用 |
|------|------|
| `grid-template-columns` | 定义列 |
| `grid-template-rows` | 定义行 |
| `grid-column` | 子元素跨列 |
| `grid-row` | 子元素跨行 |
| `grid-template-areas` | 用名字定义区域 |

### 用 areas 做页面布局

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content";
  grid-template-columns: 260px 1fr;
  grid-template-rows: 60px 1fr;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
```

这段代码一眼就能看出页面结构，比嵌套一堆 `<div>` 清晰得多。

## 什么时候用哪个

| 场景 | 推荐 |
|------|------|
| 导航栏、按钮组、卡片列表 | Flexbox |
| 整体页面布局 | Grid |
| 一行内的对齐和分布 | Flexbox |
| 复杂的行列混合布局 | Grid |
| 不确定子元素数量 | Flexbox |

> 简单记：一维用 Flex，二维用 Grid。实际项目中两者经常混用。
