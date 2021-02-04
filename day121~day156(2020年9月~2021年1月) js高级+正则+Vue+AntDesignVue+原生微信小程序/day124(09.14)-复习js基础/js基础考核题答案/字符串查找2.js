// 官呈达
function getIndexOf(a, b) {
  for (let i = 0; i < b.length; i++) {
    let str = "";
    for (let j = i; j < a.length + i; j++) {
      str += b[j];
      // console.log(str);
    }
    if (str == a) {
      // console.log(str, a);
      return i;
    }
    // console.log(i);

    // console.log(str, a);
  }
  return -1;
}
// 测试;
var indexOf = getIndexOf("34", "1234567");
console.log(indexOf); //2
// var indexOf = getIndexOf("35", "1234567");
// console.log(indexOf); //-1
// var indexOf = getIndexOf("355", "12354355");
// console.log(indexOf); //5
// var indexOf = getIndexOf("123", "120120123");
// console.log(indexOf); //6
