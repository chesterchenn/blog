---
title: CSS一些知识
date: 2017-10-28 15:13:54
tags:
---

#### display
- block
  水平拉伸，垂直包裹，可以设置宽度和高度，独占一行
  常见元素有：
  `<div> <p> <h1>...<h6> <ol> <ul> <table> <form>`
- inline
  自动包裹，水平和垂直方向会自动包裹至内容的宽度，嵌入行内
  常见元素有：
  `<a> <span> <br> <label> <i> <em>`
- inline-block
  拥有inline一样的特性，但是可以设置宽度和高度
  常见元素有：
  `<input> <img>`

### 盒子模型
- W3C标准盒子模型：margin + border + padding + width(width = content)
- IE盒子模型：margin + width(width = border + padding + content)

### link、@import
页面中引入CSS有三种方式：行内样式，内部样式表，外部样式表
其中外部样式表有两种方式：链接式link，导入式@import
link，@import的优先级使用就近原则
区别：
link属于XHTML标签，@import属于CSS范畴，只能加载CSS
link引入的CSS被同时加载，@import引入的样式将在页面加载完毕后被加载
link可以通过javascript操作DOM改变样式，@import则不可以

### 其他
类选择器和伪类选择器的优先级是一样的，使用就近原则
link标签是同时加载的，script标签加载完一个再加载另一个
