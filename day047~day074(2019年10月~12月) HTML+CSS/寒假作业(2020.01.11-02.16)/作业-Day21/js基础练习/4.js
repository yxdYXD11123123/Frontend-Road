// 判断任意三个数组成的是否是直角三角形，(组成直角三角形的条件是，
// 最大边的平方 = 其他2个边的平方的和),要求使用Math.pow()求出某个数的平方

let a = 4;
let b = 4;
let c = 5;
if (Math.pow(a, 2) == Math.pow(b, 2) + Math.pow(c, 2) || Math.pow(b, 2) == Math.pow(a, 2) + Math.pow(c, 2) || Math.pow(c, 2) == Math.pow(b, 2) + Math.pow(a, 2)) {
    console.log("是直角三角形");
}
else {
    console.log("不是直角三角形");
}