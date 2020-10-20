这是基于 jekyll 和 minima 主题搭建起来的博客，详情请查看 about.md  

1. 安装 Ruby  
  [Download Ruby](https://www.ruby-lang.org/en/downloads/)  
  - Linux 下 Ruby 的安装可以参考下面链接

2. 安装 jekyll 和 bundler  
  `gem install jekyll bundler`
  - Linux 下安装到 /home/gem 目录下，以 [Ubuntu](https://jekyllrb.com/docs/installation/ubuntu/) 为例

3. 进入目录，安装相应的依赖  
  `bundle install`

4. 运行服务  
  `bundle exec jekyll server`

5. 运行服务（草稿）  
  `bundle exec jekyll server --drafts`

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