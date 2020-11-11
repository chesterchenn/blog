---
tags: javascript
---
“use strict” 是 ECMAscript 5 引入的一条指令。使用 use strict 指令的目的是说明后续的代码将会被解析为严格代码（strict code）。可以在顶层代码使用，也可以在函数体定义。

## 严格模式的区别
- 在严格模式中禁止使用 with 语句。
- 在严格模式中，所有变量都要先声明。如果给一个未声明的变量，函数，函数参数，catch 从句参数或全局对象的属性赋值，将会抛出一个引用错误异常（在非严格模式中，这种隐式声明的全局变量的方法是给全局对象新添加一个属性）
- 在严格模式中，调用的函数（不是方法）的一个 this 的值是undefined。（在非严格模式中，调用的函数中的 this 值总是全局对象）
- 在严格模式中，试图删除一个不可配置的属性讲抛出一个类型错误异常。

## 参考链接
- 《JavaScript权威指南》
- [Javascript 严格模式详解](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)