---
layout: post
tags: 2021 react
title: useMemo 和 useCallback
---

useCallback 和 useMemo 是 react 里面 Hook 的一部分，通常被作为性能优化使用。它们可以用来缓存函数、组件、变量，以减少两次渲染的重复计算。

## useMemo

useMemo 将函数和数组作为参数，返回一个 memoized 值，仅当数组的某项改变时才会更新。

```jsx
const memoizedValue = useMemo(() => computedExpensiveValue(a, b), [a, b]);
const [m, n] = useMemo(() => {
  // doSomething
  return [m, n];
}, [a]);
```

传入的函数会在渲染期间执行，如果没有提供依赖数组，useMemo 在每次渲染时都会计算新的值。useMemo 与 useCallback 相比，useCallback 缓存是函数，useMemo 缓存是函数返回值，所以可以在函数内计算一些复杂的操作。

PS: useMemo 跟 React.memo 没有什么关系。

## useCallback

useCallback 将回调函数和数组作为参数，返回一个 memoized 的回调函数，仅当数组的某项改变时才会更新。

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## useMemo 和 useCallback 的作用

使用 memo 通常有三个原因：

- 防止不必要的重复渲染
- 防止不必要的重复计算
- 防止不必要的 effect

至于为什么不给所有的组件都使用 useMemo，上文已经解释了。useMemo 是有成本的，它会增加整体程序初始化的耗时，并不适合全局全面使用，它更适合做局部的优化。

### 防止不必要的重新渲染

当父组件重新渲染时，所有的子组件会被重新渲染，形成一条重新渲染链。

我们必须缓存回调函数和组件本身才可以实现不重复渲染，使用 useCallback 缓存回调函数，使用 React.memo 缓存组件。可以参考如下代码

```tsx
import React, { useCallback, useState, memo } from 'react';

interface IProps {
  field: string;
  foo?: () => void;
}

// 使用 React.memo 缓存组件
const Child = memo(function (props: IProps) {
  console.log(`${props.field} render`);
  return <button onClick={props.foo}>ChildWithMemo</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const foo = () => {
    console.log('foo');
  };

  // 使用 useCallback 缓存回调函数
  const fooCallback = useCallback(() => {
    console.log('foo');
  }, []);

  return (
    <>
      <div>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <span>count: {count}</span>
      </div>
      <div>
        <Child field="child" foo={foo} />
        <Child field="childUseCallback" foo={fooCallback} />
        <Child field="childNoRef" />
      </div>
    </>
  );
}
```

当点击 Increase 按钮的时候，父组件进行刷新。使用 React.memo 优化了子组件，可以避免不必要的渲染。

- childNoRef 没有引用的父组件函数可以避免刷新，React.memo 缓存了组件。
- child 引用了父组件函数，当父组件刷新时，引用函数会进行刷新，因此子组件也会进行刷新。
- childUseCallback 使用 useCallback 缓存了回调函数。当父组件刷新时，传递的函数被记忆了下来，不会触发刷新。

![useCallback]({{ "images/useCallback.jpg" | relative_url }})

### 防止不必要的计算

在重新渲染之间缓存一个需要大量计算的值。

```jsx
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

### 防止不必要的 effect

当一个值被当作另一个 Hook 的依赖项时，我们可以通过缓存该值防止重复执行 effect。

```jsx
function Dropdown({ allItems, text }) {
  const searchOptions = useMemo(() => {
    return { matchMode: 'whole-word', text };
  }, [text]); // ✅ Only changes when text changes

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]);

  // ...
}
```

searchOptions 是 visibleItems 的依赖项，缓存 searchOptions 可以减少 visibleItems 的 effect 执行。

## 参考链接

- [React: Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
