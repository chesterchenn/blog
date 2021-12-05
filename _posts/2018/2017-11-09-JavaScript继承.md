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
Foo.prototype.dosomething = function() {
  // ...
}
```

```plain
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

## 继承方式

JavaScript 主要有如下几种继承方式：

- 原型链
- 借用构造函数
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

### 原型链

使用原型链作为实现继承的基本思想就是利用原型让一个引用类型继承另一个引用类型的属性和方法。实现原型链继承的办法，就是让一个对象的原型对象指向另一个对象的实例，实现的本质就是重写原型对象，代之一个实例。

```js
function Person() {
  this.name = 'human';
}

function Student() {}

Student.prototype = new Person();

var instance = new Student();
console.log(instance.name);
```

注意要点：

- 谨慎定义方法，重写原型链上的方法会屏蔽原来的方法
- 不能使用对象字面量创建原型方法，这样会重写原型链，即之前重写原型链会失效

问题：

- 包含引用类型值的原型属性会被所有实例共享。即你修改了该属性，所有实例的属性也会改变
- 在创建子类型的实例时，不能向超类型的构造函数中传递参数

### 借用构造函数

也叫伪造对象或经典继承
基本思想是在子类型构造函数的内部调用超类型构造函数
通过使用 apply()和 call()方法可以在新创建的对象上执行构造函数

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

优势：

- 传递参数
  相对原型链，借用构造函数可以在子类型构造函数中向超类型构造函数传递参数

问题：

- 方法在构造函数中定义，函数的复用无法实现

### 组合继承（最常用）

也叫伪经典继承，就是将原型链和借用构造函数组合一起
基本思想是使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承
通过在原型上定义方法实现了函数复用，又保证每个实例都有自己的属性

### 原型式继承

### 寄生式继承

### 寄生组合式继承（最理想）

## 参考资料

- 《JavaScript 高级程序设计》
- [MDN: Object prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
