"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CsvFileReader_1 = require("./CsvFileReader");
// 枚举比赛结果
var matchResult;
(function (matchResult) {
    matchResult["homeWin"] = "H";
    matchResult["awayWin"] = "A";
    matchResult["draw"] = "D";
})(matchResult || (matchResult = {}));
const reader = new CsvFileReader_1.CsvFileReader("football.csv");
reader.read();
console.log(reader.data);
let manUnitedWins = 0;
for (let match of reader.data) {
    if ((match[1] === "Man United" && match[5] === matchResult.homeWin) ||
        (match[2] === "Man United" && match[5] === matchResult.awayWin)) {
        manUnitedWins++;
    }
}
console.log(manUnitedWins);
