---
title: xss csrf
date: 2017-11-09 23:12:19
tags:
---
XSS(Cross-site script)跨站脚本攻击。攻击者往Web页面里插入恶意Script代码，当用户浏览该页面的时候，潜在其中的Script代码会被执行，从而进行攻击。

常见的三种XSS攻击方式：
- Reflected(反射XSS)
- Stored(存储XSS)
- DOM-based(DOM XSS)

CSRF(Cross-site request forgery)跨站请求伪造。攻击者通过伪装成用户请求来恶意请求。