"use strict";
function SpaceAndFn() {
    console.log(1);
}
// 命名空间声明不能位于与之合并的类或函数前
(function (SpaceAndFn) {
    SpaceAndFn.value = "值";
})(SpaceAndFn || (SpaceAndFn = {}));
SpaceAndFn(); // 1 
console.log(SpaceAndFn.value); // 值
var SpaceAndEnum;
(function (SpaceAndEnum) {
    SpaceAndEnum.value = "Enum";
})(SpaceAndEnum || (SpaceAndEnum = {}));
(function (SpaceAndEnum) {
    SpaceAndEnum[SpaceAndEnum["One"] = 0] = "One";
    SpaceAndEnum[SpaceAndEnum["Two"] = 1] = "Two";
})(SpaceAndEnum || (SpaceAndEnum = {}));
// 既可以当枚举使用，也可以当命名空间使用
console.log(SpaceAndEnum.value); // Enum
let num = SpaceAndEnum.One;
console.log(num); // 0 
var SapceAndInterface;
(function (SapceAndInterface) {
    SapceAndInterface.fn = () => {
        console.log("fn");
    };
})(SapceAndInterface || (SapceAndInterface = {}));
// 既可以当接口使用，又可以当命名空间使用
let obj = {
    self: 'self',
    ss: 's'
};
SapceAndInterface.fn();
class SpaceAndClass {
}
// 命名空间声明不能位于与之合并的类或函数前
(function (SpaceAndClass) {
    SpaceAndClass.some = "some";
})(SpaceAndClass || (SpaceAndClass = {}));
let s = new SpaceAndClass();
console.log(SpaceAndClass.some);
