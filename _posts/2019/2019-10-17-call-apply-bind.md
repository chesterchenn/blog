---
layout: post
tags: javascript
---

call, apply 和 bind 都是 JavaScript 中用于函数绑定的方法。

## Function.prototype.apply 和 Function.prototype.call

_apply_ 方法调用给定 this 值函数，并将参数作为数组或类数组。

语法：`func.apply(thisArg, [argsArray])`

_call_ 方法调用给定的 this 值函数，并分别地提供参数。

语法：`func.call(thisArg, arg1, arg2, ...)`

### Apply 和 Call 比较

1. _Function.prototype.apply_ 和 _Function.prototype.call_ 的作用是一样的。
2. 第一个参数都是要调用函数的母对象，它是调用上下文，在函数体内通过 this 来获得对它的引用。
3. 从第二参数，_apply_ 接受的是一个参数数组，把它作为参数传给函数。_call_ 接受的是参数列表（不固定长度），然后全部作为参数传给函数。
4. call 比 apply 的性能好。

关于 this，你可以调用现有的函数，然后分配给不同的对象。通过 _apply_ 或 _call_ 你可以继承别的对象的方法。

```javascript
var array = ['a', 'b'];
var elements = [0, 1, 2];
// 等价于 array.push(elements)，相当于 array 继承了 [].push 方法
[].push.apply(array, elements); // array: ['a', 'b', 0, 1, 2]
```

```javascript
var person = {
  intro: function(name, company) {
    console.log(`I am ${name}, use ${company}`)
  }
};
var another = {};
person.intro.call(another, 'ABC', 'javascript'); // I am ABC, use javascript
// anthoer 本来没有 intro 方法，通过 call 继承了 person 的 intro 中的方法
```

_apply_ 可以传入类数组，所以经常与 _arugments_ 参数一起使用。

## Function.prototype.bind

_bind_ 创建一个新函数，该函数在被调用时将 this 指定到提供的值，并在调用新函数时提供其余的参数。 简单的说，**就是将函数的 this 绑定到指定的对象中**。

语法：`let boundFunc = func.bind(thisArg[,arg1[,arg2[, ...]]])`

```js
this.x = 9;
const module = {
  x: 81,
}
const getX = function() {
  return this.x;
}
const boundGetX = getX.bind(module);
getX(); => 9
boundGetX(); => 81
```

## 参考链接

- [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [第 48 题：call 和 apply 的区别是什么，哪个性能更好一些](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/84)
- 《JavaScript 权威指南》(第六版)
