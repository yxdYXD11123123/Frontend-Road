## js简答题

1. 若一个变量没有声明直接赋值，它会属于什么变量？根据所学知识说说它会有什么特性

   全局变量，它会向外一层一层找


2. 请解释一下什么是作用域链？

   作用域链就是内部函数访问外部函数的变量，采取的是链式查找的方式来决定取哪个值，从内到外，站在目标出发，一层一层地往外找，决定时按**就近原则**选择。

   规定了函数内变量的查找过程

3. 同名函数和变量是怎么解析的？

   函数会提升整体都提升作用域到最上层，变量只有声明部分会提升到最上层

   同名函数提升会优先于同名变量的提升

4. 函数表达式预解析属于变量的预解析还是函数的预解析？为什么？

   函数表达式预解析属于变量的预解析，因为表达式声明函数相当于在声明一个变量



## js编程题
1. 输出下列代码a的值分别是多少？
```js
var a = 25;
 function abc() {
   alert(a);   // undefined
   var a = 10;
 }
abc();
alert(a)  // 25

```
2.输出下列代码a的值分别是多少？
```js
var a = 25;
 function abc() {
   alert(a);   // 25
   a = 10;
 }
abc();
alert(a)  // 10

```
3. 输出下列代码name3的值分别是多少？
```js
var name3 = "zs";
function f3() {
    var name3 = "ls";
    function f4() {
        name3 = "ww";
    }
    f4();
    console.log(name3);   // ww
}
f3();
console.log(name3); // zs
```

4.下列代码控制台打印出的值分别是多少？
```js
var color = "red";
   function outer() {
       var anotherColor = "blue";
       function inner() {
           var tmpColor = color;  // 函数outer中tmpcolor -- red
           color = anotherColor;  // 全局下color -- blue
           anotherColor = tmpColor;  // anothercolor -- red 
           console.log(anotherColor);     // red
       }
       inner();
   }
   outer();
   console.log(color);  // blue
```

5. 下列代码控制台打印出的值分别是多少？
```js
function f1() {
  var a = b = c = 9;
  console.log(a);    // 9
  console.log(b);    // 9
  console.log(c);    // 9
}
 f1();
 console.log(a);     // 报错
 console.log(b);     // 9
 console.log(c);     // 9
```