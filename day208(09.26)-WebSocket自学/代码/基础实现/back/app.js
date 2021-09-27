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

