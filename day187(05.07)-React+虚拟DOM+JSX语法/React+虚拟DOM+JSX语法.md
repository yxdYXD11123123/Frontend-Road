# React

### 概念

是一个用于构建用户界面的Javascript库

React <font color=red>主要用来写HTML页面，或构建Web应用</font>

如果从MVC的角度来看，React仅仅是视图层V，也就是只负责视图层的渲染，而并非提供了完整的M和C的功能

### 特点

* 声明式

  `vue 和 react` 都属于 声明式（省去中间操作的部分）

  `Dom操作` 则属于 命令式

* 组件化

* 一次学习，随处编写（可以用于前端开发、App开发，VR开发）

### 为什么学习React

* 安全可靠

  由Facebook来更新维护

* 思想升华

  是一个开源项目，融合了全世界诸多优秀成员的编程思想

* 值得借鉴

  Vue.js设计时，很多灵感来自于Angular和React

## 虚拟DOM

虚拟DOM是相对于浏览器所渲染出来的真实DOM

虚拟DOM就是使用 <font color=red>JS对象</font>来<font color=red>表示</font>页面上的<font color=red>真实DOM</font>

```html
  <div id="app"></div>
  <script>
    // 使用对象来表示真实DOM
    let app = {
      tagName: "div",
      id: "app"
    }
  </script>
```

### 为什么在React中需要虚拟DOM

1. 因为Js中用对象来表示页面，页面结构有变化时，可以很<font color=red>轻易的对比</font>出来（Diff算法）
2. 对象数据具有<font color=red>跨平台性</font>

### React中，虚拟DOM的基本使用

React中，使用 `React.createElement(...)` 创建虚拟DOM

然后，使用 `ReactDOM.render(...)` 将虚拟DOM渲染到真实的页面中

```html
<body>
  <div id="app"></div>

  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script>
      
    // 1. 创建虚拟DOM
    //    React.createElement(标签的名字/自定义组件，标签的属性，标签的内容)
    let oDiv = React.createElement("div", null, "Hello");
      
    // 2. 把虚拟DOM渲染到真实的页面上
    //    ReactDOM.render(虚拟Dom，挂载到哪个元素上)
    ReactDOM.render(oDiv, document.getElementById("app"));
      
  </script>
</body>
```

#### 注意：

* render方法：
  * 多次渲染时，后渲染会覆盖先渲染的
  * render方法一次只能渲染一个元素/组件
* createElement方法：
  * 可以添加3个以上的参数，<font color=red>后续参数</font>都会作为当前创建元素<font color=red>子节点</font>处理

#### 给元素添加监听事件

给元素添加监听的本质就是给元素添加属性

```js
    // 事件处理函数
    let clickHandler = () => {
      console.log('11111');
    }
    // 创建虚拟DOM
    let oDiv = React.createElement("div", { onClick: clickHandler }, "Hello");
    // 渲染 
    ReactDOM.render(oDiv, document.getElementById("app"));
```



## JSX 语法

### 为什么需要JSX

节点<font color=blue>结构比较复杂</font>时，按照上面虚拟DOM的使用步骤就会特别<font color=#c00000>复杂</font>

所以发明了JSX，专门用来<font color=red>编写React中的页面结构体</font>

### JSX是什么

JSX是一种JavaScript的<font color=red>语法扩展</font>，运用于`React` 架构中，其格式比较像是模板语言，但事实上完全是在JavaScript内部实现的。

元素是构成React应用的最小单位，JSX就是<font color=#c00000>用来声明React当中的元素</font>，React使用JSX来<font color=#c00000>描述用户界面</font>。

### 为什么使用JSX

* 使用JSX使得我们在React中<font color=red>编写页面结构更为简单、灵活</font>

* JSX是类型安全的，在<font color=red>编译过程</font>中就能<font color=red>发现错误</font>

* JSX<font color=red>执行更快</font>，因为它在编译为JavaScript代码后进行了优化

* <font color=red>防止XSS注入攻击</font>

  React DOM在渲染之前默认会过滤所有传入的值。它可以确保应用不会被注入攻击

### 使用JSX

* 需要使用 Babal 转译器，所以先要引入 `babel.min.js`
* 然后在 `<script>` 标签添加 `type` 为 `text/babel`，使用babel编译JSX语法

```html
<body>
  <div id="app"></div>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <!-- 引入babel -->
  <script src="./lib//babel.min.js"></script>
    
  <!-- 声明type -->
  <script type="text/babel">
  	// 自定义的函数组件
    function Button() {
      // 返回一个JSX语法的React元素
      return <button>按钮</button>
    }
    
    // 使用<Button/> 表示 构造函数实例 组件
    ReactDOM.render(<Button />, document.getElementById("app"))
    
  </script>
</body>
```

上述例子中，<font color=red>Babel会将 JSX中标签形式的 `<button>按钮</button>`元素 转为 `React.createElement('button',null,'按钮')` 虚拟DOM对象，也就是React元素</font>



### JSX 语法

#### 使用表达式

在JSX中只要看到 <font color=red>**`{}`**</font> 就会当做 `JS表达式 ` 解析（执行里面的JS代码）

所以无论 **绑定属性，还是绑定类名 `className`，还是绑定样式 `style`** ，只需要添加 <font color=red>**`{}`**</font>

然后再通过JS动态获取，动态绑定即可

##### 注意：

* `{}` 中，只能出现表达式，<font color=#c00000>不能出现语句</font>

* 以下嵌入的内容不会被显示出来：`[]、true、false、null、undefined`

  如果想显示上面内容，那么必须转为字符串

```jsx
    let btnName = "按钮名";
	// 自定义的函数组件Button
    function Button() {
      // JSX语法
      return <button>{btnName}</button>
    }
    // 使用<Button/> 表示 构造函数实例 组件
    ReactDOM.render(<Button />, document.getElementById("app"))
```

#### 使用条件渲染

```jsx
    let flag = true;
    function Some() {
      // 三元表达式
      return flag ? <p>flag为true</p> : <p>flag为false</p>
    }

    ReactDOM.render(<Some />, document.getElementById("app"))
```

#### 使用列表渲染

```jsx
    let foods = [
      {
        name: "苹果"
      },
      {
        name: "香蕉"
      },
      {
        name: "榴莲"
      }
    ];

    function List() {
      // 使用map方法，注意一定要绑定key
      return <ul>
        {foods.map((val, index) => <li key={index}>{val.name}</li>)}
      </ul>
    }

    ReactDOM.render(<List />, document.getElementById("app"))
```

#### 绑定属性

所有以 `-` 连接的样式名称都要转为驼峰命名法

```jsx
// 绑定属性
let Btn = <button className={'red'} style={{ fontSize: '110px' }}>按钮</button>

ReactDOM.render(Btn, document.getElementById("app"))
```

经过babel解析后

```js
let Btn = /*#__PURE__*/React.createElement("button", {
  className: 'red',
  style: {
    fontSize: '110px'
  }
}, "\u6309\u94AE");

ReactDOM.render(Btn, document.getElementById("app"));
```

##### 注意：

* 因为class在JS中不是关键字就是保留字，所以在react中所有的class都要写成className