---
title: label与input对齐
tag: css
---
在默认情况下，label 跟 input 是自适应的，经常会出现不对齐的情况。

## 默认情况
label 的长度不一致的时候，input 会出现不对齐的情况，显得页面杂乱无章。  

<div>
  <div>
    <label>Label</label><input type="text" />
  </div>
  <div>
    <label>Long Label</label><input type="text" />
  </div>
</div>
```
<div>
  <div>
    <label>Label</label><input type="text" />
  </div>
  <div>
    <label>Long Label</label><input type="text" />
  </div>
</div>
```

## 利用inline-block
设置 label  `display: inline-block`，固定宽度，文字向右对齐。 PS：这个方法会固定宽度。  

<div>
  <div class="align-inline-block">
    <label>Label</label><input type="text" />
  </div>
  <div class="align-inline-block">
    <label>Long Label</label><input type="text" />
  </div>
</div>

<style>
  .align-inline-block > label {
    display: inline-block;
    width: 140px;
    text-align: right;
  }
</style>

```
<div>
  <div class="align-inline-block">
    <label>Label</label><input type="text" />
  </div>
  <div class="align-inline-block">
    <label>Long Label</label><input type="text" />
  </div>
</div>

<style>
  .align-inline-block > label {
    display: inline-block;
    width: 140px;
    text-align: right;
  }
</style>
```

## 利用Flexbox
Flex 布局，label 和 input 可以灵活调整。以下是一个样例：

<div>
  <div class="flex">
    <label>Label</label><input type="text" />
  </div>
  <div class="flex">
    <label>Long Label</label><input type="text" />
  </div>
</div>

<style>
.flex {
  display: flex;
}

.flex > label {
  text-align: right;
  flex-basis: 100px;
}

.flex > input {
  flex-basis: 180px;
}
</style>

```
<div>
  <div class="flex">
    <label>Label</label><input type="text" />
  </div>
  <div class="flex">
    <label>Long Label</label><input type="text" />
  </div>
</div>

<style>
.flex {
  display: flex;
}

.flex > label {
  text-align: right;
  flex-basis: 100px;
}

.flex > input {
  flex-basis: 180px;
}
</style>
```

## 利用Grid
利用强大的 grid 布局。
<div>
  <div class="grid">
    <label>Label</label><input type="text" />
  </div>
  <div class="grid">
    <label>Long Label</label><input type="text" />
  </div>
</div>

<style>
.grid {
  display: grid;
  grid-template-columns: 120px 200px;
  grid-gap:5px;
}
.grid > label {
  text-align: right;
}
</style>
```
<div>
  <div class="grid">
    <label>Label</label><input type="text" />
  </div>
  <div class="grid">
    <label>Long Label</label><input type="text" />
  </div>
</div>

<style>
.grid {
  display: grid;
  grid-template-columns: 120px 200px;
  grid-gap:5px;
}
.grid > label {
  text-align: right;
}
</style>
```

## 参考链接
- [StackOverflow: Align labels in form next to input](https://stackoverflow.com/questions/9686538/align-labels-in-form-next-to-input)
- [个人：Flex布局](https://chesterchenn.github.io/blog/2019/02/27/Flex%E5%B8%83%E5%B1%80.html)
