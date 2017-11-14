---
title: 一些知识
date: 2017-10-29 01:21:12
tags:
---
---
#### AMD与CMD
- 实现了AMD的规范的Javascript库：require.js和curl.js
- 实现了CMD的规范的Javascript库：sea.js
- AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
- CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
- 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行
- CMD 推崇依赖就近，AMD 推崇依赖前置

- var foo = function bar(){...}会被当成var foo = function() {...}处理，即在函数外部无法通过bar访问函数
- 在HTML body部分中的JavaScripts会在页面加载的时候被执行
- 在HTML head部分中的JavaScripts会在被调用的时候才执行

#### cookie与session
- cookie数据存在客户端，session数据放在服务器上。
- cookie相对不是很安全，考虑到安全应该使用session
- 单个cookie保存的数据不能超过4k,很多浏览器都限制一个站点最多保存20个cookie
- 建议将登录信息等重要信息放在session
- session中保存的是对象，cookie中保存的是字符串

#### cookie与Web Storage
- Web Storage有两种形式：localStorage(本地存储)和sessionStorage(会话存储)
- sessionStorage、localStorage、cookie都是在浏览器端存储的数据
- cookie的作用是与服务器进行交互，每次都会携带在http头中
- 与cookie不同的是：不需要通过浏览器的请求将数据传给服务器，因此相比cookie能存储更多的数据，一般5M
- cookie，localStorage和sessionStorage在存储持久时间是不一样的
 localStorage：浏览器关闭了数据还可以保存，可用与所有同源窗口
 sessionStorage：数据存储在窗口对象中，窗口关闭后对应的窗口对象消失，存储的数据也丢失
 cookie只在设置的时间之前有效

#### 事件对象
DOM中的事件对象：(W3C标准)
- preventDefault() 取消事件默认行为
- stopPropagation() 取消事件冒泡，对当前节点无影响
- stopImmediatePropagation() 取消事件冒泡，同时阻止当前节点的事件处理程序被调用

IE的事件对象：
- cancelBubble 取消事件冒泡
- returnValue 取消事件默认行为

#### call和apply
call()方法和apply()方法的作用相同，他们的区别在于接收参数的方式不同
第一个参数是运行函数的作用域，其余参数都直接传递给函数即传递给函数的参数必须逐个列举出来
第一个参数是运行函数的作用域，另一个参数是参数数组，可以是Array实例或arguments对象

#### web worker
web worker是运行在浏览器后台的js程序，它不影响主程序的运行，是另开的一个js线程，可以用这个线程进行复杂的数据操作，然后把操作结果通过postMessage传递给主线程，这样在进行复杂且耗时的操作时就不会阻塞主线程