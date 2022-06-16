"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CsvFileReader {
    constructor() {
        this.data = [];
    }
    read() {
        this.data = fs_1.default
            .readFileSync(path_1.default.resolve(this.filename), {
            encoding: "utf-8",
        })
            .split("\n")
            .map((row) => {
            return row.split(",");
        });
    }
}
exports.CsvFileReader = CsvFileReader;
