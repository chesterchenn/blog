#!/bin/bash
# 终止 jekyll serve 的运行

# 查询 PID
PID=$(pgrep jekyll)
echo "jekyll $PID"

# 杀死 PID
$(kill -s 9 $PID)
