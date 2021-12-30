---
layout: post
tags: 2021 javascript
title: JS实现睡眠
---
JavaScript 是单线程语法，没有语言内置的休眠（sleep or wait）函数，所谓的 sleep 只是实现一种延迟执行的效果，核心是应用 setTimeout 方法。

```js
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

调用方式：
```js
const func = async () => {
  awiat sleep(1000);
  // todo something
}

const func = () => {
  sleep(1000).then(
    // todo something
  )
}
```

两者的执行是有一些不一样的，async 函数会等待执行睡眠完成再执行后续， promise 则会继续执行主函数，then 的方法会在睡眠后一次性调用。
```js
const func = async() => {
  for(let i = 0; i < 10; i++) {
    await sleep(1000);
    console.log(i);
  }
}
// 每隔一秒输出一个数字

const func = () => {
  for(let i = 0; i < 10; i++) {
    sleep(100).then(() => {
      console.log(1000);
    })
  }
}
// 一秒后输出全部数字
```