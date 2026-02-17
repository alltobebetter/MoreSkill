# React 基础

## 什么是 React

React 是一个用来构建用户界面的 JavaScript 库。它的核心思想是：UI 是数据的函数。

传统方式：手动操作 DOM，告诉浏览器"把这个元素的文字改成 xxx"。
React 方式：你描述"数据是什么样的，UI 就应该是什么样的"，React 帮你更新 DOM。

就像你告诉厨师"我要一份番茄炒蛋"，而不是"先切番茄，再打蛋，然后热锅..."。

## 组件

React 的一切都是组件。组件就是一个返回 JSX 的函数。

```tsx
function Welcome({ name }: { name: string }) {
  return <h1>你好，{name}</h1>
}

// 使用
<Welcome name="小明" />
```

## JSX

JSX 看起来像 HTML，但其实是 JavaScript。它让你在 JS 里写 UI 结构。

```tsx
const element = (
  <div className="card">
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
)
```

注意：`class` 要写成 `className`，`for` 要写成 `htmlFor`，因为它们是 JS 保留字。

## State：组件的记忆

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      点击了 {count} 次
    </button>
  )
}
```

`useState` 返回一个值和一个更新函数。每次调用更新函数，组件会重新渲染。

## Effect：副作用处理

```tsx
import { useEffect } from 'react'

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(setUser)
  }, [userId]) // userId 变化时重新执行

  return <div>{user?.name}</div>
}
```

`useEffect` 用来处理"渲染之外的事情"：请求数据、订阅事件、操作 DOM 等。

## 常用 Hooks

| Hook | 用途 |
|------|------|
| `useState` | 管理组件状态 |
| `useEffect` | 处理副作用 |
| `useRef` | 引用 DOM 元素或保存不触发渲染的值 |
| `useMemo` | 缓存计算结果 |
| `useCallback` | 缓存函数引用 |
| `useContext` | 跨组件共享数据 |

## Props vs State

| | Props | State |
|---|-------|-------|
| 谁控制 | 父组件传入 | 组件自己管理 |
| 能否修改 | 只读 | 可以通过 setter 修改 |
| 用途 | 配置组件 | 记录交互状态 |

## 条件渲染与列表

```tsx
// 条件渲染
{isLoggedIn ? <Dashboard /> : <Login />}
{error && <ErrorMessage text={error} />}

// 列表渲染
{items.map(item => (
  <Card key={item.id} title={item.title} />
))}
```

> `key` 是必须的，它帮助 React 识别哪些元素变了。用唯一 ID，别用数组索引。

## 组件设计原则

1. 单一职责：一个组件只做一件事
2. 数据向下流动：父组件通过 props 传数据给子组件
3. 事件向上传递：子组件通过回调函数通知父组件
4. 保持组件小而专注，大组件拆成小组件

> React 的学习曲线不在语法，而在"用声明式思维替代命令式思维"。
