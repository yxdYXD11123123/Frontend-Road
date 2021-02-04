## js简答题

1. 定义Map字典的语法格式是什么？

   ```js
   // 初始化一个空的map
   let map = new Map();
   // 通过字面量方式声明
   // 初始化Map需要一个二维数组
   let m = new Map([
       ['Cindy',59],
       ['Kiddy',23],
       [true,"boolean"]
   ])
   console.log(me);
   // Map {'Cindy' => 59, 'Kiddy' => 23, true => 'boolean'}
   console.log(m.size);
   // 3
   ```

   

2. 定义Set集合的语法格式是什么？

   ```js
   let set = new Set(数组);
   
   // 集合长度
   set.size
   
   // 添加元素
   set.add();
   
   // 判断有没有该元素 
   set.has("66") //  true/fasle
   
   // 清除所有元素
   set.clear()
   
   // 遍历方法
   for (let key of set.keys()) {}
   for (let value of set.values()) {}
   for (let item of set.entries()) {} // item 是一个数组[元素，元素]
   
   set.forEach(function (value, key, set) {
   	console.log(value, key, set);
   })
   ```

   

3. Set集合的特点有哪些？

   Set集合中的元素不可重复

   

4. Set集合的打印结果和Array的打印结果有什么不同？

   Set集合的打印结果是 { }  而Array得打印结果是 [ ]

   

5. 什么是 `json` ？作用是什么？优点有什么？

   是JavaScript Object Notation 的缩写，是一种轻量级的数据交换的格式。

   在js格式中，`json`就是一种符合js对象或数组格式的字符串

   作用：存储 和 传输 数据

   优点：轻量级，易于阅读，有自我描述性



## js编程题

1. 使用Set集合对下面数组去重

    1) [1,1,2,2,3,3,4,4,5,5]
    2) [true,'66',null,true,66,null,88,'set',88]
    3) [1,[0],1,[0],1,[0]]

```js
let arrA = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
arrA = [...new Set(arrA)]
console.log(arrA);

let arrB = [true, '66', null, true, 66, null, 88, 'set', 88]
arrB = Array.from(new Set(arrB))
console.log(arrB);

let arrC = [1, [0], 1, [0], 1, [0]]
let setC = new Set(arrC)
console.log(setC);

arrC = Array.from(new Set(arrC))
console.log(arrC);
```

2. 定义2个数组，let arrA = [1,2,3,3]; let arrB = [2,4,5,6]求2个数组的并集，交集
```js
let arrA = [1, 2, 3, 3];
let arrB = [2, 4, 5, 6];
let jiaoJi = []
for (let i = 0; i < arrA.length; i++) {
    if (arrB.includes(arrA[i]) == true) {
        jiaoJi.push(arrA[i])
    }
}
console.log(jiaoJi);

let bingJi = [...new Set(arrA.concat(arrB))]
console.log(bingJi);
```


3. 操作字符串 let str = 'AaBbCcDdEe'
  
    1) 输出str字符串中所有的大写字母
    2) 查看字符串是否有'Ff'，有返回对应下标(索引)，没有返回false
    3) 使用两种方式截取字符串'bCcD'
```js
let str = 'AaBbCcDdEe'
for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
        console.log(str[i]);
    }
}
if (str.includes("Ff") == true) {
    console.log(str.indexOf('Ff'));
}
else {
    console.log(false);
}

let first = str.substr(3, 4)
let second = str.substring(7, 3)
console.log(first, second);
```

4. 操作字符串 let str = 'hello-word'
    1) 将str字符串中的h和w替换成对应的大写字母
    2) 在 1)的基础上使该字符串变成数组['Hello','Word']
    3) 再将 2)中的数组转成字符串'Hello_Word'
  ```js
let str = 'hello-word'
str = str.split('')
for (let i = 0; i < str.length; i++) {
    if (str[i] == 'w') {
        str[i] = str[i].toUpperCase();
    }
}
str = str.join("")
console.log(str);
str = str.split('')
for (let i = 0; i < str.length; i++) {
    if (str[i] == 'h') {
        str[i] = str[i].toUpperCase();
    }
}
str = str.join("").split('-')
console.log(str);
str = str.join("_")
console.log(str);

  ```



