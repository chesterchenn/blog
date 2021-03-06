---
layout: post
tags: react
---
diff 会帮助我们计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行原生 DOM 操作，而非重新渲染整个页面，从而保证了每次操作更新后页面的高效渲染。  

传统 diff 算法通过循环递归对节点进行依次对比，效率低下，算法复杂度达到O(n^3)。  

## diff 策略
1. Web UI 中 DOM 节点跨层级的操作特别少，可以忽略不计。
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
3. 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。

基于以上策略，React 分别对 tree diff，component diff 以及 element diff 进行算法优化。

## tree diff
基于策略一，React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较。React 通过updateDepth 对 Virtual DOM 树进行层级控制，只会对相同层级的 DOM 节点进行比较，即同一个父节点下的所有子节点。当发现节点已经不存在时，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。

## component diff
- 如果是同一类型的组件，按照原策略继续比较 Virtual DOM 树即可。
- 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
- 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切知道这点，那么就可以节省大量的 diff 运算时间。因此，React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff 算法分析。

## element diff
当节点处于同一层级时，diff 提供了 3 种节点操作，分别为INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除）。  
当相同的节点，由于位置发生变化，导致需要进行繁杂低效的删除、创建操作，其实只要对这些节点进行位置移动即可。针对这一现象，React 提出优化策略：允许开发者对同一层级的同组子节点，添加唯一 key 进行区分。   

## diff运作过程  
首先，对新集合中的节点进行循环遍历for (name in nextChildren)，通过唯一的 key 判断新旧集合中是否存在相同的节点if (prevChild === nextChild)，如果存在相同节点，则进行移动操作，但在移动前需要将当前节点在旧集合中的位置与 lastIndex 进行比较 if (child._mountIndex < lastIndex)，否则不执行该操作。这是一种顺序优化手段，lastIndex一直在更新，表示访问过的节点在旧集合中最右的位置（即最大的位置）。如果新集合中当前访问的节点比 lastIndex 大，说明当前访问节点在旧集合中就比上一个节点位置靠后，则该节点不会影响其他节点的位置，因此不用添加到差异队列中，即不执行移动操作。只有当访问的节点比 lastIndex 小时，才需要进行移动操作

### 参考链接
- 《深入REACT技术栈》