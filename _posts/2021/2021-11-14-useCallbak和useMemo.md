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

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

## useMemo

```js
const memoizedValue = useMemo(() => computedExpensiveValue(a, b), [a, b]);
```

将函数和数组作为参数，返回一个 memoized 值，仅当数组的某项改变时才会更新。

传入的函数会在渲染期间执行，如果没有提供依赖数组，useMemo 在每次渲染时都会计算新的值。

## 参考链接

- [React: Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
