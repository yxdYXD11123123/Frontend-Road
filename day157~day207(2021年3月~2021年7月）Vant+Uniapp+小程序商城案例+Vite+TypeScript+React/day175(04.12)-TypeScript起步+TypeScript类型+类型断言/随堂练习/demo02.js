// 布尔
var flag = true;
// 数字
var num = 10;
var num1 = 17; // 二进制
var num2 = 0x001; // 16进制
// 字符串
var str = "abcd";
// 可以使用模板字符串
var str2 = str + "+abcd";
// 数组
// 方式一：在元素类型后面接上 []
// 表示由此类型元素组成的一个数组
var arr = [1, 2, 3];
// 方式二：使用数组泛型, Array<元素类型>
var arr1 = ['1', '2', '3'];
// 元组 Tuple
// 正确
var tuple = ['100', 11];
// 错误
// let tuple2: [String, Number] = [100, '11'];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
console.log(Color.Red); // 0  默认是从 0 开始
console.log(Color[0]); // Red
// 或者，我们可以手动改成从 2 开始编号
var Colors;
(function (Colors) {
    Colors[Colors["Red"] = 2] = "Red";
    Colors[Colors["Green"] = 3] = "Green";
    Colors[Colors["Blue"] = 4] = "Blue";
})(Colors || (Colors = {}));
;
console.log(Colors.Green); // 3
// 也可以全部手动赋值
console.log(Colors);
// {2: "Red", 3: "Green", 4: "Blue", Red: 2, Green: 3, Blue: 4}
// Any
var notSure = 4;
console.log(notSure.toFixed(2));
notSure = "true";
console.log(notSure.indexOf("r"));
// 数组里使用
var list = [1, true, "free"];
console.log(list);
// void
function fn1() {
    // 只能return undefined 和 null
    return undefined;
}
// Null 和 Undefined
var u = undefined;
var n = null;
// Never
var nev;
// 遇到一个联合类型时
// 可以使用 never 收窄类型
// Object
