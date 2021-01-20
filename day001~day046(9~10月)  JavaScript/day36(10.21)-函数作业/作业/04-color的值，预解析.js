// 4.下列代码控制台打印出的值分别是多少？并且把预解析的过程写出来
var color = "red";
function outer() {
    var anotherColor = "blue"; // 仅作用于函数内部局部作用域
    function inner() {
        var tmpColor = color;   // 在本次操作中，调用了全局变量中的color,将color的值传递给tmpcolor,所以tmp为red
        color = anotherColor;   // 在本次操作中，因为整个函数outer中，没有定义过color,所以本次操作会影响全局变量。使全局中color为blue
        anotherColor = tmpColor;   // another为red
        console.log(anotherColor);     // red
    }
    inner();
}
outer();
console.log(color);  //  因为在函数内部中，没有定义过color，所以函数内部给color=another color时，color 的值重新赋值为blue