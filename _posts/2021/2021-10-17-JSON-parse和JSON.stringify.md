---
layout: post
tags: javascript
title: JSON.parse和JSON.stringify
---
JSON 包含了两个静态方法，分别是 `JSON.parse` 和`JSON.stringify`。

## JSON.parse

JSON.parse 解析一个 JSON 字符串，转换成 JavaScript 值或者对象。

### 语法

```javascript
JSON.parse(text);
JSON.parse(text, reviver);
```

**text**：被解析成 JSON 的字符串。

**reviver**：可选参数，如果是函数，返回解析出来的值的转换值。

### 例子

```javascript
JSON.parse('{}'); // {}
JSON.parse('true'); // true
JSON.parse('"foo"'); // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null'); // null
```

### 使用 reviver 参数

reviver 包含的两个参数分别是属性名称，属性值。

```javascript
JSON.parse('{"p": 5, "s": "str"}', (key, value) =>
  (typeof value === 'number' ? value * 2 : value)
);
// { p: 10, s: "str" }
```

### 错误情况

以下情况会抛出错误

1. 不允许尾部逗号

    ```javascript
    JSON.parse('[1, 2, 3, 4, ]');
    JSON.parse('{"foo": 1,}');
    ```

2. 不允许单引号

    ```javascript
    JSON.parse("{'foo': 1}");
    ```

## JSON.stringify

JSON.stringify 将 JavaScript 值或者对象转换成一个 JSON 字符串。

### 语法

```javascript
JSON.stringify(value);
JSON.stringify(value, replacer);
JSON.stringify(value, replacer, space);
```

**value**：转换成 JSON 字符串的值。

**replacer**：可选参数，改变字符串格式化过程的格式，或者一个字符串或者数字的数组。

  1. 如果是一个函数，则 value 的每个属性都要经过函数的处理。
  2. 如果是一个数组，则包含在数组内的属性才会被序列化。
  3. 如果未提供或者 null，则 value 所有的属性都会被序列化。

**space**：一个字符串或数字对象，用于在输出的 JSON 字符串中插入空白。

  1. 如果是数字，代表有多少个空格，上限为10。小于1，代表没有空格。
  2. 如果是字符串，空格替换成字符串，上限为10个字母。
  3. 如果未提供或者 null，代表没有空格。

### 异常

- 当序列化循环对象值（cyclic object value）会抛出 `TypeError`。
- 当序列化 BigInt 值会抛出 `TypeError`，BinInt 值不能在 JSON 里序列化。

```javascript
var circularRefer = { data: 123 };
circularRefer.myself = circularRefer;

JSON.stringify(circularRefer);  // TypeError: cyclic object value
```

```javascript
const huge = BigInt(1234);

JSON.stringify(huge); // TypeError: BigInt value can't be serialized in JSON
```

### 描述

1. 如果序列化的值有 `toJSON()` 的方法，调用该方法进行序列化。

    如我们之前的 BigInt 是无法被序列化的，我们可以通过自己实现 toJSON 方法

    ```javascript
    BigInt.prototype.toJSON = function() { return this.toString() }
    JSON.stringify(BigInt(1)); // '"1"'
    ```

2. `Number`，`Boolean` 和 `String` 对象会被转换成对应的原始值。

   ```javascript
   JSON.stringify([new Number(3), new String('false'), new Boolean(false)]);
   // '[3, "false", false]'
   ```

3. `undefined`、`Function` 和 `Symbol` 不是有效的 JSON 值，在数组内被转换成 null，在对象内被忽略。当传入“纯”值时，返回 undefined。

   ```javascript
   JSON.stringify([undefined, function() {}, Symbol('')]);
   // "[null,null,null]"

   JSON.stringify({u: undefined, f: function() {}, s: Symbol('')});
   // "{}"

   JSON.stringify(function() {});
   // undefined 注：这里不是序列化的 "undefined" 字符串

   JSON.stringify(undefined, Symbol(''));
   // undefined 注：这里不是序列化的 "undefined" 字符串
   ```

4. 所有用 Symbol 作为键值都会被忽略，即使在 replacer 函数内。

   ```javascript
   JSON.stringify({ [Symbol('foo')]: 'foo'  }); // '{}'
   ```

5. Date 类型通过实现 toJSON 函数返回一个字符串（该方法等同于 date.toISOString()）。

   ```javascript
   JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)); // '"2006-01-02T15:04:05.000Z"'

   new Date(2006, 0, 2, 15, 4, 5).toISOString(); // "2006-01-02T15:04:05.000Z"
   ```

6. 数字 `Infinity` 和 `NaN`，以及 `null` 值都被当成 null。

   ```javascript
   JSON.stringify([NaN, null, Infinity]); // '[null,null,null]'
   ```

7. 所有其他对象实例（包括 Map、Set、WeakMap 和 WeakSet）都只序列化它们的可枚举属性。

   ```javascript
   JSON.stringify([new Set([1]), new Map([[1, 2]])]);
   // '[{},{}]'

   JSON.stringify([new WeakSet([{a: 1}]), new WeakMap([[{a: 1}, 2]])]);
   // '[{},{}]'

   var o = Object.create(null, { x: { value: 'x', enumerable: false }, y: { value: 'y', enumerable: true }});
   JSON.stringify(o);
   // '{"y":"y"}'
   ```

## 参考连接

- [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
