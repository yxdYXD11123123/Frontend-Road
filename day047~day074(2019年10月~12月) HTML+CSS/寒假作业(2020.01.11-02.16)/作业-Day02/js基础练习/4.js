// 遇到的undefined的情况

// 1. 变量未赋值
let nothing
console.log(nothing);
// 2. 对象调用不存在的属性时
let person = {
    name: "dong"
}
console.log(person.age);
// 3. 超出字符串和数字长度时
let str = "abcd"
let arr = [1, 2, 3, 4]
console.log(str[4], arr[5]);
// 4. 函数没有return返回值时
function fn1() {
    let str = '我没有返回值';
}
console.log(fn1());

