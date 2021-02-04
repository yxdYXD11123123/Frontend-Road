// 写一个(函数)，实现n的阶层的和求1+2!+3!+...+n!的和

/**
 * 1
 * 1*2
 * 1*2*3
 * 1*2*3*4
 * 1*2*3*4*5
 */

// 先求n的阶层

function factorial(n) {
  // if (n <= 1) {
  //   return 1;
  // } else {
  //   return n * factorial(n - 1);
  // }
  return n <= 1 ? 1 : n * factorial(n - 1);
}
console.log("4的阶层是", factorial(4));

/*
 *如果上面的factorial不理解可以看下面的factorial
 *
 */
// `````````````````````````````````````````
// function factorial(n) {
//   let result = 1;
//   for (let i = 1; i <= n; i++) {
//     result *= i;
//   }
//   return result;
// }
// console.log(factorial(4));
// `````````````````````````````````````````
// 再计算阶层和
function getSum(n) {
  let count = 0;
  for (i = 1; i <= n; i++) {
    count += factorial(i);
  }
  return count;
}

console.log("答案到3的阶层和是", getSum(3));
