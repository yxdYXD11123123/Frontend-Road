## socket.io  使用（Vue3+node.js）

### 介绍

* Socket.IO是一个库，支持浏览器和服务器之间的实时、双向和基于事件的通信
* 如果可能的话，客户端将尝试建立WebSocket连接，如果不可能的话，转而依靠HTTP长轮询



### 服务端使用

默认情况下，服务端使用的`Socket.io`提供的 `websocket` 服务是 `ws` 提供的

#### 安装

```shell
npm install socket.io
```

#### 服务初始化

```js
const httpServer = require("http").createServer();
// socket.io服务可以作为独立服务，也可以添加到一个已经存在的服务上(HTTP,Express,Koa,Nest)
const io = require("socket.io")(httpServer, {
  // ...配置项
  // path, parser, connectTimeout 等服务选项
  // wsEngine, cors 跨域配置, cookie, transports, allowRequest 用来决定是否接受请求，继续处理（做校验）等等 低引擎配置选项
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000);
```

#### 服务实例 `Server Instance`

##### 属性：

* `engine`

  可以用来获取已连接服务的客户端数量

  ```js
  const count = io.engine.clientsCount;
  // may or may not be similar to the count of Socket instances in the main namespace, depending on your usage
  // io.sockets和io.of("/") 是一样的，获取的size只是主服务 '/' 的连接数量
  const count2 = io.of("/").sockets.size;
  ```

  还可以自定义 session ID

  ```js
  const uuid = require("uuid");
  
  io.engine.generateId = (req) => {
    return uuid.v4(); // must be unique across all Socket.IO servers
  }
  ```

  还可以监听一些事件

  * `initial_headers`
  * `headers`
  * `connection_error`

  ```js
  io.engine.on("initial_headers", (headers, req) => {
    headers["test"] = "123";
    headers["set-cookie"] = "mycookie=456";
  });
  io.engine.on("headers", (headers, req) => {
    headers["test"] = "789";
  });
  io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });
  ```

##### 方法：

- [`socketsJoin`](https://socket.io/docs/v4/server-instance/#socketsJoin): makes the matching socket instances join the specified rooms
- [̀`socketsLeave`](https://socket.io/docs/v4/server-instance/#socketsLeave): makes the matching socket instances leave the specified rooms
- [`disconnectSockets`](https://socket.io/docs/v4/server-instance/#disconnectSockets): makes the matching socket instances disconnect
- [`fetchSockets`](https://socket.io/docs/v4/server-instance/#fetchSockets): returns the matching socket instances

##### 事件：

* `connection`

  建立新连接时触发

  ```js
  io.on("connection", (socket) => {
    // ...
  });
  ```

  

#### `服务端 Socket 实例`

##### 核心：

* **触发监听自定义事件**

  基本使用：

  ```js
  // server-side
  io.on("connection", (socket) => {
    socket.emit("hello", "world");
  });
  
  // client-side
  socket.on("hello", (arg) => {
    console.log(arg); // world
  });
  
  // 或者
  // server-side
  io.on("connection", (socket) => {
    socket.on("hello", (arg) => {
      console.log(arg); // world
    });
  });
  
  // client-side
  socket.emit("hello", "world");
  ```

  利用回调函数确认成功：

  ```js
  // server-side
  io.on("connection", (socket) => {
    socket.on("update item", (arg1, arg2, callback) => {
      console.log(arg1); // 1
      console.log(arg2); // { name: "updated" }
      callback({
        status: "ok"
      });
    });
  });
  
  // client-side
  socket.emit("update item", "1", { name: "updated" }, (response) => {
    console.log(response.status); // ok
  });
  ```

  `socket.volatile.emit` 不稳定发送

  适用场景：如果您需要发送在线游戏中角色的位置（因为只有最新的值才有用）

* **广播事件 `Broadcasting events`**

  * 通知所有连接用户

    ```js
    io.emit("hello", "world");
    ```

  * 仅通知除自己之外的其它连接

    ```js
    io.on("connection", (socket) => {
      socket.broadcast.emit("hello", "world");
    });
    ```

    

##### 属性：

* `id` 

  就是那个ID

* `handshake`

  此对象包含有关Socket.IO会话开始时握手的一些详细信息

* `rooms`

  进入的房间

* `data`

  传递的数据

* 我们可以任意添加自定义属性，不要覆盖自带的就可以

##### 中间件：

`.use()`

```js
io.on("connection", (socket) => {
  socket.use(([event, ...args], next) => {
    if (isUnauthorized(event)) {
      return next(new Error("unauthorized event"));
    }
    next();
  });

  socket.on("error", (err) => {
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });
});
```

##### 事件：

- [`disconnect`](https://socket.io/docs/v4/server-socket-instance/#disconnect)

  断开连接时触发

- [`disconnecting`](https://socket.io/docs/v4/server-socket-instance/#disconnecting)

  比 `disconnect` 早一点，此时 `socket.room` 中还有值



#### 命名空间 `Namespaces`

一个命名空间，就是一个交流的通道。让我们可以从一个单独的共享连接中 拆分我们的逻辑应用。

`io` 服务实例，其实就是代表一个 `main namespace` 主命名空间。

文档原文：

* Some tutorials may also mention `io.sockets`, it's simply an alias for `io.of("/")`.

继承了所有`namespace` 应该有的方法，例如：`.on  .use  .emit  .of 等等` 

```js
// 服务端
const nsp = io.of("/my-namespace");

nsp.on("connection", socket => {
  console.log("someone connected");
});

nsp.emit("hi", "everyone!");

// 客户端
const orderSocket = io("https://example.com/my-namespace"); // the "my-namespace" namespace
```

我们还可以设置动态的命名空间

##### 可能的使用场景：

* 创建一个只有鉴权用户可以连接的独特命名空间

  所以 与这部分用户的逻辑，应该与应用其它部分分离开来

  ```js
  const adminNamespace = io.of("/admin");
  
  adminNamespace.use((socket, next) => {
    // ensure the user has sufficient rights
    next();
  });
  
  adminNamespace.on("connection", socket => {
    socket.on("delete user", () => {
      // ...
    });
  });
  ```



#### 房间 `Rooms`

一个房间，就是一个 用户可以任意 进入 或者 离开 的通道

##### 可以被用来 向一个客户端子集 广播事件

要注意：`Room` 是一个只提供服务的连接。（客户段不能主动访问它加入的房间列表）

##### `Joining and leaving`

* 让人进入某个房间

  ```js
  io.on('connection', socket => {
    socket.join('some room');
  });
  ```

* 去哪个房间广播事件

  ```js
  io.to('some room').emit('some event');
  ```

* 还可以同时在一些房间进行广播

  ```js
  io.to('room1').to('room2').to('room3').emit('some event');
  ```

##### 默认房间 `Default room`

每个 `Socket` 都会自带一个随机的、独一无二的 `id` ，为了方便起见，每个 `Socket` 会自动 `jion` 加入以自己 `id` 命名的房间

可以很容易的用来实现 单聊模式

```js
io.on("connection", socket => {
  socket.on("private message", (anotherSocketId, msg) => {
    socket.to(anotherSocketId).emit("private message", socket.id, msg);
  });
});
```





### 客户端使用（Vue3）

在Vue中，我们使用 `socket.io` 需要下载 `socket.io-client` 客户端

#### 安装

```shell
npm install socket.io-client
```

#### 初始化

* 以Vue3中使用为例：

  初始化时，有很多配置项

```vue
<template>
  <div>首页</div>
</template>

<script setup>
import { onMounted } from "vue";
// 导入 socket
import { io } from "socket.io-client";

onMounted(() => {
  // 同域名可以直接写端口号加路由（例如：":8080/xxx"）确保跨域问题已解决
  const socket = io(":8080", {
    // 这里transports的默认值为["polling", "websocket"] 也就是优先使用polling， 但是polling再谷歌浏览器连接不上
    transports: ["websocket", "polling"],
    // 这里的配置项有：IO工厂配置项、低级引擎配置项(会被设置到所有同一管理者的的socket实例上)
    // forceNew, multiplex, transports,upgrade,
    // rememberUpgrade,path,query,extraHeaders,withCredentials,
    // forceBase64,timestampRequests,
    // timestampParam,closeOnBeforeunload
      
    // 在 后端使用时，还有一些额外的配置项：
    // agent, pfx, key, passphrase, cert, ca, ciphers, rejectUnauthorized
      
    // 还有 ManagerOptions 管理性配置项：
    // autoConnect: false, // 是否自动连接，默认为true，设为false后，可以通过 connect() 或者 open()手动开启
    // reconnection: false // 是否自动重连，默认为true，设为false后，需要手动进行重连
    // reconnectionAttempts, reconnectionDelay, reconnectionDelayMax, randomizationFactor,timeout,parser
      
    // 鉴权配置
    // auth: {
    //   token: 'abcd'
    // }
  });

  socket.on("hello", (arg) => {
    console.log(socket.id);
    console.log(arg);
  });
    
    
  // 连接异常时，会触发
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
});
</script>

<style scoped>
</style>
```

#### 初始化获取的 Socket 实例

除了触发和监听事件，socket实例 还有一些属性供我们使用

* `id`

  每个新连接会被给一个随机的id（这个id和服务端的id是同步的）

  ```js
  // server-side
  io.on("connection", (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  
  // client-side
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
  ```

* `connected`

  描述当前连接状态，是否已经连接服务端

  ```js
  socket.on("connect", () => {
    console.log(socket.connected); // true
  });
  
  socket.on("disconnect", () => {
    console.log(socket.connected); // false
  });
  ```

#### 生命周期

<img src="随堂笔记/client_socket_events.png" alt="Lifecycle diagram" style="zoom: 43%;" />

#### 事件

* `connect`

  socket实例 连接时 和 重连时 触发 

  **注意：**不要再连接成功后的回调函数中，注册事件，那样会造成每次连接都注册新事件

* `connect_error`

  连接异常时触发：

  * 无法建立低级连接

    -- 此后会自动重连

  * 连接被服务端拒绝

    -- 此后需要我们手动重连

* `disconnect`

  断开连接

  ```js
  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      // the disconnection was initiated by the server, you need to reconnect manually
      socket.connect();
    }
    // else the socket will automatically try to reconnect
  });
  ```

  