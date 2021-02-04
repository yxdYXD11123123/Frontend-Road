var str =
  "yuan yuan yuan jiang jiang yong aaaaaaaaaaaaa aaaaaaaaaaaaa odpsospoaioaoaoaoaoao";
// 找字符串里面的最长的单词和单词的长度
let strArr = str.split(" ");
// console.log(strArr);

let temp = strArr[0];

for (let i = 0; i < strArr.length; i++) {
  // console.log(strArr[i].length);
  if (strArr[i].length > temp.length) {
    temp = strArr[i];
  }
}
console.log(`字符串里面的最长的单词:${temp}和单词的长度:${temp.length}`);
