// 2.下列代码控制台打印出的值是多少？写出执行过程
function fn() {
    console.log("我们是全局的fn");
}
function fn2() {
    // function fn() {
    //     console.log("我是fn2里面的");
    // } 
    console.log(fn);  // [Function: fn]  现在函数内部寻找，所以这个函数fn是fn2中的fn
    fn = 3;  // fn 重新赋值为3
    return;  // 停止运行
    function fn() {
        console.log("我是fn2里面的");
    } // fn2里的函数fn提升到函数局部最上层
}
fn2();

