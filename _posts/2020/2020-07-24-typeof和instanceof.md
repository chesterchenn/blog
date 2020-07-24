检测基本类型的值使用 typeof 操作符会比较合适，检测引用类型的值 instanceof 操作符会比较好用。

## typeof
语法：`typeof operand` 或者 `typeof(operand)` 

typeof返回的结果可以有如下字符串：
- "undefined"
- "boolean"
- "string"
- "number"
- "object"
- "function"
- "symbol"

注意：调用 `typeof null` 会返回 "object"，因为特殊值 null 被认为是一个空的对象引用。  

从技术角度讲，函数在 ECMAScript 中是对象，不是一种数据类型。然而，函数也确实有一些特殊的属性，因此通过 typeof 操作符来区分函数和其他对象是有必要的。

## instanceof
语法：`object instanceof constructor`

注意：所有的引用类型的值都是 Object 的实例。因此，在检测一个引用类型值和 Object 构造函数时，instanceof 操作符始终返回 true。当然，如果使用 instanceof 操作符检测基本类型的值，则该操作符始终返回 false，因为基本类型不是对象。

## 参考链接
- 《JavaScript高级程序设计（第3版）》
- [MDN: typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- [MDN: instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)