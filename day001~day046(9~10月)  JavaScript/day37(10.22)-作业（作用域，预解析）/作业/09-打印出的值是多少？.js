// 9.下列代码控制台打印出的值是多少？
(function f(num) {
    function num() { };  // 将形参num的值 赋值为function
    console.log(num); // [Function: num]
    var num = 10  // 将形参num的值 重新赋值为10
    console.log(num); // 10
}(100))
