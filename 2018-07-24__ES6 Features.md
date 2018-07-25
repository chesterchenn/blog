# ECMAScript 6
Created: 2018-07-24  
Last Modified: 2018-07-25

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
  - [module loaders 模块加载](#module-loaders-模块加载)
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

### Default + rest + spread 默认值/rest参数/扩展运算符

### Let + const

### Iterators + for..of 迭代器/for..of

### Generators 生成器

### Unicode 统一码

### Modules 模块

### Module loaders 模块加载

### Map + set + weakmap + weakset

### Proxies 代理

### Symbols

### Subclassable built-ins 内建子类

### Promises

### Math + number + string + array + object APIs

### Binary and octal literals 二进制和八进制字面量

### Reflect api

### Tail calls 尾调用