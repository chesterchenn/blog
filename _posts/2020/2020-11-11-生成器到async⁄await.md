---
layout: post
title: 生成器到async/await
tags: javascript
---
生成器 generator 是 ES6 引入的一个新的函数类型。而 async 和 await 是 ES7 添加的特性，用于异步编程。

## 生成器 generator
生成器使得函数可以通过 yield 暂停，并且暂停还可以通信，通信结束后可以继续执行。

### 语法
不同风格的声明方式：
```js
function* func() {}
function *func() {}
```

调用一个生成器函数并不会立刻执行函数内的语句，而是返回一个迭代器对象。该迭代器的 next() 方法被调用开始执行，当遇到 yield 则暂停，yield 可以返回值。当再次调用 next() 方法继续执行，直到函数结束。

next() 方法返回一个对象，该对象包含两个属性：value 和 done。value 代表本次 yield 表达式的返回值。done 是布尔类型，表示生成器函数是否已经执行完毕并返回。

```js
function* idMaker() {
  var index = 0;
  while (true)
    yield index++;
}

var gen = idMaker();
gen.next().value; // 0
gen.next().value; // 1
gen.next().value; // 2
```

消息是双向传递的-- yield 作为一个表达式可以发出消息相应 next(..) 调用，next(..) 也可以向暂停的 yield 表达式发送值。yield.. 和 next(..) 组合起来，在生成器的执行过程中构成了一个双向消息传递系统。
```js
function* foo(x) {
  var y = x * (yield "Hello");
  return y;   
}

var it = foo(6);
var res = it.next();
res.value;   // "Hello"
```
规范和所有兼容浏览器都会默默丢弃传递给第一个 next() 的任何东西。启动生成器时一定要用不带参数的 next()。

由于生成器可以多次返回，可以实现特定的功能。实现如下：
```js
function* fib(max) {
  var count = 0, a = 0, b = 1;
  while (count < max) {
    yield b;
    [a, b] = [b, a + b];
    count++;
  }
  return;
}
```

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

## 参考链接
- [ MDN: function* ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- 《你不知道的JavaScript》（中）第二部分第四章
