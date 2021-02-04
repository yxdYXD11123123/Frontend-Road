## 选择题
1. 下面代码的输出是什么(D)
```js
;(function (e) {
    Console.log(1 == true);
    Console.log(2 == true);
})() 
//如果==两边任意值为true，则把true转换成1再进行比较
```
- A.false false 
- B.true true 
- C.false true 
- D.true false

2.下面代码的输出是什么(D)

```js
(function (e) {
    console.log(e === undefined);
    console.log(typeof e === undefined);
})()  
// typeof e 的值为 字符串“undefined”
```
- A.false false 
- B.true true 
- C.false true 
- D.true false

3.下面代码的输出是什么(B)

```js
console.log(3 + 4 + "5");
```
- A: "345"
- B: "75"
- C: 12
- D: "12"

4.下面代码的输出是什么(D)

```js
const set = new Set([1, 1, 2, 3, 4]);
console.log(set);
```
- A: [1, 1, 2, 3, 4]
- B: [1, 2, 3, 4]
- C: {1, 1, 2, 3, 4}
- D: {1, 2, 3, 4}

5.下面代码的输出是什么(A)

```js
var f = c = true;
if (f === true) {
    var a = 10;
}
function fn() {
    var b = 20;
    c = 30;
}
fn();
console.log(a);
console.log(c);
console.log(b); 
```
- A:10 30 报错 
- B:10 true 报错 
- C:报错 
- D:Undefined

6.下面代码的输出是什么(A)

```js
let greeting
greetign = {}
console.log(greetign);
```
- A: {}
- B: ReferenceError: greetign is not defined
- C: undefined

7.下面代码的输出是什么(A)

```js
unction Person(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
}
const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);
```
- A: Person {firstName: "Lydia", lastName: "Hallie"} and undefined
- B: Person {firstName: "Lydia", lastName: "Hallie"} and Person {firstName: "Sarah", lastName: "Smith"}
- C: Person {firstName: "Lydia", lastName: "Hallie"} and {}
- D:Person {firstName: "Lydia", lastName: "Hallie"} and ReferenceError

8.下面代码的输出是什么(C)

```js
console.log(Number(2) === Number(2))
console.log({} == {})
// 如果两个操作数都是对象，则比较它们是不是同一个对象，如果两个操作数都指向同一个对象，则相等，且返回true  否则，返回false
```
- A: true, true
- B: false, true
- C: true, false
- D: true, true

9.下面代码的输出是什么(C)

```js
function sum(a, b) {
    return a + b
}
var result = sum(1, '2');
console.log(result);
```
- A: NaN
- B: TypeError
- C: "12"
- D: 3

10.下面代码的输出是什么(C)

```js
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
```
- A: 1 1 2
- B: 1 2 2
- C: 0 2 2
- D: 0 1 2

11.以下是个纯函数么? （A）

```js
function sum(a, b) {
    return a + b;
}
//什么是纯函数？
//不依赖于程序执行间函数外部任何状态或数据的变化，必须只依赖于其输入参数。
```
- A: Yes
- B: No

12.下面代码的输出是什么(C)

```js
function checkAge(data) {
    if (data === { age: 18 }) {
        console.log('You are an adult!');
    } else if (data == { age: 18 }) {
        console.log('You are still an adult.');
    } else {
        console.log(`Hmm.. You don't have an age I guess`);
    }
}

checkAge({ age: 18 });
```
- A: You are an adult!
- B: You are still an adult.
- C: Hmm.. You don't have an age I guess

13. 下面代码的输出是什么(B)
```js 
var num = 8
var num = 10
console.log(num);
```
- A: 8
- B: 10
- C: SyntaxError
- D: ReferenceError

14. 下面代码的输出是什么(C)
```js
onst obj = { a: 'one', b: 'two', a: 'three' }
console.log(obj);
```
- A: { a: "one", b: "two" }
- B: { b: "two", a: "three" }
- C: { a: "three", b: "two" }
- D: SyntaxError

15.下面代码的输出是什么(C)

```js
const list = [1 + 2, 1 * 2, 1 / 2]
console.log(list)
```
- A: ["1 + 2", "1 * 2", "1 / 2"]
- B: ["12", 2, 0.5]
- C: [3, 2, 0.5]
- D: [1, 1, 1]

16.下面代码的输出是什么(C)

```js
for (let i = 1; i < 5; i++) {
    if (i === 3) {
        continue;
    }
    console.log(i)
}
```
- A: 1 2
- B: 1 2 3
- C: 1 2 4
- D: 1 3 4

17.下面代码的输出是什么(B)

```js
console.log("I want pizza"[0])
```
- A: """
- B: "I"
- C: SyntaxError
- D: undefined

18.下面代码的输出是什么(B)

```js
console.log(typeof typeof 1)
```
- A: "number"
- B: "string"
- C: "object"
- D: "undefined"

19. 下面代码的输出是什么(C)
```js
const numbers = [1, 2, 3]
numbers[10] = 11
console.log(numbers)
```
- A: [1, 2, 3, 7 x null, 11]
- B: [1, 2, 3, 11]
- C: [1, 2, 3, 7 x empty, 11]
- D: SyntaxError

20.JavaScript 中的一切都是？ (A)

- A: 基本类型与对象
- B: 函数与对象
- C: 只有对象
- D: 数字与对象


## 编程题

- 1.定义一个长度为5的数组，之后生成5个随机数存入数组，随机数范围为10到100（包含10和100），遍历数组，将数组中小于50的元素替换成0，之后打印修改后的数组

  ```js
  // 定义一个长度为5的数组
  var arr = new Array(5);
  // 声明一个生成随机数的函数
  function randomFive(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // 生成5个随机数放入数组
  for (var i = 0; i < 5; i++) {
      arr[i] = randomFive(10, 100);
  }
  // 循环遍历数组，数组中小于50的元素替换为0
  for (var i = 0; i < 5; i++) {
      if (arr[i] < 50) {
          arr[i] = 0;
      }
  }
  // 打印数组
  console.log(arr);
  ```

  




- 2.获取地址里面的用户名和年龄和邮箱 https://www.baidu.com?username=lisi&age=28&email=120122@qq.com,并且控制台输出对象的格式{username:'lisi',age:28,email:120122@qq.com}

  ```js
  var lisi = "https://www.baidu.com?username=lisi&age=28&email=120122@qq.com"
  
  function getInformation(user) {
      // 从“？”分开，保留第2部分
      var temp = user.split("?")[1]
      // 获取信息
      var username = temp.split("&")[0].split("=")[1];
      var age = temp.split("&")[1].split("=")[1];
      var email = temp.split("&")[2].split("=")[1];
      // 声明一个对象，将获取的信息赋值给对象的属性
      var person = {
          username: username,
          age: age,
          email: email
      }
      // 返回这个对象
      return person;
  }
  
  var person = getInformation(lisi);
  console.log(person);
  ```

  




- 3.将数组var arr = [1,2,1,2,3,4,5,6]里面重复的元素去除

  ```js
  var arr = [1,2,1,2,3,4,5,6];
  // 方法一：
  // 遍历数组元素
  for (var i = 0; i < arr.length - 1; i++) {
      // 遍历每个数组元素与它后面的所有元素
      for (var j = i + 1; j < arr.length - 1; j++) {
          // 如果这个元素与它后面的元素有相同的
          if (arr[i] == arr[j]) {
              // 那么，删除后面这个相同的元素
              arr.splice(j, 1);
              // 然后，让元素索引归位，以免漏掉后面的一个元素
              j--;
          }
      }
  }
  // 打印输出
  console.log(arr);
  ```

  



- 4.统计数组var arr = [1,2,3,4,5,1,1,2,3,2]里面元素出现的次数

  ```js
  var arr = [1, 2, 3, 4, 5, 1, 1, 2, 3, 2]
  
  // 声明一个空对象
  var times = {}
  for (var i = 0; i < arr.length; i++) {
      // 判断对象中是否存在这个属性
      if (times[arr[i]]) {
          // 如果存在，给这个属性值加1
          times[arr[i]]++;
      }
      else {
          // 否则，添加一个属性，值为1
          times[arr[i]] = 1;
      }
  }
  console.log(times);
  // 遍历对象中的属性和属性值
  for (var key in times) {
      console.log(key + "出现了" + times[key] + "次");
  }
  ```

  