"use strict";
let fn = function (x, y) {
    if (y) {
        return x + y;
    }
    else {
        return x;
    }
};
console.log(fn(1, 2)); // 3
let fn2 = function (more, x, y = 6) {
    // return x + y; // 报错 x可能未定义
    if (x) {
        return x + y;
    }
    else {
        return y;
    }
};
console.log(fn2(1, 2)); // 3
let sumThree = (a, b) => { return a + b; };
