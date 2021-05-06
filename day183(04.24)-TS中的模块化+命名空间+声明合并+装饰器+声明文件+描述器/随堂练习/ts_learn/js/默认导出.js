System.register([], function (exports_1, context_1) {
    "use strict";
    var exportThree, exportFour;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exportThree = "111";
            exportFour = 111;
            exports_1("default", {
                exportFour,
                exportThree
            });
        }
    };
});
