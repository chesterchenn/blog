---
layout: post
tags: 2023 react
title: React Router的模式及原理
---

React Router 主要有两种模式：Hash 模式和 History 模式。

## React Router

在单页面中，一个项目只有一个页面，一旦页面加载完成之后，就不用用户操作而进行重新加载或者跳转，其特征如下：

- 改变 URL 且不让浏览器向服务器发送请求
- 在不刷新页面的前提下动态改变浏览器地址栏中的 URL 地址

React Router 分成了两种模式：

- Hash 模式：在 URL 后面加上 #
- History 模式，允许操作浏览器曾经访问过会话历史记录

## 使用

React Router 对应的 Hash 模式和 History 模式对应的组件分别是：

- HashRouter
- BrowserRouter

## 实现原理

路由描述了 URL 与 UI 之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）

### History 模式

History 模式主要应用到浏览器的 History 接口实现。

### Hash 模式

Hash 模式主要通过 windows.addEventListener('hashChange', callback) 监听 hash 值的变化，并传递给其嵌套的组件

## 参考链接

- [说说 React Router 有几种模式，以及实现原理？](https://fe.ecool.fun/topic/2b68a2b5-ab3a-4de4-af48-43ab5f7e99f8?orderBy=updateTime&order=desc&titleKey=router)
- [MDN: History](https://developer.mozilla.org/en-US/docs/Web/API/History)
