---
tags: css
title: CSS modules
---
A CSS Module is a CSS file in which all class names and animation names are scoped locally by default. 

## CSS Modules
CSS 模块将我们编写的 CSS 编译成 [ICSS](https://github.com/css-modules/icss) 低层交换格式
```jsx
import styles from './index.css';

const App = () => (
  <div className={styles.text}>
    Hello, CSS Modules.
  </div>
)
```

```css
.text {
  color: blue;
}
```

经过 CSS 模块编译后，CSS类名会被转换哈希值，生成的效果如下
```html
<div class="_2iFXG7oVwQifne6M0GosgZ">Hello, CSS Modules.</div>
```
```css
._2iFXG7oVwQifne6M0GosgZ {
  color: blue;
}
```

## 参考链接
- [github: css-modules/css-modules](https://github.com/css-modules/css-modules)
- [css-tricks: css-modules-part-1-need/](https://css-tricks.com/css-modules-part-1-need/)