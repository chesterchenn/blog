---
title: Javascript异步编程
date: 2017-11-09 14:36:33
tags:
---

异步编程的方法
- 回调函数
- 事件监听
- 发布/订阅
- Promises

#### 回调函数callback
在javascript里函数可以作为参数进行传递
setTimeout,Ajax是javascript经常用到的异步api
回调函数实例：
```js
function someAction(x, y, someCallback) {
    return someCallback(x, y);
}
function calcProduct(x, y) {
    return x * y;
}
function calcSum(x, y) {
    return x + y;
}
console.log(someAction(5, 15, calcProduct));
console.log(someAction(5, 15, calcSum));
```
注意要点：
- 确保回调函数是一个函数
- 可以使用call和apply函数来保存this
- 简单，容易理解，但不利于代码的阅读与维护

#### Promises
Promise对象是ES6原生提供的。
Promise有三种状态：pending（初始状态），fulfilled（成功执行），rejected（执行出错）。Promise对象的pending状态可以转换成其他的两种状态。而且一旦变成了其他的两种状态，将不再改变。

语法：
```
new Promise(
  function(resolve, reject) {...}
)
```
如果异步操作成功，则用resolve方法将Promise方法状态变为fulfilled
如果异步操作失败，则用reject方法将Promise方法状态变为rejected

方法：
- **Promise.all(iterable)**
这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功
- **Promise.race(iterable)**
当iterable参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。
- **Promise.reject(reason)**
返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法
- **Promise.resolve(value)**
返回一个状态由给定value决定的Promise对象

- **Promise.prototype.then(onFulfilled, onRejected)**
then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。第二个函数是可选的
- **Promise.prototype.catch(onRejected)**
catch方法，相当于then(null,reject)的一个变体，之所以出现catch，是then的第二个参数可以省略，resolved用then调用，rejected用catch调用，方便查看