const express = require("express");

const app = express();

app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});

app.get("/data", (req, res) => {
  res.status(200).send({
    msg: "后台数据"
  })
});

const list = [
  {
    id: 1,
    title: "一",
    detail: "one one one one"
  },
  {
    id: 2,
    title: "二",
    detail: "two two two two"
  },
  {
    id: 3,
    title: "三",
    detail: "three three three three"
  },
  {
    id: 4,
    title: "四",
    detail: "four four four four"
  },
  {
    id: 5,
    title: "五",
    detail: "five five five five"
  }
]

app.get("/list", (req, res) => {
  res.status(200).send(
    list
  )
})

app.get("/details", (req, res) => {
  res.status(200).send({
    data: list[+req.query.id - 1]
  })
})

app.listen(8000);