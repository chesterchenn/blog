---
layout: post
tags: css
title: CSS modules
---

A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.

根据定义我们可以知道 CSS 模块的好处

- 样式放同一处地方
- 模块样式仅用于该组件而不适用于其他。

## CSS Modules

CSS 模块将我们编写的 CSS 编译成 [ICSS](https://github.com/css-modules/icss) 低层交换格式。

```jsx
import styles from './index.module.css';

const App = () => <div className={styles.text}>Hello, CSS Modules.</div>;
```

```css
.text {
  color: blue;
}
```

经过 CSS 模块编译后，CSS 类名会被转换哈希值，生成的效果如下。注：使用 React 作为样例

```html
<div class="_2iFXG7oVwQifne6M0GosgZ">Hello, CSS Modules.</div>
```

```css
._2iFXG7oVwQifne6M0GosgZ {
  color: blue;
}
```

### 命名

- 使用 CSS Modules, CSS 文件必须以 `.module.(s)css` 结尾
- 导入 CSS 文件时为其分配名称，如 `styles`，推荐使用驼峰法命名
- 使用驼峰法是因为在使用的使用 `styles.className` 比 `styles['class-Name']` 更简洁

### 范围

`:global` 切换到当前选择器各自标识符的全局范围。使用全局类名：`:global(.xxx)`

同样的，`:local` 和 `:local(...)` 用于本地范围

## Webpack

在 webpack 中的 css-loader 可以选择是否启用 css-modules 的功能。**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
    ],
  },
};
```

这样子我们 css 文件不必以 `*.module.css` 文件结尾也可以使用 CSS Module。如果我们在 webpack 中未开启 `modules: true` 的选项，则会报错。

<p style="color: #D70022;">Uncaught TypeError: _style_scss__WEBPACK_IMPORTED_MODULE_2__.default is undefined</p>

个人觉得还是不开启比较好，采用 `*.module.css` 开启 CSS Module。 可以:好的区分正常的 CSS 文件与 CSS Module 文件。

## 参考链接

- [github: css-modules/css-modules](https://github.com/css-modules/css-modules)
- [css-tricks: css-modules-part-1-need](https://css-tricks.com/css-modules-part-1-need/)
- [github: css-loader](https://github.com/webpack-contrib/css-loader#modules)
