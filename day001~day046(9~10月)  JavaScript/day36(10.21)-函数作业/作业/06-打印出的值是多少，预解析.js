// 6.下列代码控制台打印出的值是多少？并且把预解析的过程写出来
(function (num) {
    console.log(num);  // 100  自调用函数，实参为100，所以形参num接收到100，所以输出100 
    var num = 10;  //  给num重新赋值为10
    console.log(num);  // 10  所以输出10
}(100))
