"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get("/login", function (req, res) {
    res.send("\n  <form method=\"POST\">\n  <div>\n    <label>Email</label>\n    <input name=\"email\" />\n  </div>\n  <div>\n    <label>Password</label>\n    <input name=\"password\" type=\"password\" />\n  </div>\n  <button>Submit</button>\n</form>\n    ");
});
