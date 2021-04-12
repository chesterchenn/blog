---
layout: post
title: Cookie和WebStorage
tags: javascript
---
客户端状态主要依靠追踪浏览器的用户身份及其相关数据。

## cookie
1. cookie 的大小被限制在 4KB。
2. cookie 会随着 HTTP 事务一起发送，因此会浪费一小部分带宽。
3. 要操作 cookie 比较麻烦。
4. cookie 通过 name=value 的形式存储。
5. 一般默认是服务器生成，可以设置失效时间。可以在浏览器生成，默认关闭失效。

## sessionStorage 与 localStorage
Web Storage 可以分为 sessionStorage 和 localStorage。

1. sessionStorage 将数据保存在客户端 session 对象中。localStorage 将数据保存在客户端本地硬件设备中。
2. sessionStorage 为临时保存，而 localStorage 为永久保存。
3. sessionStorage 是仅在当前会话中有效，在同一个窗口中刷新或者进入另一个同源页面，也依旧存在。但是关闭浏览器窗口或者独立打开新页面都会不一样。
4. sessionStorage 和 localStorage 只能存储字符串类型。
5. WebStorage 不会随着 HTTP header 发送到服务器端，所以安全性相对于 cookie 来说比较高一些，不会担心截获，但是仍然存在伪造问题。

## 参考链接
- [cookies、sessionStorage和localStorage解释及区别](https://www.cnblogs.com/pengc/p/8714475.html)
- [彻底弄清楚session,cookie,sessionStorage,localStorage的区别及应用场景（面试向）](https://v3u.cn/a_id_94)