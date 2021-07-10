---
layout: post
title: ES6 Features
tags: javascript
---
ECMAScript 6，也称为 ECMAScript 2015，是 ECMAScript 最新版本(注: 已经不是最新版本)。ES6 对于这门语言来说是一个很重要的更新，而且这是 2009 年后的 ES5 标准之后的第一次更新。现在主流的 JavaScript 引擎都已经实现这些功能——[查看详情](http://kangax.github.io/compat-table/es6/)。  

By lukehoban ( [lukehoban](https://github.com/lukehoban) )  
原文地址：[lukehoban/es6features](https://github.com/lukehoban/es6features)  

这里你可以查看[ES6 规范](http://www.ecma-international.org/ecma-262/6.0/)的全部标准。  

ES6包含以下新功能：  
  - [arrows 箭头函数](#arrows-箭头函数)
  - [classes 类](#classes-类)
  - [enhanced object literals 对象字面量](#enhanced-object-literals-对象字面量)
  - [template strings 字符串模版](#template-strings-字符串模版)
  - [destructuring 解构赋值](#destructuring-解构赋值)
  - [default + rest + spread 默认值/rest参数/扩展运算符](#default--rest--spread-默认值rest参数扩展运算符)
  - [let + const](#let--const)
  - [iterators + for..of 迭代器/for..of](#iterators--forof-迭代器forof)
  - [generators 生成器](#generators-生成器)
  - [Unicode 统一码](#Unicode-统一码)
  - [modules 模块](#modules-模块)
  - [module loaders 模块加载器](#module-loaders-模块加载器)
  - [Map + Set + Weakmap + Weakset](#Map--Set--Weakmap--Weakset)
  - [proxies 代理](#proxies-代理)
  - [symbols 符号](#symbols-符号)
  - [subclassable built-ins 内置子类](#subclassable-built-ins-内置子类)
  - [promises](#promises)
  - [Math + Number + String + Array + Object APIs](#Math--Number--String--Array--Object-APIs)
  - [binary and octal literals 二进制和八进制字面量](#binary-and-octal-literals-二进制和八进制字面量)
  - [Reflect Api](#Reflect-Api)
  - [tail calls 尾调用](#tail-calls-尾调用)

## ECMAScript 6 功能

### Arrows 箭头函数
箭头函数是使用`=>`符号简写的函数。它们在语法上类似于C#，Java 8以及CoffeeScript中的功能。他们对于语句式体和表达式体(直接返回值)都有很好的支持。不同于普通函数，箭头函数不绑定 `this`, 从自己作用域上一层继承 `this`
```
// 表达式体
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);
var pairs = evens.map(v => ({even: v, odd: v + 1}));

// 语句式体
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v)
});

// 词法this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friend.forEach(f => 
      console.log(_this.name + " knows " + f)
    );
  }
}
```
更多信息: [MDN Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### Classes 类
ES6的类是基于原型继承的面向对象简易语法糖，这使得有一个更方便的类声明去使用，并鼓励互通性。类支持基于原型继承，`super`调用，实例化，静态方法以及 `constructor`构造。
```
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  get boneCount() {
    return this.bones.length;
  }
  set matrixType(matrixType) {
    this.idMatrix = SkinnedMesh[matrixType]();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```
更多信息: [MDN Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

### Enhanced object literals 对象字面量
对象字面量被扩展至支持在构造时设置原型，简写了 `foo: foo` 的赋值，定义方法，`super`调用以及通过表达式计算属性名。同时，这些使对象字面值和类声明更加紧密地联系起来，让基于对象的设计从中受益更加便利。
```
var obj = {
    // __proto__
    __proto__: theProtoObj,
    // 简写赋值：‘handler: handler’
    handler,
    // 方法
    toString() {
     // Super调用
     return "d " + super.toString();
    },
    // （动态）计算属性名称
    [ 'prop_' + (() => 42)() ]: 42
};
```
更多信息: [MDN Grammar and types: Enhanced Object literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Enhanced_Object_literals)

### Template strings 字符串模版
字符串模版为构建字符串提供了语法糖，这有点像Perl, Python等字符串插值功能。可选的，允许添加标签来自定义字符串模版，避免注入攻击或者从字符串内容中构建更加高级别的数据结构。
```
// 创建基本字符串面量
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

// 字符串插值
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// 构建一个HTTP请求前缀使用插值的替换和构造
POST`http://foo.org/bar?a=${a}&b=${b}
     Content-Type: application/json
     X-Credentials: ${credentials}
     { "foo": ${foo},
       "bar": ${bar}}`(myOnReadyStateChangeHandler);
```
更多信息: [MDN Template Strings](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)

### Destructuring 解构赋值
解构赋值允许使用模式匹配进行绑定，并支持匹配数组和对象。解构能够故障弱化，在查找类似于标准对象 `foo["bar"]`，当未找到时会提供 `undefined`值。
```
// 匹配数组
var [a, , b] = [1,2,3];

// 匹配对象
var { op: a, lhs: { op: b }, rhs: c }
       = getASTNode()

// 匹配对象作用域的'op', 'lhs', 'rhs'
var {op, lhs, rhs} = getASTNode()

// 作为参数
function g({name: x}) {
  console.log(x);
}
g({name: 5})

// 解构故障弱化
var [a] = [];
a === undefined;

// 带默认值的的解构赋值故障弱化
var [a = 1] = [];
a === 1;
```
更多信息：[MDN Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### Default + rest + spread 默认值/rest参数/扩展运算符
在函数调用中可以指定默认参数值，将数组转换成连续参数，绑定尾部参数到数组中。rest替代了`arguments`的需求，并更直接地解决了问题。
```
function f(x, y=12) {
  // 如果y没有传值或者被传入undefined，那么y的值为12
  return x + y;
}
f(3) == 15
```
```
function f(x, ...y) {
  // y是一个数组
  return x * y.length;
}
f(3, "hello", true) == 6
```
```
function f(x, y, z) {
  return x + y + z;
}
// 传递数组里的每一个元素作为参数
f(...[1,2,3]) == 6
```
更多信息：[Default parameters][default], [Rest parameters][rest], [Spread Operator][spread]

[default]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
[rest]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
[spread]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

### Let + Const
绑定并构造块作用域。`let`是一个新的`var`,`const`只能声明一次。静态限制，防止使用之前已经被声明。
```
function f() {
  {
    let x;
    {
      // 正常，块作用域里的名称
      const x = "sneaky";
      // 错误，x是常量
      x = "foo";
    }
    // 错误，在块里面已经被声明
    let x = "inner";
  }
}
```
更多信息: [let statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), 
[const statment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

### Iterators + for..of 迭代器/for..of
迭代对象能够自定义迭代，像CLR的IEnumerable或Java的Iterable。总结来说，`for..of`是`for..in`的基础上自定义的迭代。不需要实现数组，启用了像LINQ惰性设计模式。
```
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // 缩减数列到1000
  if (n > 1000)
    break;
  console.log(n);
}
```
迭代是基于鸭子类型接口(仅使用TypeScript语法作为展示)
```
interface IteratorResult {
  done: boolean;
  value: any;
}
interface Iterator {
  next(): IteratorResult;
}
interface Iterable {
  [Symbol.iterator](): Iterator
}
```
更多信息: [MDN for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

### Generators 生成器
生成器是一个使用了`function*`和`yield`简易化迭代器生成的。一个函数作为`function*`声明时会返回一个生成器实例。生成器是迭代器的一个子类并且包含了额外的`next`和`throw`。这使得值能够流回生成器，所以`yield`是一个返回值(或者抛出)的表达式。

注意：也可以用于启用'await'式的异步编程，请参考ES7 `await` 提案。
```
var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}

for (var n of fibonacci) {
  // 缩减数列到1000
  if (n > 1000)
    break;
  console.log(n);
}
```
生成器的接口是(仅使用TypeScript语法作为展示):
```
interface Generator extends Iterator {
    next(value?: any): IteratorResult;
    throw(exception: any);
}
```
更多信息: [MDN iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

### Unicode 统一码
非破坏性地增加支持统一码，包括了新的字符字面量统一码以及新的正则表达式`u`处理位码，以及新的API也可以在21位位码处理字符串。这些增加的功能支持在在JavaScript里面建立全局应用。
```
// 等同于ES5.1
"𠮷".length == 2

// 新的正则表达式, 内置‘u’
"𠮷".match(/./u)[0].length == 2

// 新形式
"\u{20BB7}"=="𠮷"=="\uD842\uDFB7"

// 新的字符串操作
"𠮷".codePointAt(0) == 0x20BB7

// for-of迭代位码
for(var c of "𠮷") {
  console.log(c);
}
```
更多信息: [MDN RegExp.prototype.unicode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode)

### Modules 模块
语言级别地支持模块化的组件定义。借鉴于流行的JavaScript模块加载器(AMD, CommonJS)。运行期间的行为定义由主机默认加载器定义。隐式异步模型——在被请求的模块加载处理且可用之前，不会执行代码。
```
// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;
```
```
// app.js
import * as math from "lib/math";
alert("2π = " + math.sum(math.pi, math.pi));
```
```
// otherApp.js
import {sum, pi} from "lib/math";
alert("2π = " + sum(pi, pi));
```
一些额外的新增功能，包括`export default`以及`export *`
```
// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
    return Math.log(x);
}
```
```
// app.js
import ln, {pi, e} from "lib/mathplusplus";
alert("2π = " + ln(e)*pi*2);
```
更多信息: [import statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), [export statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

### Module loaders 模块加载器
模块加载器支持：
  - 动态加载
  - 状态隔离
  - 全局命名空间隔离
  - 编译钩子
  - 内嵌虚拟化

默认的加载器能够被配置，同时在隔离或者上下文可以构造新加载器执行和加载代码。
```
// 动态加载 – ‘System’ 是默认的加载器
System.import('lib/math').then(function(m) {
  alert("2π = " + m.sum(m.pi, m.pi));
});

// 创建一个执行沙盒 - 新的加载器
var loader = new Loader({
  global: fixup(window) // replace ‘console.log’
});
loader.eval("console.log('hello world!');");

// 直接操作模块缓存
System.get('jquery');
System.set('jquery', Module({$: $})); // 警告: 尚未最终确定
```

### Map + Set + Weakmap + Weakset
常见算法中的高效数据结构。WeakMap提供了无泄漏的对象键值的侧表。
```
// Sets
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;
```
```
// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;
```
```
// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined
```
```
// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
// 因为增加的对象没有其他的参值，所以在set不会被持有
```
更多信息：[Map][mapUrl], [Set][setUrl], [WeakMap][weakmapUrl], [WeakSet][weaksetUrl]

[mapUrl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[setUrl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[weakmapUrl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[weaksetUrl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet

### Proxies 代理
代理允许创建具有目标对象范围内所有行为的对象。可用于拦截，对象虚拟化，日志记录/分析等。
```
// 代理一个普通的对象
var target = {};
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
p.world === 'Hello, world!';
```
```
// 代理一个函数对象
var target = function () { return 'I am the target'; };
var handler = {
  apply: function (receiver, ...args) {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);
p() === 'I am the proxy';
```
这里是所有在运行级别的元操作的`trap`(`trap`: 提供属性访问的方法)
```
var handler =
{
  get:...,
  set:...,
  has:...,
  deleteProperty:...,
  apply:...,
  construct:...,
  getOwnPropertyDescriptor:...,
  defineProperty:...,
  getPrototypeOf:...,
  setPrototypeOf:...,
  enumerate:...,
  ownKeys:...,
  preventExtensions:...,
  isExtensible:...
}
```
更多信息: [MDN Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

### Symbols 符号
符号能够访问控制对象的状态，符号允许对象属性的键值是`string`或者`symbol`。符号是一个新的原始类型，可选的参数`description`可以用于调试--但这不是符号本身的一部分。符号是唯一的(像gensym)，但不是私有的，因为它们能够通过`Object.getOwnPropertySymbols`反射特性公开的
```
var MyClass = (function() {

  // 模块作用域符号
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

  return MyClass;
})();

var c = new MyClass("hello")
c["key"] === undefined
```
更多信息: [MDN Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

### Subclassable built-ins 内置子类
在ES6里面，内置的`Array`，`Date`和DOM`Element`对象能够创建子类。  
对于命名为`Ctor`函数的对象构造，现使用两个阶段（都是虚拟派遣）:
- 调用`Ctor[@@create]`去申请对象，安装任意特殊行为
- 在新实例中调用构造器进行初始化  
已知`@@create`符号可通过`Symbol.create`得到。内置对象现在明确地暴露它们的`@@create`  

```
// 数组的伪代码
class Array {
    constructor(...args) { /* ... */ }
    static [Symbol.create]() {
        // 设置指定的 [[DefineOwnProperty]] 来更新'length'
    }
}

// 数组子类的用户代码
class MyArray extends Array {
    constructor(...args) { super(...args); }
}

// Two-phase 'new':
// 1) 调用 @@create 申请对象
// 2) 在新实例上调用构造函数
var arr = new MyArray();
arr[1] = 12;
arr.length == 2
```

### Promises
Promise是一个异步编程的库，Promise是将来可能提供的值的最先表示。Promise现已经在许多库使用中。
```
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

var p = timeout(1000).then(() => {
    return timeout(2000);
}).then(() => {
    throw new Error("hmm");
}).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
})
```
更多信息：[MDN Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### Math + Number + String + Array + Object APIs
许多新的库被增加，包括核心的数学库，数组转换，字符串和用来拷贝的`Object.assign`方法
```
Number.EPSILON
Number.isInteger(Infinity) // false
Number.isNaN("NaN") // false

Math.acosh(3) // 1.762747174039086
Math.hypot(3, 4) // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2

"abcde".includes("cd") // true
"abc".repeat(3) // "abcabcabc"

Array.from(document.querySelectorAll('*')) // 返回一个数组
Array.of(1, 2, 3) // 类似new Array(...), 但不用指明第一个参数
[0, 0, 0].fill(7, 1) // [0,7,7]
[1, 2, 3].find(x => x == 3) // 3
[1, 2, 3].findIndex(x => x == 2) // 1
[1, 2, 3, 4, 5].copyWithin(3, 0) // [1, 2, 3, 1, 2]
["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
["a", "b", "c"].keys() // iterator 0, 1, 2
["a", "b", "c"].values() // iterator "a", "b", "c"

Object.assign(Point, { origin: new Point(0,0) })
```
更多信息: [Number][number], [Math][math], [Array.from][arrayf], [Array.of][arrayo], [Array.prototype.copyWithin][arraypc], [Object.assign](object)

[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[math]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
[arrayf]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
[arrayo]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
[arraypc]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/CopyWithin
[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

### Binary and octal literals 二进制和八进制字面量
两个新的数字字面量被增加的，二进制(b)和八进制(o)
```
0b111110111 === 503 // true
0o767 === 503 // true
```

### Reflect Api
完整反射API暴露对象在运行级别上的元操作。这实际上是代理API反转，并且允许进行与代理trap相同的元操作调用。特别适合用于实现代理。
```
// 没有例子
```
更多信息: [MDN Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

### Tail calls 尾调用
保证在尾部位置的调用不会无限制地增加堆栈。当输入是无界的情况下可以确保递归算法的安全。
```
function factorial(n, acc = 1) {
    'use strict';
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// 在当今大部分堆栈会溢出,
// 在ES6里，任意输入都是安全的
factorial(100000)
```