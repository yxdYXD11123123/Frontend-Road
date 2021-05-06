"use strict";
var spaceTwo;
(function (spaceTwo) {
    let a;
    // 命名空间导出数据后
    spaceTwo.params = "s";
})(spaceTwo || (spaceTwo = {}));
(function (spaceTwo) {
    let a;
    // 其他同名命名空间可以直接使用 上面数据 params
    function fn() {
        console.log(spaceTwo.params);
    }
    spaceTwo.fn = fn;
})(spaceTwo || (spaceTwo = {}));
spaceTwo.fn(); // s
