---
layout: post
tags: 2023 javascript
title: JavaScript中的二进制数据：Blob ArrayBuffer Base64
---

JavaScript 提供了一些 API 来处理文件或原始文件数据。如 Blob, File, ArrayBuffer, Base64 等。

<!-- vim-markdown-toc GFM -->

- [Blob](#blob)
  - [构造器](#构造器)
- [ArrayBuffer](#arraybuffer)
  - [构造器](#构造器-1)
- [Base64](#base64)
  - [应用场景](#应用场景)
- [参考链接](#参考链接)

<!-- vim-markdown-toc -->

![]({{ "images/blob-arraybuffer.png" | relative_url }})

## Blob

Blob 全称是二进制大型对象，即 Binary Large Object。它表示是一个不可变的，原始数据的类文件对象。可以作为文本或二进制数据读取，或转换为 ReadableStream，以便使用其方法处理数据。

File 对象是继承于 blob 对象的。

它常用于处理文件、图像、音频和视频等媒体数据。

### 构造器

```js
new Blob(array);
new Blob(array, options);
```

- `array`: 任何可以遍历的对象，像 `Array`, `ArrayBuffer`, `TypedArray`, `DataView`, `Blob`, `String` 都可以放入 Blob 构造对象。
- `options`:
  - `type`: 存储的媒体类型 MIME type。默认是空字符串(`""`)

```js
const arr = ['1234'];
const blob = new Blob(array);
// Blob { size: 4, type: "" }
```

## ArrayBuffer

ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。它是一个字节数组，通常在其他语言中称为“byte array”。

不能直接操作 ArrayBuffer 中的内容，不能直接读写所存储的数据，只能通过 DataView 对象或 TypedArray 对象来读写。

根据 ArrayBuffer 和 Blob 的特性，Blob 作为一个整体文件，适合用于传输；当需要对二进制数据进行操作时（比如要修改某一段数据时），就可以使用 ArrayBuffer。

### 构造器

```js
new ArrayBuffer(length);
new ArrayBuffer(length, options);
```

ArrayBuffer() 构造函数创建一个以字节为单位的给定长度的新 ArrayBuffer。你也可以从现有的数据获取数组缓冲区。

## Base64

Base64 是一种基于 64 个可打印字符来表示二进制数据的表示方法。

Base64 编码普遍应用于需要通过被设计为处理文本数据的媒介上储存和传输二进制数据而需要编码该二进制数据的场景。这样是为了保证数据的完整并且不用在传输过程中修改这些数据。

在 JavaScript 中，有两个函数被分别用来处理解码和编码 _base64_ 字符串：

- `atob()`：解码，解码一个 Base64 字符串；
- `btoa()`：编码，从一个字符串或者二进制数据编码一个 Base64 字符串。

### 应用场景

1. 其实多数场景就是基于 Data URL 的。比如，使用 toDataURL()方法把 canvas 画布内容生成 base64 编码格式的图片

   ```js
   const canvas = document.getElementById('canvas');
   const ctx = canvas.getContext('2d');
   const dataUrl = canvas.toDataURL();
   ```

2. 使用 readAsDataURL()方法把上传的文件转为 base64 格式的 data URI，比如上传头像展示或者编辑

3. 一些小的图片都可以使用 base64 格式进行展示，img 标签和 background 的 url 属性都支持使用 base64 格式的图片，这样做也可以减少 HTTP 请求

## 参考链接

- [谈谈 JS 二进制：File、Blob、FileReader、ArrayBuffer、Base64](https://juejin.cn/post/7148254347401363463)
- [Blob、File、ArrayBuffer、TypedArray、DataView 究竟应该如何应用](https://www.bmabk.com/index.php/post/20436.html)
- [Blob - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- [TypedBuffer - JavaScript \| MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- [Base64 - MDN Web Docs Glossary: Definitions of Web-related terms \| MDN](https://developer.mozilla.org/en-US/docs/Glossary/Base64)
