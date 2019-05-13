# JavaScript内置方法
Created: 2019-05-10  
Last Modified: 2019-05-13  

## 数组Array
判断下面数组的输出，并判断是否更改原数组。
```
var array1 = ['a', 'b', 'c'];
console.log(array1.concat(['d', 'e', 'f']));
console.log(array1.concat(1, [2, 3]));
```
```
var array1 = ['a', 'b', 'c', 'd', 'e'];
console.log(array1.copyWithin(0, 3, 4));
console.log(array1.copyWithin(1, 3));
```
```
var array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4));
console.log(array1.fill(5, 1));
console.log(array1.fill(6));
console.log([1, 2, 3].fill(4, NaN, NaN));
```
```
var array1 = [1, 12, 8, 130, 44];
function isLargeNumber(element) {
  return element > 10;
}
console.log(array1.find(isLargeNumber));
console.log(array1.findIndex(isLargeNumber));
```
```
console.log([1, 2, [3, 4]].flat());
console.log([1, 2, [3, 4, [5, 6]]].flat());
console.log([1, 2, [3, 4, [5, 6]]].flat(2));
```
```
var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.indexOf('bison'));
console.log(beasts.indexOf('bison', 2));
console.log(beasts.indexOf('giraffe'));
console.log(beasts.lastIndexOf('duck'));
console.log(beasts.lastIndexOf('bison', 2));
```
```
var elements = ['Fire', 'Air', 'Water'];
console.log(elements.join());dd
console.log(elements.join(''));
console.log(elements.join('-'));
console.log([1, null, undefined, 2, 3].join());
```
```
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log(array1.reduce(reducer));
console.log(array1.reduce(reducer, 5));
```
```
var array1 = ['one', 'two', 'three'];
var reversed = array1.reverse(); 
console.log(array1, reversed);
```
```
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));
console.log(animals.slice(2, 4));
console.log(animals.slice(1, 10));
```
```
var months = ['Jan', 'March', 'April', 'July'];
console.log(months.splice(1, 0, 'Feb'));
console.log(months);
console.log(months.splice(4, 1, 'May', 'June'));
console.log(months);
console.log(months.splice(3));
console.log(months);
```

#### 参考链接
[MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
