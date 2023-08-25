---
layout: post
tags: 2023 electron
title: Electron 中的 IPC 模块
---

Inter-Process Communication (IPC)，进程间通信，主要负责 Electron 中渲染进程跟主进程之间的通信。

<!-- vim-markdown-toc GFM -->

- [ipcMain 和 ipcRenderer](#ipcmain-和-ipcrenderer)
- [渲染进程到主进程 - 方式一](#渲染进程到主进程---方式一)
- [渲染进程到主进程 - 方式二](#渲染进程到主进程---方式二)
- [主进程到渲染进程](#主进程到渲染进程)
- [参考链接](#参考链接)

<!-- vim-markdown-toc -->

## ipcMain 和 ipcRenderer

[ipcMain](https://electronjs.org/docs/api/ipc-main)：是一个位于主进程的事件发射器模块，用于接收和处理渲染进程发送的异步和同步消息。也可以向渲染进程发送消息。

[ipcRenderer](https://electronjs.org/docs/api/ipc-renderer)：是一个位于渲染进程的时间发射器模块，提供了可以向主进程发送异步和同步消息的方法。也可以接收来自主进程的消息。

在 Electron 中，进程间通信是通过在 ipcMain 和 ipcRenderer 模块中定义的 "channels" 通道。

## 渲染进程到主进程 - 方式一

第一种从渲染进程到主进程的方式，是使用 `ipcRenderer.send` 发送消息和 `ipcMain.on` 接收消息。

以下是来自官网的一个例子：

1. 在主进程使用 `ipcMain.on` 监听事件。

   ```js
   // main.js
   function handleSetTitle(event, title) {
     const webContents = event.sender;
     const win = BrowserWindow.fromWebContents(webContents);
     win.setTitle(title);
   }

   app.whenReady().then(() => {
     ipcMain.on('set-title', handleSetTitle);
     createWindow();
   });
   ```

2. 通过预加载暴露 `ipcRenderer.send` 。

   ```js
   // preload.js
   const { contextBridge, ipcRenderer } = require('electron');
   contextBridge.exposeInMainWorld('electronAPI', {
     sendTitle: (title) => ipcRenderer.send('set-title', title),
   });
   ```

   默认情况下，渲染进程没有 Node.js 或 Electron 模块的访问权，需要通过 `contextBridge.exposeInMainWorld` 来选择暴露的 API。在预加载脚本中暴露一个全局的 `window.electronAPI` 供渲染进程调用。

3. 渲染进程调用

   ```js
   // renderer.js
   btn.addEventListener('click', () => {
     window.electronAPI.sendTitle('Hello World!');
   });
   ```

如果需要主进程回复消息，则需要使用 `event.replay`。

![]({{ "images/ipc-one.png" | relative_url }})

## 渲染进程到主进程 - 方式二

另一个更常见的方式是使用 `ipcRenderer.invoke` 发送消息和 `ipcMain.handle` 接收消息。

因为我们经常需要从渲染进程向主进程发送消息，并等待主进程的响应结果。

以下是来自官网的一个例子:

1. 在主进程使用 `ipcMain.handle` 监听事件。

   ```js
   // main.js

   async function handleFileOpen() {
     const { canceled, filePath } = await dialog.showOpenDialog({});
     if (!canceled) {
       return filePath[0];
     }
   }

   app.whenReady().then(() => {
     ipcMain.handle('dialog:openFile', handleFileOpen);
     createWindow();
   });
   ```

2. 通过预加载暴露 `ipcRenderer.invoke` 。

   ```js
   // preload.js
   const { contextBridge, ipcRenderer } = require('electron');
   contextBridge.exposeInMainWorld('electronAPI', {
     openFile: () => ipcRenderer.invoke('dialog:openFile'),
   });
   ```

3. 渲染进程调用

   ```js
   //renderer.js
   btn.addEventListener('click', async () => {
     const filePath = await window.electronAPI.openFile();
   });
   ```

如果需要主进程回复消息，则直接在 `ipcMain.handle` 里面 return 回去就可以了。而 `ipcRenderer.invoke` 会接收到一个异步的 `Promise<pending>` 的值。

据 [What is the difference between IPC send / on and invoke / handle in electron?](https://stackoverflow.com/questions/59889729/what-is-the-difference-between-ipc-send-on-and-invoke-handle-in-electron) 里面的回答，invoke/handle 跟 send/on 并没有功能上的差别，而是一种更新更直观的 API 写法。

![]({{ "images/ipc-two.png" | relative_url }})

## 主进程到渲染进程

当你从主进程发送消息到渲染进程时，不再使用 `ipcMain`，而是通过 `WebContents` 实例，该实例包含了一个 `send` 方法。

以下是来自官网的一个例子:

1. 使用 `WebContents.send` 发送消息。

   ```js
   // main.js

   function createWindow() {
     const menu = Menu.buildFromTemplate([
       {
         label: app.name,
         submenu: [
           {
             click: () => mainWindow.webContents.send('update-counter', 1),
             label: 'Increment',
           },
           {
             click: () => mainWindow.webContents.send('update-counter', -1),
             label: 'Decrement',
           },
         ],
       },
     ]);
   }
   ```

2. 通过预加载暴露 `ipcRenderer.on` 。

   ```js
   // preload.js
   const { contextBridge, ipcRenderer } = require('electron');

   contextBridge.exposeInMainWorld('electronAPI', {
     onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback),
   });
   ```

   当加载预加载脚本之后，渲染进程可以监听 `window.electronAPI.onUpdateCounter` 事件函数。

3. 渲染进程调用

   ```js
   window.electronAPI.onUpdateCounter((event, arg) => {
     //...
   });
   ```

![]({{ "images/ipc-main-renderer.png" | relative_url }})

## 参考链接

- [Inter-Process Communication](https://www.electronjs.org/docs/latest/tutorial/ipc)
- [ipcMain](https://www.electronjs.org/docs/latest/api/ipc-main)
- [ipcRenderer](https://www.electronjs.org/docs/latest/api/ipc-renderer)
- [大概是全网最详细的 Electron ipc 讲解(一)——主进程与渲染进程的两情相悦](https://juejin.cn/post/7067342993157537822)
- [大概是全网最详细的 Electron ipc 讲解(二)——渲染进程与渲染进程的搭桥牵线](https://juejin.cn/post/7078476722223448095)
- [大概是全网最详细的 Electron ipc 讲解(三)——定情信物传声筒 port](https://juejin.cn/post/7103689764917755940)
- [Electron+React 使用 contextBridge 进行 IPC 通信](https://blog.picoaoi.com/2021/12/13/electronreact%E4%BD%BF%E7%94%A8contextbridge%E8%BF%9B%E8%A1%8Cipc%E9%80%9A%E4%BF%A1/)
