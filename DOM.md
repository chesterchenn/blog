---
title: DOM Node
date: 2017-11-13
---
DOM(Document Object Model)文档对象模型。DOM描绘了一个层次化的节点树，允许开发人员添加，移除和修改页面的一部分。

### Node类型
##### 常见的node类型：
- Element(1)
- Text(3)
- Document(9)

### Node属性
##### 重要的node属性：
- **childNodes** (read only)
返回一个NodeList对象(类数组对象)，它是该节点的子节点的实时表示。
- **firstChild** (read only)
返回子节点的第一个节点，如果没有子节点返回null。
- **lastChild** (read only)
返回子节点的最后一个节点，如果没有字节点返回null。
- **nextSibling** (read only)
返回节点的兄弟节点的后一个，如果没有返回null。
- **nodeName** (read only)
返回节点的元素标签名，以大写的形式表示。
- **nodeType** (read only)
返回节点的类型。
- **nodeValue**
返回/设置节点的值。
- **parentNode** (read only)
返回节点的父节点。
- **previousSibling** (read only)
返回节点的兄弟节点的前一个，如果没有返回null。

### Node方法
##### 重要的方法：
- **appendChild(newNode)**
在当前节点的子节点末尾添加指定的节点。返回新增的节点。
- **cloneNode([deep])**
返回节点的副本。[deep]为true表示深复制，false表示浅复制。
- **hasChildNodes()**
返回boolean值。表示当前节点是否有子节点。
- **insertBefore(newNode, referenceNode)**
在点前参考节点的子节点前插入指定的节点。如果参考节点为null，指定节点插入末尾。返回新增的节点。
- **removeChild(child)**
删除子节点，被删除的子节点还在内存中，但是不属于DOM。返回被删除的节点。
- **replaceChild(newChild, oldChild)**
用指定的节点替代一个子节点，被替换的子节点还存在内存中，但是不属于DOM。返回被替换的子节点。


### Document 类型
Document类型最常见的是作为HTMLDocument实例的document对象。
##### HTMLDocument属性：
- **Document.body**
返回当前文档的`<body>`元素
- **Document.cookie**
取得/设置当前文档的cookies属性
- **Document.domain**
取得/设置当前文档的域名
- **Document.location** (read only)
返回一个Location对象，包含当前文档的url以及提供方法修改url
- **Document.referrer** (read only)
返回页面的URI
- **Document.title**
取得/设置文档的标题
- **Document.URL** (read only)
返回文档的URL字符串

##### Document常见方法：
- **Document.createElement(tagName)**
创建指定的HTML元素，返回新创建的元素
- **Document.createTextNode(data)**
创建文本节点，data是新建的文本节点字符串，返回新建文本节点
- **Document.getElementsByClassName(name)**
返回一个指定类名的所有元素的NodeList
- **Document.getElementsByTagName(name)**
返回一个指定标签名的所有元素的NodeList
- **Document.getElementById(id)**
返回一个Element对象，若没有则返回null
- **Document.querySelector(selectors)**
接受一个CSS选择符，返回与该模式匹配的第一个元素，如果没有则返回null
- **Document.querySelectorAll(selectors)**
接受一个CSS选择符，返回一个静态的NodeList类数组对象，如果没有返回空

##### 继承HTMLDocument方法：
- **Document.getElementsByName(name)**
返回一个指定Name属性的所有元素的NodeList
- **Document.hasFocus()**
文档中有任何元素处于焦点，则返回true，否则返回false
- **Document.write()**
向文档中写入字符串文本

### Element 类型
使用更多的是HTMLElement
##### 常见属性：
- **Element.attributes** (read only)
返回元素的所有属性集合的NamedNodeMap对象，可以使用getNamedItem(name)来获取nodeName属性
- **Element.classList** (read only)
返回元素的类属性集合的DOMTokenList对象
- **Element.className**
取得/设置元素的类属性的值
- **Element.id**
元素在文档中的唯一标识符
- **Element.innerHTML**
取得/设置元素的子元素的内容(仅限子元素)
- **Element.outerHTML**
取得/设置元素的内容(包括元素自身)
- **Element.tagName** (read only)
返回元素标签名的字符串

##### Element类型的方法：
- **EventTarget.addEventListener()**
在元素上注册一个事件处理程序
- **Element.getAttribute(attributeName)**
返回元素上指定的属性的值
- **Element.getElementsByClassName(name)**
返回一个指定类名的所有元素的NodeList
- **Element.getElementsByTagName(name)**
返回一个指定标签名的所有元素的NodeList
- **Element.hasAttribute(name)**
如果元素上有该属性，返回true，否则返回false
- **Element.hasAttribute()**
如果元素上有属性，返回true，否则返回false
- **Element.querySelector(selectors)**
接受一个CSS选择符，返回与该模式匹配的第一个元素，如果没有则返回null
- **Element.querySelectorAll(selectors)**
接受一个CSS选择符，返回一个静态的NodeList类数组对象，如果没有返回空
- **Element.removeAttribute(attrName)**
从元素中移除指定的属性
- **EventTarget.removeEventListener()**
从元素上移除一个事件监听器
- **Element.setAttribute(name, value)**
在元素上设置一个属性，指定属性名和属性值，如果属性名存在，则更新属性值


参考资料：
- JavaScript高级程序设计(第3版)
- JavaScript权威指南(第6版)
- [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
