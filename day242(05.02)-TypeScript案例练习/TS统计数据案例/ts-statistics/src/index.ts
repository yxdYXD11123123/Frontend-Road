import { CsvFileReader } from "./CsvFileReader";
import fs from "fs";
import path from "path";

// 枚举比赛结果
enum matchResult {
  homeWin = "H",
  awayWin = "A",
  draw = "D",
}

const reader = new CsvFileReader("football.csv");
reader.read();
console.log(reader.data);

let manUnitedWins = 0;
for (let match of reader.data) {
  if (
    (match[1] === "Man United" && match[5] === matchResult.homeWin) ||
    (match[2] === "Man United" && match[5] === matchResult.awayWin)
  ) {
    manUnitedWins++;
  }
}
console.log(manUnitedWins);
