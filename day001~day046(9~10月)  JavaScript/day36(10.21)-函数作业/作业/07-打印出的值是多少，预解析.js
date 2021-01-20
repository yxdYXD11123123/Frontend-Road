// 7.下列代码控制台打印出的值是多少？并且把预解析的过程写出来
function a(b) {
    console.log(b);  // [Function: c]  // 形式参数b接收的值为函数c，所以输出[Function: c]
    var s = b();  // b() 相当于 function c(){return 123}() 调用函数c，所以s的值为123
    console.log(s)  // 123
}
a(c); // 输入实际参数为函数c
function c() { return 123 } // 全局函数