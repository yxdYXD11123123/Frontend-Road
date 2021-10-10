const { Promise } = require("./promise")

const p = new Promise((resolve, reject) => {
  console.log('xxx');
  setTimeout(() => {
    resolve("成功")
  }, 1000);
})


p.then((value) => {
  console.log(value);
});