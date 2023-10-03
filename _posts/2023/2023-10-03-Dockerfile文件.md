---
layout: post
tags: 2023 others
title: Dockerfile文件
---

Dockerfile 是 Docker 构建自己的镜像使用的配置文件。

<!-- vim-markdown-toc GFM -->

- [指令表格](#指令表格)
- [前端示例](#前端示例)
  - [配置 Dockerfile](#配置-dockerfile)
  - [配置 nginx](#配置-nginx)
  - [部署](#部署)
- [.dockerignore](#dockerignore)
- [参考链接](#参考链接)

<!-- vim-markdown-toc -->

## 指令表格

Dockerfile 常用的指令

| 指令        | 说明                                     |
| :---------- | :--------------------------------------- |
| FROM        | 设置基础镜像                             |
| RUN         | 指令的命令                               |
| CMD         | 提供默认的命令                           |
| LABEL       | 添加元数据                               |
| EXPOSE      | 指定容器运行时监听的网络端口             |
| ENV         | 设置环境变量                             |
| ADD         | 复制文件，目录或远程 URL 到镜像中        |
| COPY        | 复制文件，目录到镜像中                   |
| VOLUME      | 创建挂载点或声明卷                       |
| USER        | 设置用户名或分组                         |
| WORKDIR     | 设置工作目录                             |
| ARG         | 设置构建时的变量                         |
| ONBUILD     | 当镜像被当作另一个构建过程中的基础时触发 |
| STOPSIGNAL  | 设置容器退出时的系统调用信号             |
| HEALTHCHECK | 定义周期性检查容器健康状态的命令         |
| SHELL       | 覆盖 Docker 中默认的 shell               |

## 前端示例

### 配置 Dockerfile

首先在项目根目录创建 Dockerfile 文件，注意文件名大小写。

```dockerfile
# Nodejs 构建项目
FROM node:16 AS build_image
# ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
RUN npm --registry=https://registry.npmmirror.com install
COPY . .
RUN npm run build

# nginx 配置
FROM nginx:latest
WORKDIR /app
COPY ./nginx.conf /etc/nginx/conf.d
COPY --from=build_image /app/dist /usr/share/nginx/html/

EXPOSE 8080
```

注意：

1. 设置 NODE_ENV=production 会导致 dev 依赖无法安装。
2. 设置 WORKDIR 才可以读取生成的 dist 目录。

### 配置 nginx

在根目录创建 nginx.conf

```nginx
server {
    listen 9528;
    server_name _;

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }
}
```

### 部署

运行命令生成镜像: `docker build -t web:v0.1`，生成之后运行 `docker images` 可以看到对应的镜像。

启动容器 `docker run -d -p 8080:8080 web:v0.1`，启动成功之后运行 `docker ps` 可以看到运行的容器。

## .dockerignore

使用 .dockerignore 可以指定文件或路径不会拷贝进镜像，如 node_modules。

## 参考链接

- [Dockerfile reference \| Docker Docs](https://docs.docker.com/engine/reference/builder/)
- [Docker Dockerfile \| 菜鸟教程](https://www.runoob.com/docker/docker-dockerfile.html)
- [Language-specific guides \| Docker Docs](https://docs.docker.com/language/)
- [如何使用Docker构建前端项目](https://www.cnblogs.com/liuheng/p/16249022.html)
