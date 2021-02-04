/*
 *获取地址里面的用户名和年龄和邮箱
 *https://www.baidu.com?username=lisi&age=28&email=120122@qq.com,
 *并且控制台输出对象的格式
 *{username:'lisi',age:28,email:120122@qq.com}
 */

let url = "https://www.baidu.com?username=lisi&age=28&email=120122@qq.com";

// console.log(url.split("?")[1].split("&"));  //核心代码split()
let arr = url.split("?")[1].split("&");
let obj = {};
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i].split("="));
  obj[arr[i].split("=")[0]] = arr[i].split("=")[1];
}

console.log("答案", obj);
