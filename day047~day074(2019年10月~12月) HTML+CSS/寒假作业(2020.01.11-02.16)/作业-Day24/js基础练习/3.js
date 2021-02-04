// 操作字符串 let str = 'AaBbCcDdEe'

// 1) 输出str字符串中所有的大写字母
// 2) 查看字符串是否有'Ff'，有返回对应下标(索引)，没有返回false
// 3) 使用两种方式截取字符串'bCcD'

let str = 'AaBbCcDdEe'
for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
        console.log(str[i]);
    }
}
if (str.includes("Ff") == true) {
    console.log(str.indexOf('Ff'));
}
else {
    console.log(false);
}

let first = str.substr(3, 4)
let second = str.substring(7, 3)
console.log(first, second);
