## js解答题

1. 算数运算符都有哪些？

   算术运算符：+加 -减 *乘 /除 %取余 ++自增 --自减

2. NaN和任何值比较的结果都是什么？包括和自身比较吗？

   NaN和任何值比较的结果都是不相等

   包括和自身比较也是不相等

3. == 和 === 的区别在哪？

   == 意味着在转为统一数据类型时，数值相等

   === 意味着不只是数值相等，数据类型也要相等


4. 逻辑运算符有哪些, 逻辑运算的规则有哪些

   逻辑运算符有：&&与   ||或   !非

   &&：只要有一个是false，则返回false, 否则返回true

   ||：只要有一个是true, 则返回true, 否则返回false

   !：如果是false，返回true; 如果是true，返回false


## js编程题

1. `typeof` 无法显示出的数据类型名称有什么？为什么？
   
   ```js
   Array数组
   因为数组是一种特殊的对象，所以返回Object
   null 空 
   属于bug
   ```
   
2. 判断下面结果的布尔值

   ```js
    333 == '333'  // true
    666 == [666]  // true
    '999' == [999]  // true
    NaN == NaN  // false
    NaN === NaN  // false
    undefined == null  // true
    undefined === null  // false 
    [] == []  // false
    [] === []  // false
    [] == 0  // true  因为空数组转为数字时为0
    ![] == 0  // true  因为空数组转为布尔值时，为true, !true 为 false=0
    [] == ![]  // false  综合上述两个原因
   ```

3. 打印输出下面的结果

   ```js
    1) true && !true  // false
    2) false || !false  // true
    3) false || !true && !false  // false
    4) true && !false || false  // true
    5) undefined && true  // undefined
    6) 2+2 > 5 || 3-3 <=0 && !undefined  // true
   ```

4. 打印输出下面的结果

   ```js
    var a = 10;  
    var b = a++;  // b=10 a=11
    console.log(b>=a);  // false
    var c = b + 'a';  
    console.log(c);  // 10a
    console.log(c == ('a' + b))  // false
   ```