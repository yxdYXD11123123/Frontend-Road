// 使用 `switch` 分支实现判断一个成绩的段位`【A(>=90)；B(>=80)；C(>=70)；D(>=60)；E(<60)】`

let score = 55;
switch (parseInt(score / 10)) {
    case 10:
        console.log("A");
        break;
    case 9:
        console.log("A");
        break;
    case 8:
        console.log("B");
        break;
    case 7:
        console.log("C");
        break;
    case 6:
        console.log("D");
        break;
    default:
        console.log("E");
        break;
}