这是采用了 jekyll 搭建起来的博客  
jekyll：[https://jekyllrb.com](https://jekyllrb.com)  
GitHub：[https://github.com/jekyll/jekyll](https://github.com/jekyll/jekyll)  
主题 minima：[https://github.com/jekyll/minima](https://github.com/jekyll/minima)  

1. 安装 Ruby  
[Ruby](https://www.ruby-lang.org/en/downloads/)

2. 安装命令
```
gem install jekyll bundler
```
- linux 下安装到 /home/gem 目录下，以 [Ubuntu](https://jekyllrb.com/docs/installation/ubuntu/) 为例

3. 安装依赖
```
bundle install
```

4. 运行服务
```
bundle exec jekyll server
```

5. 运行服务（草稿）
```
bundle exec jekyll server --drafts
```

## 简单规范 
1. 所有的正式文放在 _posts
2. 所有的草稿文放在 _drafts
3. 标题命名规范 yyyy-MM-dd-Your-title.md
4. 文章内二级标题作为最高级别标题
5. 内容较多时添加导航链接
6. 中英文中，英文前后要用空格间隔，中英文符号对应使用
7. 英文书籍，文章以英文斜体表示，中文书籍，文章用书名号
8. 注明参考链接