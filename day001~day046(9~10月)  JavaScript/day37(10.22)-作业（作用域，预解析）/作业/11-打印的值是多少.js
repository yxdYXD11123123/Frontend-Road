// 11.下列代码控制台打印出的值是多少？
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
// let 会造成 块级作用域 ，
// 所以 数组中a = [fuction({console.log(0)}), fuction({console.log(1)}), fuction({console.log(2)})]
a[6](); // 6  
a[7](); // 7
a[8](); // 8
a[9](); // 9