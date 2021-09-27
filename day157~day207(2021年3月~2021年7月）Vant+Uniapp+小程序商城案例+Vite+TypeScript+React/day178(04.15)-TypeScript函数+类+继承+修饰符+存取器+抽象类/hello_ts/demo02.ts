// 求平均年龄
let getAvg = function (age: number, ...rest: number[]) {
  let sum: number = 0;
  for (let i = 0; i < rest.length; i++) {
    sum += rest[i];
  }
  return (sum + age) / (rest.length + 1);
}

console.log(getAvg(20, 20, 20, 20));