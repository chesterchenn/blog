---
layout: post
tags: 2023 typescript
title: TypeScript中的数据类型
---

typescript 拥有 javascript 相同的数据类型，还提供了更多其他的实用的类型使用。如常见的 tuple（元组），enum（枚举），any（任意值），unknow（未知），void（空值）和 never（从不）。

## 常见的类型

一些跟 javascript 相同类型的数据类型，都应该了解

### 基本类型

`string`, `number` 和 `boolean` 是 javascript 最经常使用的基本类型

### Array

数组的语法是 `number[]` 或者 `Array<string>`，表示相同类型的数组。

PS: _!!元组（tuple）是跟数组很类似！很容易混淆它们的关系。如：`[number]` 就不是数组!!_

### null 和 undefined

TypeScript 中的 null 和 undefined 的行为习惯取决与 `strictNullChecks` 是否打开，但由于 strictNullChecks 关闭会容易引出一些 bug，所以推荐开启，开启的时候就不会进行隐式转换。

### object

对象类型列举属性和属性类型，可以使用 `?` 表示可选。

```ts
function func(name: { first: string; last?: string }) {}
```

## TS 补充的类型

### Tuple

元组 Tuple 是一个指定长度和每个位置的数据类型的数组。

```ts
type StringNumberParis = [string, number];
```

### Enum

枚举允许开发者定义一个常量集合。

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

更多详见：[Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

### any

any 可以将任何类型的值赋值给它，也可以将它赋值给任何类型的值。它能让你避开类型检查。

```ts
let val: any;

val = 10;
val = 'str';
val = false;
```

`noImplicitAny` 可以设置禁用 any

### unknown

unknown 类型是代替 any，它比 any 更加安全因为 unknown 不允许做任何事情。

```ts
function f1(a: any) {
  a.b(); // OK
}

function f2(a: unknown) {
  a.b(); // 'a' is of type 'unknown'.
}
```

### void

空值表示函数不返回任何值。当 return 被省略或者没有 return 值的时候

```ts
function noop() {
  return;
}
```

在 javascript 里面，省略 return 会隐式返回 undefined，但在 TypeScript 中，void 和 undefined 是一样的值。

### never

never 表示永远不会被监测到的值。在返回的类型中，表示抛出错误或者程序的中断执行。

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

## 参考链接

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [从 0 开始的 TypeScript 三：TS 的类型](https://xie.infoq.cn/article/30598bd8be64c24e0721942d9)
- [Tuple Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)
- [More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
