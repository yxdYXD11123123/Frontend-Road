// 1.下列代码控制台打印出的值是多少?写出执行过程
function b(x, y, a) {
    a = 10  //  形参为局部变量，a = 10 给 形参a=3 重新赋值，所以形参a=10  
    console.log(arguments[2]);  // 10  所以  arguments[2] = a = 10
}
b(1, 2, 3);
