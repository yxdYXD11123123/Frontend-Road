// 3. 输出下列代码name3的值分别是多少？并且把预解析的过程写出来
var name3 = "zs";  // 作用于全局作用域
function f3() {
    var name3 = "ls";  //仅作用于函数f3作用域 ，并给name3赋值
    function f4() {
        name3 = "ww";  // 因为函数f3中，已经存在变量name3，所以这个没有var的name3='ww'，不会作用于全局作用域中，只会重新赋值了函数内部的name3
    }
    f4();
    console.log(name3);   // ww
}
f3();
console.log(name3); // zs 只在全局作用域中寻找，因为全局作用域中只有var name3='zs' ,所以最后的值为zs
