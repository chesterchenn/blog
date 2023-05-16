---
layout: post
tags: 2023 react
title: React 中的 diff 算法
---

React diff 算法就是发生在 reconcile 阶段

![]({{ "images/react-diff-arch.webp" | relative_url }})

## Fiber 更新过程

在 Fiber 中，Fiber 节点是依赖 return、sibling 和 child 这三个属性，将 Fiber 节点连接成 Fiber 树，即虚拟 DOM 树。

在 React 中最多存在两颗 Fiber 树：

- 当前屏幕上 DOM 结构对相应的 Fiber 树称为 current Fiber 树
- 在内存中构建的 Fiber 树称为 workInProgress Fiber 树

Diff 算法的计算过程就是生成 workInProgress Fiber 树的过程，每次页面状态更新都会产生新的 workInProgress Fiber 树，当 workInProgress Fiber 树构建完成后交给 Renderer 渲染在页面上，之后在 React 中使用根节点的 current 指针完成由 current Fieber 树到 workInProgress Fiber 树的切换，此时

workInProgress Fiber 树就成为了 current Fiber 树，完成 DOM 更新。

## Diff 算法

![]({{ "images/react-diff-fiber.webp" | relative_url }})

要更的 DOM 节点在更新时刻与四个节点有关：

- DOM 节点本身
- DOM 节点对应的 JSX 对象
- DOM 节点对应的 current Fiber 节点
- workInProgress Fiber 节点

而 Diff 算法的本质是对比 JSX 对象和 current Fiber 节点，然后根据对比结果生成 workInProgress Fiber 节点，进而生成 workInProgress Fiber 树。其中需要执行相关操作的 Fiber 节点将会被打上 flags 标记，之后 Renderer 渲染器基于 Diff 过程中打上 flags 标记的 Fiber 节点链接成的链表进行相关的 DOM 操作。

## 三个规则

即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n3)，为了降低算法复杂度，React 的 Diff 会预设三个限制：

1. 只对同级元素进行 Diff，Diff 算法只需对比节点当前所在层级
2. 两个不同类型的元素会产生出不同的树，如果更新前后元素类型发生改变，则会新建节点及其子节点
3. 对于同一层级的一组子节点，可以通过唯一的 key 进行区分

通过第一个预设，将 DOM 树的对比限制在了同一个层级进行对比，算法复杂度变为了 O(n)，然后通过第三个预设使得同层级的节点通过自身的 key 能快速方便的找到变化后的节点。

## Diff 函数入口

根据同级的节点数量将 Diff 算法分为两类，单节点 Diff 和多节点 Diff：

- 当 newChild 类型为 object、number、string，代表同级只有一个节点，会调用单节点 Diff 函数 reconcileSingleElement 函数。
- 当 newChild 类型为 Array，表示同级有多个节点，会调用多节点 Diff 函数 reconcileChildrenArray 函数

### 单节点 Diff

React 首先判断 key 是否相同，如果 key 相同则判断 type 是否相同，只有都相同时一个 DOM 节点才能复用，如果可以复用，则直接使用 currrent Fiber 节点，无需在重新创建 Fiber 节点。

### 多节点 Diff

对于同级有多个元素的节点，Diff 算法要处理的情况相对复杂，但可以总结归纳为三种情况，第一种为节点新增或减少，第二种为节点更新，第三种为节点位置发生变化。

Diff 算法的整体逻辑会经历两轮遍历：

- 第一轮遍历：处理更新的节点
- 第二轮遍历：处理剩下的不属于更新的节点

## 总结

React16 利用 Scheduler 和基于 Fiber 节点的链表结构的虚拟 DOM 实现了可中断异步 DOM 更新，改善了页面 DOM 层级过深时造成的页面卡顿现象。React16 中的虚拟 DOM 树是由 Fiber 节点链接成的 Fiber 树，其中的每一个 Fiber 节点都有与之相对应的真实 DOM 节点。

在 React 中最多存在两颗 Fiber 树，current Fiber 树和 workInProgress Fiber 树，Diff 算法的本质就是对比 current Fiber 节点和 JSX 对象，然后生成 workInProgress Fiber 树。根据同级的节点数量将 Diff 算法分为两类，单节点 Diff 和多节点 Diff。

Diff 过程中通过 key 和 type 来对节点进行对比，如果更新前后节点的 key 和 type 相同，则节点可以被复用，否则，需要重建节点；同时会对需要更新、删除以及移动等操作的 Fiber 节点打上不同的标记，然后会将这些 Fiber 节点连接成链表。最后，Renderer 渲染器根据生成的链表执行实际的 DOM 操作，完成更新。

## 参考链接

- [基于 Fiber 的 React Diff 算法源码分析](https://xie.infoq.cn/article/9771629d41f19743a08a1d481)
