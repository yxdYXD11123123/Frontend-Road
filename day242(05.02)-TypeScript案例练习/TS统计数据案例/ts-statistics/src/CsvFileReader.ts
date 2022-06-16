import fs from "fs";
import path from "path";

export abstract class CsvFileReader {
  data: string[][] = [];

  abstract mapRow(row: string[]): any;
  abstract filename: string;

  read() {
    this.data = fs
      .readFileSync(path.resolve(this.filename), {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row) => {
        return row.split(",");
      });
  }
}
