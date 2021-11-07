const koa = require("koa");
const cors = require("koa2-cors");
const router = require("koa-router")()
const http = require("http");
const fs = require("fs");
const path = require("path")

// 创建koa服务
const app = new koa();
app.use(cors());
// 创建http服务  将koa服务应用到http服务上
const server = http.createServer(app.callback());


// server.addListener("request", (req, res) => {
//   var readStream = fs.createReadStream(path.join(__dirname, "public", "file.jpg"), { highWaterMark: 5 });
//   // readStream.on("data", (str) => {
//   //   console.log(str);
//   // })
//   // var writeStream = fs.createWriteStream(path.join(__dirname, "public", "fileB.txt"))
//   readStream.pipe(res);
// })
router.get("/", ctx => {
  var readStream = fs.createReadStream(path.join(__dirname, "public", "file.json"), { highWaterMark: 5 });
  ctx.body = readStream;
})

app.use(router.routes());


server.listen(8000);