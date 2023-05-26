---
layout: post
tags: 2023 react
title: React 中的 setState
---

面试的过程中经常会被问到，setState 是同步，还是异步的？

## React 16

setState 在不同的情况下可以表现为异步或同步。

在 Promise 的状态更新、JS 原生事件，setTimeout、setInterval 中是同步的。

在 React 的合成事件中，是异步的。

### 原因

在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state。

```js
// ReactFiberScheduler.js
let isBatchingUpdates = false;

function batchedUpdates(fn, a) {
  const previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingUpdates = true;
  try {
    return fn(a);
  } finally {
    isBatchingUpdates = previousIsBatchingUpdates;
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork();
    }
  }
}
```

## React 18

setState 都会表现成异步（即批处理）

可以查看官方的讨论 [Automatic batching for fewer renders in React 18](https://github.com/reactwg/react-18/discussions/21)

## 参考链接

- [setState 是同步，还是异步的？](https://fe.ecool.fun/topic/36be973b-0351-4a18-b6b8-5e68023e7b96?orderBy=updateTime&order=desc&tagId=13)
- [Automatic batching for fewer renders in React 18](https://github.com/reactwg/react-18/discussions/21)
