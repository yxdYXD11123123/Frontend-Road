const express = require("express");
const http = require("http");
const path = require("path");
// 引入 socket.io
const { Server } = require('socket.io')

// 创建 应用
const app = express();
// 创建 服务
const server = http.createServer(app);

// 开启静态托管
app.use(express.static(path.join(__dirname, "public")));

// 创建 websocket 服务
const io = new Server(server);

// 记录用户
const users = [];

// 房间（群聊）[{roomName, users:[]}]
const rooms = [];

/**
 * 加入房间
 * @param {*} socket 
 * @param {*} roomName 房间名
 */
const joinRoom = (socket, roomName) => {
  return new Promise((resolve) => {
    // 加入room （join默认创建房间）
    socket.join(roomName);
    // 通知其它用户 有人加入
    socket.to(roomName).emit("someone join in", socket.userInfo, roomName);
    // 查询是否记录此room
    const index = rooms.findIndex(val => val.roomName === roomName);
    // 若未记录，加入新房间，并添加第一个用户（当前用户）
    if (index === -1) {
      rooms.push({ roomName, users: [socket.userInfo] });
      return resolve();
    }
    // 若已记录，加入当前用户
    rooms[index].users.push(socket.userInfo);
    resolve();
  })
};

// 监听连接
io.on("connection", (socket) => {
  console.log("a user connecting", socket.id);

  // 用户登录
  socket.on("login",
    /**
     * 用户登录
     * @param {*} userInfo 用户信息
     */
    (userInfo) => {
      console.log('由用户登录了');
      // 记录用户信息
      socket.userInfo = userInfo;
      // 在线状态
      socket.userInfo.online = true;
      // 记录用户
      socket.userInfo.sid = socket.id;
      users.some(val => {
        if (val.sid === socket.id) {
          val.nickName = userInfo.nickName;
          val.avatarId = userInfo.avatarId;
          return true;
        }
      }) ? null : users.push(socket.userInfo);
      // 通知所有用户，刷新用户列表
      io.emit("refreshUsers", users);
      // 刷新房间列表
      io.emit("refreshRooms", rooms);
    })

  // 单聊消息
  socket.on("private message", (anotherSocketId, msg, isImg) => {
    socket.to(anotherSocketId).emit("private message", socket.userInfo, msg, +new Date(), isImg);
  });

  // 群聊消息
  socket.on("room message", (roomId, msg, isImg) => {
    socket.to(roomId).emit("room message", socket.userInfo, msg, +new Date(), isImg, roomId);
  })

  // 创建新房间
  socket.on("create new room", async (roomName) => {
    console.log("创建了房间 ：" + roomName);
    // 加入房间
    await joinRoom(socket, roomName);
    // 刷新房间列表
    io.emit("refreshRooms", rooms);
    // 可查看进入房间的所有用户
    // console.log(await io.sockets.in(roomName).allSockets());
  })

  // 加入房间
  socket.on("join room", (roomName) => {
    // 加入房间
    joinRoom(socket, roomName);
  });

  // 用户断开连接
  socket.on("disconnect", () => {
    if (socket.userInfo) {
      console.log('用户' + socket.userInfo.nickName + '断开连接');
    }
    const index = users.findIndex(value => value.sid === socket.id);
    // 从用户列表中 移除
    users.splice(index, 1);
    // 通知所有用户，刷新用户列表
    io.emit("refreshUsers", users);
  })
})

// 监听端口
server.listen(8080, () => {
  console.log("请访问：http://localhost:8080");
});