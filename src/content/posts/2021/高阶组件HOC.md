---
title: "高阶组件HOC"
published: 2021-06-23
tags: ["react"]
---

高阶组件 HOC 是一个函数，它接受一个组件并返回一个新组件。普通组件是将 props 转换成 UI，而高阶组件将组件转换成另一个组件。

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

<!-- vim-markdown-toc GFM -->

- [使用原因和实现](#使用原因和实现)
- [属性代理](#属性代理)
- [实例应用 - 页面复用](#实例应用---页面复用)
- [实例应用 - 权限控制](#实例应用---权限控制)
- [实例应用 - 类组件使用 Hooks](#实例应用---类组件使用-hooks)
- [不要改变原始组件，使用组合](#不要改变原始组件使用组合)
- [三个约定](#三个约定)
- [注意事项](#注意事项)
- [参考链接](#参考链接)

<!-- vim-markdown-toc -->

## 使用原因和实现

高阶组件主要可以帮忙解决以下三个方面的问题：

1. 抽取重复代码，实现组件复用。如页面复用。
2. 条件渲染，控制组件的渲染逻辑（渲染劫持）。如权限控制。
3. 捕获/劫持被处理组件的生命周期。如组件渲染性能跟踪，日志打点。

主要实现有两种方式

1. 属性代理（Props Proxy）
2. 反向继承（Inheritance Inversion）

## 属性代理

属性代理本质是使用组合的方式，通过将组件包装在容器组件中实现功能。

```jsx
// 返回一个函数组件
function hoc(WrappedComponent) {
  const newProps = { type: 'HOC' };
  return (props) => <WrappedComponent {...props} {...newProps} />;
}

// 返回一个类组件
function hoc(WrappedComponent) {
  return class extends React.Component {
    render() {
      const newProps = { type: 'HOC' };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}
```

代码示例：[codesandbox](https://codesandbox.io/s/nostalgic-liskov-d2km9y?file=/src/App.js)

## 实例应用 - 页面复用

横切关注点（Cross-Cutting Concern），即系统中的部分功能在多个模块中出现。所谓横切关注点就是页面复用。

假设有一个 CommentList 评论列表组件和一个 BlogPost 博客帖子组件。CommentList 组件订阅外部数据源，用以渲染评论列表。BlogPost 订阅单个博客帖子，用以渲染博客。

对于经常复用的逻辑，我们可以进行抽象，在一个地方定义这个逻辑，并且在许多组件之间共享它。对于上面的例子，我们可以编写一个创建组件的函数，该函数将接受一个子组件作为它的其中一个参数，该子组件将订阅数据作为 prop。我们定义函数 withSubscription

第一个参数是被包装的组件。第二个参数通过 DataSource 和当前的 props 返回我们需要的数据。

```jsx
import DataSource from '..';
// hoc
function withSubscription(WrappedComponent, selectData) {
  return (props) => {
    const [data, setData] = useState(selectData(DataSource, props));

    function handlechange() {
      setData(selectdata(Datasource, props));
    }

    useEffect(() => {
      Datasource.addchangelistener(handlechange);
      return () => {
        Datasource.removechangelistener(handlechange);
      };
    }, []);

    return <wrappedcomponent data={data} {...props} />;
  };
}

const Commentlistwithsubscription = withsubscription(Commentlist, (datasource) =>
  Datasource.getcomments(),
);

const BlogPostWithSubscrption = withSubscription(BlogPost, (DataSource, props) =>
  DataSource.getBlogPost(props.id),
);
```

## 实例应用 - 权限控制

权限控制其实就是利用高阶组件的条件渲染来控制渲染的组件。

```jsx
function authWrapper(WrappedComponent) {
  // 通过其他方法路径获取权限
  const isAuth = getAuth();
  if (!isAuth) return null;
  return (props) => <WrappedComponent {...props} />;
}
```

## 实例应用 - 类组件使用 Hooks

在有继承的或者部分复杂的类组件，需要使用 hooks 时，可以使用 HOC 来包裹成函数组件。

```tsx
// App.tsx
import useName from './useName';

class Greeting extends React.Component<{ name: string }> {
  render() {
    return (
      <h1>
        Hello <span>{this.props.name}</span>
      </h1>
    );
  }
}

const WrapperGreeting = () => {
  const [name] = useName('chen');
  return <Greeting name={name} />;
};

export default function App() {
  return (
    <div className="App">
      <WrapperGreeting />
    </div>
  );
}
```

```ts
// useName.ts
import { useEffect, useState } from 'react';

const useName = (n: string) => {
  const [name, setName] = useState('');
  useEffect(() => {
    setName(n);
  }, [n]);
  return [name];
};

export default useName;
```

[https://codesandbox.io/s/class-component-use-hooks-cgmoo1](https://codesandbox.io/s/class-component-use-hooks-cgmoo1)

## 不要改变原始组件，使用组合

不要在 HOC 中修改组件原型，这样子会产生一些不良后果，HOC 不应该修改传入的组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能

```jsx
// 错误的使用方式
function logPrpos(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function (prevProps) {
    console.log('Current props: ', this.props);
    console.log('Previous props: ', prevProps);
  };
  // 返回原始的 input 组件，暗示它已经被修改。
  return InputComponent;
}

// 每次调用 logPrpos 时，增强组件都会有 log 输出
const EnhancedComponent = logPrpos(InputComponent);
```

```jsx
// 使用组合的方式
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      // 将 input 组件包装在容器中，而不对其进行修改
      return <WrappedComponent {...this.props} />;
    }
  };
}
```

## 三个约定

- 约定：将不相关的 props 传递给被包裹的组件

  这个约定保证了 HOC 的灵活性以及可复用性。HOC 为组件添加特性，HOC 应该透传与自身无关的 props。大多数 HOC 都应该包含类似下面的 render 方法

  ```jsx
  render() {
    // 过滤掉非此 HOC 且额外不要进行透传的 props
    const { extraProp, ...passThroughProps } = this.props;

    // 将 props 注入到被包装的组件中。
    // 通常为 state 的值或者实例方法。
    const injectedProps = someStateOrInstanceMethod;

    // 将 props 传递给被包裹的组件
    return (
      <wrappedcomponent injectedProps={injectedProps} {...passThroughProps} />
    );
  }
  ```

- 约定：最大化可组合性

- 约定：包装显示名称以便轻松调试

## 注意事项

- 不要在 render 方法中使用 HOC

- 务必复制静态方法

- Refs 不会被传递

## 参考链接

- [Reactjs: higher-order component](https://reactjs.org/docs/higher-order-components.html)
- [zhihu: 面向对象困境之 —— 横切关注点](https://zhuanlan.zhihu.com/p/76618283)
- [React 高阶组件(HOC)的入门 📖 及实践 💻 - 掘金](https://juejin.cn/post/6844904050236850184)
