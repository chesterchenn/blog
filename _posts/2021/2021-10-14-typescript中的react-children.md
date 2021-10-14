---
layout: post
tags: typescript react
title: TypeScript 中的 React Children
---
原文出自：[*React Children with TypeScript*](https://www.carlrippon.com/react-children-with-typescript/)

这里主要介绍了在 TypeScript 中使用 React Children 属性的不同情况。

## 使用  FC 类型

我们可以在函数组件上使用一个标准的 React 类型，`FC`。`FC` 就是函数组件，是在 TypeScript 使用的一个泛型。`React.FC` 也可以写作 `React.FunctionComponent`。

```ts
type Props = {
  title: string;
}

const Page: React.FC<Props> = ({ title, children }) => (
  <div>
    <h1>{title}</h>
    {children}
  </div>
)
```

在上面的例子中，我们声明了包含了 title 属性的类型，请注意，children 并没有在 Props 中定义。相反，它已经定义在 FC 泛型中。让我们来看看 FC 大致的定义：

```ts
type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  ...
}

type PropsWithChildren<P> = P & { children?: ReactNode | undefined };
```

## 显式定义 children 类型

如果我们显式定义 children 类型属性，我们有一个不同选项来定义。

### 使用 JSX.Element

```ts
type Props = {
  title: string;
  children?: JSX.Element | JSX.Element[];
}
```

我们可以 children 为可选类型声明，同时联合类型声明允许多个 children。

使用 JSX.Element 的一个缺点就是不能使用 string，number，boolean 等。虽然可以通过联合类型声明，如以下，但是要处理的情况还是太多了。

```ts
type Props = {
  title: string;
  children: JSX.Element | JSX.Element[] | string | string[];
}
```

### 使用 ReactChild

幸运的，有一个标准的类型叫做 ReactChild 包含了 React elements, string 和 number 等。

```ts
type Props = {
  title: string;
  children?: React.ReactChild | ReactChild[];
}
```

### 使用 ReactNode

虽然 `React.ReactChild | React.ReactChild[]` 符合我们广泛性的要求，但是过于冗余，使用 React.ReactNode 会更加简练。

```ts
type Props = {
  title: string;
  children?: React.ReactNode;
}
```

我们通过查看到 FC 泛型的时候也可以看到是使用 React.ReactNode。

## 类组件

跟函数组件 FC 一样，React.Component 类型一样会包含了 children 属性。

```ts
type Props = {
  title: string;
};

class Page extends React.Component<Props> {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </div>
    );
  }
}

```

我们可以查看到 children 的类型声明也是 ReacNode。

## 参考链接

- [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)
