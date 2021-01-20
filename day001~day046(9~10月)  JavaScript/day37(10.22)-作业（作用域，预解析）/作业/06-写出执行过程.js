// 6.下列代码控制台打印出的值是多少？写出执行过程
function test() {
    let x = 31;
    if (true) {
        let x = 71;
        console.log(x) // 71 ,当前块级作用域中已经有定义了的x，所以直接输出71
    }
    console.log(x) // 31 , ,当前函数局部作用域中已经有定义了的x，所以直接输出31
}
test()