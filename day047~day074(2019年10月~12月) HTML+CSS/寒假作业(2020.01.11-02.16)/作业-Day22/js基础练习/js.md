## js解答题

1. Date对象的语法格式是什么

   ```js
   let date = new Date();
   ```

   

2. 如何使用Date对象获取当前的 年 月 日  小时 分钟 秒

   ```js
   let date = new Date();
   console.log(date)
   ```

   

3. 请举例说明Date对象自带的8个方法，并且说明方法的作用

   ```js
   var date = new Date();
   let year = date.getFullYear();
   let month = date.getMonth()+1;
   let week = date.getDay(); // 周几
   let day = date.getDate(); // 几号
   let hour = date.getHours(); 
   let min = date.getMinutes();
   let second = date.getSeconds();
   ```

   




## js编程题

1. 将通过new Date() 获取到的时间格式成为`xxx年xxx月xxx日 xx时xx分xx秒`，例如: 2000年1月10日  08时:22分:32秒
```js

```

2. 编写function parseDatetime(var datetime)方法
   功能描述：传入参数的日期对象与当前日期比较：
    - 参数日期比当前日期大，返回”日期不符合要求”。
    - 参数日期比当前日期小，范围小于1分钟：返回“刚刚”；
    - 参数日期比当前日期小，差值范围大于等于1分钟：返回“x分钟之前”；x代表分钟数，
    - 参数日期比当前日期小，差值范围大于等于1小时：返回“x小时之前”；x代表小时数，
    - 参数日期比当前日期小，差值范围大于等于1天：返回“x天之前”；
    - 参数日期比当前日期小，差值范围大于等于7天：返回“x周之前”；
    - 参数日期比当前日期小，差值范围大于等于30天：返回“x月之前”；
    - 参数日期比当前日期小，差值范围大于等于365天：返回“很久之前”。

```js

```


3. 利用JavaScript打印出所有的"水仙花数"，所谓"水仙花数"是指一个三位数，其各位 数字立方和等于该数本身。
```js
    
```

4.定义一个1到10之间的数字，让用户猜，用户有3次机会，猜中弹出恭喜并结束程序，猜错重新弹出输入框让用户输入，直到3次机会都用完弹出遗憾并结束程序。

```html
    
```