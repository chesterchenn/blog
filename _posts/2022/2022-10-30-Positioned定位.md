---
layout: post
tags: 2022 css
title: Positioned定位
---

position 属性决定一个元素在文档中的定位方式。top, right, bottom 和 left 的属性决定了元素的最终位置。

## 语法

```css
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

### static

元素根据正常文档流定位，top, right, bottom, left 和 z-index 值无效。

### relative

元素根据正常文档流，相对于它自身进行偏移来定位。它的偏移不影响其他元素。

### absolute

元素从正常文档流中移除，根据最近的定位的祖先元素来定位。如果没有，则根据文档（document）定位。

### fixed

元素从正常文档流中移除，根据文档（document）来定位。该值不受滚动影响。

### sticky

元素根据正常文档流定位，相对于最近的滚动祖先和最近的块区域偏移。

## 其他

- positioned element：定位的元素，除了 static 其他值的元素。
- relatively positioned element：相对定位的元素，postion 的值是 relative。
- absolutely positioned element：绝对定位的元素，postion 的值是 absolute 或 fixed。
- stickily positioned element：粘性定位的元素，postion 的值是 sticky。

## 参考链接

- [MDN: position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- [CSS-TRICKS: position](https://css-tricks.com/almanac/properties/p/position/)
