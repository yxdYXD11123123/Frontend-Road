"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.router = void 0;
require("reflect-metadata");
var express_1 = require("express");
exports.router = (0, express_1.Router)();
function controller(routePrefix) {
    return function (constructor) {
        for (var key in constructor.prototype) {
            var path = Reflect.getMetadata("path", constructor.prototype, key);
            var handler = constructor.prototype[key];
            if (path) {
                exports.router.get("".concat(routePrefix).concat(path), handler);
            }
        }
    };
}
exports.controller = controller;
