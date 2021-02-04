/*
55555
4444
333
22
1
22
333
4444
55555
*/

// 步骤：
for (let i = 5; i >= 1; i--) {
    let str = ''
    for (let j = 1; j <= i; j++) {
        str += i;
    }
    console.log(str);
}
for (let i = 2; i <= 5; i++) {
    let str = ''
    for (let j = 1; j <= i; j++) {
        str += i;
    }
    console.log(str);
}