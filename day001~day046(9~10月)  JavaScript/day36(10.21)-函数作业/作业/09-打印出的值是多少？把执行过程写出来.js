// 9.下列代码控制台打印出的值是多少？把执行过程写出来
function a() {
    console.log('a');
    c();
}
function b() {
    console.log('b');
    a();
}
function c() {
    console.log('c');
}
a(); // ？  
// 打印输出 a c
// 先执行 a()里的console.log('a') 再执行 c()里的console.log('c')
b();  // ？
// 打印输出 b a c
// 先执行 b()里的console.log('b') 再执行 a()里的console.log('a') 再执行 c()里的console.log('c')
c();   // ？
// 打印输出 c
// 执行 c()里的console.log('c')