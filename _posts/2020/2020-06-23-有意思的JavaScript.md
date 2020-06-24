1. [逗号表达式](#1逗号表达式)
2. [形参的长度](#2形参的长度)
3. [变量提升](#3变量提升)

## 问题
### 1.逗号表达式
```
var count = 0;
for(var i = 0; i < 5, i < 10; i++) {
  count++;
}
console.log(count);
```
[答案：逗号表达式](#1答逗号表达式)

### 2.形参的长度
```
(() => {}).length;

function func(a, b) {
  return a + b;
}
func.length;
```
[答案：形参的长度](#2答形参的长度)

### 3.变量提升
```
console.log(foo);
foo();
var foo = 'foo';
function foo() {
  console.log('hello foo');
}
console.log(foo);
foo();
```
[答案：变量提升](#3答变量提升)

## 答案
### 1.答：逗号表达式
count = 10，逗号表达式只有最后一项是有效的

### 2.答：形参的长度
```
(() => {}).length  // 0
func.length;       // 2
```
`length` 会返回函数的形参 `arguments` 变量的的长度，同时 `arguments` 还有 `index` 属性

### 3.答：变量提升
- 首先，js 有变量提升和函数提升，指的是用 var 声明变量 或用 function 函数名（）{  } 声明的，会在 js 预解析 阶段提升到顶端（es6 的 let  和 const 不会提升）
- 其次，函数提升优先级高于变量提升
- 注意，相同作用域时声明变量而不赋值则还是以前的值，而子作用域声明不赋值则函数内该值为undefined，因为声明了私有变量  
[来源链接](https://www.nowcoder.com/questionTerminal/334707e784d2480894a73c6584c68786)

```
问题中的代码等价于：
function foo() {  // 函数提升
  console.log('hello foo');  
}
var foo;  // 变量提升

console.log(foo);  // => foo函数，foo只是声明变量，没有被赋值，foo还是原来的值，参考三
foo(); // => 'hello foo'
foo = 'foo'; // 赋值不会提升,赋值后 foo就不再是函数类型了，而是字符类型
console.log(foo);  // 'foo'
foo(); // 报错，foo已经不再是一个函数了
```