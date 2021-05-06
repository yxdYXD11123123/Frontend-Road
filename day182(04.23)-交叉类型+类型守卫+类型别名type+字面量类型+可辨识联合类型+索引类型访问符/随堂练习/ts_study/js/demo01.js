"use strict";
let a;
// 交叉类型
let obj;
obj = {
    a: "1",
    b: 1
};
let getNewObj = (target, source) => {
    // 类型断言，断言res是 T&U 类型
    // let res = {} as (T & U);
    // 或者不要写 {} 初始值
    let res;
    res = Object.assign(target, source);
    return res;
};
console.log(getNewObj({ a: '1' }, { b: 1 })); // { a: '1', b: 1 }
