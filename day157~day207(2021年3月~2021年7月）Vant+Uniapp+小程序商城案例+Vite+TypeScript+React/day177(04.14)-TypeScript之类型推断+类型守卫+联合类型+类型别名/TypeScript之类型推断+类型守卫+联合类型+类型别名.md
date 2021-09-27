## 类型推断

TypeScript 会根据一些简单的规则推断 变量的类型

```ts
let foo = 123;
// foo = "123"; // 报错，因为ts推断这里是number

// 函数返回值
function add(a: number, b: number) {
  return a + b;
}
// ts会推断 add():number
// 所以
// let str: string = add();  // 报错
```

#### 会根据 类型赋值 推断

```ts
// 定义一个函数类型，给函数类型 赋值类型要求
type Adder = (a: number, b: number) => number;
// ts 会按照Adder类型规范，要求我们
let fn: Adder = (a, b) => {
  return a + b;
}
```

#### 会根据 结构化 推断

```ts
const foo = {
a:123
}
foo.a = "abc"; // 报错  string类型不能给number
```

#### 会根据 解构 推断

```ts
const bar = [1,2];
let [a, b] = bar;
a = "1"; // 报错
```





## 类型守卫

TypeScript 熟知 JavaScript中 `instanceof` 和 `typeof` 运算符 的用法，如果你在一个条件中使用这些，TypeScript 将会推导出在条件块中的变量类型

### `typeof` 关键字

```ts
function doSome(x: number | string) {
  // console.log(x.substr(1)); // 报错：Property 'substr' does not exist on type 'number'.
  // 通过类型守卫，我们可以让ts推断出条件块中的变量类型
  if (typeof x === "string") {
    console.log(x.substr(1)); // okay
  } else {
    console.log(x.toFixed(2));
  }
}

function doSome2(x: string) {
  if (typeof x === "string") {
    console.log(x.substr(1)); // okay
  } else {
    // 会推断为 never类型
    console.log(x);
  }
}
```

### `instanceof` 关键字

```js
class Foo {
  foo: number = 123;
}
class Bar {
  bar: number = 456;
}

function doSomething(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo); // okay
    // console.log(arg.bar); 报错
  }
  else {
    console.log(arg.bar); // okay
  }
}

doSomething(new Foo()); // 123
doSomething(new Bar()); // 456
```

### `in` 关键字

in 操作符 可以安全的检查一个对象上是否存在一个属性，它通常也被作为类型保护使用

```ts
// 声明 鸭子类型（即 由当前方法和属性的集合决定的类型）
// 也就是有a属性和a1属性的对象，就是属于A鸭子的

// interface就是在 typeScript中 充当 duck typing 这样的角色
// 是一种 规定内外代码契约 的有力方式
interface A {
  a: number;
  a1: string;
}
interface B {
  b: string;
}

// 要求params参数属于A类型或B类型
function doStuff(params: A | B) {
  // 如果 params中有a属性的话，可以推断出 params 是A类型
  if ('a' in params) {
    // 所以按照鸭子类型params一定有a1属性
    console.log(params.a1);
  }
  else {
    // 不是A类型就一定是B类型，所以就一定有b属性
    console.log(params.b);
  }
}

doStuff({ b: '2' }) // 2
```



## 联合类型

在JavaScript中，你可能希望属性为多种类型之一

```ts
// 规定 command 参数 是一种联合类型
function formatCommandline(command: string[] | string) {
    let line = "";
    if (typeof command === "string") {
        line = command.trim();
    } else {
        line = command.join(" ").trim();
    }
}
```



## 类型别名 `type` 

类型别名，通过 `type` 关键字用来给一种类型，起一个名字

```ts
// 将一个联合类型 起一个别名
type StringOrNumber = string | number;
// 使用类型别名
let some: StringOrNumber = 1;
```

我们还经常用 `type` 定义其它类型

```ts
// 例如 用 type 定义一个函数类型
type TOneOfFn = (x: number) => number;
// let fn2: TOneOfFn = function (y:string) { return 1 }; // 报错  参数类型不符合
// let fn2: TOneOfFn = function (y:number) { return '1'}; // 报错  返回值类型不符合
let fn2: TOneOfFn = function (y: number) { return 1 }; // okay
```

