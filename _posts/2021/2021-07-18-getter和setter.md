---
layout: post
tags: javascript
title: getter和setter
---

对象属性是有名字，值和一组特性构成的。在 ES5 中，属性值可以用一个或两个方法替代，这两个方法就是 getter 和 setter。

由 getter 和 setter 定义的属性称作“存取器属性”（accessor property），它不同于“数据属性”（data property），数据属性只有一个简单的值。

## 返回值

当程序查询存取器属性的值时，JavaScript 调用 getter 方法（无参数）。这个方法的返回值就是属性存取表达式的值。

当程序设置一个存取器属性的值时，JavaScript 调用 setter 方法，将赋值表达式右侧的值当作参数传入 setter。从某种意义上讲，这个方法负责“设置”属性值。可以忽略 setter 方法的返回值。

## 读写属性

和数据属性不同，存取器属性不具有可写性（writable attribute）。

如果属性同时具有 getter 和 setter 方法，那么他是一个读/写属性。

如果它只有 getter 方法，那么它是一个只读属性。

如果它只有 setter 方法，那么它是一个只写属性，读取该只写属性总是返回 undefined。

## 例子

一个 getter 和 setter 的例子

```javascript
var obj = {
  data: value,

  get getData() {
    return this.data;
  }

  set setData(val) {
    return this.data = val;
  }
}
```

## 参考链接

- 《JavaScript权威指南》
