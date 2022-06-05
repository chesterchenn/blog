---
layout: post
title: JavaScript题目
tags: 2020 javascript
---

一些遇到的 JavaScript 的题目。

1. [逗号表达式](#逗号表达式)
2. [形参的长度](#形参的长度)
3. [变量提升](#变量提升)
4. [数组 forEach](#数组foreach)
5. [数组 sort](#数组sort)
6. [变量声明](#变量声明)
7. [对象键名](#对象键名)
8. [setTimeout](#settimeout)

## 问题

### 逗号表达式

```js
var count = 0;
for (var i = 0; i < 5, i < 10; i++) {
  count++;
}
console.log(count);
```

[答案：逗号表达式](#答逗号表达式)

### 形参的长度

```js
(() => {}).length;

function func(a, b) {
  return a + b;
}
func.length;
```

[答案：形参的长度](#答形参的长度)

### 变量提升

```js
console.log(foo);
foo();
var foo = 'foo';
function foo() {
  console.log('hello foo');
}
console.log(foo);
foo();
```

[答案：变量提升](#答变量提升)

### 数组 forEach

```js
var i = 0;
new Array(10).forEach(() => {
  i++;
});
console.log(i);
```

[答案：数组 forEach](#答数组foreach)

### 数组 sort

```js
[3, 1, 4, 2].sort(function (a, b) {
  return a - b;
});
```

[答案：数组 sort](#答数组sort)

### 变量声明

```js
(function () {
  var a = (b = 5);
  console.log(b);
  console.log(a);
})();
console.log(b);
console.log(a);
```

[答案：变量声明](#答变量声明)

### 对象键名

```js
var a = {};
b = { key: 'b' };
c = { key: 'c' };
a[b] = 123;
a[c] = 456;
console.log(a[b]);
```

[答案：对象键名](答对象键名)

### setTimeout

```js
console.log(1);
let a = setTimeout(() => {
  console.log(2);
}, 0);
console.log(3);
Promise.resolve(4).then((b) => {
  console.log(b);
  clearTimeout(a);
});
console.log(5);
```

[答案：setTimeout](#答settimeout)

<hr >

### 答：逗号表达式

count = 10，逗号表达式只有最后一项是有效的

[逗号表达式](#逗号表达式)

### 答：形参的长度

```js
(() => {}).length; // 0
func.length; // 2
```

`length` 会返回函数的形参 `arguments` 变量的的长度，同时 `arguments` 还有 `index` 属性

[形参的长度](#形参的长度)

### 答：变量提升

- 首先，js 有变量提升和函数提升，指的是用 var 声明变量 或用 function 函数名（）{ } 声明的，会在 js 预解析 阶段提升到顶端（es6 的 let 和 const 不会提升）
- 其次，函数提升优先级高于变量提升
- 注意，相同作用域时声明变量而不赋值则还是以前的值，而子作用域声明不赋值则函数内该值为 undefined，因为声明了私有变量

[来源链接](https://www.nowcoder.com/questionTerminal/334707e784d2480894a73c6584c68786)

问题中的代码等价于：

```js
function foo() {
  // 函数提升
  console.log('hello foo');
}
var foo; // 变量提升

console.log(foo); // => foo函数，foo只是声明变量，没有被赋值，foo还是原来的值，参考三
foo(); // => 'hello foo'
foo = 'foo'; // 赋值不会提升,赋值后 foo就不再是函数类型了，而是字符类型
console.log(foo); // 'foo'
foo(); // 报错，foo已经不再是一个函数了
```

[变量提升](#变量提升)

### 答：数组 forEach

`console.log(i); => 0` forEach 方法在数组元素为空时会跳过执行回调函数，相当于回调函数并未执行，所以输出 0

[数组 forEach](#数组foreach)

### 答：数组 sort

```js
[3, 1, 4, 2].sort(function (a, b) {
  return a - b;
}); // => [1, 2, 3, 4]
```

sort 默认会按照诸个字符的 Unicode 位点进行排序，对于 a < b 的情况，return a - b，返回小于 0（false），ab 不用调换位置，则是升序。而 return b - a，返回大于 0（true），ab 调换位置，则是降序。反之同理

[数组 sort](#数组sort)

### 答：变量声明

原式等价于：

```js
(function () {
  b = 5; // b声明成全局变量
  var a = b; // 赋值从右往左
  console.log(b);
  console.log(a);
})();
console.log(b);
console.log(a);
// 5 5 5 ReferenceError: a is not defined
```

PS：当一个变量声明未赋值，调用时`undefined`，当一个变量未声明，调用报错`ReferenceError: xx is not defined`

[变量声明](#变量声明)

### 答：对象键名

`=> 456`，因为键名只能为字符串，传入对象只会被转为字符串[object Object]，a[b],a[c]都等价于 a[“[object Object]”]。

[对象键名](#对象键名)

### 答：setTimeout

`=> 1 3 5 4`，在异步任务中分为宏任务和微任务，微任务优先级高于宏任务。而 Promise 是异步微任务，会在当前轮事件结束前执行。setTimeout 属于异步宏任务，会在下一轮事件循环执行。

[setTimeout](#settimeout)
