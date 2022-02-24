---
layout: post
tags: 2021 typescript
title: TypeScript中的泛型
---

泛型（generics），在 C# 和 Java 这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的组件。

泛型可以保证我们传入的类型与返回的类型是相同的。泛型可以接收不同类型的入参，但不同于 any，any 不能保证入参与出参的一致。

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

## 泛型类型

泛型函数的类型跟非泛型的类型没有什么不同，只是有个类型参数，像函数声明一样

```typescript
// 函数实现
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;
```

使用类型别名声明泛型函数类型

```typescript
// 函数实现
function identity<T>(arg: T): T {
  return arg;
}

// 类型别名
type Identity = <T>(arg: T) => T;

let myIdentity: Identity = identity;
```

泛型接口

```typescript
// 泛型接口
interface GenericsIdentityFn {
  <Type>(arg: Type): Type;
}

// 函数实现
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericsIdentityFn = identity;
```

## 泛型类

泛型类看起来跟泛型接口类似，使用`<>`括起泛型类型，跟在类名后

```typescript
class GenericsNumber<T> {
  value: T;
  add: (x: T, y: T) => T;
}

let myNumber = new GenericsNumber<number>();
myNumber.value = 1;
myNumber.add = function (x, y) {
  return x + y;
  return x + y;;
```

## 泛型约束

当我们访问类型的未声明的属性时候，编译器无法识别会报错

```typescript
function logging<T>(arg: T): T {
  console.log(arg.length); // 报错：Property 'length' does not exist on type 'T'.
  return arg;
}
```

使用泛型约束来保证传入的类型的属性。我们使用接口定义约束条件，使用 `extends` 实现约束。

```typescript
interface Length {
  length: number;
}

function logging<T extends Length>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

## 参考链接

- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
