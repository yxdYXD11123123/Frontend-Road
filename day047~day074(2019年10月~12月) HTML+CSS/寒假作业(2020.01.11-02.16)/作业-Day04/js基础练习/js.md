## js解答题

1. 请简述 `typeof` 的用途，`typeof` 的返回结果都是什么数据类型？

   `typeof` 是用来查看数据类型的。

   返回的结果都是字符串数据类型。

2. 数据类型转换，转 Number类型有哪些方式？

   Number()    +()   `parseInt()`转出整数   `parseFloat`可以转出小数


3. 数据类型转换，转 String类型有哪些方式？哪个方式存在什么限制？

   String(变量)   变量.toString(进制)   

   .toString()不能转换undefined和null


4. 数据类型转换，转 Boolean类型有哪些方式？

   Boolean(变量名)   !!(变量名)

5. 什么是隐式类型转换，有哪些是隐式类型转换？

   当两个不同类型的数据进行计算时，js会自动转成相同类型再计算

   例如：算术运算符+会将后面的数据类型转为数字类型，!! 会将数据类型转为布尔类型。



## js编程题

 1. 回答下面代码中的结果

    ```js
    console.log(typeof [])   // object
    console.log(typeof [666])  // object
    console.log(typeof [{ age: 18 }])  // object
    console.log(typeof NaN)  // number
    console.log(typeof 'true')  // string
    console.log(typeof typeof undefined)  // string
    ```

2. 说出下面元素转 Number类型的结果

    ```js
    1) ''
    2) '666'
    3) '88&'
    4) true
    5) false
    6) null
    7) undefined
    8) { }
    9) {name:"9",age:9}
    10) []
    11) [1]
    12) [1,1]
    13) [[]]
    14) [[1]]
    
    console.log(Number(""));  // 0 
    console.log(Number("666"));  // 666
    console.log(Number("88&"));  // NaN
    console.log(Number(true));  // 1
    console.log(Number(false));  // 0
    console.log(Number(null));  // 0
    console.log(Number(undefined));  // NaN
    console.log(Number({}));  // NaN
    console.log(Number({ name: "9", age: 9 }));  // NaN
    console.log(Number([]));  // 0
    console.log(Number([1]));  // 1
    console.log(Number([1, 1]));  // NaN
    console.log(Number([[]]));  // 0
    console.log(Number([[1]]));  // 1
    ```

3. 说出下面元素转 String类型的结果

    ```js
    1) 666
    2) ''
    3) true
    4) false
    5) null
    6) undefined
    7) { }
    8) {name:"9",age:9}
    9) []
    10) [1,'A']
    11) [8,{age:8},8]
    12) [1,[2,[3]]]
    
    console.log(String(666));  // 666
    console.log(String(""));  // 空字符串
    console.log(String(true));  // "true"
    console.log(String(false));  // "false"
    console.log(String(null));  // "null"
    console.log(String(undefined));  // "undefined"
    console.log(String([]));  // 空字符串
    console.log(String([1, "A"]));  // 1,A
    console.log(String([8, { age: 8 }, 8]));  // 8,[object, Object],8
    console.log(String([1, [2, [3]]]));  // 1,2,3
    
    ```

4.  说出下面元素转 Boolean类型的结果

    ```js
    1) 0
    2) 1
    3) -1
    4) ''
    5) '0'
    6) NaN
    7) null
    8) undefined
    9) { }
    10) {name:"9",age:9}
    11) []
    11) [0]
    12) [false]
    12) [null,undefined]
    
    console.log(Boolean(0));  // false
    console.log(Boolean(1));  // true
    console.log(Boolean(-1));   // true
    console.log(Boolean(""));  // false
    console.log(Boolean("0"));  // true
    console.log(Boolean(NaN));  // false
    console.log(Boolean(undefined));  // false
    console.log(Boolean({}));  // true
    console.log(Boolean({ name: "9", age: 9 }));  // true
    console.log(Boolean([]));  // true
    console.log(Boolean([0]));  // true
    console.log(Boolean([false]));  // true
    console.log(Boolean([null, undefined])); // true
    
    ```