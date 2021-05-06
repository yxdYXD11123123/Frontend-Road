// export const exportOne: string = "导出数据";
// export function exportFn() {
//   console.log(111);
// }
System.register([], function (exports_1, context_1) {
    "use strict";
    var exportOne, exportTwo;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exportOne = "One";
            exports_1("exportOne", exportOne);
            exportTwo = "Two";
            exports_1("exportTwo", exportTwo);
        }
    };
});
