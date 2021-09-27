const WebSocket = require("ws");
const { WebSocketServer } = require("ws");

// 创建服务
const wss = new WebSocketServer({
  port: 8080
});

// 记录用户总数
let count = 0;

wss.on("connection", (ws) => { // 创建连接时
  count++;
  // 给连接做标记
  ws.userInfo = { name: `用户${count}` };
  // 上线提示
  sendEveryOne({
    time: +new Date(),
    msg: ws.userInfo.name + " 进入了聊天室！",
    type: 0
  });

  // 收到该用户消息
  ws.on("message", (data) => { // 收到消息时
    sendEveryOne({
      time: +new Date(),
      msg: ws.userInfo.name + ": " + data,
      type: 1
    })
  })

  // 连接关闭
  ws.on("close", () => {
    sendEveryOne({
      time: +new Date(),
      msg: ws.userInfo.name + " 离开了聊天室",
      type: 2
    });
    count--;
  })

  // 连接异常
  ws.on("error", (error) => {
    console.log(error);
  })
})

/**
 * 向所有在线用户发送信息
 * @param {Object} data 
 *  data: {time 时间, msg 信息, type 类型} type=0 代表进入；type=1 代表发消息；type=2 代表离开  
 */
function sendEveryOne(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      // 这里要注意：我们不可以直接传对象，只能传string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object.
      client.send(JSON.stringify(data));
    }
  });
}