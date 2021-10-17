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

**space**：一个字符串或数字对象，用于在输出的 JSON 字符串中插入空白。

## 参考连接

- [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
