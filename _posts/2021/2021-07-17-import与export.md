---
layout: post
tags: javascript
title: import与export
---

在 ES6 与 CommonJS 的模块系统中，导入与导出是区别的。

## ES6

### ES6 导出

```javascript
// 单独导出
export const a = 1;

// 批量导出
const b = 2;
const c = 3;
export { b, c };

// 导出函数
export function f() {};

// 导出时取别名
function f() {};
export { f as F };

// 默认导出，无需函数名
export default function() {}

// 引入外部模块，重新导出
export { foo as bar } from './module'
```

### ES 导入

```javascript
import { a, b, c } from './module';  // 批量导入
import { f as F } from './module';   // 导入是起别名
import * as Foo from './module';     // 导入模块中的所有成员，绑定 Foo 上
import Foo from './module';          // 导入默认
```

## CommonJS

### CommonJS 导出

```javascript
// 整体导出
let foo = {
  a: 1,
  b: 2,
}
module.exports = foo;

// 导出多个变量
// exports === module.exports
exports.x = 1;
exports.y = 2;
```

### CommonJS 导入

```javascript
const foo = require('./module');
```
