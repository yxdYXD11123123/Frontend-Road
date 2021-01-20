// 7.下列代码控制台打印出的值是多少？写出执行过程
function test() {
    var x = 31;
    if (true) {
        var x = 71;  // 函数内部已经定义了x=31,这里重新赋值为71
        console.log(x) // 71
    }
    console.log(x) // 71 再次输出71
}
test()
