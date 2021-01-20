// 8.下列代码控制台打印出的值是多少？并且把预解析的过程写出来
var n = 0;
function a() {
    var n = 10; // 局部变量，只作用于函数局部作用域中，
    function b() {
        n++;  // 给函数内部的n加一，n=11
        console.log(n); // 输出11
    }
    b();
    return b;
}
var c = a();   //11
c(); //12
console.log(n); // 0  全局中寻找，n=0
