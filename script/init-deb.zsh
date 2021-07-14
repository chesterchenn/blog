#!/bin/zsh
# 自动化安装

# 安装 ruby
sudo apt install ruby-full build-essential zlib1g-dev

# 指定 gem 安装目录
count=$(grep -c 'export GEM_HOME="$HOME/gems"' ~/.zshrc)
if [ $count -eq 0 ]; then
  echo '# Install Ruby Gems to ~/gems'
  echo 'export GEM_HOME="$HOME/gems"' >> ~/.zshrc
  echo 'export PATH=$HOME/gems/bin:$PATH' >> ~/.zshrc
  echo '\n' >> ~/.zshrc
  source ~/.zshrc
fi

# 安装 jekyll bundler
gem install jekyll bundler@2.2.22

# 安装依赖
bundle install
