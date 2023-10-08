---
layout: post
tags: 2023 react
title: React 中的 setState
---

在 React 中，setState 是同步，还是异步在不同的版本有不同的表现。

<!-- vim-markdown-toc GFM -->

- [React 16](#react-16)
  - [原因](#原因)
- [React 18](#react-18)
- [批量更新](#批量更新)
- [参考链接](#参考链接)

<!-- vim-markdown-toc -->

## React 16

setState 在不同的情况下可以表现为异步或同步。

在 Promise 的状态更新、JS 原生事件，setTimeout、setInterval 中是同步的。

在 React 的合成事件中，是异步的。

### 原因

在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 state。

但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 state。

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

## 批量更新

在 react 里面一个典型的例子就是连续设置 state：

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

虽然调用 `setNumber(number + 1)` 三次，但是每次事件处理中 `number` 总是 `0`，相当于设置了 `number` 为 `1` 设置了三次。所以最终渲染的时候 `number` 是 `1` 而非 `3`。

![]({{ "images/react-batching.png" | relative_url }}){:height="300px" class="img--center"}

在一次事件中去多次更新 state，可以使用 `setNumber(n => n + 1)` 的更新函数。

## 参考链接

- [setState 是同步，还是异步的？](https://fe.ecool.fun/topic/36be973b-0351-4a18-b6b8-5e68023e7b96?orderBy=updateTime&order=desc&tagId=13)
- [Automatic batching for fewer renders in React 18](https://github.com/reactwg/react-18/discussions/21)
- [Queueing a Series of State Updates - React](https://react.dev/learn/queueing-a-series-of-state-updates)
