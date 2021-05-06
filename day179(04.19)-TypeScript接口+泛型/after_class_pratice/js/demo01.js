"use strict";
;
// 使用接口
function printUsername(user) {
    var _a;
    console.log(user.userName);
    console.log(user.hobby); // string[] | undefined
    (_a = user.hobby) === null || _a === void 0 ? void 0 : _a.forEach((val) => { console.log(val); });
}
printUsername({ "userName": "frank", hobby: ["篮球"] });
let fn = (x, y) => {
    return x + y;
};
console.log(fn("1", 1));
let fn2 = (str) => {
    return str;
};
// 使用类实现interface
class AClass {
}
class SonClass extends AClass {
    constructor(userName) {
        super();
        this.userName = userName;
    }
}
let son = new SonClass("frank");
console.log(son.userName);
// 使用泛型
function genericsFn(arr) {
    console.log(typeof arr[0]);
    return arr;
}
genericsFn([1, 2]).forEach((val) => {
    console.log(val.toFixed(2));
});
