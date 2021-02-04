## js简答题

1. 对象组成都是采用键值对的形式，我们是否能把函数放到对象的属性值当中？该怎么做？

   可以，属性名为函数名，属性值为函数，然后这个函数就属于对象的一个方法

2. 能够使用什么方法遍历对象？如何遍历打印对象的属性名和属性值？

   ```js
   for (let key in obj) {
       console.log(key); // 打印对象的属性名
       console.log(obj[key]); // 打印对象的属性值
   }
   ```

   

3. 遍历对象的方法能否也拿来遍历数组？为什么？

   可以，因为数组也是一种特殊的对象，索引相当于对象的键，元素相当于对象的键值。

4. 我们知道给对象添加属性有三种方式，那么删除对象的属性能否也有三种方式或者更多呢？请说说你认为删除对象属性的方式有哪些

   ```js
   // 第一种：
   delete obj.name
   // 第二种
   delete obj["name"]
   // 第三种:
   var jian = "name"
   delete obj[jian]
   console.log(obj);
   
   ```

   


## js编程题

1. 定义一个人的对象, 属性有姓名，年龄，性别，身高，方法有：能吃饭，能跑步，
 - 遍历对象，将对象的属性和值输出来，并且调用其中的一个方法，将结果在控制台输出
 - 将对象得`年龄`这个属性删除
 - 将对象的`身高`的值题换成"180cm"
 - 给对象添加属性`学号`，通过两种方式

 ```js
let person = {
    name: "dong",
    age: 22,
    gender: 'man',
    height: 165,
    eat: function () {
        console.log("能吃饭");
    },
    run: function () {
        console.log("能跑步");
    }
}

// 遍历
for (let key in person) {
    console.log(key + "-" + person[key]);
}
person.eat();

//
delete person.age;

person.height = "180cm"

// person.studentId = 01;
person['studentId'] = 02

console.log(person);

````


2. 定义一个车的对象，属性有颜色，大小，型号，方法有：能行驶
 - 获取对象的`颜色`，在控制台输出
 - 调用方法，在控制台输出格式要求`马路上正在行驶的是一辆xx色的xx型号的车`

 ```js
let car = {
    color: "red",
    size: "normal",
    style: "中",
    drive: function () {
        console.log(`马路上正在行驶的是一辆${this.color}色的${this.style}型号的车`);
    }
}

console.log(car.color);

car.drive();
 ```


 3. 【冒泡排序】对下面的数组进行从小到大排序，不允许使用sort

```js
    var arr = [4,2,7,5,3,1,6,9,8]
    var arr = [4, 2, 7, 5, 3, 1, 6, 9, 8]
for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
            let temp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = temp;
        }
    }
}
console.log(arr);

```

4. 【冒泡排序】对下面的数组进行从大到小排序，不允许使用sort

```js
    var arr = [4,2,7,5,3,1,6,9,8]
    var arr = [4, 2, 7, 5, 3, 1, 6, 9, 8]
for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] < arr[j + 1]) {
            let temp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = temp;
        }
    }
}
console.log(arr);

```