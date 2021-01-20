// Map 字典

// 1. 初始化一个空的map
var map = new Map();
// 2. 通过字面量方式声明
var m = new Map([
    ["Cindy", 59],
    ["Kiddy", 23],
    [true, 'boolean']
])
console.log(m);

// Map 的 属性和方法
// 1. 添加键值对   字典名.set(键的名字，值的名字)
//    给字典添加成员键值对， 返回新的字典
map.set('name', 1);
map.set("married", false)

// 2. 返回字典中有几个键值对   字典名.size
console.log(map.size);

// 3. 通过键，获取字典中对应的值   字典名.get(键)
console.log(map.get('name'));

// 4. 通过键，删除对应的那条数据，并返回 true  false  字典名.delete(键)
map.delete('name')
console.log(map);

// 5. 判断一个键是否存在于 map 中    字典名.has(要查找的键)
console.log(map.has('name'));

// 6. 清除所有成员数据    字典名.clear()
// map.clear()
console.log(map);


// 遍历方法
// 方法一：遍历键
for (let key of map.keys()) {
    console.log(key);
}
// 返回值为一个对象
console.log(map.keys());

// 方法二：遍历值
for (let value of map.values()) {
    console.log(value);
}
// 返回值为一个对象
console.log(map.values());

// 方法三：遍历键值对
for (let item of map.entries()) {
    // item是一个数组，第一个元素是键，第二个元素是值
    console.log(item[0] + "****" + item[1]);
}
console.log(map.entries());
