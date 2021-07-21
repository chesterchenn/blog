#!/bin/bash

# 获取当前路径
path=$(cd `dirname "$0"`;pwd)

# 移除 nohup.out 文件
$(rm $path/nohup.out)

# 启动服务
$(nohup jekyll serve --config $path/_config.yml -s $path/ -d $path/_site > $path/nohup.out &)
