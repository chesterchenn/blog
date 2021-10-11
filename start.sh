#!/bin/bash

# 获取当前路径
path=$(cd `dirname "$0"`;pwd)

# 移除 nohup.out 文件
if [ -e $path/nohup.out ]; then
  $(rm $path/nohup.out)
  echo "remove $path/nohup.out"
fi

# 启动服务
$(nohup jekyll serve --config $path/_config.yml -s $path/ -d $path/_site > $path/nohup.out &)
