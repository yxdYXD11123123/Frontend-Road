#  JSON

是 JavaScript Object Notation 的缩写，是一种轻量级的数据交换的格式。

（符合js对象或数组格式的 **字符串**）

是独立语言，有自我描述性

用于： 存储 和 传输 数据

优点：轻量级，易于阅读，自我描述

```js
// json一共有两种环境， 还可以写在json文件中

// 语法：   js中 json是字符串
// 是js语法的子集

// 语法规则：

// 符合对象格式的字符串
// 虽然json是对象格式的  但是键必须用双引号 ，如果值是字符串 也必须用双引号
let obj = {
    name : 'dong',
    age: 18
}

let objJson = '{"name":"dong","age":18}'

// 符合数组格式的字符串
let arr = ['a','b','c']

let arrJson = '["a","b","c"]'  // 外面必须用单引号
```

```json
// JSON环境
[
    {
        "name": "dong",
        "age": 18,
        "family": [
            {
                "baba": "大明",
                "age": 44
            },
            {
                "妈妈": "小明",
                "family": [
                    {
                        "yeye": "爷爷"
                    }
                ]
            }
        ]
    }
]
```

## JSON的方法

```js
let objJson = '{"name":"dong","age":18}'
let arrJson = '["a","b","c"]'
// 上面数据的本质 是字符串 我们能操作的变量是 数组，对象等
// 如果要把json字符串变成js对象，  用的方法：JSON.parse(JSON字符串)
let obj = JSON.parse(objJson)
console.log(obj);
console.log(typeof obj);   // object
let arr = JSON.parse(arrJson)
console.log(arr);
console.log(Array.isArray(arr)); // true
```

## 对象转 JSON

```js
let obj = {
    name: 'dong',
    age: 18
}
// 对象转 json
// JSON.stringify(对象或数组)
let objJson = JSON.stringify(obj)
console.log(objJson);  //   {"name":"dong","age":18}
```

# Babel 转换

## 为什么要使用Babel？

1. js的语法版本在不断更新，但是浏览器的支持程度却不一样，为了解决不同浏览器对于js新语法的支持程度不一样的问题，需要用Babel

2. 把新语法转换成老语法

   ```js
   let name = 'dong'
   const AGE = 18
   
   let fn = () => {
       console.log('aaa')
   }
   // 转换为
   var fn = function fn(){
       console.log('aaa')
   }
   
   let fn1 = () => 2
   // 转换为
   var fn1 = function fn1(){
       return 2
   }
   ```

# Set 集合  和  Array 数组

es5中Array数组有缺点，因此在es6中出现了set

Array 中的数据可以重复，但是set中的数据不能重复

## 特点：

set集合中不允许出现重复的元素，所以多数情况下被用来 给数组去重

```js
let arr = [1, 2, 3, 12, 3, 2, 1]
let set = new Set(arr)
console.log(set);
// Set { 1, 2, 3, 12 }
```

## 语法：

### 定义

`let set = new Set(arr)`

## 方法：

```js
// 属性：size
console.log(set.size);

// 方法：添加元素  add()
set.add(66);
set.add(1)  // set不能添加重复元素，就算加了也白加
console.log(set);

// 方法：判断有没有该元素 has()
console.log(set.has('66'));  // true

// 方法：删除 delete()   成功返回true , 失败返回false
set.delete('12')
console.log(set);

// 方法：清除 clear()
set.clear()
console.log(set);

```

### 遍历方法：

```js
for (let key of set.keys()) {
    console.log(key);
}

for (let value of set.values()) {
    console.log(value);
}
for (let item of set.entries()) {
    console.log(item);   // item 是一个数组 [元素，元素]
}
// [ 1, 1 ]
// [ 2, 2 ]
// [ 3, 3 ]
// [ 12, 12 ]
// [ 66, 66 ]

set.forEach(function (value, key, set) {
    console.log(value, key, set);
})
// 1 1 Set { 1, 2, 3, 12, 66 }
// 2 2 Set { 1, 2, 3, 12, 66 }
// 3 3 Set { 1, 2, 3, 12, 66 }
// 12 12 Set { 1, 2, 3, 12, 66 }
// 66 66 Set { 1, 2, 3, 12, 66 }
```





# Map 字典  和  Object 对象

es5中Object对象有缺点，因此在es6中出现了map

```js
// Object 的键有哪些数据类型   （Object的缺点:键 的 数据类型只有字符串）
let obj = {
    1: 'a',
    '2': 'b',
    true: 'c',
    undefined: 'd',
    null: 'e'
}
for (let key in obj) {
    console.log(typeof key);
}

//string
//string
//string
//string
//string
```

## 语法：

1. 初始化一个空的map

```js
var map = new Map();
```

2. 通过字面量方式声明

   ```js
   // 初始化Map需要一个二维数组
   var m = new Map([
       ['Cindy',59],
       ['Kiddy',23],
       [true,'boolean']
   ])
   console.log(m);
   // Map { 'Cindy' => 59, 'Kiddy' => 23, true => 'boolean' }
   
   console.log(m.size);  // 3
   ```

## Map的属性和方法

1. 添加键值对

   **语法：`字典名.set(键的名字，值得名字)`**

   给字典添加成员键值对， 返回新的

   ```js
   let map = new Map();
   // 在字典中增加数据
   // 字典名.set(键，值)
   map.set('name',1);
   map.set('married',false)
   
   ```

2. 判断某一个键 是否存在 于map中

   **语法：`字典名.has(键)`**

   ```js
   console.log(map.has('name'))  // true
   console.log(map.has('name1')) // false
   ```

3. 返回字典中有几个键值对

   **语法：`字典名.size`**

   ```js
   console.log(map.size)   // 3(map的长度 / 有多少个键值对)
   ```

4. 通过键，获取字典中对应的值

   **`get(key)`**

5. 通过键，删除对应的那条数据， 并返回 true  false

   **`delete(key)`**

6. 清除所用成员数据

   **`字典名.clear()`**

## Map 的遍历方法

### 遍历方法：

```js
// 方法一：遍历键
// 通过for ... of 遍历map中所有的键
for (let key of map.keys()) {
    console.log(key);
}
// map.keys() 的返回值为 一个对象
console.log(map.keys());

// 方法二：遍历值
// 通过for ... of 遍历map中所有的值
for (let value of map.values()) {
    console.log(value);
}
// map.values() 的返回值为 一个对象
console.log(map.values());

// 方法三：遍历键值对
for (let item of map.entries()) {
    console.log(item[0] + '****' + item[1]);  
    // item 是一个数组，第一个元素是键， 第二个元素是值
}
console.log(map.entries());

// 方法四：用forEach遍历
// map.forEach(function(值,键,map本身){})   第三个参数是map本身，一般不需要
map.forEach(function (value, key) {
    console.log(key + '  ' + value + "  " + map);
})
```

# Iterable

## 什么是Iterable?

es6 标准：Array, Set, Map 都属于 Iterable

可以使用for...of遍历的统一集合类型 包括：Array, Set, Map

```js
let arr1 = [1, 2, 3]
for (let item of arr1.entries()) {
    console.log(item);
}
// [ 0, 1 ]
// [ 1, 2 ]
// [ 2, 3 ]
```

# 拓展运算符

解构数组的方法   `... `

```js
let arr3 = [1, 2, 3, 4]
console.log(...arr3); // 1 2 3 4

// 合并数组   不再需要concat
let arr4 = [2, 3, 4]
let arr5 = [...arr3, ...arr4]
console.log(arr5);
```

