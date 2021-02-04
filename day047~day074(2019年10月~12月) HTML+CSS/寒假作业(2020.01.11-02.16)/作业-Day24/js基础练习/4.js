// 操作字符串 let str = 'hello-word'
// 1) 将str字符串中的h和w替换成对应的大写字母
// 2) 在 1)的基础上使该字符串变成数组['Hello','Word']
// 3) 再将 2)中的数组转成字符串'Hello_Word'

let str = 'hello-word'
str = str.split('')
for (let i = 0; i < str.length; i++) {
    if (str[i] == 'w') {
        str[i] = str[i].toUpperCase();
    }
}
str = str.join("")
console.log(str);
str = str.split('')
for (let i = 0; i < str.length; i++) {
    if (str[i] == 'h') {
        str[i] = str[i].toUpperCase();
    }
}
str = str.join("").split('-')
console.log(str);
str = str.join("_")
console.log(str);
