---
layout: post
tags: nodejs 
title: resolve与join的区别 
---
在 nodejs 里面，resolve 与 join 都是常用的路径方法。

nodejs 版本号：v14

### path.join([...paths])
`path.join()` 将所有给定的路径段连接在一起，然后对结果路径进行规范化。

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/bza/asdf'

path.join('foo/bar', 'baz');
// Returns: 'foo/bar/baz'
```

### path.resolve([...paths])
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

## 参考链接
- [nodejs: path.jon](https://nodejs.org/dist/latest-v14.x/docs/api/path.html#path_path_join_paths)
- [nodejs: path.resolve](https://nodejs.org/dist/latest-v14.x/docs/api/path.html#path_path_resolve_paths)