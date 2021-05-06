"use strict";
;
let getUserInfo = (obj) => {
    if (obj.age) {
        console.log(obj.name + "=====", obj.age);
    }
    if (obj.gender) {
        // obj.gender = "1";  // 不可修改
        console.log(obj.gender); // 男
    }
};
getUserInfo({ name: "frank", gender: "男" });
// 按照接口 声明函数 
let fn = (num1, num2) => {
    return num1 + num2;
};
let fn2 = () => { return 1; };
