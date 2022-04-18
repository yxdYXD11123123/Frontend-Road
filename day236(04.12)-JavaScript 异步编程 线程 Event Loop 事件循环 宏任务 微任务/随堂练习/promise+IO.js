const fs = require("fs");

function readFile() {
  return new Promise((resovle, reject) => {
    console.log("同步执行1");
    // 开启新线程执行IO操作，完成后，把回调函数添加进 宏任务IO队列
    fs.readFile("./article.txt", {}, (err, data) => {
      if (err) {
        reject("出错");
      } else {
        console.log("IO 宏任务");
        resovle("完成", data); // Promise.resovle 触发，添加一个Promsie.then的微任务
        // nextTick 添加一个nextTick微任务
        process.nextTick(() => {
          console.log("nextTick 微任务1");
        });
      }
    });
  });
}

readFile().then((result) => {
  console.log(result);
});
// 插入一个setTimeout宏任务
//（虽然这个setTimeout写在IO操作后，但是IO操作会费时，所以还是setTimout的宏任务先执行）
setTimeout(() => {
  console.log("setTimeout 宏任务2");
});
process.nextTick(() => {
  console.log("nextTick 微任务2");
});

console.log("同步执行2");
