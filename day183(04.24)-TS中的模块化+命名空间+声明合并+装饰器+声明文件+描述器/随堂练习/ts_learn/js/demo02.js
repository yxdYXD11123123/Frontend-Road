System.register(["./demo01"], function (exports_1, context_1) {
    "use strict";
    var demo01_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (demo01_1_1) {
                demo01_1 = demo01_1_1;
            }
        ],
        execute: function () {
            // console.log(exportOne);
            console.log(demo01_1.exportOne);
        }
    };
});
