var spaceOne;
(function (spaceOne) {
    var a = "2";
    var b = 1;
    // 导出之后
    function fn() {
        console.log("我是spaceOne的fn");
    }
    spaceOne.fn = fn;
})(spaceOne || (spaceOne = {}));
// spaceOne.a // 报错
// 外界才可以访问到
spaceOne.fn();
/// <reference path="命名空间.ts"/>
console.log(spaceOne.fn);
// console.log(spaceOne.fn);
