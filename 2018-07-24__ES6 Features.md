# ECMAScript 6
Created: 2018-07-24  
Last Modified: 2018-07-26

By lukehoban ( [lukehoban](https://github.com/lukehoban) )  
原文地址：[lukehoban/es6features](https://github.com/lukehoban/es6features)  
首次翻译文章，不足或者错误的地方，欢迎指出

## 引言
ECMAScript 6，也称为ECMAScript 2015，是ECMAScript最新版本(注: 已经不是最新版本)。ES6对于这门语言来说是一个很重要的更新，而且这是2009年后的ES5标准之后的第一次更新。现在主流的JavaScript引擎都已经实现这些功能——[查看详情](http://kangax.github.io/compat-table/es6/)。  

这里你可以查看[ES6 规范](http://www.ecma-international.org/ecma-262/6.0/)的全部标准。  

ES6包含以下新功能：  
  - [arrows 箭头函数](#arrows-箭头函数)
  - [classes 类](#classes-类)
  - [enhanced object literals 增强对象字面量](#enhanced-object-literals-增强对象字面量)
  - [template strings 字符串模版](#template-strings-字符串模版)
  - [destructuring 解构](#destructuring-解构)
  - [default + rest + spread 默认值/rest参数/扩展运算符](#default--rest--spread-默认值/rest参数/扩展运算符)
  - [let + const](#let--const)
  - [iterators + for..of 迭代器/for..of](#iterators--for..of-迭代器/for..of)
  - [generators 生成器](#generators-生成器)
  - [Unicode 统一码](#Unicode-统一码)
  - [modules 模块](#modules-模块)
  - [module loaders 模块加载器](#module-loaders-模块加载器)
  - [map + set + weakmap + weakset](#map--set--weakmap--weakset)
  - [proxies 代理](#proxies-代理)
  - [symbols](#symbols)
  - [subclassable built-ins 内建子类](#subclassable-built-ins-内建子类)
  - [promises](#promises)
  - [math + number + string + array + object APIs](#math--number--string--array--object-APIs)
  - [binary and octal literals 二进制和八进制字面量](#binary-and-octal-literals-二进制和八进制字面量)
  - [Reflect api](#Reflect-api)
  - [tail calls 尾调用](#tail-calls-尾调用)

## ECMAScript 6 功能

### Arrows 箭头函数
箭头函数的简写符号是 `=>`。它的语法类似于C#，Java 8以及CoffeeScript，对于语句式体和表达式体(通过表达语句直接返回值)都有很好的支持。不同于普通函数，箭头函数不绑定 `this`, 从自己作用域上一层继承 `this`
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
    )
  }
}
```
更多信息: [MDN Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### Classes 类
ES6的类是一个基于原型继承的简单语法糖，这为了有一个更方便的类声明去使用以及鼓励协同工作。类支持基于原型继承，`super`调用，实例化，静态方法以及 `constructor`构造
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

### Enhanced object literals 增强对象字面量
对象字面量被扩展，支持在构造时设置原型，简写 `foo: foo` 的赋值，定义方法，`super`调用以及通过表达式计算属性名。同时，也使对象字面值和类声明更加紧密地联系起来，让基于对象的设计从这些便利中更加受益。
```
var obj = {
    // 设置原型
    __proto__: theProtoObj,
    // 简写赋值：‘handler: handler’
    handler,
    // 定义方法
    toString() {
     // Super调用
     return "d " + super.toString();
    },
    // 动态计算属性名称
    [ 'prop_' + (() => 42)() ]: 42
};
```
更多信息: [MDN Grammar and types: Enhanced Object literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Enhanced_Object_literals)

### Template strings 字符串模版
字符串模版为构建字符串提供语法糖，这有点像Perl, Python等等的插值功能。可选择地，使用一个带标签的字符串模版可以被解析，避免注入攻击或者使用字符串构建更加高层次的数据结构
```
// 创建基本字符串面量
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

// 字符串插值
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// Construct an HTTP request prefix is used to interpret the replacements and construction
POST`http://foo.org/bar?a=${a}&b=${b}
     Content-Type: application/json
     X-Credentials: ${credentials}
     { "foo": ${foo},
       "bar": ${bar}}`(myOnReadyStateChangeHandler);
```
更多信息: [MDN Template Strings](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)

### Destructuring 解构
解构允许使用模式匹配，支持匹配数组和对象。解构未正确赋值时仍可运行。类似于标准对象的查找 `foo["bar"]`，当未找到时会提供一个 `undefined`
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

// 解构未正确赋值时
var [a] = [];
a === undefined;

// 带默认值的的解构赋值
var [a = 1] = [];
a === 1;
```
更多信息：[MDN Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### Default + rest + spread 默认值/rest参数/扩展运算符
调用计算默认参数值，将数组转换为函数调用中的连续参数，跟踪参数到一个数组里。rest取代了对`arguments`的需求，并更直接地解决了常见情况。
```
function f(x, y=12) {
  // 如果y没有传值或者被传入undefined，那么y的值是12
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

### Let + const
块作用域被创建。`let`是一个新的`var`,`const`只能赋值一次，在指定之前被静态约束以防止被使用
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
迭代器对象能够自定义迭代像CLR的IEnumerable或Java的Iterable。总结来说，`for..on`是在`for..in`上去定义了可迭代的数据。不需要实现数组，像LINQ启用了惰性设计模式
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
生成器是一个使用了`function*`和`yield`简单的迭代器编写。一个函数声明作为function * 返回一个生成器实例。生成器是迭代器的一个子类型包含了额外的`next`和`throw`。这些启用值会流回生成器，所以`yield`是来自于返回值(或者throw)的一个表达式  
注意：同时也能够用来启用'await'-异步的语法，请参考ES7 `await` 提议
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
不间断的字符被增加支持统一码，包括了新的统一码字符字面量以及正则表达式`u`，此外新的API也可以处理21位码的字符串。这些增加的东西可以建立全局app在JavaScript里面
```
// 等同于ES5.1
"𠮷".length == 2

// 新的正则表达式, opt-in ‘u’
"𠮷".match(/./u)[0].length == 2

// new form
"\u{20BB7}"=="𠮷"=="\uD842\uDFB7"

// new String ops
"𠮷".codePointAt(0) == 0x20BB7

// for-of iterates code points
for(var c of "𠮷") {
  console.log(c);
}
```
更多信息: [MDN RegExp.prototype.unicode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode)

### Modules 模块
语言级支持模块的组件定义。从流行的JavaScript模块加载器(AMD, CommonJS)编纂模式。运行时的定义是由主机加载器定义的。隐式异步模型——在被请求的模块可用并处理之前，不会执行任何代码
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
有一些额外的功能，包括`export default`以及`export *`
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
  - 编译挂钩
  - 嵌套虚拟化

默认的加载器能够被配置，同时新的加载器可以用来构建，载入隔离的代码或者约束上下文
```
// 动态加载 – ‘System’ 是默认的加载器
System.import('lib/math').then(function(m) {
  alert("2π = " + m.sum(m.pi, m.pi));
});s

// 创建一个执行沙盒 - 新的加载器
var loader = new Loader({
  global: fixup(window) // replace ‘console.log’
});
loader.eval("console.log('hello world!');");

// 直接操作模块缓存
System.get('jquery');
System.set('jquery', Module({$: $})); // 警告: 尚未定稿
```

### Map + set + weakmap + weakset
常见的算法的有效的数据结构。WeakMap提供了不会内存泄漏的对象键值的侧表。
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

### Symbols

### Subclassable built-ins 内建子类

### Promises

### Math + number + string + array + object APIs

### Binary and octal literals 二进制和八进制字面量

### Reflect api

### Tail calls 尾调用