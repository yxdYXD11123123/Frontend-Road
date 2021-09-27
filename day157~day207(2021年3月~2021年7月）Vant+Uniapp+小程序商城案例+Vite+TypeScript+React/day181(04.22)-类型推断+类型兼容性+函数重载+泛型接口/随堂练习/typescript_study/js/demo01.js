"use strict";
var value;
// 不会进行类型推断
value = 111;
// 会自动推断为字符串类型
var valus = "11";
// 要求one满足OneInterface
var one;
var p1 = { age: 10 };
one = p1; // okay
var p2 = { name: "1", age: 10 };
one = p2; // okay  可多不可少，就可以兼容
var p3 = { name: "1" };
var one2;
var p4 = {
    age: 99,
    name: {
        firstName: "Lin"
    }
};
one2 = p4; // okay 证明会递归
// 函数兼容性
// 参数个数
var fn1 = function (x, y) { return x; };
var fn2 = function (a) { return a; };
// fn2 = fn1;  // 报错：参数多的不能兼容给参数少的
fn1 = fn2; // okay：说明参数少的可以兼容给参数多的  
// fn1 = (x:number) =>{} // okay
fn1(1, 1);
// 参数类型
var fn3 = function (x, y) { };
// fn3 = fn1; // 类型不同不能兼容
var x = function (a) { return a; };
var y = function (a, b) { return a; };
var fn4 = function (a) { };
// 函数的双向协变
// 参数的双向协变
var fn5 = function (x) { };
var fn6 = function (y) { };
fn6 = fn5; // okay
// fn5 = fn6; // 报错
// 返回值的双向协变
var fn7 = function (x) { return x ? "aaa" : 123; };
var fn8 = function (x) { return "aaa"; };
fn7 = fn8; // okay
function add(paramAOrParamC, paramB) {
    if (paramB) {
        console.log('我用了paramA和paramB');
    }
    else {
        console.log('我用了paramC');
    }
}
// 枚举兼容性
// 数字枚举
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
// 数字枚举和数值是兼容的
var val = Gender.Male;
val = 11;
// 字符串枚举和字符串 
var EnumOne;
(function (EnumOne) {
    EnumOne["One"] = "1";
    EnumOne["Two"] = "2";
})(EnumOne || (EnumOne = {}));
// 字符串枚举和字符串不兼容
var str = EnumOne.One;
// str = "2"; // 报错
var Gender2;
(function (Gender2) {
    Gender2[Gender2["Male"] = 0] = "Male";
    Gender2[Gender2["Female"] = 1] = "Female";
})(Gender2 || (Gender2 = {}));
// 枚举与枚举之间不兼容
// Gender = Gender2;
// 类兼容性
var Person = /** @class */ (function () {
    function Person() {
        this.name = "a";
    }
    return Person;
}());
var Teacher = /** @class */ (function () {
    function Teacher() {
        this.name = "b";
    }
    return Teacher;
}());
var person;
var xxx = { data: 1 };
var yyy = { data: '1' };
var zzz = { data: 2 };
xxx = zzz; // OK
// xxx = yyy;  // 报错
