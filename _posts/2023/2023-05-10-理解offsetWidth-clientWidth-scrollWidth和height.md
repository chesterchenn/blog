---
layout: post
tags: 2023 javascript
title: 理解 offsetWidth, clientWidth, scrollWidth 和 高度
---

CSS 的盒子模型相当复杂，尤其是涉及到滚动内容的时候。虽然浏览器使用 CSS 的值来绘制方框，但使用 JS 来确定所有的尺寸会更加方便。

这就是为什么每个元素都有六个 DOM 属性以方便你使用：`offsetWidth`, `offsetHeight`, `clientWidth`, `clientHeight`, `scrollWidth` 和 `scrollHeight`。这些都是代表当前视觉布局的只读属性，而且都是整数（因此可能有四舍五入的错误）。

如果你想要一个更准确的小数值，请使用 element.getBoundingClientRect().

## offsetWidth/offsetHeight

视觉框的大小，包括所有边框。

`offsetWidth/offsetHeight = width/height + paddings + borders`

## clientWidth/clientHeight

盒子内容的视觉部分，不包括边框或者滚动条，但包括 padding。

`clientWidth/clientHeight = width/height + paddings`

## scrollWidth/scrollHeight

盒子里所有内容的大小，包括目前隐藏在滚动区域外的部分。

如果元素内容刚好合适而不需要滚动条，那么 scrollWidth 等于 clientWidth

## 参考链接

- [stackoverflow: Understanding offsetWidth, clientWidth scrollWidth and -Height, respectively](https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively)
- [jsfiddle example](http://jsfiddle.net/y8Y32/25/)
