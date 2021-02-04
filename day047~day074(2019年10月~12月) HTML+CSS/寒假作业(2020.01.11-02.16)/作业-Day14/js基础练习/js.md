## js简答题

1. 函数的基本声明及调用格式是什么？其作用是什么？

   ```js
   // 声明函数
   function 函数名(){
       函数体 // 曾经我们学过的代码
   }
   
   // 调用函数
   函数名();
   ```

   作用就是把实现一个功能的代码，放到一个特定的语法结构中，需要的时候直接调用，不用重复写。

2. 说说你对函数形参和实参的理解，形参个数和实参必须相等吗？

   形参就像是在函数内部声明一个变量，实参就是真正参与运算的数据，给形参赋值

   

3. 函数为什么需要return返回值？

   因为函数调用的时候计算结果通常是通过返回值带出的，而且可以跳出函数

4. 函数表达式和函数声明式有什么区别？

   函数表达式在提升作用域时，仅仅提升函数的声明

   函数声明式在提升作用域时，函数的整体都会提升


## js编程题


1. 编写一个函数：判断任意三个数中的最大值和最小值

    ```js
    
    function getMaxAndMin(one, two, three) {
        let max = one;
        let min = one;
        for (let i = 0; i < arguments.length; i++) {
            if (max < arguments[i]) {
                max = arguments[i];
            }
            if (min > arguments[i]) {
                min = arguments[i];
            }
        }
        console.log("最大值为" + max + "，最小值为" + min);
    }
    
    getMaxAndMin(5, 3, 7)
    ```

2. 编写一个函数：实现对 `n` 到 `m` 之间所有偶数的求和

    ```js
    function getAdd(n, m) {
        let sum = 0;
        for (let i = n; i <= m; i++) {
            if (i % 2 == 0) {
                sum += i;
            }
        }
        console.log(sum);
    }
    
    ```

3. 编写一个函数：实现对传入的数组从小到大进行冒泡排序

    ```js
    function sort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
    
    console.log(sort([3, 4, 2, 13, 2, 7]));
    
    ```

4. 编写一个函数：传入任意个数字，计算所有数之和

    ```js
    function getSum(...rest) {
        let sum = 0;
        for (let i = 0; i < rest.length; i++) {
            sum += rest[i];
        }
        console.log(sum);
    }
    
    getSum(1, 2, 6, 3)
    ```
