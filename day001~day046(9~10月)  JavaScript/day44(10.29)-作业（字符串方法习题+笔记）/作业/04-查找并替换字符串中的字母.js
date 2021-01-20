// 4. var str= 'qweqweoeqweroqweqweodfsfdo'
//   1)查找字符串中所有字母 'o'出现的位置
//   2)把字符串中的所有字母'o'替换成 '-';

// 步骤：
var str = 'qweqweoeqweroqweqweodfsfdo'
// 声明一个数组，存放字符串中所有‘o’的索引
let arr = []
// 遍历所有字符
for (let i = 0; i < str.length; i++) {
    if (str[i] == 'o') {
        // 将所有‘o’的索引存入数组中
        arr.push(i)
    }
}
// 输出数组
console.log(arr);


// 循环数组，数组的长度，就是需要修改几次
for (let i = 0; i < arr.length; i++) {
    // 给字符串重新赋值为 修改过的字符串
    str = str.replace('o', '-')
}
// 输出修改完的字符串
console.log(str);
