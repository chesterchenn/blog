---
layout: post
tags: 2022 typescript
title: TypeScript中的对象类型
---

在 TypeScipt 中我们通过对象类型传递对象。

## 索引签名

有时我们并不能提前知道所有属性的名称，但是可以知道它们的类型形态。

在这种情况下，你可以使用索引签名来描述可能的值的类型。

```typescript
interface NumberDictionary {
  [index: string]: number;
  length: number;
  name: string; // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}
```

数字签名总是让我想到了在声明对象的时候，在不清楚对象的 key 值。

- 可以使用 `Record<string, unknown>` 来替代 any object 任意对象。
- 可以使用 `Record<string, never>` 来替代 empty object 空对象。

## 泛型对象类型

有一个很好的例子来说明我们为什么要使用泛型对象类型。

假设一个 `Box` 类型可能包含任何类型的值。我们可以使用 `any` 类型声明保证正常运行，但可能导致一些的事故产生。

```typescript
interface Box {
  contents: any;
}
````

我们使用 `unknown` 来代替，但这意味着我们需要进行预防性检查，或者用到一些容易出错的类型断言。

```typescript
interface Box {
  contents: unknown;
}

let x: Box = {
  contents: 'Hello',
};

// 我们能检查 'x.contents'
if (typeof x.contents === 'string') {
  console.log(x.contents.toLowerCase());
}

// 或者使用类型断言
console.log((x.contents as string).toLowerCase());
```

最后，我们声明一个类型参数创建一个泛型 Box 的类型。

```typescript
interface Box<T> {
  contents: T;
}

let box: Box<string> = { contents: 'hello' };

function setContent<T>(box: Box<T>, newContents: T) {
  box.contents = newContents；
}
```

## 参考链接

- [TypeScipt: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
