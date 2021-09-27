"use strict";
// 和接口合并
var Person;
(function (Person) {
    let name;
})(Person || (Person = {}));
let obj = {
    age: 1
};
