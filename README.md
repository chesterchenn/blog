这是基于 jekyll 和 minima 主题搭建起来的博客，详情请查看 about.md

## 安装步骤

1. 安装 Ruby

   [Download Ruby](https://www.ruby-lang.org/en/downloads/)

   Linux 下 Ruby 的安装可以参考下面链接

2. 安装 jekyll 和 bundler

   `gem install jekyll bundler:2.4.14`

   Linux 下安装到 /home/gem 目录下，以 [Ubuntu](https://jekyllrb.com/docs/installation/ubuntu/) 为例

   在 arch 时默认安装到 $HOME/.local/share/gem/ruby/x.y.z/bin 目录下面，使用 `--no-user-install` 可以安装至我们指定的目录，可以参考 [ArchWiki: Ruby](https://wiki.archlinux.org/title/Ruby#Installing_gems_system-wide)

   指定安装目录 $HOME/.local/share/gem 下

3. 进入目录，安装相应的依赖

   `bundle install`

4. 运行服务

   `bundle exec jekyll server` 或者 `jekyll serve`

5. 运行服务（草稿）

   `bundle exec jekyll server --drafts`

## 安装可能遇到的问题

Q: 安装好 bundler 后，运行 `bundle install`，发现 `can't find gem bundler (>= 0.a) with executable bundle`

A: 安装的 bunlder 与 Gemfile.lock 版本不一致，在 Gemfile.lock 的 BUNDLED WITH 可以查看当前依赖的 bundler 版本，运行 `bundle --version` 可以查看当前安装的 bundler 版本。通过安装指定 bundler 版本 `gem install bundler -v x.y.z`，也可以通过修改 Gemfile.lock 中 BUNDLED WITH 的版本号使得一致。

Q: 启动项目的时候遇到报错：`You have already activated X, but your Gemfile requires Y`

A: 尝试运行 `bundle clean --force`, 会删除所有不在 bundle 中的系统 gem 文件。

## 注意事项

- 请安装 2.7.5 或者以上的版本。Ubuntu 20 下的 ruby 默认为 2019 年的 2.7.0 版本。
- 更新依赖请运行 `bundle clean --force`，以避免不必要的错误。

## 简单规范

1. 所有的正式文放在 \_posts
2. 所有的草稿文放在 \_drafts
3. 标题命名规范 yyyy-MM-dd-Your-title.md
4. 文章内二级标题作为最高级别标题
5. 内容较多时添加导航链接
6. 中英文中，英文前后要用空格间隔，中英文符号对应使用
7. 英文书籍，文章以英文斜体表示，中文书籍，文章用书名号
8. 注明参考链接
9. 第一段是摘要或者简介
10. 图片链接方式 `![img]({{ "images/some_img.jpg" | relative_url }})`

## 常用颜色

![1BA784](https://placehold.co/160x120/1ba784/fff?text=1BA784)

![CE5777](https://placehold.co/160x120/ce5777/fff?text=CE5777)

![2B73AF](https://placehold.co/160x120/2b73af/fff?text=2B73AF)

## 补充说明

安装脚本补充了 deb 系 `install.zsh`，运行脚本 `zsh install.zsh`。
