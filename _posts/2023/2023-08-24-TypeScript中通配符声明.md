---
layout: post
tags: 2023 typescript
title: TypeScript 中的通配符声明
---

一些模块允许导入非 JavaScript 的内容，它们通常使用前缀或后缀来表示。通用符模块声明可用于涵盖这些情况。

## 官方例子

```ts
declare module '*!text' {
  const content: string;
  export default content;
}

declare module '*!json' {
  const value: any;
  export default value;
}
```

## 实际应用中

在实际项目中，也会遇到这种情况。以下是一个 png 解决方案的示例：

1. 创建声明文件

   首先创建一个声明文件 `*.d.ts`，如：`types/index.d.ts`

2. 编辑内容如下

   ```ts
   declare module '*.png' {
     const value: string;
     export default value;
   }
   ```

3. 修改 `tsconfig.json`

   ```json
   {
     "include": ["types/**/*.d.ts"]
   }
   ```

## 参考说明

- [TypeScript: Wildcard module declarations](https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations)
