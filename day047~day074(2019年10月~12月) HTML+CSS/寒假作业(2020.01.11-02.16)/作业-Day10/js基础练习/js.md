## js简答题

1. 简述三种循环？

   * for循环：把一段代码重复执行一定的次数（有限次数）
   * while循环：会在指定条件为true时，循环执行代码块，为false时，不执行
   * do...while循环：while循环的变体

   

2. 试着说说你会如何合适使用三种循环？

   有明确的循环次数，应该使用for循环

   没有明确的循环次数，应该使用while和do...while循环通过判断条件使用

   

3. 什么是死循环？列举一个死循环？

   死循环就是一直循环不结束

   使用while循环时，给指定条件为true，就是一个死循环

   

4. while循环和do...while的区别是什么？

   while循环是先判断是否满足执行条件，满足则执行

   do...while循环是，先执行一遍代码块，然后判断是否满足执行条件，再决定是否继续执行


## js编程题

1. 使用一个for循环按顺序打印出：`10，8，6，4，2，0，-2`

    ```js
    for (let i = 10; i >= -2; i = i - 2) {
        console.log(i);
    }
    ```

2. 使用一个while循环按顺序打印出：`2，0，-2，-4，-6，-8，-10`

    ```js
    let i = 2;
    while (i >= -10) {
        console.log(i);
        i = i - 2;
    }
    ```

3. 使用一个do...while循环打印出：`100`

    ```js
    do {
        console.log("100");
    } while (false)
    ```

4. 使用一个for循环实现：1-100之间所有偶数的打印
    要求：使用两种方式实现（其中一个方式必须使用 `continue` 关键字）

    ```js
    //方法一
    for (let i = 1; i <= 100; i++) {
        if (i % 2 != 0) {
            continue;
        }
        console.log(i);
    }
    
    //方法二
    let num = 1
    while (num <= 100) {
        if (num % 2 == 0) {
            console.log(num);
        }
        num++;
    }
    ```