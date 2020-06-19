## __proto__
只有对象才有私有属性__proto__，也就是说只有对象才能继承。__proto__属性指向它的构造函数的原型（prototype），所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。  
```
console.log(0, 'str', true, null, undefined); => 没有__proto__属性 
```

## 参考链接
- [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)