---
title: 'Flex 布局'
published: 2019-02-27
tags: ['css']
---

Flex 布局，即为弹性布局。

<style>
  .flexd-demo { margin: 1rem 0; }
  .flexd-label { margin: 0 0 6px; font-size: 13px; color: #6b7480; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  .flexd-label b { color: #27313b; font-weight: 600; }
  .flexd-box { display: flex; border: 1px solid #e3e6ec; background: #f6f7fa; min-height: 64px; padding: 8px; border-radius: 8px; }
  .flexd-box--tall { min-height: 120px; }
  .flexd-box--wrap-tight { width: 200px; flex-wrap: wrap; min-height: 140px; }
  .flexd-item { width: 46px; height: 56px; border-radius: 5px; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; flex: 0 0 auto; }
  .flexd-item--tall { height: 80px; }
  .flexd-item--medium { height: 44px; }
  .flexd-item--short { height: 32px; }
  .flexd-c1 { background: #54b7d4; }
  .flexd-c2 { background: #e87a90; }
  .flexd-c3 { background: #f6c344; }
  .flexd-c4 { background: #89d185; }
  .flexd-c5 { background: #b78be0; }
  .flexd-c6 { background: #5ab5e8; }
  .flexd-c7 { background: #9ad1a0; }
  .flexd-c8 { background: #f0a6c0; }
  .flexd-c9 { background: #c99ae0; }
</style>

## Flex 容器

要使用 Flex 布局，首先需要定义一个父容器 container。

<div class="flexd-demo">
  <p class="flexd-label">display: <b>flex</b></p>
  <div class="flexd-box">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
  </div>
</div>

```html
<div class="container">
  <div>flex item</div>
  <div>flex item</div>
</div>
```

```css
.container {
  display: flex;
}
```

## Flex 容器属性

```plain
- flex-direction: row^ | row-reverse | column | column-reverse;
- flex-wrap: nowrap^ | wrap | wrap-reverse;
- flex-flow: <flex-direction> || <flex-wrap>; (^: row nowrap)
- justify-content: flex-start^ | flex-end | center | space-between | space-around | space-evenly;
- align-items: stretch^ | flex-start | flex-end | center | baseline;
- align-content: stretch^ | flex-start | flex-end | center | space-between | space-around;
```

备注: _^: default(默认值)_

### flex-direction

该属性定义了 flex 项在容器朝哪个方向上堆叠。主要是水平方向或垂直方向上。

<div class="flexd-demo">
  <p class="flexd-label">flex-direction: <b>row</b></p>
  <div class="flexd-box">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">flex-direction: <b>row-reverse</b></p>
  <div class="flexd-box" style="flex-direction: row-reverse">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">flex-direction: <b>column</b></p>
  <div class="flexd-box" style="flex-direction: column; min-height: 200px">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">flex-direction: <b>column-reverse</b></p>
  <div class="flexd-box" style="flex-direction: column-reverse; min-height: 200px">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
  </div>
</div>

### flex-wrap

该属性定义了 flex 项在容器上是否换行。

<div class="flexd-demo">
  <p class="flexd-label">flex-wrap: <b>nowrap</b> (默认)</p>
  <div class="flexd-box" style="width: 200px">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
    <div class="flexd-item flexd-c4">4</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">flex-wrap: <b>wrap</b></p>
  <div class="flexd-box" style="flex-wrap: wrap; width: 200px">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
    <div class="flexd-item flexd-c4">4</div>
  </div>
</div>

### flex-flow

该属性是`flex-direction`和`flex-items`的简写。

<div class="flexd-demo">
  <p class="flexd-label">flex-flow: <b>column wrap</b> (即 flex-direction: column; flex-wrap: wrap)</p>
  <div class="flexd-box" style="flex-flow: column wrap; width: 160px; min-height: 180px">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
    <div class="flexd-item flexd-c4">4</div>
    <div class="flexd-item flexd-c5">5</div>
    <div class="flexd-item flexd-c6">6</div>
  </div>
</div>

### justify-content

该属性定义了 flex 项在容器水平方向上的对齐方式。

<div class="flexd-demo">
  <p class="flexd-label">justify-content: <b>flex-start</b> (默认)</p>
  <div class="flexd-box">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">justify-content: <b>flex-end</b></p>
  <div class="flexd-box" style="justify-content: flex-end">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">justify-content: <b>center</b></p>
  <div class="flexd-box" style="justify-content: center">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">justify-content: <b>space-between</b></p>
  <div class="flexd-box" style="justify-content: space-between">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">justify-content: <b>space-around</b></p>
  <div class="flexd-box" style="justify-content: space-around">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">justify-content: <b>space-evenly</b></p>
  <div class="flexd-box" style="justify-content: space-evenly">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
  </div>
</div>

### align-items

该属性定义了 flex 项在容器垂直方向上的对齐方式。

<div class="flexd-demo">
  <p class="flexd-label">align-items: <b>stretch</b> (默认)</p>
  <div class="flexd-box">
    <div class="flexd-item flexd-c1" style="height: auto">1</div>
    <div class="flexd-item flexd-c2" style="height: auto">2</div>
    <div class="flexd-item flexd-c3" style="height: auto">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">align-items: <b>flex-start</b></p>
  <div class="flexd-box" style="align-items: flex-start; min-height: 90px">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2 flexd-item--medium">2</div>
    <div class="flexd-item flexd-c3 flexd-item--short">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">align-items: <b>flex-end</b></p>
  <div class="flexd-box" style="align-items: flex-end; min-height: 90px">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2 flexd-item--medium">2</div>
    <div class="flexd-item flexd-c3 flexd-item--short">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">align-items: <b>center</b></p>
  <div class="flexd-box" style="align-items: center; min-height: 90px">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2 flexd-item--medium">2</div>
    <div class="flexd-item flexd-c3 flexd-item--short">3</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">align-items: <b>baseline</b></p>
  <div class="flexd-box" style="align-items: baseline; min-height: 90px">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2 flexd-item--medium">2</div>
    <div class="flexd-item flexd-c3 flexd-item--short">3</div>
  </div>
</div>

### align-content

该属性定义了 flex 项在容器上多行的垂直方向对齐方向, 要求`flex-wrap: wrap`属性。

<div class="flexd-demo">
  <p class="flexd-label">align-content: <b>center</b> (需配合 flex-wrap: wrap)</p>
  <div class="flexd-box flexd-box--wrap-tight" style="align-content: center">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
    <div class="flexd-item flexd-c4">4</div>
    <div class="flexd-item flexd-c5">5</div>
    <div class="flexd-item flexd-c6">6</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">align-content: <b>flex-start</b></p>
  <div class="flexd-box flexd-box--wrap-tight" style="align-content: flex-start">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
    <div class="flexd-item flexd-c4">4</div>
    <div class="flexd-item flexd-c5">5</div>
    <div class="flexd-item flexd-c6">6</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">align-content: <b>flex-end</b></p>
  <div class="flexd-box flexd-box--wrap-tight" style="align-content: flex-end">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
    <div class="flexd-item flexd-c4">4</div>
    <div class="flexd-item flexd-c5">5</div>
    <div class="flexd-item flexd-c6">6</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">align-content: <b>space-between</b></p>
  <div class="flexd-box flexd-box--wrap-tight" style="align-content: space-between">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
    <div class="flexd-item flexd-c4">4</div>
    <div class="flexd-item flexd-c5">5</div>
    <div class="flexd-item flexd-c6">6</div>
  </div>
</div>

<div class="flexd-demo">
  <p class="flexd-label">align-content: <b>space-around</b></p>
  <div class="flexd-box flexd-box--wrap-tight" style="align-content: space-around">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2">2</div>
    <div class="flexd-item flexd-c3">3</div>
    <div class="flexd-item flexd-c4">4</div>
    <div class="flexd-item flexd-c5">5</div>
    <div class="flexd-item flexd-c6">6</div>
  </div>
</div>

PS: 该属性在 flex 项只有一行没有效果。

## Flex 项

Flex 容器下的直接子元素就是 flex 项。

## Flex 项属性

```plain
- order: <integer>; (^: 0)
- flex-grow: <number>; (^: 0)
- flex-shrink: <number>; (^: 1)
- flex-basis: <length> | auto^;
- flex: none | [ <flex-grow> <flex-shrink>? || <flex-basis> ]; (^: 0 1 auto)
- align-self: auto^ | flex-start | flex-end | center | baseline | stretch;
```

### order

该属性指定了 flex 项的排列顺序，必须是整数。值越小排名越靠前，默认都为 0。

<div class="flexd-demo">
  <p class="flexd-label">order: <b>3 1 2</b><br>DOM 顺序为 1、2、3</p>
  <div class="flexd-box">
    <div class="flexd-item flexd-c1" style="order: 3">1</div>
    <div class="flexd-item flexd-c2" style="order: 1">2</div>
    <div class="flexd-item flexd-c3" style="order: 2">3</div>
  </div>
</div>

### flex-grow

该属性指定了 flex 项相对于其他的 flex 项的增长量，按比例划分，负数无效。默认值为 0，表示该元素不索取父元素的剩余空间。

<div class="flexd-demo">
  <p class="flexd-label">flex-grow: <b>1 / 2 / 1</b> (剩余空间按比例分配)</p>
  <div class="flexd-box">
    <div class="flexd-item flexd-c1" style="flex-grow: 1">1</div>
    <div class="flexd-item flexd-c2" style="flex-grow: 2">2</div>
    <div class="flexd-item flexd-c3" style="flex-grow: 1">3</div>
  </div>
</div>

### flex-shrink

该属性指定了 flex 项相对于其他的 flex 项的收缩量，按比例划分，负数无效。

<div class="flexd-demo">
  <p class="flexd-label">flex-shrink: <b>3 / 1 / 1</b> (空间不足时按比例收缩)</p>
  <div class="flexd-box" style="width: 200px">
    <div class="flexd-item flexd-c1" style="flex-shrink: 3; width: 100px">1</div>
    <div class="flexd-item flexd-c2" style="flex-shrink: 1; width: 100px">2</div>
    <div class="flexd-item flexd-c3" style="flex-shrink: 1; width: 100px">3</div>
  </div>
</div>

### flex-basis

该属性指定了 flex 项的初始长度。例如 20%, 4rem, 250px...

<div class="flexd-demo">
  <p class="flexd-label">flex-basis: <b>20% / 40% / auto</b></p>
  <div class="flexd-box">
    <div class="flexd-item flexd-c1" style="flex-basis: 20%">1</div>
    <div class="flexd-item flexd-c2" style="flex-basis: 40%">2</div>
    <div class="flexd-item flexd-c3" style="flex-basis: auto">3</div>
  </div>
</div>

### flex

该属性是`flex-grow`, `flex-shrink`和`flex-basis`等属性的缩写。

<div class="flexd-demo">
  <p class="flexd-label">flex: <b>1</b> (即 1 1 0%)</p>
  <div class="flexd-box">
    <div class="flexd-item flexd-c1" style="flex: 1">1</div>
    <div class="flexd-item flexd-c2" style="flex: 1">2</div>
    <div class="flexd-item flexd-c3" style="flex: 1">3</div>
  </div>
</div>

### align-self

该属性定义了 flex 项在容器内的垂直方向的对齐方向，该属性会覆盖容器的`align-items`属性设置的对齐方式。

<div class="flexd-demo">
  <p class="flexd-label">容器的 align-items 为 <b>flex-start</b>，中间项 align-self 为 <b>center</b></p>
  <div class="flexd-box" style="align-items: flex-start; min-height: 90px">
    <div class="flexd-item flexd-c1">1</div>
    <div class="flexd-item flexd-c2" style="align-self: center">2</div>
    <div class="flexd-item flexd-c3 flexd-item--short">3</div>
  </div>
</div>

## Flex 相关问题

### flex 项中 flex 的值

flex 是 flex-grow, flex-shrink 和 flex-basis 的简写

flex 可以设置 `flex: auto(1 1 auto)` 和 `flex: none(0 0 auto)` 两个快捷值之外，还可以设置以下方式：

- flex 取值非负整数，则 flex-grow 取该值，flex-shrink 取值为 1，flex-basis 取值 0%。
- flex 取值为长度或者百分比，则 flex-basis 取该值，flex-grow 取值为 1，flex-shrink 取值为 1。
- flex 取值为两个非负整数，则分别 flex-grow 和 flex-shrink 的值，flex-basis 取值 0%。
- flex 取值为非负数字和一个长度或者百分比，则分别视为 flex-grow 和 flex-basis 的值，flex-shrink 取值 1。

由上面规律可得知，有非负整数先赋值给 flex-grow，长度/百分比赋值给 flex-basis，三项的默认值为：`flex: 1 1 0%;`

## 参考链接

- [css-tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox)
- [w3schools: Flexbox](https://www.w3schools.com/css/css3_flexbox.asp)
- [CSS 中的 “flex:1;” 是什么意思？](https://fe.ecool.fun/topic/286f67d3-4e8d-48f5-962a-ed9cccc46335?orderBy=updateTime&order=desc&tagId=11)
