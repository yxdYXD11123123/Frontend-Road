# New 关键字

## 什么是new 关键字

构造函数，是一种特殊的函数，主要用来创建对象时初始化对象，即为对象成员变量赋初始值， 总与new 运算符一起使用 在创建对象的语句中。

列如：new Array()  就是 new 构造函数()

## new 在执行时，会做四件事情

1. new 会在内存中创建一个新的空对象
2. new 会让this指向这个新的对象
3. 执行构造函数，目的是给这个新对象加属性和方法
4. new 会返回这个新对象

# This 指向

在这里，我们只讨论浏览器中this的指向

## 什么是this？

this 是 JavaScript 语言的一个关键字，它是函数运行时，在函数体内部自动生成的一个对象，只能在函数体内部使用。

```js
// 例如：
function test() {
    this.x = 1;
} 
// 函数test运行时，内部会自动有一个this对象可以使用
```

## this的用法

1. 单纯的函数中  this 指向  Window对象

   ![1571879170068](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\1571879170068.png)



2. 在对象中，如果this在对象的方法中，那么this指向该对象

   ```js
   let obj = {
       sayHi = function(){
           console.log(this);
       }
   }
   obj.sayHi() // obj
   ```

   

3. 在构造函数中，this指向的是创建出来(new)的新对象

   ```js
   let Person = function(){
       this.fn = function(){
           console.log(this)
       }
   }
   let zs = new Person()
   zs.fn();
   ```

## apply 和 call 方法的使用

语法：

```js
函数名.apply(要指向的对象)
```

如果使用call或apply改变this的指向，那么this指向的是call的第一个参数对象 和 this指向的是apply的第一个参数。

```js
let apple = {
    color: 'red'
    say: function (){
        console.log('My color is' + this.color)
    }
}
apple.say(); // My color is red
let banana = {
    color: "yellow"
}
// apply是立即执行的 ，不需要调用
// call 也是立即执行的，不需要调用
apple.say.call(banana); //My color is yellow
apple.say.apply(banana); //My color is yellow

```

### call 和 apply 的异同点

apply 的语法：

`函数名.apply(要指向的对象,[参数1，参数2，...])`

call 的语法：

`函数名.call(要指向的对象,参数1，参数2，...)`

```js
function fn(name, age) {
    console.log('我的名字' + name + "我的年龄" + age);
}

fn.apply(null, ['dong', 18])
// 区别
fn.call(null, 'dong', 20)
```

作用完全一样，只是接收参数的方式不一样

## bind 方法

![1571882091870](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\1571882091870.png)

作用：与call和apply相同，改变this指向

特点：bind方法会创建一个新函数，不会立即执行，需要手动调用绑定函数

