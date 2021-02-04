## js简答题

1. 函数的形参是局部变量吗？谈谈你的理解

2. 函数内部可以调用其他函数吗？谈谈你的理解

3. 函数的return是必须要添加的吗？函数如果调用的时候，没有返回值，输出的结果是什么？举例说明


4. 函数调用的时候传递了实参，但是没有形参接收，怎么在函数内部获取实参传递的个数


## js编程题

1. 定义一个函数，用户输入任意两个不同数字,返回最后的最大值

```js
function getMax(num1, num2) {
    if (num1 > num2) {
        return num1;
    }
    return num2;
}
console.log(getMax(3, 2));

```


2. 定义一个函数 function add(){}，求函数任意参数的和
 - 1) add(1,2,3)
 - 2) add(1,2,3,4,5)

```js

```

3. 写一个函数，判断是否是闰年【能被4整除且不能被100整除，或者能被400整除】

```js
function isRun(year) {
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        console.log(year + "年是闰年");
    }
}
```

4. 写一个函数,求数组中的最大值,  var arr = [18, 45, 0, 58, 32,59]
```js
var arr = [18, 45, 0, 58, 32, 59]
function getMax(arr) {
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    return max;
}
```