---
layout: post
tags: 2021 nodejs
title: resolve与join的区别
---

在 nodejs 里面，resolve 与 join 都是常用的路径方法。

## path.join([...paths])

`path.join()` 将所有给定的路径段连接在一起，然后对结果路径进行规范化。

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/bza/asdf'

path.join('foo/bar', 'baz');
// Returns: 'foo/bar/baz'
```

## path.resolve([...paths])

`path.resolve()` 将一系列路径或路径段解析为绝对路径。

假设当前目录：/home/myself/node

```js
path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file');
// Returns: 'tmp/file'

path.resolve('wwwroot', 'static_file/png', '../gif/image.gif');
// Returns: '/home/myself/node/wwwroot/static_file/gif/image.gif'

path.resolve();
// Returns: '/home/myself/node'

path.resolve(__dirname);
// Returns: '/home/myself/node'
```

## \_\_dirname 和 \_\_filename

\_\_dirname 当前模块的目录名，与 `path.dirname(__filename)` 相同。

```js
console.log(__dirname);
// /Users/mjr
console.log(path.dirname(__filename));
// /Users/mjr
```

\_\_filename 当前模块的文件名，当前模块的文件的绝对路径。

对于主程序而言，这不一定与命令中使用的文件名相同。

```js
console.log(__filename);
// /Users/mjr/example.js
```

注意：\_\_filename 和 \_\_dirname 是 CommonJS 模块的变量，在 ES 模块中无法使用。

不过我们可以通过 `import.meta.url` 实现类似的功能。

```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

## process.cwd

process.cwd() 方法返回当前 nodejs 进程的工作目录

## 参考链接

- [nodejs: path.jon](https://nodejs.org/dist/latest-v16.x/docs/api/path.html#path_path_join_paths)
- [nodejs: path.resolve](https://nodejs.org/dist/latest-v16.x/docs/api/path.html#path_path_resolve_paths)
- [nodejs: \_\_dirname](https://nodejs.org/dist/latest-v16.x/docs/api/modules.html#__dirname)
- [nodejs: import.meta](https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#importmeta)

