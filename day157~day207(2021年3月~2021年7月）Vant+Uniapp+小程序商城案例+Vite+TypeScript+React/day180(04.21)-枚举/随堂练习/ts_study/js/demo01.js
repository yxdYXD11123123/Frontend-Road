"use strict";
let y = "a";
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (Gender = {}));
console.log(Gender.Male); // male
// console.log(Gender['male']);  // 报错
var enumOne;
(function (enumOne) {
    enumOne["One"] = "one";
    enumOne["Two"] = "one";
})(enumOne || (enumOne = {}));
console.log(enumOne.One == enumOne.Two); // true
var enumTwo;
(function (enumTwo) {
    enumTwo[enumTwo["Male"] = 0] = "Male";
    enumTwo[enumTwo["Female"] = 1] = "Female";
})(enumTwo || (enumTwo = {}));
class Some {
    constructor() {
        this.gender = Gender.Female;
    }
}
console.log(0 /* Monkey */); // 直接转换为 console.log(0)
// Food 实际上是每个枚举成员并集的联合类型
let f = 0 /* Fruits */;
// 所以当我们指定了一个枚举为一个变量的类型时，那么这个变量的值只能是枚举成员之一
f = 1 /* Meat */; // okay
// f = Animal.Monkey; // 报错： 不能将类型“Animal.Monkey”分配给类型“Food”
