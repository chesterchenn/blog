---
layout: post
title: JavaScript的继承
tags: javascript
---
JavaScriopt 的相关继承方式。

## 继承方式
JavaScript主要有如下几种继承方式：
- 原型链
- 借用构造函数
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

## 原型链
### 原型 prototype
我们创建的每个函数都有一个 prototype （原型）属性，这个属性是一个指针，指向一个对象，该对象包含了所有实例共享的属性和方法。  

使用原型链作为实现继承的基本思想就是利用原型让一个引用类型继承另一个引用类型的属性和方法。实现原型链继承的办法，就是让一个对象的原型对象指向另一个对象的实例，实现的本质就是重写原型对象，代之一个实例。

```
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


## 借用构造函数
也叫伪造对象或经典继承
基本思想是在子类型构造函数的内部调用超类型构造函数
通过使用apply()和call()方法可以在新创建的对象上执行构造函数

```
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


## 组合继承（最常用）
也叫伪经典继承，就是将原型链和借用构造函数组合一起
基本思想是使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承
通过在原型上定义方法实现了函数复用，又保证每个实例都有自己的属性

## 原型式继承
## 寄生式继承
## 寄生组合式继承（最理想）

## 参考资料
- 《JavaScript高级程序设计》
