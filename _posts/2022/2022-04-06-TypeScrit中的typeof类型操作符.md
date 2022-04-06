---
layout: post
tags: 2022 typescript
title: TypeScipt中的typeof类型操作符
---

typeof 可以引用一个变量或属性的类型。

## 从基础类型取得类型

typeof 可以从基础类型取得类型，虽然作用不是很大。

```typescript
let s = 'hello';
let n = typeof s;
// let n: string
```

## 从对象中获取类型

当我们已经声明过一个变量类型，其他变量需要相同的类型时，我们可以使用 typeof 操作符

```typescript
const value = { name: '', age: 0 };
let data: typeof value;
// let data = {
//     name: string;
//     age: number;
// }
```

## 从函数中获取类型

从函数中获取类型是非常有用的。

```typescript
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
// type P = {
//     x: number;
//     y: number;
// }
```

下面是一个创建一个联合类型的例子

```typescript
function addPerson(personName: string) {
  return {
    type: 'AddPerson',
    payload: personName,
  } as const;
}

function removePerson(id: number) {
  return {
    type: 'RemovePerson',
    payload: id,
  } as const;
}

// 我们创建一个联合类型
type Actions = ReturnType<typeof addPerson> | ReturnType<typeof removePerson>;

// type Actions = {
//     readonly type: "AddPerson";
//     readonly payload: string;
// } | {
//     readonly type: "RemovePerson";
//     readonly payload: number;
// }
```

## 参考链接

- [typescriptlang: typeof-types](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)
- [carlrippon: inferring-object-and-function-types-in-typescript](https://www.carlrippon.com/inferring-object-and-function-types-in-typescript/)
- [typescriptlang: ReturnType](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)
