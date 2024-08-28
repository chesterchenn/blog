---
layout: post
title: IndexedDB
tags: 2024 javascript
---

IndexedDB 是个客户端存储键值存储的数据库。

<!-- vim-markdown-toc GFM -->

- [概念](#概念)
- [打开](#打开)
- [构建](#构建)
- [插入/删除/查询/更新数据](#插入删除查询更新数据)
- [游标](#游标)
- [索引](#索引)
- [参考链接](#参考链接)

<!-- vim-markdown-toc -->

## 概念

- 仓库 Store：IndexedDB 没有表，只有仓库。
- 索引 Index: 索引方便快速筛选。
- 游标 Cursor: 用于查询满足条件的数据。
- 事务 Transaction：对数据库进行操作失败的话会回滚，保证数据的一致性。

## 打开

开数据库，若没有则会自动创建。

```js
const request = window.indexedDB.open('MyDatabase', 3);
request.onsuccess = (event) => {
  // 保存 IDBDatabase 接口
  const db = event.target.result;
};
request.onerror = (event) => {};
request.onupgradeneeded = (event) => {};
```

## 构建

`createObjectStore` 第一个参数代表创建仓库名称，第二个为对象。

```js
// 省略打开
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  // 仓库
  const objectStore = db.createObjectStore('customers', { keyPath: 'ssn' });
  // 索引
  objectStore.createIndex('name', 'name', { unique: false });
};
```

## 插入/删除/查询/更新数据

插入操作基于事务，执行插入操作之前需要创建事务

```js
// 创建事务
const transaction = db.transaction(['customers'], 'readwrite');

transaction.oncomplete = (event) => {};
transaction.onerror = (event) => {};

const objectStore = transaction.objectStore('customers');

const request = objectStore.add({ ssn: '4-4', name: 'Bill' });

const request = objectStore.get('4-4');

const request = objectStore.delete('4-4');

const request = objectStore.put({ ssn: '4-4', name: 'John' });
```

## 游标

使用游标可以遍历所有值，必须需要先进行判断游标的值是否为空。

```js
const objectStore = db.transaction('customers').objectStore('customers');
const objectStore = db.transaction(['customers']).objectStore('customers');

objectStore.openCursor().onsuccess = (event) => {
  const cursor = event.target.result;
  // 判断必须要有
  if (cursor) {
    console.log(`Name for SSN ${cursor.key} is ${cursor.value.name}`);
    cursor.continue();
  } else {
    console.log('No more entries!');
  }
};
```

## 索引

使用索引可以获得第一个符合条件的值

```js
const index = objectStore.index('name');
index.get('Jane').onsuccess = (event) => {};
```

配合游标查询所有符合条件的值

```js
const index = objectStore.index('name');
index.openCursor().onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // ...
    cursor.continue();
  }
};
```

一个完整的示例：[sandbox](https://codesandbox.io/p/sandbox/indexdb-rn76fm)

## 参考链接

- [IndexedDB API - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Indexed Database API 3.0](https://www.w3.org/TR/IndexedDB/)
- [IndexedDB 中文教程\_唐霜的博客](https://www.tangshuang.net/3735.html#)
