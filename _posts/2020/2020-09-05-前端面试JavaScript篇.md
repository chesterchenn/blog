---
layout: post
title: 前端面试JavaScript篇
tags: javascript
---
面试过程中遇到的 JavaScript 问题。

### 1. slice 和 splice 的区别
- slice 返回给定数组的浅拷贝数组，`arr.slice([begin[, end]])`  
- splice 通过删除或者替换现有的元素，也可以在指定位置新增元素更改数组的元素。`let arrDeletedItems = array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`
- slice 从数组中浅拷贝，不会更改原数组，返回浅拷贝的新数组。splice 在原数组修改，返回被删除的项。

### 2. concat 和 push
```js
var arr = [1, 2];
arr.push(3); // arr: [1, 2, 3]
arr.push([4, 5]) // arr: [1, 2, 3, [4, 5]]
```
```js
var arr = [1, 2];
var arrA = arr.concat(3); // arr: [1, 2]; newArr: [1, 2, 3];
var arrB = arr.concat([4,5]); //arr: [1, 2]; newArr[1, 2, 4, 5];
```
两个主要区别:
- `push(..)` 原数组上操作，`concat(..)` 返回操作后的新数组
- 参数为数组的时候，`push(..)` 直接添加，`concat(..)` 会进行提取值再添加 

### 3. 判断下面的 a 的值，并说明
```js
var a = 4;
console.log(a);
function b() {
  console.log(a);
  a = 3;
  console.log(a);   
  function a(){}; 
}
b();
```  
// 4，全局变量 a 的值是4  
// function a()，函数 a 的变量提升  
// 3，全局变量覆盖了函数 a，并修改了全局变量 a  
