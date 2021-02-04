## js简答题

1. arguments对象和数组的相同点和不同点有哪些？

   相同点就是可以通过索引找到arguments里的元素，而且有长度


2. rest参数作为函数的形参只能是最后一个参数，谈谈你的理解

   因为rest参数接受的是函数的剩余实际参数，所以要写到最后


3. 什么是函数表达式？

   ```js
   var 变量名 = function(参数) {
       函数体
       return 返回值;
   }
   ```

   


4. 谈谈你对自调用函数的理解，格式是什么？

   1. 只能执行一次
   2. 自己调用自己的函数
   3. 一般用于初始化
   4. 不要写return

   ```js
   (function (形参){
    	// 函数体
    })(实参)
   ```

   


## js编程题
1. 写一个函数，求出`3`在数组 var arr = {3,4,3,5,7,9};中出现的次数
 ```js
function getTimes(num, arr) {
    let time = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == num) {
            time++;
        }
    }
    console.log("出现了" + time + "次");
}

let num = 3;
let arr = [3, 4, 3, 5, 7, 9]

getTimes(num, arr)
 ```


2. 写一个函数，判断一个数是否是素数，并返回结果true 或 false(又叫质数，只能被1和自身整数的数)
```js
function isSuShu(num) {
    let isSu = true;
    for (let i = 2; i < num; i++) {
        if (num % i == 0) {
            isSu = false;
        }
    }
    return isSu;
}

console.log(isSuShu(11));


```


3. 写一个函数，求任意一个数的阶乘
```js
function getJie(num) {
    let jie = 1;
    for (let i = 1; i <= num; i++) {
        jie *= i;
    }
    console.log("这个数的阶乘为" + jie);
}
```


4. 写一个函数，该函数用于计算一个正数的因子和（比如6的因子和是1+2+3+6=12）
```js
function getYinSum(num) {
    let sum = 0;
    for (let i = 1; i <= num; i++) {
        if (num % i == 0) {
            sum += i;
        }
    }
    console.log(`${num}的因子和是${sum}`);
}
getYinSum(6);
```