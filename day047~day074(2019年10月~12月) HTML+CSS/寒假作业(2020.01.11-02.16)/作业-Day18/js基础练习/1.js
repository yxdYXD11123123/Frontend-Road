function f1() {
    var a = b = c = 9;
    console.log(a);    // 9
    console.log(b);    // 9
    console.log(c);    // 9
}
f1();
// console.log(a);     // 报错
console.log(b);     // 9
console.log(c);     // 9