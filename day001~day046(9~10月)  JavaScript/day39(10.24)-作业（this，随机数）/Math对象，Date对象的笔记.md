# Math 对象

帮助我们进行数学运算

## 什么是math对象

Math对象用于执行数学任务，不需要new, 直接调用即可

### 语法：

Math.方法名()   或者   Math.属性;

```js
// 圆周率
console.log(Math.PI)
// 向下取整（往小取）
Math.floor(数字)
console.log(Math.4.91)  // 4
console.log(Math.-20.5)  // 21
// 向上取整（往大取）
Math.ceil(数字)
Math.ceil(9.01)  // 10
// 四舍五入
Math.round(4.59)  // 5
// 求平方根, 开平方
Math.sqrt(数字)
// 取绝对值，返回一个正数
Math.abs(数字)
Math.abs(-5)  // 5
Math.abs(5)   // 5
// 最大值 ，不能写数组，返回一个最大的数
Math.max(数字，数字，数字) 
Math.max(1,13,3,2)  // 13
// 最小值
Math.min(数字，数字，数字)
// （底数，指数）底数次幂  返回 结果数值
Math.pow(底数，指数)
Math.pow(2,2)  // 4
// 随机数 返回包括0，不包括1 0-1之间的所有数
Math.random() 
console.log(Math.floor(Math.random() * 100));  // 0-99
// 随机两数之间的所有数，包含两数
return Math.floor(Math.random() * (max - min + 1)) + min; // min-max
```

# Date 对象

是关于时间和日期的对象，用于处理日期与时间

是一个构造函数，需要用new来调用创建我们的日期对象

```js
let date = new Date();
console.log(date);
// 如果date方法中没有参数，则获取当前日期
```

### Date（）对象的参数

1. 逗号分隔年月日

   在js中，月份是从0开始的所以每次碰到月份都要+1

   ```js
   let date = new Date('2019-10-10 08:00:00')
   // 
   ```

   

2. -分割年月日

##  Date 对象的原始值

从1970年1月1日0时0分0秒到现在的毫秒值

### `valueOf()` 

### `now()`

### + new Date()

都可以获得date对象的原始值

## 获取具体的年月日，小时，分钟，秒

```js
var date = new Date()
let year = date.getFullYear();
let month = date.getMonth()+1;  // 记得加1，因为是从0月开始的
let day = date.getDay();  // 周几
let day = date.getDate();  // 几号
let hour = date.getHours();
let min = date.getMinutes();
let second = date.getSeconds();
```

