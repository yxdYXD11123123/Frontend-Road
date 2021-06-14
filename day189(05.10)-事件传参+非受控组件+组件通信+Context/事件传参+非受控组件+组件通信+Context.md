## 事件传参

我们有时需要为事件处理函数传递<font color=red>更多的参数</font>，但是还要注意<font color=red>不能将事件对象默认参数覆盖</font>

所以，有两种解决方式：

* 使用 箭头函数 <font color=red>将事件对象默认参数二次传递</font>

  ````jsx
  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  ````

* 使用<font color=red>bind方法</font>，传入更多参数，事件对象以及更多的参数将会被隐式的进行传递

  ```jsx
  <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
  ```

  

## 表单处理

### 受控组件

### 非受控组件

在大多数情况下，我们推荐使用受控组件来处理表单数据。但是这样需要为数据变化的每种方式都编写事件处理函数等等，在这样的情况下，我们可以使用 <font color=red>非受控组件</font>，这是<font color=red>实现输入表单的另一种方式</font>。

#### 受控组件 和 非受控组件 的区别

* 在受控组件中，表单数据是<font color=red>由React组件来管理</font>的
* 在非受控组件中，表单数据是<font color=red>由DOM节点来处理</font>的

对于某一个表单元素，借助于 <font color=red>`ref`</font>，使用<font color=red>原生DOM方式 来 获取 表单元素值</font>的元素叫做非受控组件

#### Refs

**`ref` 的作用：**获取DOM节点或组件

Refs 是使用 <font color=red> `React.createRef()` 创建</font>的，并通过<font color=red>  `ref` 属性附加</font>到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

##### 使用：可以通过 `this.实例属性.current.value`  使用值

```jsx
import React from "react";

class RefCom extends React.Component {
  constructor() {
    super();
    // 创建Refs，并分配给实例属性
    this.input = React.createRef();

    console.log(this.input); // {current: null}
  }

  // 或者在这里声明
  // input = React.createRef();

  showInput = () => {
    console.log(this.input); // {current: input}
    console.log(this.input.current); // <input type="text"> DOM元素
    // 通过 实例属性 直接使用 表单元素的值
    console.log(this.input.current.value);
  }

  render() {
    return (
      <div>
        {/* 通过ref属性 附加到React元素上 */}
        <input type="text" ref={this.input} />
        <br />
        <button onClick={this.showInput}>展示Refs</button>
      </div>
    )
  }
}

export default RefCom;
```



## 组件通信

#### 介绍

<font color=#c0000>组件是独立且封闭的单元</font>，默认情况下，只能使用组件自己的数据

在<font color=#c0000>组件化</font>过程中，我将一个完整的功能 拆分成多个组件，以更好的完成整个应用的功能

而在这个过程中，多个组件之间不可避免的要<font color=#c0000>共享某些数据</font>。

为了实现这些功能，就需要<font color=#c0000>打破组件的独立封闭性</font>，<font color=#c0000>让其与外界通信</font>

#### 组件通讯有三种情况

* 父子通信
* 兄弟通信
* 后代通信

### 父传子

组件是封闭的，要接受外部数据应该通过<font color=red> `props` </font> 来实现

**props 的作用：**接收外界传递给组件的数据

##### 实现方式：

* 给<font color=#c0000>子组件标签添加属性</font> 传递数据
* 函数组件通过<font color=#c0000>参数props</font>接收数据 、类组件通过 <font color=#c0000>`this.props`</font> 使用数据

`父组件.jsx`

```jsx
import React from 'react';
// 引入子组件
import Son from "../Son";

class Father extends React.Component {
  render() {
    return (
      <div>
        父组件
        {/* 给子组件props传值 */}
        <Son msg="父传子"></Son>
      </div>
    )
  }
}

export default Father;
```

`类子组件.jsx`

```jsx
import React from 'react';

// 类子组件
class Son extends React.Component {
  render() {
    return (
      <div>
        {/* 使用props */}
        子组件 -- {this.props.msg}
      </div>
    )
  }
}

export default Son;
```

`函数子组件.jsx`

```jsx
import React from 'react';

// 函数子组件
function Son(props) {
  return (
    <div>
      {/* 使用props */}
      子组件 -- {props.msg}
    </div>
  )
}

export default Son;
```

#### 注意点：

* `props` 是只读对象，只能读取属性的值，无法修改对象
* <font color=red>在 `constructor` 中使用 `props` 时，要通过 `constructor(props)` 获取</font>

#### 默认值

我们可以通过配置特定的 <font color=red>`defaultProps`</font> 属性来定义 `props` 的默认值

```jsx
import React from 'react';

function Son(props) {
  return (
    <div>
      {/* 使用props */}
      子组件 -- {props.msg}
    </div>
  )
}

// 设置 props 默认值 （类组件 也是这样设置）
Son.defaultProps = {
  msg: "子组件默认值"
}

export default Son;
```

#### props 如何进行类型检查

* 下载 [`prop-types` 库](https://www.npmjs.com/package/prop-types) 
* 配置特定的 `propType` 属性

##### 注意：

* 出于性能方面的考虑，`propTypes` 仅在开发模式下进行检查。

```jsx
import React from 'react';
// 引入 prop-types
import PropTypes from "prop-types";

// 子组件
class Son extends React.Component {
  render() {
    return (
      <div>
        {/* 使用props */}
        子组件 -- {this.props.msg}
      </div>
    )
  }
}

// function Son(props) {
//   return (
//     <div>
//       {/* 使用props */}
//       子组件 -- {props.msg}
//     </div>
//   )
// }

Son.propTypes = {
  // 要求参数必传，且必须是字符串
  msg: PropTypes.string.isRequired
}

export default Son;
```

### 子传父

同 `Vue` 和 `uniapp` 中 子传父 实现方式类似

* 在父组件中，声明一个用来 接收子组件传来的值 的函数
* 在父组件中，给子组件标签 传入 接收参数的回调函数
* 在子组件中，通过事件触发子组件的方法
* 在子组件中，通过props调用父组件传来的方法 并 传递数据

`父组件.jsx`

```jsx
import React from 'react';
// 引入子组件
import Son from "../Son"

class Father extends React.Component {
  state = {
    msg: "默认值"
  }

  // 1.声明一个用来 接收子组件传来的值 的函数
  receiveMsgFromSon = (msg) => {
    this.setState({
      msg
    })
  }

  render() {
    return (
      <div>
        父组件
        <p>{this.state.msg}</p>
        {/* 2.给子组件 传入 接收参数的回调函数*/}
        <Son receiveMsgFromSon={this.receiveMsgFromSon}></Son>
      </div>
    )
  }
}

export default Father;
```

`子组件.jsx`

```jsx
import React from 'react';

// 使用子组件给父组件传值
class Son extends React.Component {
  state = {
    msgFromSon: "我是来自子组件的信息"
  }

  // 4.子组件的方法中，通过props调用父组件传来的方法 并 传递数据
  toFather = () => {
    this.props.receiveMsgFromSon(this.state.msgFromSon);
  }

  render() {
    return (
      <div>
        <div>给父组件传值</div>
        {/* 3.通过事件触发子组件的方法 */}
        <button onClick={this.toFather}>传！</button>
      </div>
    )
  }
}

export default Son;
```



### 兄弟组件传值

* 方式一：通过子传父、父传子结合，实现兄弟组件传值

  ```jsx
  import React from 'react';
  // 引入子组件
  import Son from "../Son";
  // 引入子组件
  import Daughter from "../Daughter"
  
  class Father extends React.Component {
    state = {
      msg: "默认值"
    }
  
    // 1.声明一个用来 接收子组件传来的值 的函数
    receiveMsgFromSon = (msg) => {
      this.setState({
        msg
      })
    }
  
    render() {
      return (
        <div>
          父组件
          <p>{this.state.msg}</p>
          {/* 2.给子组件 传入 接收参数的回调函数*/}
          <Son receiveMsgFromSon={this.receiveMsgFromSon}></Son>
          {/* 兄弟组件 通过props 拿到，实现兄弟之间传值 */}
          <Daughter msg={this.state.msg}></Daughter>
        </div>
      )
    }
  }
  
  export default Father;
  ```

* 方式二：通过 `Redux` 或者 `Hooks`



### 后代传值（`context`）

`Context` 提供了一个<font color=#c00000>无需为每层组件手动添加 props</font>，就能在<font color=#c00000>组件树</font>间进行<font color=#c00000>数据传递</font>的方法

在一个典型的React应用中，数据是通过props属性自上而下（父传子）进行传递的，但是这种办法对于某些类型的属性而言是及其繁琐的（例如：地区偏好、UI主题），因为这些属性是应用程序中许多组件都需要的。

`Context` 提供了一种在组件之间共享此类值的方式，而不必逐层传递 `props`

#### 应用场景：

*很多*不同层级的组件需要访问同样一些的数据

#### 使用方式：

* 在 `utils` 目录下，创建一个`context-xxx.js` 文件，在文件中，通过<font color=red> `React.createContext()`</font>，创建`context` 并导出

* 在祖先组件中，引入 `context`，

  通过<font color=red> `<Context.Provider value="黑色主题">...</ThemeContext.Provider>`</font>，提供注入数据，包裹后代组件

* 在后代组件中，引入`context`，

  通过 <font color=red>`<Context.Consumer>{value => <div>{value}</div> }</Context.Consumer>`</font> ，使用数据

`utils/context-theme.js`

```js
import React from "react";
// 创建context，导出
export default React.createContext()
```

`Ancestor.jsx` 祖先组件

```jsx
import React from 'react';
// 引入后代组件
import Father from "../Father";
// 引入context
import ThemeContext from "../../utils/context-theme";

class Ancestor extends React.Component {

  render() {
    return (
      // 使用context.Provider 通过 value属性 注入
      <ThemeContext.Provider value="黑色主题">
        <div>
          {/* 里面放后代组件 */}
          <Father></Father>
        </div>
      </ThemeContext.Provider>
    )
  }
}

export default Ancestor;
```

`Father.jsx`

```jsx
import React from 'react';
// 引入子组件
import Son from "../Son";
// 引入context
import ThemeContext from "../../utils/context-theme";

class Father extends React.Component {

  render() {
    return (
      // 可以直接使用 Consumer 使用传来的value值
      <ThemeContext.Consumer>
        {value => (
          <div>
            父组件
            <Son ></Son>
            <p>主题：{value}</p>
          </div>
        )
        }
      </ThemeContext.Consumer>
    )
  }
}

export default Father;
```

`Son.jsx`

```jsx
import React from 'react';
// 引入context
import ThemeContext from "../../utils/context-theme";

// 使用子组件给父组件传值
class Son extends React.Component {
  render() {
    return (
      <div>
        {/* 同上直接使用 */}
        <ThemeContext.Consumer>
          {value => <p>主题：{value}</p>}
        </ThemeContext.Consumer>
      </div>
    )
  }
}

export default Son;
```

