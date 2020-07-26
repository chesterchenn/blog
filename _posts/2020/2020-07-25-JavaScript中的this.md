## 误解
### 1. 指向函数自身
人们容易把 this 理解成指向函数自身。
```
function foo(num) {
  this.count++;
}
foo.count = 0;
for (var i = 0; i< 5; i++) {
  foo(i);
}
console.log(foo.count); // => 0
```
执行 foo.count = 0 时，函数对象 foo 添加了一个属性 count。但是函数内部代码 this.count 中的 this 并不是指向那个函数对象，虽然属性名相同，根对象并不相同，代码中无意中创建了一个全局变量 count，他的值为 NaN。  
可以使用 call(..) 确保 this 指向函数对象 foo 本身，`foo.call(foo, i);`

### 2. 函数的作用域
this 在任何情况下都布置想函数的词法作用域。
```
function foo() {
  var a = 2;
  this.bar();
}
function bar() {
  console.log(this.a);
}
foo(); // ReferenceError: a is not defined
```
代码试图通过 this.bar() 来引用 bar() 函数，这样调用成功纯属意外，调用 bar() 最自然的办法是省略前面的 this，直接使用词法引用标识符。这段代码还试图使用 this 联通 foo() 和 bar() 的词法作用域，从而让 bar() 可以访问 foo() 作用域里的变量 a，这是不可能的。

## 绑定规则
### 1. 默认绑定
在独立函数调用的时候，就会使用默认绑定，this 会指向全局对象。  

如果使用严格模式，则不能讲全局对象用于默认绑定，因此 this 会绑定到 undefined
```
function foo() {
  console.log(this.a);
}
var a = 2;
foo(); // 2
```

### 2. 隐式绑定
判断调用位置是否有上下文对象
```
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo
};
obj.foo(); // 2
```
我们必须在一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把this间接（隐式）绑定到这个对象上。

### 3. 显式绑定
显示绑定主要是用到了 call(..) 和 apply(..) 方法。  

## 参考链接
- 《你不知道的JavaScript（上卷）》