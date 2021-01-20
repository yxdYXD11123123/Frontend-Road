// 6. var str="hello world 378nihao",分别统计出字符串中的英文字母、数字、空格的个数

// 步骤：
var str = "hello world 378nihao"
let obj = {}
obj.English = 0;
obj.Num = 0;
obj.Kong = 0;
for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) {
        obj['English']++
    }
    if (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57) {
        obj['Num']++
    }
    if (str.charCodeAt(i) == 32) {
        obj['Kong']++
    }
}
// console.log(obj);

console.log(`空格数为${obj['Kong']}`);
console.log(`英文字母数为${obj['English']}`);
console.log(`数字个数为${obj['Num']}`);