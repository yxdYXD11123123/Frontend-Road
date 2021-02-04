## `JS` 高级

### 创建对象的方式

对象是由属性和方法组成的：是一个无序键值对的集合，指的是一个具体的事物

* 属性：事物的特征，在对象中用属性来表示
* 方法：事物的行为，在对象中用方法来表示

```js
// 系统构造函数的方式
let obj = new Object();

// 工厂函数的方式
function fatoryFn() {
    let obj = new Object();
    return obj;
}

// 自定义构造函数的方式   （构造函数就相当于我们的一张图纸）
// es6中用 类 完全替代了自定义构造函数创建对象的方式 
function CreateObj(name, age) {
    this.name = name;
    this.age = age;
};
// 使用new关键字来实例化对象
let objB = new CreateObj('dong', 22);
```



### 面向过程与面向对象对比

#### 面向过程

**优点**：性能比面向对象高，适合跟硬件联系很紧密的东西，例如：单片机就是采用面向过程编程。

**缺点**：不易维护，不易复用，不易扩展

#### 面向对象

**优点**：易维护，易复用，易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统更加灵活，更加易于维护。

**缺点**：性能比面向过程低



### `es6`里面的类

在`es6`中新增了类的概念，可以使用class关键字声明一个类，类抽象了对象的公共部分，它泛指某一类(class)对象特指某一个，通过类实例化一个具体的对象。

#### 语法

```js
// 语法：
class ClassName {
    // constructor 构造器  用来声明公共属性
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // 声明方法（只要想要声明对象的方法，就写在class的大括号里面，一般写在构造器的下面）
    sayHi() {
        console.log('我是' + this.name);
    }
}
// 通过类创建对象
let obj = new ClassName('dong', 18);
// 当类被new调用之后，类的实参会自动和类中的constructor进行绑定
console.log(obj);  // ClassName { name: 'dong', age: 18 }
obj.sayHi();  // 我是dong
```

#### 注意：

1. 通过class关键字创建类，类名我们还是习惯首字母大写
2. 类里面有个constructor函数，可以接收传递过来的参数，同时返回实例对象
3. constructor函数 只要 new 生成实例时，就会自动调用这个函数，如果我们没有写这个函数，类也会自动生成这个函数。
4. 因为类的本质其实是个函数，所以多个函数方法之间不需要添加逗号分隔
5. 生成实例时，new 不能省略
6. 语法规范：创建类时，类名后面不要加小括号，生成实例时，类名后面需要加小括号，类中的函数不需要加function



### 类的继承

#### 语法

````js
// 父类
class Father {
}
// 只要能继承属性和方法就够了
class Son extends Father {
}

// 示例
class Father {
    constructor(lastName) {
        this.lastName = lastName;
    }
    sayLastName() {
        console.log(`我姓${this.lastName}`);
    }
}
class Son extends Father {
}
// new
let son = new Son('袁');
son.sayLastName();  // '我姓袁'
````

#### super的使用

```js
class Father {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    sum() {
        return this.x + this.y;
    }
}

class Son extends Father {
    // 如果子类使用了constructor函数，那么必须使用super
    constructor(x, y, z) {
        // super作用：调用父类的构造函数
        // 子类定义公共属性的时候，还想要调用父类的属性和方法，就要使用super
        super(x, y)
        this.z = z;
    }
    // 如果子类和父类存在同名的函数优先调用子类的
    sum() {
        // 这里的this.x 和 this.y 都是super调用父类的构造函数时继承下来的
        return this.x - this.y + '---' + this.z
    }
}

let son = new Son(1, 1, 3);
console.log(son.sum());  // 0---3   最终的sum()其实是调用了子类的sum()
```

#### 注意：

1. 继承中，如果实例化子类输出一个方法，先看子类有没有这个方法，如果有就先执行子类的
2. 继承中，如果子类里面没有，就去查找父类有没有这个方法，如果有，就执行父类的这个方法（就近原则）
3. 如果子类想要继承父类的方法，同时在自己内部扩展自己的方法，利用super调用父类的构造函数，super必须在子类this之前调用
4. 时刻注意this的指向问题，类里面共有的属性和方法一定要加this使用
   * constructor中的this指向的是new出来的实例对象
   * 自定义的方法，一般也指向new出来的实例对象
   * 绑定事件之后this指向的就是触发事件的事件源
5. 在`ES6`中类没有变量提升，所以必须先定义类，才能通过类实例化对象



