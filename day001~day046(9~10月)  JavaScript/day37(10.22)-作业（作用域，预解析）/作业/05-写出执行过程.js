// 5.下列代码控制台打印出的值是多少？写出执行过程
// function a() { console.log('我是函数') }
// var a 
console.log(a);    // [Function: a]  
var a = '666';   // 分为 var a  和  a = '666' , var a 提升到最上层 ，此处保留a='666'
function a() { console.log('我是函数') } // 提升到var a 的上面，并且此处不保留
console.log(a);    // 666


// 相当于这样依次运行
// function a() { console.log('我是函数') }
// var a
// console.log(a);
// a = '666'
// console.log(a);

