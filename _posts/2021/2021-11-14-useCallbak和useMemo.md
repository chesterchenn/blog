---
layout: post
tags: react
title: useCallback和useMemo
---

useCallback 和 useMemo 是 react 里面 Hook 的一部分。

## useCallback

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

将回调函数和数组作为参数，返回一个 memoized 的回调函数，仅当数组的某项改变时才会更新。

将回调函数传递给相等依赖子组件时，可以防止不必要的渲染。可以参考如下代码

```ts
import React, { useCallback, useState, memo } from 'react';

interface IProps {
  field: string;
  foo?: () => void;
}

const Child = memo(function (props: IProps) {
  console.log(`${props.field} render`);
  return <button onClick={props.foo}>ChildWithMemo</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const foo = () => {
    console.log('foo');
  };
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
        <Child field='child' foo={foo} />
        <Child field='childUseCallback' foo={fooCallback} />
        <Child field='childNoRef' />
      </div>
    </>
  );
}
```

![useCallback]({{ "images/useCallback.jpg" | relative_url }})

当点击 Increase 按钮的时候，父组件 App 会进行刷新。使用 React.memo 优化了子组件，可以避免不必要的渲染。

- childNoRef 没有引用的父组件函数可以避免刷新。
- child 引用了父组件函数，当父组件刷新时，引用函数会进行刷新，因此子组件也会进行刷新。
- childUseCallback 使用 useCallback 缓存了回调函数。当父组件刷新时，传递的函数被记忆了下来，不会触发刷新。

## useMemo

```js
const memoizedValue = useMemo(() => computedExpensiveValue(a, b), [a, b]);
```

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

将函数和数组作为参数，返回一个 memoized 值，仅当数组的某项改变时才会更新。

传入的函数会在渲染期间执行，如果没有提供依赖数组，useMemo 在每次渲染时都会计算新的值。useMemo 与 useCallback 相比，useCallback 缓存是函数，useMemo 缓存是函数返回值，所以可以在函数内计算一些复杂的操作。

PS: useMemo 其实跟 useCallback 的用法类似，跟 React.memo 没有什么关系。

## 参考链接

- [React: Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
