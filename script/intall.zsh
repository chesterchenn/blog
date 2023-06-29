#!/bin/zsh
# 自动化安装

# 安装 ruby
sudo apt install ruby-full build-essential zlib1g-dev

# 安装 jekyll bundler
gem install bundler:2.4.14

# 安装依赖
bundle install
