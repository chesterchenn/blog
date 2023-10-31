---
layout: post
tags: 2023 react
title: React Hooks 中的闭包陷阱
---

React Hooks 中的闭包，指函数式组件每次 render 都会产生一个新的函数，这个函数会产生一个在当前阶段的闭包。

最近在工作中刚好遇到这个问题，经过一些资料的查阅，总结出一部分总结。

<!-- vim-markdown-toc GFM -->

- [问题](#问题)
- [解决方案](#解决方案)
- [原因](#原因)
- [其他例子](#其他例子)
- [使用 useRef 解决闭包陷阱](#使用-useref-解决闭包陷阱)
- [参考链接](#参考链接)

<!-- vim-markdown-toc -->

## 问题

以下是一个简化版本的代码示例：

```tsx
const App = (): React.ReactElement | null => {
  const [count, setCount] = useState(0);
  const [handleCount, setHanleCount] = useState({
    action: () => {},
  });

  useEffect(() => {
    setHanleCount({
      action: () => setCount(count + 1),
    });
  }, []);

  return (
    <div>
      <button onClick={handleCount.action}>Click</button>
      <div>{count}</div>
    </div>
  );
};
```

[https://codesandbox.io/s/capture-2l2vq5](https://codesandbox.io/s/capture-2l2vq5)

上面例子中，Button 组件的 action 需要依赖父组件传递。当我们点击了一次按钮之后，count 变成 1，之后再点击不会增加。

## 解决方案

如果你安装 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 插件，会得到下面的警告提示，提示我们使用 `useEffect` 缺少 count 的依赖。

`React Hook useEffect has a missing dependency: 'count'. Either include it or remove the dependency array. You can also do a functional update 'setCount(c => ...)' if you only need 'count' in the 'setCount' call. (react-hooks/exhaustive-deps)`

从上面的 eslint 插件中，我们可以快速修复这个问题。

```tsx
useEffect(() => {
  setHanleCount({
    action: () => setCount(count + 1),
  });
}, [count]);
```

## 原因

在 React Fiber 架构中，Fiber 节点就是一个组件，其 Hook 节点类型大致如下:

```ts
type Hook = {
  memoizedState: any;
  baseState: any;
  baseUpdate: Update<any, any> | null;
  queue: Update<any, any> | null;
  next: Hook | null;
};
```

memoizedState 用来存放组件的 state，next 指向 Hook 对象。由于不知道开发者会使用多少个 Hook，所以 Hook 都是链表存储的来保证调用的顺序。

假设我们有如下的代码，则对应的链表为：

```tsx
function App() {
  const [] = useState();
  const [] = useState();
  useEffect(() => {}, []);
  useMemo(() => {}, []);
  const [] = useState();

  return <></>;
}
```

![]({{"images/react-hook-chain.png" | relative_url}}){:class="img--center"}

当我们每次渲染更新的时候，react 会对 `useEffect` 和 `useMemo` 的依赖项进行判断是否改变，有更新会执行回调函数，否则跳过。

回到原先的问题上，react 进行组件渲染调用组件函数，函数执行创建了函数作用域。组件在初次渲染时，count 为 0，点击之后组件重新渲染，创建新的作用域，但是 `useEffect` 的依赖项未更新，其回调函数被跳过执行，里面的 count 变量引用的还是组件初始化的值。

所以 hooks 产生闭包陷阱的原因是依赖项缺失，在渲染过程中 hooks 的依赖项未更新跳过，内部函数依赖也是未更新前的值。

## 其他例子

在下面例子中，先点击 alert 按钮，后面点击 add 按钮，那么弹窗的值和页面展示的 value 是什么？

```jsx
const FunctionComponent = () => {
  const [value, setValue] = useState(1);

  const log = () => {
    setTimeout(() => {
      alert(value);
    }, 3000);
  };

  return (
    <div>
      <div>value: {value}</div>
      <button onClick={log}>alert</button>
      <button onClick={() => setValue(value + 1)}>add</button>
    </div>
  );
};
```

答案是：弹出的值是 1，页面的值是 2

我们发现弹出的值和当前页面显示的值不相同，这个就是一个闭包陷阱。

1. 初次渲染，生成一个 log 函数（value = 1）
2. 点击 alert 按钮，执行 log 函数（value = 1）
3. 点击 add 按钮，value 的值增加，组件重新渲染，生成一个新的 log 函数（value = 2）
4. 计时器触发，log 函数（value = 1）弹出闭包内的 value

## 使用 useRef 解决闭包陷阱

使用 useRef 每次渲染是都返回同一个引用类型的对象，读取和设置 value 都在这个对象上处理。

```jsx
const FunctionComponent = () => {
  const [value, setValue] = useState(1);

  const countRef = useRef(value);

  const log = () => {
    setTimeout(() => {
      alert(countRef.current);
    }, 3000);
  };

  useEffect(() => {
    countRef.current = value;
  }, [value]);

  return (
    <div>
      <div>value: {value}</div>
      <button onClick={log}>alert</button>
      <button onClick={() => setValue(value + 1)}>add</button>
    </div>
  );
};
```

## 参考链接

- [闭包陷阱](https://fe.ecool.fun/topic/207b117b-2e93-4760-91ed-8e618a85a50e?orderBy=updateTime&order=desc&tagId=13)
- [从 react hooks“闭包陷阱”切入，浅谈 react hooks](https://juejin.cn/post/7093699777556119565)
- [React Hooks useState 返回的 setState 方法不生效怎么办?](https://zhuanlan.zhihu.com/p/356409759)
