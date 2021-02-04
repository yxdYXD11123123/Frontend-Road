// 有一个二维数组，每条数据固定stuid表示学号,name表示姓名,gender表示性别
var students = [
  { stuid: "S01", name: "周夏", gender: "男", score: 86 },
  { stuid: "S02", name: "郑竹", gender: "男", score: 77 },
  { stuid: "S03", name: "吴兰", gender: "女", score: 35 },
  { stuid: "S04", name: "李云", gender: "男", score: 56 },
];
// 定义函数getMaxScore,
// 要求:接收学生信息二维数组students,函数中找出成绩最高和最低的学生姓名，并将结果返回

function getMaxScore(arr) {
  // 保存成绩
  let num = [];
  // 查找成绩
  for (let i = 0; i < arr.length; i++) {
    num.push(arr[i].score);
  }

  // 找到最大最小值
  let max = num[0];
  let min = num[0];
  for (let i = 0; i < num.length; i++) {
    // 求出最大值
    if (num[i] > max) {
      max = num[i];
    }
    // 求出最小值
    if (num[i] < min) {
      min = num[i];
    }
  }

  //返回的对象
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    // 返回最大值的名字
    if (arr[i].score == max) {
      obj.maxName = arr[i].name;
    }
    // 返回最小值的名字
    if (arr[i].score == min) {
      obj.minName = arr[i].name;
    }
  }
  return obj;
}
// 传入参数
let result = getMaxScore(students);
console.log(result);

//#region 方法二

// let result = getMaxScore(students);
// console.log(result);
// function getMaxScore(arr) {
//   let num = [];
//   for (let i = 0; i < arr.length; i++) {
//     num.push(arr[i].score);
//   }
//   let max = Math.max.apply(null, num);
//   let min = Math.min.apply(null, num);
//   let obj = {};
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].score == max) {
//       obj.maxName = arr[i].name;
//     }
//     if (arr[i].score == min) {
//       obj.minName = arr[i].name;
//     }
//   }
//   return obj;
// }

// let result = getMaxScore(students);
// console.log(result);

//#endregion
