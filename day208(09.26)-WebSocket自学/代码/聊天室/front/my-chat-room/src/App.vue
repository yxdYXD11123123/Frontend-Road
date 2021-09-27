<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { provide, ref } from "@vue/runtime-core";
// 导入 socket.io客户端
import { io } from "socket.io-client";

//#region 连接 socket.io 服务
// 同域名可以直接写端口号加路由（例如：":8080/xxx"）确保跨域问题已解决
const socket = io(":8080", {
  // 这里transports的默认值为["polling", "websocket"] 也就是优先使用polling， 但是polling再谷歌浏览器连接不上
  transports: ["websocket", "polling"],
  forceNew: true,
  //#region 配置项
  // 这里的配置项有：IO工厂配置项、低级引擎配置项(会被设置到所有同一管理者的的socket实例上)
  // forceNew, multiplex, transports,upgrade,
  // rememberUpgrade,path,query,extraHeaders,withCredentials,
  // forceBase64,timestampRequests,
  // timestampParam,closeOnBeforeunload
  // 在 后端使用时，还有一些额外的配置项：
  // agent, pfx, key, passphrase, cert, ca, ciphers, rejectUnauthorized
  // 最后还有 ManagerOptions 管理性配置项：
  // autoConnect: false, // 是否自动连接，默认为true，设为false后，可以通过 connect() 或者 open()手动开启
  // reconnection: false // 是否自动重连，默认为true，设为false后，需要手动进行重连
  // reconnectionAttempts, reconnectionDelay, reconnectionDelayMax, randomizationFactor,timeout,parser
  // 鉴权配置
  // auth: {
  //   token: 'abcd'
  // }
  //#endregion
});

//#region  连接异常时，会触发
socket.on("connect_error", (err) => {
  console.log(err);
  // 如果连接异常，修改transports传输方式
  socket.io.opts.transports = ["polling", "websocket"];
  // 鉴权失败的话，可以修改token，再进行重连
  // if (err.message === "invalid credentials") {
  //   socket.auth.token = "new abcd";
  //   // 手动重连
  //   socket.connect();
  // }
});
//#endregion

// 向下注入
provide("socket", socket);
//#endregion

//#region 可发起聊天用户的列表
const toChatList = ref([]);
// 监听在线用户列表刷新
socket.on("refreshUsers", (users) => {
  console.log("刷新用户列表", +new Date(), users);
  toChatList.value = users;
});
// 注入
provide("toChatList", toChatList);
//#endregion

//#region 已创建的房间
const toChatRoomList = ref([]);
// 监听
socket.on("refreshRooms", (rooms) => {
  console.log("刷新房间列表", +new Date(), rooms);
  toChatRoomList.value = rooms;
});
// 注入
provide("toChatRoomList", toChatRoomList);
//#endregion
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
