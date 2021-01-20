// 10.. 字符串查找,不使用indexOf,正则，substr,substring,contain,slice等现成的方法,实现如下效果：
//     //  a ="34",b="1234567"，返回2
//     //  a = '35', b= "1234567" 返回-1
//     //  a = "355", b = "12354355"  返回5

// 步骤：
function getIndex(a, b) {
    let arrA = []
    for (let i = 0; i < a.length; i++) {
        arrA.push(a[i])
    }
    let arrB = []
    for (let j = 0; j < b.length; j++) {
        arrB.push(b[j])
    }
    if (a.length == 3) {
        for (let i = 0; i < arrA.length; i++) {
            for (let j = 0; j < arrB.length; j++) {
                if (arrA[i] == arrB[j] && arrA[i + 1] == arrB[j + 1] && arrA[i + 2] == arrB[j + 2]) {
                    console.log(j);
                    return;
                }
            }
        }
    }
    if (a.length == 2) {
        for (let i = 0; i < arrA.length; i++) {
            for (let j = 0; j < arrB.length; j++) {
                if (arrA[i] == arrB[j] && arrA[i + 1] == arrB[j + 1]) {
                    console.log(j);
                    return;
                }
            }
        }
    }
    return console.log(-1);
}
let a = "355"
let b = "12354355"
getIndex(a, b)
