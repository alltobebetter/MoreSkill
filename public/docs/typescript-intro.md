# TypeScript 入门

## 什么是 TypeScript

TypeScript 就是"带类型检查的 JavaScript"。

想象 JavaScript 是一条没有护栏的公路，你可以随意开，但容易翻车。TypeScript 加上了护栏——你还是在同一条路上开，但编辑器会在你偏离车道时提醒你。

## 为什么要用

- 写代码时就能发现错误，不用等到运行时
- 编辑器的自动补全变得非常智能
- 重构代码更安全，改一个接口，所有用到的地方都会报错
- 大型项目的可维护性大幅提升

## 基础类型

```typescript
let name: string = '小明'
let age: number = 20
let active: boolean = true
let items: string[] = ['a', 'b', 'c']
let tuple: [string, number] = ['hello', 42]
```

## 接口与类型

```typescript
// 接口：描述对象的形状
interface User {
  id: number
  name: string
  email?: string  // 可选属性
}

// 类型别名：更灵活
type Status = 'active' | 'inactive' | 'banned'
type Response<T> = {
  data: T
  error?: string
}
```

## 函数类型

```typescript
// 参数和返回值都有类型
function add(a: number, b: number): number {
  return a + b
}

// 箭头函数
const greet = (name: string): string => `你好，${name}`

// 泛型函数
function first<T>(arr: T[]): T | undefined {
  return arr[0]
}
```

## 泛型

泛型就像函数的"类型参数"。你不确定具体类型时，用泛型占位。

```typescript
// 不用泛型：只能处理一种类型
function wrapString(value: string): { value: string } {
  return { value }
}

// 用泛型：任何类型都行
function wrap<T>(value: T): { value: T } {
  return { value }
}

wrap(42)        // { value: number }
wrap('hello')   // { value: string }
```

## 常用工具类型

| 工具类型 | 作用 | 示例 |
|---------|------|------|
| `Partial<T>` | 所有属性变可选 | `Partial<User>` |
| `Required<T>` | 所有属性变必填 | `Required<User>` |
| `Pick<T, K>` | 选取部分属性 | `Pick<User, 'id' \| 'name'>` |
| `Omit<T, K>` | 排除部分属性 | `Omit<User, 'email'>` |
| `Record<K, V>` | 键值对映射 | `Record<string, number>` |

## 类型收窄

```typescript
function process(input: string | number) {
  if (typeof input === 'string') {
    // 这里 TS 知道 input 是 string
    return input.toUpperCase()
  }
  // 这里 TS 知道 input 是 number
  return input * 2
}
```

## 实际项目中的建议

1. 新项目直接用 TypeScript，迁移成本远低于后期补类型
2. 不要到处写 `any`，那等于没用 TypeScript
3. 接口定义放在单独的文件里，方便复用
4. 善用编辑器的类型推断，不需要每个变量都手动标注

> TypeScript 不是增加工作量，而是把"运行时才发现的 bug"提前到"写代码时就发现"。
