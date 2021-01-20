// 10.下列代码控制台打印出的值是多少？
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
//循环结束后，i=10
// 所以 数组中a = [fuction({console.log(10)}), fuction({console.log(10)}), fuction({console.log(10)})]
a[6](); // 10 function(){console.log(i)}() 10
a[7](); // 10
a[8](); // 10
a[9](); // 10

