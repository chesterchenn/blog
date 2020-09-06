### 1. slice 和 splice 的区别
- slice 返回给定数组的浅拷贝数组，`arr.slice([begin[, end]])`  
- splice 通过删除或者替换现有的元素，也可以在指定位置新增元素更改数组的元素。`let arrDeletedItems = array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`
- slice 从数组中浅拷贝，不会更改原数组，返回浅拷贝的新数组。splice 在原数组修改，返回被删除的项。