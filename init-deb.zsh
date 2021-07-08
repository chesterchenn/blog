#!/bin/zsh
# 自动化安装

# 安装 ruby
sudo apt install ruby-full build-essential zlib1g-dev

# 指定 gem 安装目录
echo '# Install Ruby Gems to ~/gems' >> ~/.zshrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.zshrc
echo 'export PATH=$HOME/gems/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# 安装 jekyll bundler
gem install jekyll bundler

# 安装依赖
bundle install
