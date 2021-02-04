## js简答题

1. 什么是全局作用域？什么是函数(局部)作用域？

   声明在函数外，声明在大括号外的变量函数拥有全局作用域

   声明在函数内，或者是大括号内的变量函数拥有局部作用域

2. ES6新增了块级作用域，谈谈你对块级作用域的理解

   块级作用域就是声明在大括号外的变量作用域块级作用域、不能被大括号外面的代码所访问

3. 为什么需要 `let`定义变量，`let` 和 `const` 有什么共同点，`let` 和 `var` 有什么不同点

   `let`和`const`的共同点：

   1. 在一个作用域中，用var声明的变量会被提升到该作用域的最前面，但是`let`和`const`不能变量提升，在声明之前访问会报错
   2. 在块级作用域时，块之外访问会报错
   3. 不允许在同一块中重复声明
   4. 暂时性死区，所声明的变量或者常量会绑定到该区块，不再受外部影响

   `let` 和 `var` 不同点：

   1. let作用域不可以被提升
   2. let作用域局限于当前代码块
   3. let不能被重复定义
   4. let有父子作用域

   

4. 全局变量和全局作用域，局部变量和局部(函数)作用域是否有关系？有什么关系？

   全局变量作用于全局作用域

   局部变量作用于局部作用域


## js编程题

1. 输出下面预解析的结果，并注释解题过程

    ```js
    1) var a = 10;
       function abc() {
         console.log(a); // undefined
         var a = 9;
       }
       abc();
       console.log(a) // 10
    
    2) var color = "red";
       function outer() {
         var anotherColor = "blue";
       
         function inner() {
           var tmpColor = color;
           color = anotherColor; // blue 作用于全局
           anotherColor = tmpColor;
           console.log(anotherColor); // red
         }
         inner();
       }
       outer();
       console.log(color); // blue
    
    3) var a = 10;
       function fn1() {
         var a = b = c = 9;
         console.log(a); // 9
         console.log(b); // 9 
         console.log(c); // 9 
       }
       fn1();
       console.log(a); // 10
       console.log(b); // 9
       console.log(c); // 9
    
    4) function a(b) {
       console.log(b); // function c
       var s = b();  // 
       console.log(s) // 123  
       }
       a(c);
      
       function c() {
         return 123
       }
    ```

2. 输出下面打印结果并说明理由

    ```js
    1) function test() {
       var x = 31; 
       if (true) {
         var x = 71; 
         console.log(x) // 71   var没有块级作用域，只有函数作用域
         }
         console.log(x) // 71   
       }
       test();
    
    2) function test() {
       let x = 31; 
       if (true) {
         let x = 71; 
         console.log(x) // 71 
         }
         console.log(x) // 31
       }
       test();
    
    3) function fn() {
       if (2 > 1) {
         arr = 10;
         brr = 10;
         let arr;  // let声明之前不可以赋值，因为let作用域不会提升
         var brr;  // 此处声明会提升到函数作用域最上层， 然后 brr=10赋值
         console.log(arr); // 报错  
         console.log(brr); // 10  
         }
        }
    fn();
    
    4) var a = [];
       for (var i = 0; i < 10; i++) {
         a[i] = function () {
           console.log(i);
         };
           // 这一步相当于给a数组每个元素保存为一个个函数，但是函数内部的i相当于是全局的i,所以最后全局的i变成10之后，数组中每个元素的函数的i也都成了10，所以不管我们调用哪一个，都会输出10
       }
    
       a[6](); // 10  
       a[7](); // 10 
       a[8](); // 10 
       a[9](); // 10 
    
    5) var a = [];
       for (let i = 0; i < 10; i++) {
         a[i] = function () {
           console.log(i); 
         };  // 这一步是在往数组a中保存一个个函数，并且因为let的作用，每个函数内部的i都独立存在于每个块级作用域中，也就是说i等于0时，在第一个元素的位置保存了输出0的函数，以此类推
         a[i]();  // 0 1 2 3 4 5 6 7 8 9
           // 所以调用第几个函数就会输出第几
       }
       a[6](); // 6 
       a[7](); // 7  
       a[8](); // 8  
       a[9](); // 9  
    ```