"use strict";
// 元组
let arr = [1, '2'];
console.log(arr);
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
;
console.log(Color);
// { '0': 'Red', '2': 'Green', '3': 'Blue', Red: 0, Green: 2, Blue: 3 }
// 使用
let bgColor = Color.Green;
console.log(Color.Red); // 0
console.log(Color.Green); // 2
console.log(Color.Blue); // 3
// 方法
// unknow 类型 和 any 类型一样，同样是顶级类型
// unknow代表未知类型
let a;
a = 5;
a = true;
// unknown 类型只能赋值给any类型和unknown类型本身
let c = a;
