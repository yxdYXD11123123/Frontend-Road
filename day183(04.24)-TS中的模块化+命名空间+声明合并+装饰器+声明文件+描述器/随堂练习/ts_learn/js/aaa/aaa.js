"use strict";
var XSpace;
(function (XSpace) {
    function fn() {
        return 666;
    }
    XSpace.fn = fn;
})(XSpace || (XSpace = {}));
