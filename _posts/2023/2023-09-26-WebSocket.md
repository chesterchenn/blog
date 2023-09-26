---
layout: post
tags: 2023 javascript
title: WebSocket
---

WebSocket 是一个持久化的协议，允许服务端主动向客户端推送消息。

<!-- vim-markdown-toc GFM -->

- [构造函数](#构造函数)
- [属性](#属性)
  - [readyState](#readystate)
  - [binaryType](#binarytype)
- [实例方法](#实例方法)
  - [send](#send)
  - [close](#close)
- [事件](#事件)
  - [close](#close-1)
  - [error](#error)
  - [message](#message)
  - [open](#open)
- [参考链接](#参考链接)

<!-- vim-markdown-toc -->

## 构造函数

```js
new WebSocket(url);
new WebSocket(url, portocols);
```

## 属性

### readyState

`readyState` 属性返回实例对象的当前状态

- 0: CONNECTING，表示 socket 已经创建，连接未打开。
- 1: OPEN，表示连接已经打开，可以准备通信。
- 2: CLOSING，表示连接正在关闭。
- 3: CLOSED，表示连接已经关闭或者打开失败。

返回一个新的 `WebSocket` 对象。

### binaryType

返回 WebSocket 连接通信的二进制数据格式类型，有 `blob` 和 `arraybuffer`

## 实例方法

### send

实例对象的 send() 方法用于向服务器发送数据。

```js
const ws = new WebSocket(url);
ws.send(data);
```

### close

实例对象的 close() 方法用于关闭连接，如果已经关闭了，则不会做任何事。

```js
const ws = new WebSocket(url);
ws.close();
ws.close(code);
ws.close(code, reason);
```

## 事件

### close

当一个 WebSocket 连接关闭时，触发该事件。

```js
addEventListener('close', (event) => {});

onclose = (event) => {};
```

### error

当一个 WebSocket 连接因为错误而导致关闭时，触发该事件。

```js
addEventListener('error', (event) => {});

onerror = (event) => {};
```

### message

当通过 WebSocket 收到数据时，触发该事件。

```js
addEventListener('message', (event) => {});

onmessage = (event) => {};
```

### open

当一个 WebSocket 连接打开时，触发该事件。

```js
addEventListener('open', (event) => {});

onopen = (event) => {};
```

## 参考链接

- [WebSocket - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
