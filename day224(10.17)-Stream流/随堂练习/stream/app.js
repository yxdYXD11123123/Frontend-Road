const fs = require("fs");
// fs.readFile只能放已有的内容
const r = fs.createReadStream("aaa.txt");
const w = fs.createWriteStream("./ccc.txt");

r.pipe(w)