---
title: "自定义 Hooks"
published: 2023-11-01
tags: ["react"]
---

自定义 Hooks 是一个函数，其名称以 use 开头，函数内部可以调用其他 Hooks。通过自定义 Hooks，可以将组件逻辑提取到可重用的函数中。

<!-- vim-markdown-toc GFM -->

- [组件间共享逻辑](#组件间共享逻辑)
- [何时自定义 Hooks](#何时自定义-hooks)
- [自定义 Hooks 与普通函数区别](#自定义-hooks-与普通函数区别)
- [参考链接](#参考链接)

<!-- vim-markdown-toc -->

## 组件间共享逻辑

使用自定义 Hooks 最大一个好处就是可以共享组件之间的逻辑。

以 [react-use](https://github.com/streamich/react-use) 里面的 `useLocalStorage` 作为例子。

`useLocalStorage` 里面封装一系列操作，包括对异常处理，读取，更新以及删除等操作。而我们在使用的过程中就可以不用重复编码。

```jsx
import { useLocalStorage } from 'react-use';

const Demo = () => {
  const [value, setValue, remove] = useLocalStorage('my-key', 'foo');

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue('bar')}>bar</button>
      <button onClick={() => setValue('baz')}>baz</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
};
```

## 何时自定义 Hooks

hook 本身也是一个函数，对于常用的组件会经常遇到一个问题：什么时候抽取 Hooks？什么时候抽取 utils？

来自 React 官方文档一个很简易的标准，就是如果你的函数调用了其他 Hooks，那么它就应该是一个以 `use` 开头的 Hooks。

一个应该放在 utils 下的普通函数：

```js
// 🔴 Avoid: A Hook that doesn't use Hooks
function useSorted(items) {
  return items.slice().sort();
}

// ✅ Good: A regular function that doesn't use Hooks
function getSorted(items) {
  return items.slice().sort();
}
```

而一个理应命名 use 的 Hook:

```js
// ✅ Good: A Hook that uses other Hooks
function useAuth() {
  return useContext(Auth);
}
```

## 自定义 Hooks 与普通函数区别

根据上面的内容，可以总结一下：

1. Hooks 写在组件顶部，每次渲染的时候都会调用，普通函数需要手动调用。
2. Hooks 只能在 React 组件里面使用，普通函数可以在其他普通函数里面调用。
3. Hooks 中可以调用其他 hook，如 useEffect, useState，普通函数不可以处理 Hooks 逻辑。
4. Hooks 约定使用 use 开头命名，使用 use 开头可以让 React 识别出 hook，从而检查 Hooks 的规则约束。

## 参考链接

- [react hook -- 自定义 Hook](https://www.jianshu.com/p/cc58fc005070)
- [reactjs - react custom hooks vs normal functions, what is the difference - Stack Overflow](https://stackoverflow.com/questions/60133412/react-custom-hooks-vs-normal-functions-what-is-the-difference)
- [自定义 hooks 和普通函数有什么区别？ - 知乎](https://www.zhihu.com/question/491311403)
- [react.dev/learn/reusing-logic-with-custom-hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [streamich/react-use: React Hooks — 👍](https://github.com/streamich/react-use)
