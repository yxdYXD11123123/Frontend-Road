"use strict";
// 非空断言
// 例一
let x;
changeX();
let res = x;
function changeX() {
    x = '1';
}
// 例二
function fn1(str) {
    // let res: string = str; // 报错 Type 'undefined' is not assignable to type 'string'.
    let res = str; // okay 
}
