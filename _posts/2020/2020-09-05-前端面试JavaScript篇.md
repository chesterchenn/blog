### 1. slice 和 splice 的区别
- slice 返回给定数组的浅拷贝数组，`arr.slice([begin[, end]])`  
- splice 通过删除或者替换现有的元素，也可以在指定位置新增元素更改数组的元素。`let arrDeletedItems = array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`
- slice 从数组中浅拷贝，不会更改原数组，返回浅拷贝的新数组。splice 在原数组修改，返回被删除的项。

### 2. console.log(1&&2) 和 console.log(1||0)
只要“&&”前面是 false，返回“&&”前面的值，否则将返“&&”后面的值  
只要“||”前面为 false，返回“||”后面的值，否则返回“||”前面的值  

### 3. 判断下面的 a 的值，并说明
```
var a = 4;
console.log(a);
function b() {
  console.log(a);
  a = 3;
  console.log(a);   
  function a(){}; 
}
b();
```  
// 4，全局变量 a 的值是4  
// function a()，函数 a 的变量提升  
// 3，全局变量覆盖了函数 a，并修改了全局变量 a  

### ==的隐式转换的规则
```
'' == false // true
'' == 0  // true
'' == [] // true
'' == {} // false
```
如果一个运算数是 Boolean 值，在检查相等性之前，把它转换成数字值。false 转换成 0，true 为 1。  
如果一个运算数是字符串，另一个是数字，在检查相等性之前，要尝试把字符串转换成数字。  
如果一个运算数是对象，另一个是字符串，在检查相等性之前，要尝试把对象转换成字符串。  
如果一个运算数是对象，另一个是数字，在检查相等性之前，要尝试把对象转换成数字。  