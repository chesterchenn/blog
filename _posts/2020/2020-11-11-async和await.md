---
layout: post
title: async和await
tags: javascript
---
async 和 await 是 ES2017 添加的特性。

## async
声明一个 async 函数。  
- 函数声明式：`async function func() {}`
- 函数表达式：`let func = async function() {}`
- 箭头函数：`let func = async () => {}`

当调用一个 async 函数时，会返回一个 Promise 对象。当这个 async 函数返回一个值时，Promise 的 resolve 方法会负责传递这个值；当 async 函数抛出异常时，Promise 的 reject 方法也会传递这个异常值。  
- 使用返回的值 `func().then((value) => {})`

## await
await 只能在异步函数里面起作用，主要获取 Promise 中返回的内容。以下是一个简单的示例：

```js
async function func() {
  let greeting = await Promise.resolve("Hello");
  return greeting;
};

func().then(console.log);
```
若 await 后面不是 Promise 返回值，就会作为同步函数返回值进行处理。