---
layout: post
title: Nodejs 的 Process
tags: 2024 nodejs
---

在 nodejs 开发中经常会遇到 process 变量，process 是一个全局变量，负责提供信息，以及控制当前 nodejs 进程。

```js
const process = require('node:process');
import process from 'node:process';
```

<!-- vim-markdown-toc GFM -->

- [process.env](#processenv)
  - [配置](#配置)
- [参考链接](#参考链接)

<!-- vim-markdown-toc -->

## process.env

process.env 返回当前用户的环境变量的对象。一个常见的 process.env 命令如下，省略部分：

```js
{
    COLORTERM: 'turecolor',
    DESKTOP_SESSION: 'plasma',
    GEM_HOME: '/home/chen/.local/share/gem',
    GTK_IM_MODULE: 'fcitx',
    HOME: '/home/chen',
    LANG: 'en_US.UTF-8',
    SHELL: '/usr/bin/zsh',
    TERM: 'tmux-256color',
    USER: 'chen',
    EDITOR: 'nvim'
}
```

可以看出，都是用户（我）的环境变量设置，而且变量名都习惯性大写。

### 配置

由于 process.env 变量是可以直接修改的，所以需要配置临时变量就可以在当前终端下直接添加变量。

Window 临时添加命令如下：

```sh
# 查看
set NODE_ENV
# 添加
set NODE_ENV=production
# 追加
set path=%path%;C:\nodejs
# 删除
set NODE_ENV=
```

Linux 临时添加命令如下：

```sh
# 查看
echo $NODE_ENV
# 添加
export NODE_ENV=production
# 追加
export path=$path:/usr/local/
# 删除
unset NODE_ENV
# 查看所有环境变量
env
```

永久保存环境变量则需要修改系统配置

1. Windows: 右键（此电脑） -> 属性 -> 高级系统设置 -> 环境变量
2. Linux: 编辑用户的环境变量配置，如：`.bashrc` `.bash_profile` `.zshrc`

在项目上经常会在 package.json 里面编辑：

```json
{
  "script": {
    "build": "webpack NODE_ENV=production"
    "dev": "cross-env NODE_ENV=development"
  }
}
```

## 参考链接

- [Process \| Node.js v20.11.0 Documentation](https://nodejs.org/dist/latest-v20.x/docs/api/process.html)
- [node.js - Node 环境变量 process.env 的那些事儿](https://segmentfault.com/a/1190000011683741)
