---
layout: post
tags: 2022 typescript css
title: TypeScript中使用样式
---

样式在 TypeScript 中的应用。

## 传递 styles 作为 props

通过使用类型 `React.CSSProperties` 传递给 React TypeScript。`CSSProperties` 类型用来定义 style 对象，包含了 CSS 属性和值。

从 react 给出定义中可以看到 `export interface CSSProperties extends CSS.Properties<string | number> {}`，直接使用的是 CSS 给出的属性定义。

```tsx
import React from 'react';

interface Props {
  style: React.CSSProperties;
}

function Hello(props: Props) {
  return <div style={props.style}>Hello, World</div>;
}

const App = () => (
  <div>
    <Hello style={{ color: '#ffe411' }} />
  </div>
);

export default App;
```

## 传递 className 作为 props

在使用 className 作为 props 传递的时候，使用的是 `string` 类型而非 `React.CSSProperties`，经常容易混淆。

```tsx
import React from 'react';

interface Props {
  className: string;
}

function Hello(props: Props) {
  return <div className={props.className}>Hello, World</div>;
}

const App = () => (
  <div>
    <Hello className="text" />
  </div>
);

export default App;
```

## 参考链接

- [Styling and CSS](https://reactjs.org/docs/faq-styling.html)
