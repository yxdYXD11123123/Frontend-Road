// 方法二：完善方一，方法2.0(非最终版)
function getIndexOf(a, b) {
  var lena = a.length; //a的长度
  var lenb = b.length; //b的长度
  //只能在b中查找是否有a
  if (lena > lenb) {
    return -1;
  } else {
    for (var i = 0; i < lenb; i++) {
      if (a[0] == b[i]) {
        //定义index储存索引
        var index = i;
        //连接字符，与a进行判断
        var result = "";
        //循环次数为a的长度
        for (var j = index; j < index + lena; j++) {
          result += b[j];
          //满足相等输出index索引值
          if (result == a) {
            return index;
          }
        }
      }
    }
  }
  return -1;
}
//测试：
var indexOf = getIndexOf("34", "1234567");
console.log(indexOf);
// var indexOf = getIndexOf("35", "1234567");
// console.log(indexOf);
// var indexOf = getIndexOf("355", "12354355");
// console.log(indexOf);
// var indexOf = getIndexOf("668", "066066066");
// console.log(indexOf);
