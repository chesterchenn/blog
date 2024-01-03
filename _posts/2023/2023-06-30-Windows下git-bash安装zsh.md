---
layout: post
tags: 2023 windows
title: Windows 下 git-bash 安装 zsh
---

在习惯使用了 oh-my-zsh 的 git 插件之后，切换到 Windows 下的 git-bash 使用时，会经常敲出 `gst`，`gcam` 等快捷缩写命令，从而引起 git-bash 报错，提示命令不存在，很不方便。

## WSL

其中一个不错的解决办法是使用 WSL，在 WSL 里面安装 zsh 和 oh-my-zsh。

但是 WSL 也会带来一部分问题，首先是 WSL 没有图形界面的话，运行 Electron 等需要 GUI 的软件无法运行。其次，如果部分环境包裹如果在 WSL 安装了，切换到 Windows 环境，还是需要重新安装，这时候需要维护两套环境。

所以，我的结论是：WSL 项目就装在 WSL 系统中，使用 WSL 命令工具。而 Windows 目录下的命令行工具更应该选择 git-bash。

## 安装 zsh

今天在偶然情况下，发现了 git-bash 可以安装 zsh 和 oh-my-zsh。从 [Windows 在 git-bash 安装 zsh](https://juejin.cn/post/7122882640998301733) 可以看到作者也遇上了上面同样的问题。按照流程安装了一遍，发现确实可行，安装步骤也顺便记录下。

1. 从 [https://packages.msys2.org/package/zsh?repo=msys&variant=x86_64](https://packages.msys2.org/package/zsh?repo=msys&variant=x86_64) 下安装 `zsh-x.y.z-x86_64.pkg.tar.zst` 文件。

2. zst 是一个压缩文件，文中作者推荐了 [PEAZIP](https://peazip.github.io/) 软件解压文件。也可以通过 `tar -I zstd -xvf xxx.tar.zst` 解压，可能提示如下的错误：

   ```shell
   tar (child): a.tar.zst: Cannot open: No such file or directory
   tar (child): Error is not recoverable: exiting now
   tar: Child returned status 2
   tar: Error is not recoverable: exiting now
   ```

   这时因为系统中没有安装 zstd 包，需要安装即可。

3. 解压后的文件包含了 `/etc` 和 `/usr` 目录等文件。将所有的文件拷贝到 git-bash.exe 目录下。

4. 默认启动 zsh，编辑 `~/.bashrc` 文件，在 `C:\Users\[用户名]`，也可以通过 `%UserProfile%` 在资源管理器的地址栏中打开, 添加以下内容:

   ```shell
   if [ -t 1 ]; then
       exec zsh
   fi
   ```

## 安装 oh-my-zsh

如果网络允许的话，可以直接运行

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

也可以将 install.sh 脚本复制到本地，再运行。

安装完成之后，就可以配置 `~/.zshrc` 文件。当然如果之前就有配置了，也可以复制过来。

## 参考链接

- [Windows 在 git-bash 安装 zsh](https://juejin.cn/post/7122882640998301733)
