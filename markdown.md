---
title: MarkDown语法
date: 2017-9-28
---
### 前言
此文用于收集平时使用的markdwon语法。


### 标题
    # H1
    ## H2
    ...
    ###### H6

# H1
## H2
...
###### H6


### 列表
    - 无序列表
    - 无序列表
    - 无序列表
    1. 有序列表
    2. 有序列表
    3. 有序列表

- 无序列表
- 无序列表
- 无序列表
1. 有序列表
2. 有序列表
3. 有序列表


### 链接和图片
    [Link](http://www.example.com)
    ![Image](./icon/logo.png)  (图片引入方式一)
    ![Image][image]            (图片引入方式二)
    [image]: ./icon/logo.png   (图片引入方式二)

[Link](http://www.example.com)
![Image](./icon/logo.png)
![Image][image]
[image]: ./icon/logo.png


### 文字引用,强调,代码
    > 文字引用
    *斜体强调*
    **加粗强调**
    `行内代码`
    代码块: 前面四个空格,代码块前后需要有至少一个空行

![](./icon/quote.png)
*斜体强调*
**加粗强调**
`行内代码`

    代码块: 前面四个空格,代码块前后需要有至少一个空行


### 分割线
    ---
    ***
    ___

---
***
___

### 表格
    | left-align | center-align | right-align |
    | ---------- | :----------: | ----------: |
    | left       | center       | right       |

| left-align | center-align | right-align |
| ---------- | :----------: | ----------: |
| left       | center       | right       |

### 其他
    ~~删除线~~

~~删除线~~