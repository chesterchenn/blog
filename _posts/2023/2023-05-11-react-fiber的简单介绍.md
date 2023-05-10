---
layout: post
tags: 2023 react
title: React Fiber 的简单介绍
---

Fiber 就是 React 16 实现的一套新的更新机制，让 React 的更新过程变得可控，避免了之前采用循环递归无法中断影响性能的做法。

## 背景

### React 的核心思想

内存中维护一棵虚拟 DOM 树，数据变化时（setState），自动更新虚拟 DOM，得到一棵新树，然后 Diff 新老虚拟 DOM 树，找到有变化的部分，得到一个 Change(Patch)，将这个 Patch 加入队列中，最终批量更新这些 Patch 到 DOM 中。

### React 16 之前的不足

在 React 进行组件渲染和更新的时候，主要有两个阶段：

- 调和阶段（Reconciler）：React 会自顶向下通过递归，遍历新数据生成新的 Virtual DOM，然后通过 Diff 算法，找到需要变更的元素（Patch），放入更新队列中。
- 渲染阶段（Renderer）：遍历更新队列，通过调用宿主环境（DOM、Native、WebGL 等）API，实际更新渲染对应的元素。

在协调阶段阶段，由于是采用的递归的遍历方式，也被成为 Stack Reconciler。这种方式有一个特点：一旦任务开始进行，就无法中断，那么 js 将一直占用主线程， 一直要等到整棵 Virtual DOM 树计算完成之后，才能把执行权交给渲染引擎，那么这就会导致一些用户交互、动画等任务无法立即得到处理，就会有卡顿，非常的影响用户体验。

JS 占用主线程一直卡顿请参考：浏览器每一帧都需要完成哪些工作？

而当调和阶段花的时间过长，也就是 js 的执行时间过长，本来应该渲染下一帧的时候，还在当前帧执行 js，从而产生卡顿。

### 解决方案

**把渲染更新过程拆分成多个子任务，每次只做一小部分，做完看是否还有剩余时间，如果有继续下一个任务；如果没有，挂起当前任务，将时间控制权交给主线程，等主线程不忙的时候在继续执行。** 这种策略叫做 Cooperative Scheduling（合作式调度），操作系统常用任务调度策略之一。

合作式调度主要就是用来分配任务的，当有更新任务来的时候，不会马上去做 Diff 操作，而是先把当前的更新送入一个 Update Queue 中，然后交给 Scheduler 去处理，Scheduler 会根据当前主线程的使用情况去处理这次 Update。为了实现这种特性，使用了 `requestIdleCallback` API。对于不支持这个 API 的浏览器，React 会加上 pollyfill。

在上面我们已经知道浏览器是一帧一帧执行的，在两个执行帧之间，主线程通常会有一小段空闲时间，`requestIdleCallback` 可以在这个空闲期（Idle Period）调用空闲期回调（Idle Callback），执行一些任务。

- 低优先级任务由 `requestIdleCallback` 处理；
- 高优先级任务，如动画相关的由 `requestAnimationFrame` 处理；
- `requestIdleCallback` 可以在多个空闲期调用空闲期回调，执行任务；
- `requestIdleCallback` 方法提供 deadline，即任务执行限制时间，以切分任务，避免长时间执行，阻塞 UI 渲染而导致掉帧。

## Fiber

一个 fiber 既是一个工作单元，也是一种数据结构。

## 参考链接

- [浅谈对 React Fiber 的理解](https://juejin.cn/post/6926432527980691470)
- [Deep In React 之浅谈 React Fiber 架构（一）](https://www.taoweng.site/posts/deep-in-react-%E4%B9%8B%E6%B5%85%E8%B0%88-react-fiber-%E6%9E%B6%E6%9E%84%E4%B8%80)
- [React Fiber架构原理](https://segmentfault.com/a/1190000041965895)
