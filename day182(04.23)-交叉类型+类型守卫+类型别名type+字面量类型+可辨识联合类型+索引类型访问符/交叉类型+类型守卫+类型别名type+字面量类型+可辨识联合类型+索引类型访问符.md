## 交叉类型

交叉类型是将 <font color=red>多个类型合并为一个类型</font>

```ts
type ObjType = {
  a: string
}

type ObjType2 = {
  b: number
}

// 交叉类型
let obj: ObjType & ObjType2;
obj = {
  a: "1",
  b: 1
}

// 获取一个交叉类型的新对象
let getNewObj = <T, U>(target: T, source: U): T & U => {
  // 类型断言，断言res是 T&U 类型
  // let res = {} as (T & U);

  // 或者不要写 {} 初始值
  let res: (T & U);
  // 将source中所有键值对复制到target对象中，并返回target对象
  res = Object.assign(target, source);
  return res;
}

console.log(getNewObj<ObjType, ObjType2>({ a: '1' }, { b: 1 })); // { a: '1', b: 1 }

// 也可以写出这样，ts可以推断出返回值为交叉类型 T & U
let getNewObject = <T, U>(target: T, source: U) => {
  return Object.assign(target, source);
}
```

## 类型保护

#### `typeof`

* 如果使用 `typeof` 来实现类型保护，那么<font color=red>尽量使用 `===`  `!==`</font>
* 只能保护 `number/ string/ boolean/ symbol` 类型

#### `instanceof`

用来检查引用类型

```ts
class Animal { }

class Dog extends Animal {
  age: number
  constructor() {
    super();
    this.age = 18;
  }
}

let newAnimal = new Animal();
let newDog = new Dog();

console.log(newAnimal instanceof Animal); // true
console.log(newDog instanceof Animal); // true
console.log(newAnimal instanceof Dog); // false
```

**作为类型守卫使用**

```ts
class Pig {
  name: string
  constructor() {
    this.name = 'pig';
  }
}
class Dog {
  age: number
  constructor() {
    this.age = 18;
  }
}

function fn() {
  // 生成随机数
  let r = Math.random();
  // 随机结果
  let res = r > 0.5 ? new Dog() : new Pig();
  // 使用 instanceof 守卫
  if (res instanceof Dog) {
    return res.age;
  } else { // 不是Dog就一定是Pig
    return res.name;
  }
}
```

## 类型别名

#### 接口和类型别名异同

* <font color=red>都可以描述属性或方法</font>

  ```ts
  type PersonType = {
    name: string
    study(): void
  }
  
  interface PersonInterface {
    name: string
    study(): void
  }
  
  // 接口 和 类型别名 可以合并
  let p1: PersonInterface & PersonType = {
    name: '',
    study() { }
  }
  ```

* <font color=red>都允许扩展</font>

  * interface 使用 `extends`

  * 类型别名 使用 `&`

    ```ts
    type OneType = {
      aaa: string
    } & {
      bbb: number
    }
    
    let obj1: OneType = {
      aaa: 'a',
      bbb: 1
    }
    ```

* <font color=red>type 可以声明基本类型别名，联合类型，元组等类型</font>，但是 interface 不能

* <font color=red>interface 可以自动合并</font>，但是type不能

  ```ts
  // interface 会自动合并
  interface FirstInter {
    x: number
  }
  interface FirstInter {
    y: string
  }
  
  let obj2: FirstInter = {
    x: 1,
    y: '1'
  }
  ```

  

## 字面量类型

在TS中我们可以把<font color=red>字面量作为具体的类型</font>来使用

当使用字面量作为具体类型时，该类型的<font color=red>取值就必须是该字面量的值</font>

```ts
type MyNum = 1 | 2;
// val 只能取值为 1 或者 2
let val: MyNum = 1; // okay
// let val2: MyNum = 3; // 报错
```



## 可辨识联合类型

具有<font color=red>共同的可辨识特征</font>

一个类型别名，包含了具有共同的可辨识特征的<font color=red>类型的联合</font>

```ts
// 正方形
interface Square {
  kind: "square" // 共同的可辨识特征
  size: number
}
// 长方形
interface Rectangle {
  kind: "rectangle" // 共同的可辨识特征
  width: number
  height: number
}
// 圆形
interface Circle {
  kind: "circle" // 共同的可辨识特征
  radius: number
}

// 给可辨识联合类型 起一个别名
type Shape = Square | Rectangle | Circle;

// 获取
function getArea(s: Shape) {
  // 通过可辨识特征判断 具体是哪个类型（这里可辨识特征 就像是 类型守卫一样的作用）
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.width * s.height;
    case "circle":
      return Math.PI * s.radius ** 2;  // ** 代表幂
  }
}

let area = getArea({ kind: "square", size: 10 })
console.log(area); // 100
```

#### 完整性检查

为了避免我们辨识时，遗漏掉一些联合类型中的类型，我们需要一些办法去检查，我们辨识的完整性。

* 方式一：开启严格模式 + 指定函数的返回值类型（常用的）

  ```ts
  // 方式一：
  function getArea(s: Shape): number {
    switch (s.kind) {
      case "square":
        return s.size * s.size;
      // 如果 缺少 类型，会报错
      // case "rectangle":
      //   return s.width * s.height;
      case "circle":
        return Math.PI * s.radius ** 2;  // ** 代表幂
    }
  }
  ```

  

* 方式二：使用never类型，收窄类型

  ```ts
  /**
   * 没有被穷尽所有可能
   */
  function noExhaust(x: never) {
    throw new Error('没有被穷尽所有可能')
  }
  
  function getArea(s: Shape) {
    switch (s.kind) {
      // case "square":
      //   return s.size * s.size;
      case "rectangle":
        return s.width * s.height;
      case "circle":
        return Math.PI * s.radius ** 2;  // ** 代表幂
      default:
        return noExhaust(s);  // 如果我们没有穷尽所有可能，这里就会提示错误
    }
  }
  
  let area = getArea({ kind: 'rectangle', width: 1, height: 2 })
  console.log(area);
  ```



## 索引类型访问操作符

<font color=red>通过[]索引类型访问操作符，我们就能得到某个索引的类型</font>

```ts
interface ManInterface {
  'name': string,
  'age': number
}

// 声明一个类型，但是类型值 是通过 索引类型访问操作符 获取的
type str = ManInterface["name"];
// 相当于
// type str = string;
```

<font color=#e000000>结合 `keyof` 使用</font>，

```ts
interface ManInterface {
  'name': string,
  'age': number
}

// 获取某类型对象的所有value类型的联合类型
type valuesOfManInterface = ManInterface[keyof ManInterface];
// type valuesOfManInterface = string | number;

// 需求：获取指定对象，部分属性的值，放到数组中返回
/**
 * 
 * @param obj 指定对象
 * @param whichKeys 部分属性
 * @returns 部分属性的值
 */
function getValues<T, K extends keyof T>(obj: T, whichKeys: K[]) {
  // 声明values数组中的元素类型为 T[K]  使用[]访问T对象类型的K索引类型
  let values: T[K][] = [];
  whichKeys.forEach(val => {
    values.push(obj[val]);
  })
  // 这样的话，返回的数组才有元素类型
  return values;
}

let res = getValues({ name: "dong", age: 23 }, ['age', 'name']);
console.log(res); // [ 23, 'dong' ]
```

#### 注意：

* 不会返回 null、undefined、never 类型