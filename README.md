Use Jekyll.

1. 安装Ruby  
[Ruby](https://www.ruby-lang.org/en/downloads/)

2. 安装命令
```
gem install jekyll bundler
```
- linux下安装到/home/gem目录下，以[Ubuntu](https://jekyllrb.com/docs/installation/ubuntu/)为例

3. 安装依赖
```
bundle install
```

4. 运行服务
```
bundle exec jekyll server
```
运行服务（草稿）
```
bundle exec jekyll server --drafts
```

## 简单规范 
1. 所有的正式文放在_posts
2. 所有的草稿文放在_drafts
3. 标题命名规范yyyy-mm-dd-Your-title.md
4. 内容较多时添加导航链接
5. 中英文中，英文前后要用空格间隔，中英文符号对应使用
6. 文章内二级标题作为最高级别标题
7. 注明参考链接