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

如果包管理有 clash 软件，直接安装就比较简单方便。

- ArchLinux: `sudo pacman -Syu clash`

很遗憾在 ubuntu 下竟然没有相应的版本，搜索结果可以查看 [https://packages.ubuntu.com/search?keywords=clash&searchon=names&suite=all&section=all](https://packages.ubuntu.com/search?keywords=clash&searchon=names&suite=all&section=all)

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

安装完成之后运行命令 `clash -v` 查看当前安装的版本。

## 配置文件

根据官网的建议，默认配置放在 `$HOME/.config/clash/config.yaml`。

也可以通过 `-d` 指定配置文件夹，`-f` 指定配置文件。

从订阅链接中下载对应的文件至配置文件夹下：`wget -O ~/.config/clash/config.yaml <订阅链接>`

### 测试链接

由于 `ping` 使用 ip 直接网络连接，而代理是工作在更高的层级 TCP/IP 网络模型，所以无法用 ping 测试连通性。相关详见: [How to ping when behind a proxy?](https://superuser.com/questions/175428/how-to-ping-when-behind-a-proxy)

我们将使用 curl 测试连通性，同时记得不带缓存。

```shell
# 请求失败
curl -H 'Cache-Control: no-cache, no-store' www.google.com

# 结果返回
curl -H 'Cache-Control: no-cache, no-store' --proxy http://127.0.0.1:7890 www.google.com
```

## 自启动

在服务器端，自启动服务的需求可能相对那么高，但是对于 PC 端的 Linux 服务，开机自启动服务的需求则是必不可少。

创建文件 `/etc/systemd/system/clash.service`

编辑文件，注释可以忽略

```shell
[Unit]
Description=clash daemon # 服务名称
After=network.target     # 网络服务启动之后启动

[Service]
Type=simple              # 默认值，这个 daemon 主要由 ExecStart 的命令来启动，启动后常驻于内存
Restart=always
ExecStart=/usr/local/bin/clash # Arch 下安装命令在 /usr/bin/clash

[Install]
WantedBy=multi-user.target
```

- 开机启动 clash：`sudo systemctl enable clash`
- 立即启动 clash：`sudo systemctl start clash`

## 其他

配置默认代理，这样子可以不用特意指定代理。clash 默认提供了 http 7890 端口，socks 7891 端口。

编辑 `/etc/profile` 文件，添加内容：

```shell
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_socks=http://127.0.0.1:7890
```

然后重载一下 `source /etc/profile`

## 参考链接

- [用 Clash 做代理](https://maintao.com/2021/use-clash-as-a-proxy/)
- [Github: clash](https://github.com/Dreamacro/clash)
- [Github: clash wiki](https://github.com/Dreamacro/clash/wiki)
