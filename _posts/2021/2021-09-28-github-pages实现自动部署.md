---
layout: post
tags: 2021 others
title: github pages 实现自动部署
---

记录一下如何利用 GitHub Pages 实现托管部署个人仓库代码，利用 Github Actions 实现自动部署。

## GitHub Pages

Pages 的开启还是比较简单的。

1. 进入用户的仓库。
2. 点击 `Settings` 标签页。
3. 再点击 `Pages`，我们就可以进入到 Github Pages 的设置页面。

Source 用来指定网站的目录文件夹，可以指定特定的分支和指定的文件夹。

这里推荐使用 gh-pages 分支的根目录作为目录文件夹，不会对主分支（master/main）的历史记录产生影响。可以参看：[黑人de问号：使用 GitHub Actions 高效部署你的博客](https://yuqingc.github.io/posts/2020/github-actions/)

## GitHub Actions

GitHub Actions 的工作流程位于仓库的 `.github/workflows`, 每个工作流程名为 `*.yml`。

对配置文件的参数大致理解：

| name               | 可选，工作流程的名称，展示在 Actions 选项卡                     |
| on                 | 指定自动触发工作流程的事件                                      |
| jobs               | 将工作流的作业集合                                              |
| jobs.\<job\_id>    | 作业 id，唯一字符串，只能包含字母数字 `-` `_`                   |
| \<job\_id>.runs-on | 必填，运行作业的机器类型，如 `ubuntu-latest`                    |
| \<job\_id>.steps   | 步骤，包含一连串的任务                                          |
| steps[\*].name     | 步骤名称                                                        |
| steps[\*].uses     | 选择一个动作来运行                                              |
| steps[\*].run      | 使用操作系统的 shell 运行命令行程序，可运行多行命令             |
| steps[\*].with     | 使用键/值对作为动作的入参，参数被设置为环境变量，且前缀是INPUT_ |
| steps[\*].env      | 为步骤设置环境变量，以便在运行环境中使用                        |

一些常用的 actions

- [actions/checkout@v2](https://github.com/marketplace/actions/checkout): 将代码下载到当前运行环境
- [actions/setup-node@v2](https://github.com/marketplace/actions/setup-node-js-environment): 在当前运行环境安装指定版本的 nodejs

本仓库使用的 `github-pages.yml` 如下：

```plain
name: 部署blog到github pages

on:
  push:
    branches:
      - master
    paths:
      - '_posts/**'
      - '_includes/**'
      - '_layouts/**'
      - '_sass/**'
      - 'tag/**'

jobs:
  github-pages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: helaili/jekyll-action@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

## 自定义脚本

根据上面的步骤，我们已经能够建立 CI/CD。但是还不能将网站自动合并到 gh-pages。

我们可以通过脚本合并，可以自定义，也可以利用 [GitHub Marketplace Action](https://github.com/marketplace?category=&query=&type=actions&verification=)上的。如:

- [GitHub Pages deploy](https://github.com/marketplace/actions/gh-pages-deploy) 将静态站点部署到 GitHub Pages
- [Jekyll Actions](https://github.com/marketplace/actions/jekyll-actions) 用来建立和发布 jekyll 网站到 GitHub Pages

自定义的脚步可以查看：[osiris/bin/build.sh](https://github.com/chesterchenn/osiris/blob/master/bin/build.sh)

## 参考链接

- [GitHub: jekyll-action](https://github.com/helaili/jekyll-action)
- [使用 GitHub Actions 高效部署你的博客](https://yuqingc.github.io/posts/2020/github-actions/)
- [jekyllrb: GitHub Actions](http://jekyllrb.com/docs/continuous-integration/github-actions/)
- [Learn GitHub Actions: Understanding GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)
- [Learn GitHub Actions: Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions)
- [Learn GitHub Actions: Environment variables](https://docs.github.com/en/actions/learn-github-actions/environment-variables)
