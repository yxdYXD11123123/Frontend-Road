// 13.将下面对象的属性取出来存储到一个数组中
var person = { name: "one", age: 12, sex: "男" };

// 准备一个空数组
let arr = []
// 用 for in 遍历对象属性
for (key in person) {
    // 添加到数组中
    arr.push(key, person[key])

}
console.log(arr);
