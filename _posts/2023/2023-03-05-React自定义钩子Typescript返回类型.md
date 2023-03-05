---
layout: post
tags: 2023 react
title: React 自定义钩子 在 TypeScript 中的返回类型
---

当我们创建一个自定义的钩子，并检查常规的 React 钩子命名惯例：在调用钩子时，返回一个数组可以解构。

使用数组的原因是因为数组没有名称属性，你可以自定义自己的名称。类似于：

```js
const [state, setState] = useState(false);
const [count, setCount] = useCount(0);
```

## 钩子中的返回类型

我们在自定义的 hook，也想返回一个数组。

一个简单的 typescript 自定义 hook：

```ts
// useToggle.ts
export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);
  return [value, toggleValue];
};
```

我们只定义了输入的参数类型，除此之外没有什么特殊，让我们试着使用它。

```tsx
// App.tsx
export const App = () => {
  const [isVisible, toggleVisible] = useToggle(false);

  return (
    <>
      <button onClick={toggleVisible}>Click Me</button>
      {isVisible && <div>Hello World</div>}
    </>
  );
};
```

## 参考链接

- [TypeScript + React: Typing custom hooks with tuple types](https://fettblog.eu/typescript-react-typeing-custom-hooks/)
