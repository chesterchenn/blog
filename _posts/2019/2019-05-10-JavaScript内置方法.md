数组 Array 和 字符串 String 的内置方法。

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

## 字符串String
```
var sentence = 'The quick brown fox jumps over the lazy dog.';
var index = 4;
console.log(sentence.charAt(index));
console.log(sentence.charCodeAt(index)); // 113
```
```
var str1 = 'Hello';
var str2 = 'World';
console.log(str1.concat(str2));
console.log(str2.concat(', ', str1, '!'));

var greetList = ['Hello', ' ', 'Venkat', '!'];
console.log("".concat(...greetList));
console.log("".concat({}));
console.log("".concat([])); 
console.log("".concat(null)); 
console.log("".concat(true)); 
console.log("".concat(4, 5));
```
```
var str = 'To be, or not to be, that is the question.';
console.log(str.endsWith('question.'));
console.log(str.endsWith('to be'));     
console.log(str.endsWith('to be', 19));
```
```
const str = 'To be, or not to be, that is the question.';
console.log(str.includes('To be'));
console.log(str.includes('question'));
console.log(str.includes('nonexistent
console.log(str.includes('To be', 1));
console.log(str.includes('TO BE'));
```
```
console.log('Blue Whale'.indexOf('Blue'));     
console.log('Blue Whale'.indexOf('Blute'));    
console.log('Blue Whale'.indexOf('Whale', 0)); 
console.log('Blue Whale'.indexOf('Whale', 5)); 
console.log('Blue Whale'.indexOf('Whale', 7)); 
console.log('Blue Whale'.indexOf(''));         
console.log('Blue Whale'.indexOf('', 9));      
console.log('Blue Whale'.indexOf('', 10));
console.log('Blue Whale'.indexOf('', 11));
```
```
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);
console.log(matches_array);
```
```
let regexp = /t(e)(st(\d?))/g;
let str = 'test1test2';
let array = [...str.matchAll(regexp)];
console.log(array[0]);
console.log(array[1]);
```
```
console.log('Breaded Mushrooms'.padEnd(25, '.'));
console.log('200'.padEnd(5));
console.log('abc'.padEnd(6, "123456"));
console.log('5'.padStart(2, '0'));
const fullNumber = '2034399002125581';
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, '*');
console.log(maskedNumber);
```
```
console.log('abc'.repeat(-1));
console.log('abc'.repeat(0));
console.log('abc'.repeat(1));    
console.log('abc'.repeat(2));    
console.log('abc'.repeat(3.5));
console.log('abc'.repeat(1/0));
```
```
var p = 'This is a lazy dog. That is another dog?';
var regex = /dog/gi;
console.log(p.replace(regex, 'ferret'));
console.log(p.replace('dog', 'monkey'));
```
```
var paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';
var regex = /[^\w\s]/g;
console.log(paragraph.search(regex));
console.log(paragraph[paragraph.search(regex)]);
```
```
var str = 'The quick brown fox jumps over the lazy dog.';
console.log(str.slice(31));
console.log(str.slice(4, 19));
console.log(str.slice(-4));
console.log(str.slice(-9, -5));
```
```
var str = 'The quick brown fox jumps over the lazy dog.';
var words = str.split(' ');
console.log(words[3]);
var chars = str.split('');
console.log(chars[8]);
console.log(str.split());
```
```
var str = 'To be, or not to be, that is the question.';
console.log(str.startsWith('To be'));
console.log(str.startsWith('not to be'));
console.log(str.startsWith('not to be', 10));
```
```
var str = 'Mozilla';
console.log(str.substring(1, 3));
console.log(str.substring(2));
console.log(text.substring(5, 2));
console.log(text.slice(5, 2));
console.log(text.substring(-5, 2));
console.log(text.substring(-5, -2));
console.log(text.slice(-5, 2));
console.log(text.slice(-5, -2));
```
#### 参考链接
- [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
