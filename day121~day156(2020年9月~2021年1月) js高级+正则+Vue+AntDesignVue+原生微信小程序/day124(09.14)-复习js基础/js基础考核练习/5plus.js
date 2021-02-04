// 字符串查找,
// 不使用indexOf,正则，substr,substring,contain,slice等现成的方法,实现如下效果：
//  a ="34",b="1234567"，返回2

let str = "12354355";
let find = '355';
let index = -1;

// 方法一：
function indexOfOne(str, find) {
    let arr = [];
    for (let i = 0; i < str.length - find.length + 1; i++) {
        if (str[i] == find[0]) {
            let jieQu = '';
            for (let j = 0; j < find.length; j++) {
                jieQu = jieQu + str[i + j];
            }
            arr.push(jieQu);
        }
    }
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == find) {
            return i;
        }
    }
    return -1;
}
console.log(indexOfOne(str, find));