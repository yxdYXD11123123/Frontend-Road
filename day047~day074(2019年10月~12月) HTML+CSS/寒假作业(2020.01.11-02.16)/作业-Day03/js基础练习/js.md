## js解答题

1. 如何通过字面量方式创建对象，对象都是有什么组成的？

   var object = {属性: 属性值}

   对象都是由键值对组成的


2. 如何使用new关键字创建对象?

   var object = new Object();


3. 说明对象的基本操作（读取，修改，添加，删除）

   读取：对象名.属性名

   修改：对象名.属性名 = 修改的属性值

   添加：对象名.添加的属性名 = 属性值；对象名[“添加的属性名”] = 属性值

   删除：delete 对象名.属性名


4. 创建对象有几种方式，分别是什么？写语法

   有四种方式

   1. 系统构造函数创建对象

      var 变量名 = new Object()

   2. 工厂构造函数创建对象

      ```js
      function createObject(name, age) {
          let obj = new Object();
          obj.name = name;
          obj.age = age;
          return obj;
      }
      // 调用工厂函数，输入实参，创建对象
      let newObj = creatObject("dong", 3)
      ```

      

   3. 自定义构造函数创建对象

      ```js
      var 函数名 = function(name, age) {
          this.name = name;
          this.age = age;
      }
      // 创建对象
      var newObj = new 函数名(实参);
      ```

      

   4. 字面量方式创建对象

      var obj = {};



## js编程题

1. 字面量创建一个对象：【姓名:可乐 年龄:18 性别:你猜 爱好:Rush B】

   ```js
   
   ```

2. 使用new关键字创建一个对象：【姓名:雪碧 年龄:19 性别:未知 爱好:Rush A】

    ```js
    
    ```

3. 根据步骤操作对象

    ```js
    1) 定义一个对象：【姓名:柠檬 年龄:17】
    2) 输出该对象的姓名
    3) 修改该对象年龄为：未成年
    4) 添加对象属性：性别为女，爱好为画画，职业为学生
    5) 输出该对象
    6) 删除该对象的姓名
    7) 输出该对象
    ```

4. 使用三种方式给对象var obj = {name:"杨"}添加属性age为30

    ```js
    `参考答案：
    1) obj.age = 30; 
    2) obj['age'] = 30; 
    3) var age = "age"; obj[age] = 30;`
    ```