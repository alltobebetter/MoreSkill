# JavaScript 核心概念

## JavaScript 是什么

JavaScript 是浏览器里唯一能直接运行的编程语言。它让网页从"静态文档"变成了"可交互的应用"。

现在它不只在浏览器里跑，Node.js 让它也能写后端、命令行工具、甚至桌面应用。

## 变量与作用域

```javascript
var a = 1    // 函数作用域，有变量提升（老写法，别用了）
let b = 2    // 块级作用域，可重新赋值
const c = 3  // 块级作用域，不可重新赋值
```

> 现代 JS 里，默认用 `const`，需要改值时用 `let`，忘掉 `var`。

## 数据类型

基本类型（值传递）：`string`、`number`、`boolean`、`null`、`undefined`、`symbol`、`bigint`

引用类型（引用传递）：`object`、`array`、`function`

```javascript
// 基本类型：复制值
let a = 1
let b = a
b = 2
console.log(a) // 1，不受影响

// 引用类型：复制引用
let arr1 = [1, 2, 3]
let arr2 = arr1
arr2.push(4)
console.log(arr1) // [1, 2, 3, 4]，被影响了
```

## 函数

```javascript
// 函数声明
function add(a, b) {
  return a + b
}

// 箭头函数（更简洁，且不绑定自己的 this）
const add = (a, b) => a + b

// 默认参数
const greet = (name = '世界') => `你好，${name}`
```

## 异步编程

JavaScript 是单线程的，但通过异步机制可以处理耗时操作而不阻塞页面。

### 回调 → Promise → async/await 的演进

```javascript
// 回调地狱（老写法）
getData(function(a) {
  getMore(a, function(b) {
    getEvenMore(b, function(c) {
      console.log(c)
    })
  })
})

// Promise（好一些）
getData()
  .then(a => getMore(a))
  .then(b => getEvenMore(b))
  .then(c => console.log(c))

// async/await（最清晰）
async function fetchAll() {
  const a = await getData()
  const b = await getMore(a)
  const c = await getEvenMore(b)
  console.log(c)
}
```

## 解构与展开

```javascript
// 对象解构
const { name, age } = { name: '小明', age: 20 }

// 数组解构
const [first, ...rest] = [1, 2, 3, 4]
// first = 1, rest = [2, 3, 4]

// 展开运算符
const merged = { ...obj1, ...obj2 }
const combined = [...arr1, ...arr2]
```

## 模块系统

```javascript
// 导出
export const API_URL = '/api'
export default function App() {}

// 导入
import App, { API_URL } from './App'
```

## 原型与 this

JavaScript 的对象系统基于原型链，不是传统的类继承。ES6 的 `class` 只是语法糖。

```javascript
class Animal {
  constructor(name) {
    this.name = name
  }
  speak() {
    console.log(`${this.name} 发出声音`)
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} 汪汪叫`)
  }
}
```

`this` 的指向取决于函数怎么被调用，不是在哪里定义。箭头函数没有自己的 `this`，它会捕获外层的。

## 实用技巧

```javascript
// 可选链：安全访问深层属性
const city = user?.address?.city

// 空值合并：只在 null/undefined 时取默认值
const name = user.name ?? '匿名'

// 数组方法链
const result = items
  .filter(item => item.active)
  .map(item => item.name)
  .sort()
```

> JavaScript 的灵活性是把双刃剑。理解核心概念，才能写出可维护的代码。
