---
title: Javascript简单编程
date: 2017-10-23 22:39:08
tags:
---

用来收集一些有趣的简单编程,JS实现

### 冒泡排序
```js
function bubbleSort(arr) {
  for (let count = 0; count < arr.length - 1; count++) {
    for(let pos = 0; pos < arr.length - count; pos++) {
      if(arr[pos] > arr[pos+1]) {
        let temp = arr[pos]
        arr[pos] = arr[pos+1]
        arr[pos+1] = temp
      }
    }
  }
}
```

### 检测回文
```js
function check(string) {
  string = string.toString()
  if (typeof string !== 'string') {
    return false
  }
  string = string.toLowerCase()
  let string_reverse = string.split("").reverse().join("")
  if (string === string_reverse) {
    return true
  } else {
    return false      
  }
}
```

### 消除数组内重复的元素
```js
function deRepeat(arr) {
  let newArr = [], flag = true
  arr.map(function (element) {
    if (newArr.indexOf(element) === -1) {
      if (element != element) {           /* flag判断NaN的标志 */
        if (flag) {
          newArr.push(element)
          flag = false
        }
      } else {
        newArr.push(element)
      }
    }
  })
  return newArr
}
```

