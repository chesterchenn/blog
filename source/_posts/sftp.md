---
title: SFTP
date: 2017-10-26 18:21:56
tags:
---
本地文件通过终端SFTP命令上传到服务器
FTP 文件传输协议(File Transfer Protocol)
SFTP SSH文件传输协议(SSH File Transfer Protocol)，也可以叫(Secure File Transfer Protocol)安全文件传输协议

#### 使用: 
`sftp (选项) (user@host)`

#### 选项
-B：指定传输文件时缓冲区的大小
-l：使用ssh协议版本1
-b：指定批处理文件
-C：使用压缩
-o：指定ssh选项
-F：指定ssh配置文件
-R：指定一次可以容忍多少请求数
-v：升高日志等级

#### sftp下常用命令

| 常用命令 | 功能 |
| -------- | --------------- |
| exit / quit / bye | 退出sftp |
| cd [path] | 进入路径 |
| get [-afPpRr] remote [local] | 下载文件 |
| help | 显示help |
| lcd [path] | 修改本地路径 |
| lls | 列举本地文件 |
| lmkdir | 本地新建文件夹 |
| lpwd | 打印本地路径 |
| ls | 列举远程文件 |
| mkdir | 新建文件夹 |
| put [-afPpRr] local [remote] | 上传文件 |
| pwd | 打印路径 |
| rm | 删除 |
| version | 显示sftp版本号 |
