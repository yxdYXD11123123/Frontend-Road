"use strict";
var spaceOne;
(function (spaceOne) {
    let a = "2";
    const b = 1;
    // 导出之后
    function fn() {
        console.log("我是spaceOne的fn");
    }
    spaceOne.fn = fn;
})(spaceOne || (spaceOne = {}));
// spaceOne.a // 报错
// 外界才可以访问到
spaceOne.fn();
