---
layout: post
tags: 2023 javascript
title: DocumentFragment
---

DocumentFragment 接口表示一个没有父结点的最小文档对象。

它是 Document 的轻量级标签，可以存储 DOM 结点。最主要的区别是它不会在文档显示，不会影响文档布局。

## 使用

通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到 DOM 树。在 DOM 树中，文档片段被其所有的子元素所代替。因为文档片段存在于内存中，并不在 DOM 树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。

## 性能

但是根据 MDN [DocumentFragment#performance](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment#performance) 所言，DocumentFragment 的性能优化往往被夸大了，性能差异并不大，更重要的是可读性。

## 使用例子

```html
<ul></ul>
```

```javascript
const ul = document.querySelector('ul');
const fruits = ['Apple', 'Orange', 'Banana', 'Melon'];

const fragment = new DocumentFragment();

for (const fruit of fruits) {
  const li = document.createElement('li');
  li.textContent = fruit;
  fragment.append(li);
}

ul.append(fragment);
```

## React.Fragment

在 React 里也有对应的 Fragment 组件，`<Fragment>` 经常被用作 `<>...</>`，对元素进行分组且没有包含结点。

```jsx
<>
  <OneChild />
  <AnotherChild />
</>
```

## 参考链接

- [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)
- [React: Fragment](https://react.dev/reference/react/Fragment)
