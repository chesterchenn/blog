---
layout: post
tags: 2023 react
title: React 自定义 Hook 在 TypeScript 中的返回类型
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

[https://codesandbox.io/s/hook-return-types-wrong-670zy5](https://codesandbox.io/s/hook-return-types-wrong-670zy5)

看似平平无奇，但是不出意外的出意外了。 TypeScript 给了我们一个错误信息：_Type 'boolean \| (() => void)' is not assignable to type 'MouseEventHandler<HTMLButtonElement> | undefined'. Type 'boolean' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'._

在我们自定义的 hook 里， 我们返回了一个数组，而数组的类型是包含数组内所有元素类型的集合。该数组的类型包含了 '[boolean \| (() => void)]' 两种类型，当我们在使用的时候，TypeScript 会提示不符合的类型的警告。

## Tuple

'A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions'

Tuple 类型就是一个固定顺序，固定大小的数组。用 Tuple 指定自定义 hook 的返回类型。

```ts
import { useState } from 'react';

type ToggleValue = [boolean, () => void];

export const useToggle = (initialValue: boolean): ToggleValue => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);
  return [value, toggleValue];
};
```

- [https://codesandbox.io/s/hook-return-types-tuple-yz5nyc](https://codesandbox.io/s/hook-return-types-tuple-yz5nyc)

## as const

使用 tuple，我们必须清楚返回数组的大小以及类型才能声明，而使用 const 断言则可以直接冻结类型。

```ts
import { useState } from 'react';

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);
  return [value, toggleValue] as const;
};
```

[https://codesandbox.io/s/hook-return-types-as-const-9r88e6](https://codesandbox.io/s/hook-return-types-as-const-9r88e6)

useToggle 返回的类型则为 'readonly [boolean, () => void]' 变为仅读的 tuple 类型。

## 参考链接

- [TypeScript + React: Typing custom hooks with tuple types](https://fettblog.eu/typescript-react-typeing-custom-hooks/)
- [TypeScriptLang: Tuple Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)
- [stackoverflow: What does the "as const" mean in TypeScript and what is its use case?](https://stackoverflow.com/questions/66993264/what-does-the-as-const-mean-in-typescript-and-what-is-its-use-case)
- [TypeScriptLang: Const Assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
- [const assertions are the killer new TypeScript feature](https://blog.logrocket.com/const-assertions-are-the-killer-new-typescript-feature-b73451f35802/)
