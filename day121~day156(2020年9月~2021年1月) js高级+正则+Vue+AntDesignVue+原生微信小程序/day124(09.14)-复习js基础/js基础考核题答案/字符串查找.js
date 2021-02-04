//  字符串查找,不使用indexOf,正则，substr,substring,contain,slice等现成的方法,实现如下效果：
//  a ="34",b="1234567"，返回2
//  a = '35', b= "1234567" 返回-1
//  a = "355", b = "12354355"  返回5

function str(a, b) {
  // 转数组
  
  let arr = a.split("");
  let brr = b.split("");
  // 保存索引
  let indexB;
  for (let i = 0; i < brr.length; i++) {
    if (brr[i] == arr[0]) {
      // console.log(i);
      indexB = i; //2
      break;
    }
  }
  // 保存a字符串
  let sumA = "";
  for (let i = 0; i < arr.length; i++) {
    sumA += arr[i];
  }
  // console.log(sumA);
  // 保存b字符串
  let sumB = "";
  for (let i = indexB; i < arr.length + indexB; i++) {
    sumB += brr[i];
  }
  // console.log(sumB);

  //对比字符串差异
  if (sumA == sumB) {
    // console.log(1);
    // console.log(indexB);
    return indexB;
  } else {
    return -1;
  }
}

let result = str("34", "1234567333");
console.log(result);
