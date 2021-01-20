// 3.下列代码控制台打印出的值是多少？写出执行过程
function test() {
    // var a 
    b();
    var a = 1;  // var a 提升到函数test内部最上层
    function b() {
        // var a 
        console.log(a);  // undefined , 输出的是函数 b 里的 a
        var a = 2;  // var a 提升到函数b内部最上层
    }
}
test();  