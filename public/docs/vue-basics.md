# Vue 基础

## 什么是 Vue

Vue 是一个渐进式 JavaScript 框架。"渐进式"意味着你可以只用它的一小部分，也可以用它搭建整个应用。

如果说 React 像乐高——给你积木自己搭，那 Vue 更像宜家——给你一套完整的方案，按说明书组装就行。

## 核心概念：响应式

Vue 的核心是响应式系统。你改了数据，页面自动更新。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
</script>

<template>
  <button @click="increment">点击了 {{ count }} 次</button>
</template>
```

`ref()` 创建一个响应式变量。在 JS 里通过 `.value` 访问，在模板里直接用。

## 模板语法

```vue
<template>
  <!-- 文本插值 -->
  <p>{{ message }}</p>

  <!-- 属性绑定 -->
  <img :src="imageUrl" :alt="title" />

  <!-- 事件绑定 -->
  <button @click="handleClick">点击</button>

  <!-- 条件渲染 -->
  <div v-if="isVisible">看得见</div>
  <div v-else>看不见</div>

  <!-- 列表渲染 -->
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</template>
```

## 组合式 API

Vue 3 推荐使用组合式 API（Composition API），用 `<script setup>` 语法。

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const items = ref<string[]>([])
const count = computed(() => items.value.length)

onMounted(() => {
  fetch('/api/items')
    .then(r => r.json())
    .then(data => items.value = data)
})
</script>
```

## Props 与 Emit

```vue
<!-- 子组件 -->
<script setup lang="ts">
const props = defineProps<{ title: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <button @click="emit('close')">关闭</button>
  </div>
</template>
```

## Vue vs React

| | Vue | React |
|---|-----|-------|
| 模板 | HTML 模板 | JSX |
| 响应式 | 自动追踪依赖 | 手动 setState |
| 学习曲线 | 较平缓 | 需要理解更多概念 |
| 生态 | 官方提供路由、状态管理 | 社区方案为主 |
| 适合 | 快速开发、中小项目 | 大型应用、灵活定制 |

两者都是优秀的框架，选哪个取决于团队和项目需求。

> Vue 的哲学是"让简单的事情保持简单"。
