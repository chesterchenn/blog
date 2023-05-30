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

- tuple
- enum
- any
- void
- never
- unknow

## 参考链接

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
