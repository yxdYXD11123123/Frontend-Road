// 8. 去掉字符串两端和中间的空格，var str = '   ab  cd    ';

// 步骤：
var str = '   ab  cd    '
str = str.trim()
for (let i = 0; i < str.length; i++) {
    if (str[i] == ' ') {
        str = str.replace(' ', '')
        i--
    }
}
console.log(str);
