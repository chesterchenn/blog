---
layout: post
tags: 2022 linux
title: Linux 下使用 Clash
---

在 Windows 或者手机端很容易找到 clash 的应用，但在 Linux 下一般比较难找到对应的软件。使用在后台运行的命令反而称为一个更加稳定的选择。

## 安装

主要的安装来源：[https://github.com/Dreamacro/clash](https://github.com/Dreamacro/clash)

安装方式可以选择用源码安装，也可以选择使用包管理器进行安装（如果包管理器有的话）。

### 包管理安装

包管理安装就比较简单方便。

- ArchLinux: `sudo pacman -Syu clash`
- Ubuntu: `sudo apt install clash`

### 源码安装

发布页面 [https://github.com/Dreamacro/clash/releases](https://github.com/Dreamacro/clash/releases) 查看对应版本号。

一般 Linux 都是 amd64 位。

```shell
# 下载对应版本的 clash
wget https://github.com/Dreamacro/clash/releases/download/v1.x.x/clash-linux-amd64-v1.x.x.gz

# 由于使用的 gz 压缩，直接使用 gzip 解压
gzip -d clash-linux-amd64-v1.x.x.gz

# 移至 /usr/local/bin 目录下，修改文件目录
mv clash-linux-amd64-v1.x.x.gz /usr/local/bin/clash

# 添加执行权限
chmod +x /usr/local/bin/clash
```

## 参考链接

- [用 Clash 做代理](https://maintao.com/2021/use-clash-as-a-proxy/)
- [Github: clash](https://github.com/Dreamacro/clash)
