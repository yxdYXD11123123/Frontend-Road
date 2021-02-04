## js解答题
1. 如何判断一个变量是否是数字（需要通过输出true或false进行判断），输出的true或false分别代表着什么含义？

   通过 isNaN(变量名) 可以判断

   输出true 代表不是一个数字

   输出false 代表是一个数字

2. 100+100结果是200，那么100+‘100’结果是什么，为什么？

   结果是100100，因为 "+"和和字符串同时出现时，”+“的意义就是一个拼接符。

3. 请说说 `+` 号有几层含义，分别是什么？

   三层含义：

   1. 拼接符
   2. 数学运算符，做加法
   3. 隐式转换为数字类型

4. 前--和后--的区别是什么？

   前--表示先减一，再参与运算

   后--表示先参与完运算，再减一


## js编程题

1. 如何能够判断一个数字是小数还是整数？

   ```js
   console.log(Boolean(parseInt(变量)-变量))
   // 返回ture则表示这是一个小数
   // 返回false则表示这是一个整数
   ```

2. 探究题：详见下面代码

   ```js
    isNaN('') // false ""空字符串，可以转为数字类型是0，所以返回false
   
    isNaN('1A') // true  "1A"转为数字类型是NaN, 所以不是一个数字，返回true
   
    isNaN(true) // false  true转为数字类型是1，所以是一个数字，返回false
   
    isNaN({}) // true  {}转为数字类型是NaN, 所以返回true
    isNaN([1,1]) // true  数组转为对象是NaN, 所以返回true
    // 探究：根据isNaN的作用你是否能说明出现上面现象的原因
   ```

3. 打印下面的输出结果

   ```js
    var num1 = 12, num2 = '12', num3 = '', num4;
    console.log(num1 + num2);  // 1212
    console.log(num1 + +num3);  // 12
    console.log(num1 + +num4);  // NaN
    console.log(+num2 + !!num3);  // 12
    console.log(!!num2 + !!num4);  // 1
   ```

4. 打印下面的输出结果

   ```js
    1) var a = 10,
         b = ++a,  // b = 11   a = 11
         c = a--,  // a = 10   c = 11
         d = c++ + ++b + --a;  // d = 11+12+9 = 32  c=12 b=12 a=9
     console.log(a, b, c, d);  // 9 12 12 32
   
    
    2) var a = 100,
         b = --a,  // b = 99  a = 99
         c = a-- + b++,  // c = 99+99 = 198  a=98  b=100
         d = a - b-- + ++c;  // d = 98-100+199 = 197  b=99  c=199 
     console.log(a, b, c, d);  // 98 99 199 197
   ```
