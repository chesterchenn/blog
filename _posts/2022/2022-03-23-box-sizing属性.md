---
layout: post
tags: 2022 css
title: box-sizing 属性
---

CSS 属性 `box-sizing` 定义了元素的总宽度和高度是如何计算。

## 语法

语法形式：`box-sizing: content-box(default) | border-box;`

## 示例

<div class="container">
  container
  <div class="content-box">
    content-box
  </div>
</div>

<div class="container">
  container
  <div class="border-box">
    border-box
  </div>
</div>

<style>
.container {
  width: 250px;
  height: 150px;
  border: 10px solid #ffe411;
  margin-bottom: 10px;
}
.content-box {
  box-sizing: content-box;
  width: 100%;
  border: 10px solid #11a4ff;
  padding: 5px;
}
.border-box {
  box-sizing: border-box;
  width: 100%;
  border: 10px solid #11a4ff;
  padding: 5px;
}
</style>

## 说明

`box-sizing` 属性的两个值：

- `content-box` width 和 height 属性包含了内容 content，不包含内间距 padding，边框 border，外间距 margin。盒子的渲染宽度 = width + padding + border。默认的 CSS 盒模型。

- `border-box` width 和 height 属性包含了内容 content，内间距 padding 和边框 border，但不包括外间距 margin。盒子的渲染宽度 = width。

有意思的是，content-box 是 CSS 规范的默认值，但是 border-box 会更加直观方便，简单实用，因此也受到大家青睐。令人惊讶的是 border-box 来源于 IE 里的怪异模型。

## 参考链接

- [MDN: box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
- [CSS-Tricks: box-sizing](https://css-tricks.com/box-sizing/)
