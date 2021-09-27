## WebSocket 介绍

WebSocket 协议是基于TCP的一种新的网络协议，它实现了浏览器与服务器全双工（full-duplex）通信--允许服务器主动发送信息给客户端。

* WebSocket 是一种持久协议，http是非持久协议

##### 场景：

现在很多网站都有 **实时推送** 的需求，比如聊天，客服咨询等等

早期没有websocket时，通过**ajax轮询**，因为http请求，服务器无法给浏览器主动发送数据，因此需要浏览器定时的给服务器发送请求（比如1s一次），服务器把最新的数据响应给浏览器，这种模式的缺点就是浪费性能和资源。

### 搭建基础的 websocket 服务

* 搭建后台服务（使用 `ws` 包）

  ```js
  const WebSocket = require('ws')
  const { WebSocketServer } = require("ws");
  
  // 创建 WebSocket服务器，指定端口8080
  const wss = new WebSocketServer({
    port: 8080
  })
  
  // 有 用户创建连接时，触发此函数
  wss.on("connection",
    /**
     * @param {*} ws 建立连接的WebSocket
     * @param {*} req request {http.IncomingMessage} 客户端发来的http get请求，用于解析请求头，cookie等信息
     */
    (ws, req) => {
      console.log(req.socket.remoteAddress);
      // 当服务器接收到消息时，触发此函数
      ws.on('message', (data, isBinary) => {
        // wss.clients 客户端 集合
        wss.clients.forEach(function each(client) {
          // 向每个开启状态的客户端 发消息
          if (client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: isBinary });
          }
        });
      });
  
      // 当 用户 断开连接时，会触发此事件
      ws.on("close",
        /**
         * @param {*} code 链接为何关闭的状态码
         * @param {*} reason 连接关闭的原因字符串(Buffer)
         */
        (code, reason) => {
          console.log(code, reason.toString());
        });
  
      // 发生异常时触发
      ws.on('error', (error) => {
        console.log(error);
      })
    })
  
  ```

* web端 (使用内置对象 `WebSocket`)

  ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      .results {
        width: 300px;
        height: 300px;
        border: 1px burlywood solid;
      }
    </style>
  </head>
  
  <body>
    <input type="text" placeholder="输入你的内容">
    <button>发送请求</button>
    <!-- 显示结果 -->
    <div class="results"></div>
  
    <script>
      const input = document.querySelector('input')
      const button = document.querySelector('button')
      const div = document.querySelector('div')
      // websocket在浏览器的使用
      // 创建 websocket 
      // 参数：websocket的服务地址
      const socket = new WebSocket('ws://localhost:8080');
  
      // 当websocket服务连接成功时触发
      socket.addEventListener("open", () => {
        div.innerHTML = "连接服务成功"
      })
  
      // 发送消息
      button.onclick = () => {
        let value = input.value;
        // 向服务端发送消息
        socket.send(value);
      }
  
      // 监听 接收消息 
      socket.addEventListener("message", (e) => {
        console.log(e.data);
        div.innerHTML = e.data;
      })
  
      // 断开连接（服务器端关闭服务时，会触发）
      socket.addEventListener("close", (e) => {
        console.log('服务断开');
      })
    </script>
  </body>
  
  </html>
  ```

  

### `ws` 和 `socket.io`

* `ws` 客户端不支持浏览器，需要用户自行封装 websocket

  `socket.io` 客户端对浏览器有良好的支持，而且 `socket.io` 客户端的websocket请求自带 id，服务器可以根据 id 区分客户端，进行精准推送

* 都可以单独作为 websocket 服务器，也可以挂到 express 或者 koa 框架

* `ws` 速度快，但是 `socket.io` 健壮性好

#### `ws` + `express` 的使用

```js
const express = require("express");

const expressWs = require("express-ws");

// 创建 应用
const app = express();
// 在 应用上 创建 websocket 服务
// expressWs(app, server, options) 会返回 一个 websocket服务器对象实例 wsInstance
const wsInstance = expressWs(app);
// 可以通过 wsInstance 获取 ~.app 获取应用 ~.getWss() 获取websocket服务器
// console.log(wsInstance.getWss().clients); // 获取连接服务器的所有用户

app.ws('/talk', (ws, req) => {
  console.log('连接了');
})

app.get('/data', (req, res) => {
  res.send('122222');
})

// 监听端口
app.listen(8080);
```

