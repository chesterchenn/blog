#!/bin/bash
# 终止 jekyll serve 的运行

# 查询 PID
PID=$(pgrep jekyll)

if [ $PID ]; then
  echo "jekyll PID is $PID"
  $(kill -s 9 $PID)
  echo "killed $PID"
else
  echo "jekyll doesn't exist"
fi
