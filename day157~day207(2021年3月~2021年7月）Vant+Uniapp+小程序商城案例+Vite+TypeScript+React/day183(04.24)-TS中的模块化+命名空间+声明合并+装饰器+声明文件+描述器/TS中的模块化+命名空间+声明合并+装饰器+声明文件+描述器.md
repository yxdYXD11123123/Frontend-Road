## TS中的模块化

因为TS有时用于<font color=#c00000>前端</font>，有时也会用在<font color=#c00000>node</font>中

所以Ts的模块化，<font color=#c00000>需要兼容ES6的模块化，和commonJS模块化</font>

* ES6 模块化
* commonJS规范的模块化（就是Node中用的 `require` + `module.exports` ）

（注：node最新版，也已经支持 ES6 模块化的 `ES6 moudels`了）所以我们<font color=#c00000>主要用ES6模块化</font>就好了



**ES6模块化 和 commonJS模块化 相同点：**

* <font color=#c00000>一个文件就是一个模块</font>，模块中的<font color=#c00000>数据都是私有的</font>
* 可以<font color=#c00000>通过</font>对应<font color=#c00000>关键字 暴露 模块中的数据</font>

### ES6模块化

在<font color=red>ES6出现之前，JS没有模块化的概念</font>，于是为了支持JS模块化，开发者都是使用类、立即执行函数或者第三方插件来实现模块化。

但是<font color=red>ES6出现后，正式引入了模块化的概念</font>

#### 使用：常规导入导出

##### 分开导入导出

```ts
// 导出
export const add = (num1: number, num2: number) => {
  return num1 + num2;
}

export const minus = (num1: number, num2: number) => {
  return num1 - num2;
}
```

<font color=red>注意：导入时必须使用解构方式导入</font>

```ts
// 导入 
import { add, minus } from "./demo01";
```

##### 一次性导入导出：就是最后放到一个对象里一次性导出

```ts
const add = (num1: number, num2: number) => {
  return num1 + num2;
}

const minus = (num1: number, num2: number) => {
  return num1 - num2;
}

// 一次性导出
export { add, minus };
```

<font color=red>注意：导入时必须使用解构方式导入</font>

```ts
// 导入 （导入时可以使用as 关键字起一个新的名字）
import { add, minus as newName } from "./demo01"
// import addAndMinus from "./demo01" // 错误的
```

##### 注意：

* 常规导入导出时，导入变量名必须和导出变量名一致
* 如果想修改接收变量名可以通过 as 关键字
* 变量名被修改后原有变量名自动失效
* 导入时可以使用 <font color=red>as</font> 关键字起一个新的名字

#### 使用：默认导入导出

`export default xxx;`

```ts
const fn = () => {
  console.log("默认导出的方法");
}

// 默认导出
export default fn;
```

```ts
// 导入
import aliasFn from "./demo01";

aliasFn(); // 默认导出的方法
```

##### 注意：

* 一个模块<font color=red>只能使用一次默认导出</font>，多次无效
* 默认导出时，导入的名称可以和导出的名称不一样
* 不可以解构方式导入

#### 总结

* <font color=red>常规导入时，只能使用解构方式导入</font>
* <font color=red>默认导入时，不能使用解构方式导入</font>



## 命名空间

### 什么命名空间？

命名空间可以看作是一个<font color=red>微型模块</font>

当我们想把相关的业务代码写在一起，又不想污染全局空间的时候，我们就可以使用命名空间

其 ***本质***  就是定义了一个大对象，把变量、方法、类、接口... 都放在里面

```ts
namespace spaceOne {
  let a = "2";
  const b = 1;
  function fn() {
    console.log("我是spaceOne的fn");
  }
}
```

编译后

```js
"use strict";
var spaceOne;
(function (spaceOne) {
    let a = "2";
    const b = 1;
    function fn() {
        console.log("我是spaceOne的fn");
    }
})(spaceOne || (spaceOne = {}));
```

#### 从命名空间中导出数据使用

```ts
namespace spaceOne {
  let a = "2";
  // 导出之后
  export function fn() {
    console.log("我是spaceOne的fn");
  }
}

// spaceOne.a // 报错
    
// 命名空间导出的数据，外界才可以访问到
spaceOne.fn() // okay
```

### 命名空间和模块的区别

命名空间：在程序<font color=red>内部</font>使用，可以使用命名空间封装防止全局污染

模块：在程序<font color=red>外部</font>使用，可以使用模块封装防止全局污染

总的来说：<font color=red>大部分情况下，使用模块就可以</font>，尤其是在前端开发中



### 三斜线指令

三斜线引用告诉编译器在编译过程中要引入的额外的文件

命名空间可以和三斜线指令配合使用

```typescript
/// <reference path="命名空间.ts"/>
// 相当于引入了命名空间的代码，然后我们下面就可以使用 命名空间导出的数据了
console.log(spaceOne.fn);
```

#### 注意：

三斜线指令只对于 `outFile` 有作用



## 声明合并

在TS当中接口和命名空间是可以重名的，TS会将多个同名的合并为一个

### 同名接口

1. 同名接口如果<font color=red>属性名相同</font>，那么<font color=red>属性类型必须一致</font>
2. 同名接口如果出现<font color=red>同名函数</font>，就会成为一个<font color=red>函数的重载</font>

### 命名空间

* 同名的命名空间中可以出现同名的变量、方法等，他们是独立的

  但是，同名的命名空间中不能导出同名的变量，方法等

  ```ts
  namespace spaceTwo {
    export let a = "2";
  }
  
  namespace spaceTwo {
    let a = "2"; // okay 
    // export let a = "2"; // 报错
  }
  ```

* 同名的命名空间中其它命名空间没有通过 export 导出的内容是获取不到的

  ```ts
  namespace spaceTwo {
    // 命名空间导出数据后
    export let params = "s";
  }
  
  namespace spaceTwo {
    // 其他同名命名空间可以直接使用 上面数据 params
    export function fn() {
      console.log(params);
    }
  }
  
  spaceTwo.fn(); // s
  ```

* 命名空间除了可以和同名的接口合并，还可以和同名的类、函数、枚举合并

  ##### 和同名接口合并

  ```ts
  interface SapceAndInterface {
    self: string
  }
  
  namespace SapceAndInterface {
    export let fn = () => {
      console.log("fn");
    };
  }
  
  // 既可以当接口使用，又可以当命名空间使用
  let obj: SapceAndInterface = {
    self: 'self'
  }
  SapceAndInterface.fn()
  ```

  ##### 和同名函数合并

  ```ts
  function SpaceAndFn() {
    console.log(1);
  }
  // 命名空间声明不能位于与之合并的类或函数前
  namespace SpaceAndFn {
    export let value = "值";
  }
  
  // SpaceAndFn既可以当方法使用，也可以当命名空间使用
  SpaceAndFn(); // 1 
  console.log(SpaceAndFn.value); // 值
  ```

  ##### 和同名枚举合并

  ```ts
  namespace SpaceAndEnum {
    export let value = "Enum"
  }
  
  enum SpaceAndEnum {
    One,
    Two
  }
  // 既可以当枚举使用，也可以当命名空间使用
  console.log(SpaceAndEnum.value); // Enum
  let num: SpaceAndEnum = SpaceAndEnum.One;
  console.log(num); // 0 
  
  // let num2: SpaceAndEnum = SpaceAndEnum.value; // 而且不会把value当作枚举成员
  ```

  ##### 和同名类合并

  ```ts
  class SpaceAndClass { }
  // 命名空间声明不能位于与之合并的类或函数前
  namespace SpaceAndClass {
    export let some = "some";
  }
  
  let s = new SpaceAndClass();
  console.log(SpaceAndClass.some);
  ```

  




## 装饰器

**Decorator** 是 <font color=red> `ES7` 的一个新语法</font>，目前仍处于提案中

装饰器实际上就是一个<font color=red>函数</font>，在使用时前面加上 <font color=red>@</font> 符号，<font color=red>写在要装饰的声明之前</font>，多个装饰器同时作用在一个声明时，可以写<font color=red>一行或写多行</font>

装饰器是<font color=#e00000>一种特殊类型的声明</font>，它能够被附加到<font color=#e00000>类、方法、访问器、属性、参数</font>上

被附加到<font color=#e00000>不同地方</font>的装饰器有<font color=#e00000>不同的名称和特点</font>（不同的默认参数，不同的返回值作用）



### 装饰器的基本格式

#### 普通装饰器

直接 <font color=#e00000>`@函数名`</font> 放到 **被装饰体**（类、方法、访问器、属性、参数）的声明前



#### 装饰器工厂

使用一个函数，内部<font color=#e00000>返回一个真正的装饰器</font>

在被装饰体的声明前，写上 <font color=#e00000>`@装饰器工厂的函数名(参数列表)`</font> 就可以

##### 优点： 装饰器工厂可以<font color=#e00000>更灵活的控制</font> 装饰器的作用

##### 和普通装饰器的区别：可以传递参数



#### 装饰器组合

就是用<font color=#e00000>多个</font>装饰器或装饰器工厂  装饰同一个 **被装饰体**

##### 执行顺序：

组合起来一起使用的时候，会<font color=#e00000>先从上至下</font>的执行所有的装饰器工厂，<font color=#e00000>拿到所有真正的装饰器</font>

然后再<font color=#e00000>从下至上</font>的<font color=#e00000>执行所有的装饰器</font>



### 装饰器的使用

使用装饰器大体的过程：

1. 首先要修改配置文件 <font color=#e00000>`experimentalDecorators` 为 true</font>
2. 将装饰器放在要 <font color=#e00000>被装饰的类、方法、访问器、属性、参数 前</font>
3. 在装饰器中<font color=#e00000>通过</font>装饰器的<font color=#e00000>默认参数（`target` 等）</font>，对 被装饰的东西 进行 <font color=#e00000>监视、修改或替换</font> 等操作

#### 类装饰器

* 类装饰器在类声明之前绑定（紧靠着类声明）

* 类装饰器可以用来监视，修改或替换类定义

* 在执行类装饰函数的时候，会把绑定的类作为其唯一的参数传递给装饰器

  唯一参数 constructor：类的构造函数

* 如果类装饰器返回一个新的类，它会用新的类替换原有类的定义

* 类修饰器 在类声明之后 执行

  ```ts
  /**
   * 装饰器函数
   * @param target 默认唯一的参数target就是被修饰的类
   * @returns 如果返回新的类，会替换原有的类（注意：新的类必须实现原有类的东西）
   */
  function decoratorOne(constructor: any) {
    // 可以在这里操作类
    /**
    * 修改
    */
    // 给 类 添加 静态属性或方法
    constructor.some = "some"  // some会存在于类上
    console.log(constructor);
    // 也可以添加 动态属性或方法 
    constructor.prototype.color = 'red'; // color会存在于实例上
    
      /* 注意：下面新的类会覆盖上面的修改 */
    
    /**
    * 替换
    */
    // 也可以返回一个新的类，替换原来的类
    return class NewClass {
      // 必须实现原有类的age属性
      age = 1;
      name = "添加一些东西"
    }
  }
  
  // 类声明前，绑定类装饰器
  @decoratorOne
  class Class {
    age: number
    constructor(age: number) {
      this.age = age;
    }
  }
  
  console.log(new Class(0)); // NewClass {age: 1, name: "添加一些东西"} 替换后的类实例
  ```

  

#### 方法装饰器

* 声明在一个方法的声明之前（紧靠着方法声明）

* 方法修饰器可以用来监视，修改或者替换方法定义

* 在执行方法装饰器的时候，修饰器函数会有下面三个默认参数
  * target： 对于静态方法就是当前的类, 对于实例方法就是当前的实例
  * propertyKey：被绑定方法的名字
  * desriptor：被绑定方法的属性描述符
    * writable
    * enumerable
    * configurable
    * value

```ts
/**
 * 方法装饰器
 * @param target 类 或者 实例
 * @param propertyKey 被绑定方法的名字
 * @param descriptor 被绑定方法的属性描述符
 */
function decoratorFn(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
  // 使用描述符 替换原来的方法
  descriptor.value = function () {
    console.log("我是被篡改的方法");
  }
}


class People {
  @decoratorFn  // 对于动态方法，target就是对象
  fnOne() {
    console.log("我是fnOne");
  }

  @decoratorFn  // 对于静态方法，target就是类
  static fnTwo() {
    console.log("我是fnTwo");
  }
}

People.fnTwo() // 我是被篡改的方法
new People().fnOne()  // 我是被篡改的方法
```



#### 访问器装饰器

* 声明在一个访问器（getter、setter）的声明之前（紧靠着访问器声明）
* 可以用访问器的属性描述符（PropertyDescriptor）来监听，修改或替换一个访问器的定义
* 在执行访问器装饰器的时候，修饰器函数会有下面三个默认参数
  - target： 当前的实例
  - propertyKey：成员的名字
  - desriptor：成员的属性描述符
    * enumerable: 是否可枚举
    * configurable: 
    * get: 
    * set: 
* <font color=#c00000>访问器装饰器</font>和<font color=#c00000>方法装饰器</font>的<font color=#c00000>区别</font>关键就在 descriptor 的四个属性不完全一样，访问器拿到的是<font color=#c00000>get、set</font>

````ts
// 声明 装饰器工厂 （可以自定义参数）
function getterDecorator(value: string) {
  // 返回装饰器
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target); // 实例
    console.log(propertyKey); // 访问器名
    console.log(descriptor); // 注意：这里拿到的是get\set，而不是value\writable, 所以拿不到value值
    // 替换原有的getter和setter
    descriptor.get = function () {
      return this.value + value;
    }
    descriptor.set = function (val) {
      console.log(`在设置${propertyKey}值`);
      this.value = val;
    }
  }
}

class Person {
  private name: string
  constructor(name: string) {
    this.name = name;
  }

  // 使用装饰器工厂（传入参数）
  @getterDecorator('-----装饰器添加的内容')
  public get _name(): string {
    return this.name;
  }

  public set _name(v: string) {
    this.name = v;
  }
}

let zs = new Person("zs");
// 因为descriptor中拿不到value值，所以第一次是undefined
console.log(zs._name);  // undefined-----装饰器添加的内容 （获取值时触发了 替换后的getter）

zs._name = '新名字'; // 在设置_name值 （修改值时触发了 替换后的setter）

console.log(zs._name);  // 新名字-----装饰器添加的内容
````



#### 属性装饰器

* 声明在一个属性声明之前（紧靠着属性声明）
* 在执行属性装饰器的时候，装饰器函数会有下面两个默认参数
  * target：对于静态属性就是当前的类，对于动态属性就是当前的实例对象
  * propertyName：成员的名字

```ts
function propsDecorator(target: any, propertyKey: string) {
  console.log(target); // 实例
  console.log(propertyKey); // color
  // 给实例上添加属性
  target.newProps = 'newProps';
}

function staticPropsDecorator(target: any, propertyKey: string) {
  console.log(target); // 类
  console.log(propertyKey); // belong
  // 给类上添加属性
  target.newStaticProps = 'newStaticProps';
}

class Dog {
  // 装饰一个动态属性
  @propsDecorator
  private color = "red"

  // 装饰一个静态属性
  @staticPropsDecorator
  static belong = '动物';
}


let dog = new Dog();
console.log(dog.newProps); // newProps
console.log(Dog.newStaticProps); // newStaticProps
```



#### 参数装饰器

##### 用处：可以用来检测参数是否符合规则

* 声明在一个参数声明之前（紧靠着参数声明）
* 在执行参数装饰器的时候，装饰器函数会有下面三个默认参数
  * target：实例 或 类
  * propertyKey：参数所在的方法 方法名
  * parameterIndex：参数在参数列表中的索引位置 

```ts
/**
 * 参数装饰器
 * @param target 实例或类
 * @param propertyKey 参数所在的方法 方法名
 * @param parameterIndex 参数在参数列表中的索引位置 
 */
function paramsDecorator(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(target); // 实例 或 类
  console.log(propertyKey); // run
  console.log(parameterIndex); // 1 
}


class Cat {
  // 给参数绑定装饰器
  static run(name: string, @paramsDecorator age: number) {
    console.log(name + "is" + age);
  }
}
```



## 声明文件

#### 规范：

将声明集中写到`XXX.d.ts`文件中，放在一个 `@types` 文件夹下

#### 注意：

* 大部分常用的第三方库，会自带对应的声明文件

  例如：想要安装jQuery的声明文件, 那么只需要`npm install @types/jquery`即可

* 声明文件的查询地址：https://www.typescriptlang.org/dt/search?search=



## `Object.defineProperty(obj, prop, descriptor)` 

作用：可以用来精确添加或修改对象的属性，只需要在descriptor对象中将属性特性描述清楚

实际场景：可以通过监听数据的getter和setter驱动视图层（Vue2.x）

### 描述符descriptor

#### 数据描述符

- configurable: 数据是否可删除，可配置
- enumerable: 数据是否可枚举
- value: 属性值，默认为undefined
- writable: 属性是否可读写

#### 存取描述符

* configurable:数据是否可删除，可配置
* enumerable: 数据是否可枚举
* get: 一个给属性提供getter的方法，如果没有getter 则为 undefined
* set: 一个给属性提供setter的方法，如果没有setter 则为 undefined

#### 注意：

数据描述符的value，writable 和存取描述符中的get，set属性不能同时存在，否则会抛出异常

