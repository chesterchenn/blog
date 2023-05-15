---
layout: post
tags: 2023 http
title: HTTP常见的首部Header字段
---

HTTP 首部 Header 用于 HTTP 请求或响应的字段。

以下是列举常见的首部字段。

## 通用首部字段

通用首部字段会在请求报文和响应报文都会使用的首部

- `Cache-Control` 告知缓存机制是否可以缓存及缓存类型
- `Connection` 表明是否需要持久连接
- `Transfer-Encoding` 文件传输编码

## 请求报文

请求报文的常见的首部

- `Accept` 指定客户端能接收的内容类型
- `Range` 实体的字节范围请求
- `Authorization` web 的认证信息
- `Host` 请求资源所在的服务器
- `User-Agent` 客户端程序信息
- `If-Match` 比较实体标签（ETag）
- `If-None-Match` 比较实体标签（ETag）
- `If-Modified-Since` 比较资源的更新时间
- `If-Unmodified-Since` 比较资源的更新时间

## 响应文件

响应报文的常见的首部

- `Location` 令客户端重定向的 URI
- `ETag` 表示资源唯一的字符串
- `Server` 服务器信息

## 实体首部

实体（Entity）首部补充了资源内容更新时间等与实体有关的信息，常见的有

- `Last-Modified` 请求资源的最后修改时间
- `Expires` 响应过期的日期和时间
- `Content-Type` 返回内容的媒体类型

## 参考资料

- [HTTP Request Header 和 Response Header 里面分别都有哪些比较重要的字段](https://fe.ecool.fun/topic/d7b4d0ce-dc04-4989-9244-88276318b6db?orderBy=updateTime&order=desc&tagId=16)
