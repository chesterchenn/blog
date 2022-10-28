---
layout: post
tags: 2021 typescript
title: interface与type的区别
---

类型别名与接口在 TypeScript 中有着相似的功能。

原文链接：[When to use Type Aliases or Interfaces in TypeScript](https://www.carlrippon.com/when-to-use-type-aliases-v-interfaces/)

## 表示原始类型

类型别名可以表示原始类型，接口不可以。一般不使用，直接使用原始类型会更加简单。

```typescript
type Name = string;
```

## 表示数组

类型别名和接口都可以表示数组。一般也不使用，直接使用数组会更加简单。

```typescript
type Names = string[];

interface Names {
  [index: number]: string;
}
```

## 表示元组

类型别名可以表示元组，接口不可以。

```typescript
type Point = [number, number];
```

## 表示函数

类型别名和接口都可以表示函数。

```typescript
type Log = (message: string) => void;

interface Log {
  (message: string): void;
}
```

## 联合类型

类型别名可以表示联合类型，接口不可以。

```typescript
type Status = 'pending' | 'working' | 'complete';
```

## 表示对象

类型别名和接口都可以表示对象，但是接口会有更大的优势。

```typescript
type Person = {
  name: string;
  age: number;
};

interface Person {
  name: string;
  age: number;
}
```

## 组合对象

类型别名和接口都可以组合对象。

```typescript
type Name = {
  firstName: string;
  lastName: string;
};

type Phone = {
  landline: string;
  mobile: string;
};

type Contact = Name & Phone;

interface Name {
  firstName: string;
  lastName: string;
}

interface Phone {
  landline: string;
  mobile: string;
}

interface Contact extends Name, Phone {}
```

## 声明合并

接口一个重要的优势就是声明合并，对于在第三方库中补充类型信息非常有用。

```typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
}
interface ButtonProps {
  id: string;
}
```

## 总结

type 可以表示原始类型，元组，联合类型等，而接口不可以。type 和 Interface 都可以表示对象，且可以组合对象。interface 的优势是声明合并。

总体来说，类型声明可能有更多的功能和更简洁的语法，然而，接口对对象有一个更好的语法。

## 参考链接

- [When to use Type Aliases or Interfaces in TypeScript](https://www.carlrippon.com/when-to-use-type-aliases-v-interfaces/)
