"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controllers/decorators/controller");
var express_1 = __importDefault(require("express"));
require("./controllers/LoginController");
var app = (0, express_1.default)();
app.use(controller_1.router);
app.listen(3000, function () { return console.log("服务器启动成功，监听3000"); });
