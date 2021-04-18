let num!: number;
getNum(2);
console.log(num * 2);  // 4   okay

function getNum(count: number) {
  num = count;
}