// 获取地址里面的用户名和年龄和邮箱
// https://www.baidu.com?username=lisi&age=28&email=120122@qq.com,
// 并且控制台输出对象的格式
// {username:'lisi',age:28,email:120122@qq.com}

let str = `https://www.baidu.com?username=lisi&age=28&email=120122@qq.com`;
let obj = {};

let arr = str.split('?')[1].split('&');
arr.forEach((value, index) => {
    let arr = value.split('=');
    obj[arr[0]] = arr[1];
})
console.log(obj);