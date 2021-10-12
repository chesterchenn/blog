这是基于 jekyll 和 minima 主题搭建起来的博客，详情请查看 about.md

1. 安装 Ruby

    [Download Ruby](https://www.ruby-lang.org/en/downloads/)

    Linux 下 Ruby 的安装可以参考下面链接

2. 安装 jekyll 和 bundler

    `gem install jekyll:2.4.0 bundler:2.2.22`

    Linux 下安装到 /home/gem 目录下，以 [Ubuntu](https://jekyllrb.com/docs/installation/ubuntu/) 为例

    在 arch 时默认安装到 $HOME/.local/share/gem/ruby/x.y.z/bin 目录下面

    指定安装目录 $HOME/.local/share/gem 下

3. 进入目录，安装相应的依赖

    `bundle install`

4. 运行服务

    `bundle exec jekyll server` 或者 `jekyll serve`

5. 运行服务（草稿）

    `bundle exec jekyll server --drafts`

补充了脚本 `init-os.zsh`，运行脚本 `zsh init-os.zsh`

## 安装可能遇到的问题

Q: 安装好 bundler 后，运行 `bundle install`，发现 `can't find gem bundler (>= 0.a) with executable bundle`

A: 安装的 bunlder 与 Gemfile.lock 版本不一致，在 Gemfile.lock 的 BUNDLED WITH 可以查看当前依赖的 bundler 版本，运行 `bundle --version` 可以查看当前安装的 bundler 版本。通过安装指定 bundler 版本 `gem install bundler -v x.y.z`，也可以通过修改 Gemfile.lock 中 BUNDLED WITH 的版本号使得一致。

Q: 启动项目的时候遇到报错：`You have already activated X, but your Gemfile requires Y`

A: 尝试运行 `bundle clean --force`, 会删除所有不在 bundle 中的系统 gem 文件。

## 简单规范

1. 所有的正式文放在 _posts
2. 所有的草稿文放在 _drafts
3. 标题命名规范 yyyy-MM-dd-Your-title.md
4. 文章内二级标题作为最高级别标题
5. 内容较多时添加导航链接
6. 中英文中，英文前后要用空格间隔，中英文符号对应使用
7. 英文书籍，文章以英文斜体表示，中文书籍，文章用书名号
8. 注明参考链接
9. 第一段是摘要或者简介
