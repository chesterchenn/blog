---
layout: post
title: nodejs全局问题
tags: 2020 nodejs
---

在 Linux 经常会遇到 nodejs 全局的问题，记录官方提供的方案。

官方主要提供了两种解决方案：  
- 使用 node 版本管理工具安装（推荐）
- 手动修改 npm 默认目录

## 使用版本管理工具
版本管理工具可以简单快速切换到不同的 node 版本，极大方便了开发和测试。

#### OSX 和 Linux
- [nvm](https://github.com/creationix/nvm)
- [n](https://github.com/tj/n)

#### Windows
- [nvm-windows](https://github.com/coreybutler/nvm-windows)

## 手动修改 npm 默认目录
1. 创建文件夹
```
mkdir ~/.npm-global
```

2. 配置 npm 
```
npm config set prefix '~/.npm-global'
```

3. 打开/新建 `~/.profile`，增加以下的命令
```
export PATH=~/.npm-global/bin:$PATH
```

4. 更新系统变量
```
source ~/.profile
```

## 参考链接
- 官方解决方案  
  [Resolving EACCES permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)
- [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)