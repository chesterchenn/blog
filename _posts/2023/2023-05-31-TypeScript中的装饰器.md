---
layout: post
tags: 2023 typescript
title: TypeScript中的装饰器
---

装饰器是一种特殊的声明 `@expression`，能够被附加到类声明，方法，访问器，属性以及参数上。

## 开启

通过在 tsconfig.json 设置 experimentalDecorators 选项可以开启：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## 应用

装饰器本质上是一种特殊的函数被应用在于：

1. 类
2. 类属性
3. 类方法
4. 类访问器
5. 类方法的参数

```ts
// 类装饰器
@classDecorator
class Bird {
  // 属性装饰器
  @propertyDecorator
  name: string;

  // 方法装饰器
  @methodDecorator
  fly(
    // 参数装饰器
    @parameterDecorator
    meters: number,
  ) {}

  // 访问器装饰器
  @accessorDecorator
  get egg() {}
}
```

装饰器只在解释执行时应用一次，例如：

```ts
function f(C) {
  console.log('apply decorator');
  return C;
}

@f
class A {}

// output: apply decorator
```

这里的代码会在终端中打印 apply decorator，即便我们其实并没有使用类 A。

## 应用场景

装饰器有两个优点：

- 代码可读性变强了，装饰器命名相当于一个注释
- 在不改变原有代码情况下，对原来功能进行扩展

## 参考链接

- [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [TypeScript 装饰器完全指南](https://mirone.me/zh-hans/a-complete-guide-to-typescript-decorator/)
- [说说你对 TypeScript 装饰器的理解？应用场景？](https://vue3js.cn/interview/typescript/decorator.html)
