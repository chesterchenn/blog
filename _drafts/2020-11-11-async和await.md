---
title: async和await
tag: javascript
---
async 和 await 是 ES2017 添加的特性。

## async
创建一个 async 函数。  
- 函数声明式：`async function func() {}`
- 函数表达式：`let func = async function() {}`
- 箭头函数：`let func = async () => {}`

使用返回的值。可以 `func().then((value) => {})`

## await
await 只能在异步函数里面起作用。以下是一个简单的示例：

```js
async function func() {
  let greeting = await Promise.resolve("Hello");
  return greeting;
};

func().then(console.log);
```