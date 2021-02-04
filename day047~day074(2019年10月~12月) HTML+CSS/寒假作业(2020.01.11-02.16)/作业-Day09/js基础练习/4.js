// 使用`if分支`通过用户输入的年龄判断是哪个年龄段的人（儿童：年龄＜14；青少年：14<=年龄＜24；青年：24<年龄＜40; 中年：40＜=年龄＜60; 老年：年龄>=60），

let age = 55;
if (age >= 60) {
    console.log('老年');
}
else if (age >= 40) {
    console.log('中年');
}
else if (age >= 24) {
    console.log("青年");
}
else if (age >= 14) {
    console.log("青少年");
}
else if (age < 14) {
    console.log("儿童");
}