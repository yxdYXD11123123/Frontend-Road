## 函数

#### 创建函数的方式

```ts
// 函数式声明
function sum(a:number, b:number): number {
    return a + b;
}
// 函数表达式
let sumTwo = function(a:number,b:number): number {return a + b;};

// 箭头函数
let sumThree = (a: number, b: number) => { return a + b; };

// 使用 new 创建函数
let sumFour = new Function()
```

### 可选参数

在`Ts`函数中指定了参数后，在调用函数的时候就必须传入相应个数的参数。

在`Js`中，函数的参数默认都是可选的，没有传值就是undefined

在`Ts`中我们可以<font color=red>使用 `?` 指定参数为可选</font>，这样我们在调用函数的时候就可以选择传参了

```ts
let fn = function (x: number, y?: number) {
  // return x + y; // 报错 x可能未定义
  if (y) {
    return x + y;
  } else {
    return x;
  }
}
```

### 参数默认值

<font color=red>带有默认值的参数一定在没有默认值的参数后面</font>

```ts
// 必选参数，一定在可选参数和带有默认值的参数的前面
let fn2 = function (more: number, x?: number, y = 6) {
  if (x) {
    return x + y;
  } else {
    return y;
  }
}

console.log(fn2(1, 2)); // 3
```

### `rest` 剩余参数

```ts
// 求平均年龄
let getAvg = function (age: number, ...rest: number[]) {
  let sum: number = 0;
  // 遍历
  for (let i = 0; i < rest.length; i++) {
    sum += rest[i];
  }
  return (sum + age) / (rest.length + 1);
}

getAvg(20, 20, 20, 20); // 20
```

### 注意：

* <font color=red>`TypeScript`中函数所有的参数，必须都指定类型，或有足够的条件让`Ts`推导出参数类型</font>



## 类

`Js`语言中，生成实例对象的传统方法是通过<font color=red>构造函数</font>

这种写法和传统的面向对象语言（C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑

<font color=red>`ES6` 提供了更接近传统语言的写法，引入了Class类这个概念</font>，作为对象的模板。

通过 `class`  关键字，可以定义类

在TypeScript中，同样使用类来创建对象

```ts
// 声明一个类
class Person {
  // 属性
  name: string
  // 构造方法
  constructor(name: string) {
    // 初始化属性值（必须）
    this.name = name;
  }
  // 方法
  study(hours: number): void {
    console.log("学习了" + hours + "个小时");
  }
}
// 创建实例
let pdd = new Person("PDD");
console.log(pdd.name); // PDD
pdd.study(3); // 学习了3个小时
```

### 继承

TypeScript中类的继承也和`ES6`中类似，<font color=red>派生类</font>（子类）可以从<font color=red>基类</font>（父类）中<font color=red>继承属性和方法</font>

```ts
// 基类
class Man {
  name: string
  constructor(name: string) {
    this.name = name;
  }
}

// 继承 Man 类 的 派生类
class Player extends Man {
  age: number
  constructor(name: string, age: number) {
    // 派生类的构造函数必须包含 "super" 调用 (也就是只要有继承，constructor中必须有super)
    super(name); // 相当于 在调用 基类：Man类的constructor函数 (constructor Man(name: string): Man)
    this.age = age;
  }
  play() {
    console.log("playing");
  }
}

let playerOne = new Player("frank", 20);
console.log(playerOne.name); // frank
```

### 公共修饰符

在TypeScript中，成员都是默认标记为public，可以理解为公开，所以我们可以自由的访问程序里面定义的成员。当然我们也可以显式的标记出来

### 私有修饰符

我们可以把类中的成员标记为private，可以理解为私有的。

一旦成员标记为private，我们就<font color=red>不能在它的类的外部访问它，并且在派生类（子类）中也是不能访问的</font>。

### 受保护的修饰符

protected，可以理解为受保护的，和private相似，唯一一点不同的就是：<font color=red>protected 成员可以在派生类中访问</font>

### 只读修饰符 `readonly`

我们可以使用 `readonly` 将成员设置为只读，<font color=blue>只读属性必须在声明时或构造函数里被初始化</font>

```ts
class Woman {
  // 公共属性
  public name: string
  // 保护属性
  protected sex: string
  // 私有属性
  private age: number
  // 只读属性
  readonly hobby = ["篮球"]

  constructor(name: string, sex: string, age: number) {
    this.name = name;
    this.sex = sex;
    this.age = age;
  }

  printAge() {
    // 私有属性只能在 本类中使用
    console.log(this.age);
  }
}

// 继承 Man 类
class Actress extends Woman {
  constructor(name: string, sex: string, age: number) {
    super(name, sex, age);
  }
  act() {
    console.log("acting");
  }
  printInfo() {
    // 私有属性，在 派生类中不可访问
    // console.log(this.age);
    // 保护属性，在 派生类中可以访问
    console.log(this.sex);
  }
}

let actor = new Actress("frank", "女", 20);
// public属性，任意地方都可以直接访问
console.log(actor.name); // frank
// 私有属性 和 保护属性 在外界都不可以访问
// console.log(actor.age);
// console.log(actor.sex);
actor.printAge(); // 20 
actor.printInfo(); // 女

// readonly 
console.log(actor.hobby); // [ '篮球' ] 
// actor.hobby = ['1'] // 报错
```



### 存取器

在TypeScript中，我们可以利用存取器来帮助我们有效的控制对象成员的访问

```ts
class ClassOne {
  // 将属性私有化
  private name: string
  constructor(name: string) {
    this.name = name;
  }
  // 使用存取器
  public get getName(): string {
    return this.name;
  }

  public set setName(v: string) {
    this.name = v;
  }
}

let obj = new ClassOne("rank");
// 注意：使用get、set关键字后，用法不是调用方法的方式
// get时，直接使用 对象.get方法名
console.log(obj.getName); // rank
// set时，直接使用 对象.set方法名 = 新值
obj.setName = "dong";
console.log(obj.getName); // dong
```

#### 注意：

* 使用`get`、`set` 声明的存取器，因为使用时我们不能传入更多参数，所以我们可以添加的 logic 是有限的，需要视情况使用，必要的话，不用关键字，像Java一样写直接写方法。



### 静态属性

`Ts`的静态属性和`Js`中的静态属性是类似的。我们创建的类的静态成员，这些属性是在类的本身而不是在类的实例上。



### 抽象类

<font color=red>TypeScript中的抽象类是提供其他派生类的基类，但是不能直接被实例化</font>。（相当于一种特殊的基类）

我们可以用abstract关键字来定义抽象类和抽象类中的方法。

<font color=red>只要某一个类中有抽象方法，就是抽象类</font>  ( 和`Java`一样 )

```ts
// 定义一个抽象类（特殊的基类）
abstract class SpeicalFather {
  public name: string
  constructor(name: string) {
    this.name = name;
  }
  // 声明一个抽象方法（此方法，派生类中必须实现）
  abstract makeMoney(): void
}
// 继承一个抽象类
class Son extends SpeicalFather {
  constructor(name: string) {
    super(name);
  }
  // makeMoney必须实现，不然报错
  makeMoney() {
    console.log("抽象基类要求我必须实现此方法");
  }
}

let richSon = new Son('frank');
console.log(richSon); // Son { name: 'frank' }
richSon.makeMoney(); // 抽象基类要求我必须实现此方法
```



## 接口

### 为什么需要接口

**情景：**定义一个函数`getUserInfo`，用来获取一个用户的姓名和年龄的字符串，如果这个`getUserInfo`在多个人开发中，它是一个公共函数，多个开发者都会调用，如果不是每个人都点进文件看函数对应的注释，那么怎么调用该函数？

**问题：**`JavaScript`是弱类型语言，它并<font color=red>不会对我们传入的代码进行任何检测</font>，也<font color=red>不会对你调用的代码进行数据类型的提示</font>

**解决办法：**<font color=red>接口`interface` </font>就可以帮助我们解决上述问题

### 概念 及 语法

和 Java 语言相同，TypeScript中定义接口也是使用interface 关键字来定义，Java中我们说一个类实现了某个接口，但是在这里，我们只关心值的外形（duck typing），只要传入的对象满足接口的外形，那么它就是被允许的


