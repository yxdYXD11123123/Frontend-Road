## moment.js

是一个轻量级的 JavaScript 时间库。

用于解析，检验，操作，以及显示日期。提高开发效率

使用面极广

```js
// http://momentjs.cn/  下载库

// ../ 上一级目录
// ./  同一级目录

// 引入库 （引入是有顺序的，一定先引入moment.js，再引入其他包）
<script src='./lib/moment.js'></script>
<script src='./lib/zh-cn.js'></script>
<script>
    // 使用库，转为中文
    moment.locale('zh-cn')
    // 使用库
    console.log(moment().format())
	moment.locale('zh-cn')
    console.log(moment().format('MMM Do YY'));
    console.log(moment().startOf('hour').fromNow());

</script>
```

## 检测一个对象是否为数组

#### `typeof`

typeof Null -->  Object

typeof Function --> Function

#### `InstanseOf`

用于识别 某个对象属于哪种具体类型

```js
let arr = new Array();
let obj = new Object();
let Person = function (name, age) {
    this.name = name;
    this.age = age;
    this.study = function () {
        console.log('学习使我快乐')
    }
}
let xiaoMing = new Person('小明', 18)

// 语法：
// 某个对象 instanceof 构造函数（原型）

// == true 代表是那个构造函数创建出来的对象
// 如果是false  那么就不属于那个构造函数创建出来的对象

let result = arr instanceof Array;
let result1 = obj instanceof Object;
let result2 = xiaoMing instanceof Person;
console.log(result, result1, result2); // true, true, true

console.log(arr instanceof Object) // true
console.log(arr instanceof Object) // true
```

#### `isArray()`

用于判断一个对象是否为数组

```js
// 语法：Array.isArray(被检测的数据)
let arr = []
console.log(Array.isArray(arr))//true
```

## 基本包装类型

把基本类型自动包装成复杂对象类型

#### 为什么：

为了使用对象的方法，便于开发（尤其是字符串）

```js
let str = 'jerry';

// 1. 系统自动把简单数据类型包装为复杂数据类型：
//    let temp = new String('jerry');
// 2. 把临时变量的值给 str
//    str = temp;
console.log(str.length)
// 3. 在代码执行后就会销毁实例
//    temp = null;
```

null 空  ：意料之中，人为的设置为空，为了开发需要

undefined ： 意料之外的错误





# 字符串的不可变性

你可以改变数组中的任何一个元素，但是字符串不能改变其中某个字符

## 常用方法：

### `.charAt(index)`

```js
// 空格的位置也要计算
let anyString = 'Brave new world'

let get = anyString.charAt(1)
console.log(get);
```

### `.charCodeAt(index)`

```js
let get = anyString.charCodeAt(0)
console.log(get);  
// 66
// 返回值
```

### `.indexOf(被查找的字符,[从哪个索引开始])`

```js
let anyString = 'Brave new world'

let get = anyString.indexOf('w', 9)
console.log(get);   // 10
```

### `.trim()`  去前后的空格

返回值为  去掉两端空格的新字符串

### `.substr()`  截取

语法：`str.substr(从哪个位置开始，截取字符的个数)`

返回值为  截取的字符串

### `.replace()`  替换

语法：

```js
str.replace(您要替换的字符，替换为的字符)
```

返回值为替换后的新字符串

### `slice()`  截取

提取某个字符串的一部分，并返回。不会改变原字符串

语法：

```js
str.slice(开始的索引，结束的索引)
// 注意：不包括结束索引，返回：截取的新字符串
```

