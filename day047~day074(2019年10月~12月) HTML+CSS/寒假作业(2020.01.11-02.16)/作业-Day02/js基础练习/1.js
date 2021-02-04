// 1. 请将变量a与变量b的变量值互换位置

var a = 10, b = 20;
// 声明一个临时变量, 将a的值临时保存在临时变量中
var temp = a;
// 把b的值传给a
a = b;
// 把临时变量保留下的a的值传给b
b = temp;
console.log(a, b);
