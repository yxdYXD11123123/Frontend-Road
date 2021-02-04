// 操作数组var arr = [1,[2,3,4],[5,[6,7]],{name:"杨"},true,false]
// 1) 打印出[6,7]
// 2) 打印数组中的对象
// 3) 打印该对象的属性值
// 4) 将数组中的true和false互换位置

var arr = [1, [2, 3, 4], [5, [6, 7]], { name: "杨" }, true, false]

console.log(arr[2][1]);
console.log(arr[3]);
console.log(arr[3].name);
var temp = arr[4];
arr[4] = arr[5];
arr[5] = temp;
console.log(arr);


