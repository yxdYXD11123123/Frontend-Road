// Set 集合 
let arr = [1, 2, 3, 4, 5, 2, 1]
// 声明一个新的Set , 并且set集合中不允许出现重复的元素
let set = new Set(arr)  // Set { 1, 2, 3, 4, 5 }

// 属性：size set的长度
console.log(set.size);

// 方法：添加元素  add()
set.add(66)

// 方法： 判断有没有该元素  has()
console.log(set.has(1));

// 方法：删除 delete()  成功返回true， 失败返回false
set.delete(3)
console.log(set);

// 方法：清除 clear()
set.clear()
console.log(set);

let set1 = new Set([1, 3])
// 遍历方法：
for (let key of set1.keys()) {
    console.log(key);
}
for (let value of set1.values()) {
    console.log(value);
}
for (let item of set1.entries()) {
    console.log(item[0]);
}
set1.forEach(function (value) {
    console.log(value);
})
