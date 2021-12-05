---
layout: post
tags: javascript
title: JavaScript的原型链和继承
---

JavaScript 的原型链和相关继承方式。

## 原型 prototype

我们创建的每个函数都有一个 prototype （原型）属性，这个属性是一个指针，指向一个对象，该对象包含了所有实例共享的属性和方法。

我们需要明白对象原型（Object.getPrototypeOf(obj)，或者通过已弃用的 `__proto__` 属性）和构造函数的 prototype 属性之间有区别。

### constructor

constructor 属性始终指向创建当前对象的构建函数。在默认情况下，所有原型对象都会自动获得一个 constructor 属性，这个属性包含一个指向 prototype 属性所在函数的指针。

```js
function Foo(name) {
  this.name = name;
}

const f1 = new Foo('bar');
const f2 = Object.create(f1);

console.log(Object.getPrototypeOf(f1));
// { constructor: function Foo(name) }

console.log(Object.getPrototypeOf(f2));
// { name: 'bar' }

console.log(f1.constructor, f2.constructor);
// function Foo(name), function Foo(name)
```

可以看出 f2.prototype 原型指向 f1，f2 的 constructor 指向的是构造函数。将构建函数的 prototype 进行扩展

```js
Foo.prototype.age = 11;
Foo.prototype.dosomething = function () {
  // ...
};
```

```plain
Foo: 构造函数
Foo Prototype: 原型对象
f1, f2: 实例对象
                ┌───────────────────────────────────────────────┐
                ▼                                               │
     ┌──────────────────────┐       ┌─────────────────────────┐ │
     │         Foo          │   ┌──►│       Foo Prototype     │ │
     ├──────────┬───────────┤   │   ├────────────┬────────────┤ │
     │prototype │           ├───┤   │constructor │            ├─┘
     ├──────────┼───────────┤   │   ├────────────┼────────────┤
     │name      │(undefined)│   │   │age         │11          │
     └──────────┴───────────┘   │   ├────────────┼────────────┤
                                │   │dosomething │(function)  │
  ┌─────────────────────────┐   │   └────────────┴────────────┘
┌►│            f1           │   │
│ ├─────────────────────────┤   │
│ │Object.getPrototypeOf(f1)├───┘
│ ├─────────────┬───────────┤
│ │name         │'bar'      │
│ └─────────────┴───────────┘
│
│ ┌─────────────────────────┐
│ │            f2           │
│ ├─────────────────────────┤
└─┤Object.getPrototypeOf(f2)│
  └─────────────────────────┘
```

我们可以发现实例对象 f1, f2 和构造函数没有直接关系。

## 继承方式

JavaScript 主要有如下几种继承方式：

- 原型链
- 借用构造函数
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

### 原型链

实现原型链继承，就是让一个对象的原型对象指向另一个对象的实例，实现的本质就是重写原型对象。

```js
function Person() {
  this.name = 'human';
}

function Student() {}

// 重写 Student 的原型，继承 Person 实例
Student.prototype = new Person();

var instance = new Student();
console.log(instance.name);
```

重写原型对象的时候，默认自带的 constructor 会被覆盖，这个实例的 constructor 会指向构造函数 Person。

注意要点：

- 重写原型链上的方法会屏蔽原来的方法
- 不能使用对象字面量创建原型方法

问题：

- 包含引用类型值的原型属性会被所有实例共享。修改了该属性，所有实例的属性也会改变
- 在创建子类型的实例时，不能向超类型的构造函数中传递参数

### 借用构造函数

借用构造函数方法，也叫伪造对象或经典继承，基本思想是在子类型构造函数的内部调用超类型构造函数。

通过使用 apply 和 call 方法可以在新创建的对象上执行构造函数

```js
function Person() {
  this.name = 'human';
}

function Student() {
  Person.call(this);
}

var instance = new Student();
console.log(instance.name);
```

#### 传递参数

```js
function Sup(name) {
  this.name = name;
}
function Sub() {
  Sup.call(this, 'foo');
  this.age = 18;
}
var instance = new Sub();
console.log(instance.name); // foo
```

方法在构造函数中定义，函数的复用无法实现。

### 组合继承（最常用）

也叫伪经典继承，就是将原型链和借用构造函数组合一起。

其实通过上面的两个继承方式，我们发现有意思的地方。原型链能够很好地复用方法，但是会无法传递参数，而借用构造函数可以传递参数，却无法复用方法。所以我们将他们组合到一起。

基本思想是，通过借用构造函数来实现对实例属性的继承，通过在原型链上定义方法实现了函数复用。

```js
function Sup(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Sup.prototype.sayName = funtion() {
  console.log(this.name);
}

// 构造函数实现实例属性的继承
function Sub(name, age) {
  Sup.call(this, name);
  this.age = age;
}

// 原型链复用方法
Sub.prototype = new Sup();
Sub.prototype.constructor = Sub;

const instance1 = new Sub("foo", 18);
instance1.colors.push('black'); // ['red', 'blue', 'black']
instance1.sayName(); // 'foo'

const instance2 = new Sub('bar', 20);
console.log(instance2.colors); // ['red', 'blue']
instance2.sayName(); // 'bar'
```

让两个不同的 Sub 实例既拥有自己的属性 -- 包括 colors 属性，又可以使用相同的方法。

### 原型式继承

借助原型可以基于已有的对象创建新的对象，同时还不必因此创建自定义类型。

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

ES5 通过 [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 方法规范化了原型式继承。

注：包含引用类型值的原型属性会被所有实例共享。就像使用原型模式一样。

### 寄生式继承

寄生式继承的思路与工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的是它做了所有工作一样返回对象。

```js
function createAnother(original) {
  var clone = object(original); // 创建一个新对象，其他方式返回新对象也可
  clone.say = function() {
    // ...
  }
  return clone;
}
```

### 寄生组合式继承

```js
function inheritPrototype(sub, sup) {
  var prototype = Object(sup.prototype); // 创建对象
  prototype.constructor = sub;
  sub.prototype = prototype;
}
```

## 参考资料

- 《JavaScript 高级程序设计》
- [MDN: Object prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
