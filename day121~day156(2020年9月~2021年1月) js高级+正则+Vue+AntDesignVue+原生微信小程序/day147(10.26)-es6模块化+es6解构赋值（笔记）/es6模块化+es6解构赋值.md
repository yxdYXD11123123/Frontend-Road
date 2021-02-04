## `ES6`模块化

### 概述

* 历史上，`JavaScript` 一直没有模块体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来，其他语言都有这项功能，但是`JavaScript` 任何这方面的支持都没有，这对开发大型的复杂的项目形成巨大障碍
* 在`ES6`之前，社区制定了一些模块加载方案，最主要的有`CommonJs`和`AMD`两种，前者用于服务器，后者用于浏览器。`ES6`在语言标准的层面上，实现了模块功能，而且实现的相当简单，完全可以取代`CommonJs`和`AMD`规范，成为浏览器和服务器通用的模块解决方案。
* `ES6` 是编译时加载，所以使得静态分析成为可能。有了它，就能进一步拓宽JavaScript的语法，比如引入宏和类型检查（type system）这些只能靠静态分析实现的功能。

### 浏览器的模块化

1. `AMD`（`Asynchoronous Module Definition`，异步模块定义）

   代表产品为：`Require.js`

2. `CMD`（`Common Module Definition`，通用模块定义）

   代表产品为：`Sea.js`

### 服务器端的模块化

服务器端的模块化规范是使用`CommonJs` 规范：

1. 使用require引入其他模块或者包
2. 使用`exports`或者`module.exports`导出模块成员
3. 一个文件就是一个模块，都拥有独立的作用域

模块功能主要由两个命令构成：`export`和`import.export`命令用于规定模块的对外接口，`import`

 命令用于输入其他模块提供的功能

### export 命令

一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取，如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量，下面是一个`js`文件，里面使用export命令输出变量

```js
// 变量
// export let a = 5;
// export let b = 6;
// 或者
let a = 5;
let b = 6;
// 方法
let add = function (x, y) {
  return x + y;
}

// 导出：
// 方式一：解构赋值的方式导出
export { a, b, add }

// 方式二：
// 把对象{a,b,add}的设为默认变量导出
// export default { a, b, add }
```

### import 命令

使用export命令定义了模块的对外接口以后，其他`js` 文件就可以通过`import` 命令加载这个模块 

```js
import { createApp } from "vue";
import App from "./App.vue";
// 方式一：
// 解构赋值导入
import { a, b, add } from './js/index';
console.log(a, b, add(1, 2));
// 或者 
// 导出全部，起名为index
import * as index from './js/index';
console.log(index.a, index.b, index.add(8, 8));

// 方式二：
// 引入 index.js 并把导出的默认变量重命名为index
// import index from './js/index';
// console.log(index.a, index.add(1, 8));

createApp(App).mount("#app");

```

### export default 命令

从前面的例子可以看出，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

```js
// 第一组
export default function crc32() { // 输出
  // ...
}
import crc32 from 'crc32'; // 输入


// 第二组
export function crc32() { // 输出
  // ...
};
import {crc32} from 'crc32'; // 输入
```



## `ES6` 解构赋值

### 概述

解构赋值语法是一种JavaScript表达式，通过解构赋值，可以将属性值从对象/数组中取出，赋值给其他变量

```js
// 解构赋值
// 对象的解构赋值
let { name: age1, age: name1 } = {
  name: 'dong',
  age: 12
}
console.log(name1, age1); // 12  "dong"

// 数组的解构赋值
// 不要的可以空出来  还可以设置默认值（对应位置是undefined时才有作用）
let [a, , c, b = 4] = [1, 2, 3];
console.log(a, c, b); // 1 3 4

// 利用数组解构赋值  互换值
let num1 = 9;
let num2 = 8;
[num2, num1] = [num1, num2];
console.log(num1, num2);  // 8 9

// 字符串的解构赋值
let [s1, s2, s3] = 'ABC';
console.log(s1, s2, s3);
// length
let { length: len } = '12345';
console.log(len);  // 5 
```

