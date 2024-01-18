---
layout: post
tags: 2023 javascript
title: JS多线程 Web Worker
---

在 Web Worker 标准中，定义了解决客户端 JS 无法多线程的问题。不过，Web Worker 处在一个自包含的执行环境中，无法访问 Window 对象和 Document 对象，和主线程之间的通信也只能通过异步消息传递机制来实现。

<!-- vim-markdown-toc GFM -->

- [Web Workers 对象](#web-workers-对象)
- [Dedicated workers](#dedicated-workers)
  - [创建 Worker](#创建-worker)
  - [传递/接收信息](#传递接收信息)
  - [终止 Worker](#终止-worker)
  - [错误处理](#错误处理)
- [Shared Workers](#shared-workers)
  - [创建共享 worker](#创建共享-worker)
- [推荐阅读](#推荐阅读)
- [参考资料](#参考资料)

<!-- vim-markdown-toc -->

## Web Workers 对象

一个 worker 就是一个使用构造器（[Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker)）创建的对象用来执行 JS 文件。workers 会运行在不同当前 window 的另一个全局上下文。

Web Worker 可以分为 Dedicated Worker 和 Shared Worker 两种，一个专有的 Worker 只能被创建它的脚本访问，而一个共享的 Worker 可以被来自同一域的任何脚本访问。

## Dedicated workers

一个专有的脚本只能由调用它的脚本访问。

### 创建 Worker

要创建一个新的 Worker，只需调用 `Worker()` 构造函数，并且指定要运行的脚本 URL。

```js
const myWorker = new Worker('worker.js');
```

### 传递/接收信息

向 Worker 发送信息是通过 `postMessage()` 或者接收信息 `onmessage` 事件处理。

```js
first.onchange = () => {
  myWorker.postMessage([first.value, second.value]);
  console.log('Message posted to worker');
};
```

在 Worker 里面通过 `onmessage` 事件的 data 属性接收响应信息。并且通过 postMessage 传递回给主线程。

```js
onmessage = (e) => {
  console.log('Message received from main script');
  const workerResult = `Result: ${e.data[0]} * ${e.data[1]}`;
  console.log('Posting message back to main script');
  postMessage(workerResult);
};
```

回到主线程，我们使用 `onmessage` 来接收响应信息。

```js
myWorker.onmessage = (e) => {
  result.textContent = e.data;
  console.log('Message received from worker');
};
```

### 终止 Worker

需要终止一个 worker，只需调用 `terminate` 方法。

```js
myWorker.terminate();
```

### 错误处理

当 Worker 报错时候，可以调用 `onerror` 来处理，错误事件主要包括了 message, filename, lineno.

```js
myWorker.onerror = (e) => {
  console.log(e.filename + ': ' + e.lineno + ':' + e.message);
};
```

## Shared Workers

一个共享的 worker 可以被多个脚本访问

### 创建共享 worker

```js
const myShareWorker = new SharedWorker("worker.js");
```

## 推荐阅读

- [浅析Web Worker使用技巧及实战场景 - 古兰精 - 博客园](https://www.cnblogs.com/goloving/p/13962441.html)

## 参考资料

- 《JavaScript 权威指南》
- [MDN: Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN: Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker)
