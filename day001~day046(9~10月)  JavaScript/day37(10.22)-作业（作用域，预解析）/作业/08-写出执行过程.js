// 8.下列代码控制台打印出的值是多少？写出执行过程
function n() {
    if (2 > 1) {
        // var brr 
        // arr = 10;  // 报错， 在函数内部，下面let 了arr, let不会提升，所以arr未初始化就赋值，导致报错
        brr = 10;
        let arr; // arr
        var brr;
        console.log(arr); // undefined  声明了变量但是为赋值，所以undefined
        console.log(brr); // 10  var brr 提升到最上层，brr=10赋值为10，所以输出10
    }
}
n(); 