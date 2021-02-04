// 使用 `if分支` 实现判断一个成绩的段位`【A(>=90)；B(>=80)；C(>=70)；D(>=60)；E(<60)】`

let score = 66
if (score >= 90) {
    console.log("A");
}
else if (score >= 80) {
    console.log("B");
}
else if (score >= 70) {
    console.log("C");
}
else if (score >= 60) {
    console.log("D");
}
else if (score < 60) {
    console.log("E");
}