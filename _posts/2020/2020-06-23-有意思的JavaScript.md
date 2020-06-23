1. [逗号表达式](#1逗号表达式)
2. [形参的长度](#2形参的长度)

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

## 答案
### 1.答：逗号表达式
count = 10，逗号表达式只有最后一项是有效的

### 2.答：形参的长度
```
(() => {}).length  // 0
func.length;       // 2
```
`length` 会返回函数的形参 `arguments` 变量的的长度，同时 `arguments` 还有 `index` 属性