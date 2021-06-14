## React脚手架

### 脚手架概念

脚手架是一种能<font color=red>快速</font>帮助我们<font color=red>生成项目结构和依赖</font>的工具

每个项目完成的效果不同，但是它们的基本工程化结构是相似的

所以我们没有必要每次都从零开始搭建项目，完全可以使用一些工具，帮助我们生成基本的项目模板

那么这个帮助我们<font color=red>生成项目模板的工具</font>我们就称之为 ”脚手架“

### CRA的基本使用及注意点：

* 在命令中执行：<font color=red>**`npx create-react-app 项目名称`** </font>
* 项目的名称只能是英文并且是小写字母，多个单词建议使用 `-` 或者 `_` 连接

### 项目文件

* `reportWebVitals.js` 用于测试项目性能的
* `App.test.js` 和 `setupTests.js`  用于项目测试

### 命令

* `npm run eject` 暴露配置文件

### 组件

#### 函数组件

就是为了表示<font color=red>静态</font>的视图层

函数式组件也被称为<font color=red>无状态组件</font>（状态就是state）

**语法：**在<font color=red>函数中返回组件的结构</font>即可

**注意：**函数组件虽然无状态，但是<font color=red>性能高</font>（不用实例化）

```jsx
import React from 'react';

// 函数组件
function FnCom() {
  const clickHandler = () => {
    // 普通的函数组件，没有实例化，this指向也就是undefined，也就没有组件实例的state等属性，所以说函数组件只能作为静态的无状态组件
    console.log(this); // undefined
  }

  return (
    <div onClick={clickHandler}>我是函数式组件</div>
  )
}

// 导出 函数组件
export default FnCom;
```

#### 类组件

被称为<font color=red>有状态组件</font>

**语法：**定义一个<font color=red>继承`React.Component` 的派生类</font>，在这个类中<font color=red>实现render方法</font>，在render方法中<font color=red>返回组件的结构</font>即可

```react
import React from 'react';

// 类组件
class ClassCom extends React.Component {
  clickHandler = () => {
    console.log(this);
    // ClassCom {props: undefined, context: undefined, refs: {…}, updater: {…}}
    // 继承React.Component后，ClassCom成为类组件，this本身就会带有上列组件的属性，可以管理状态
    // 所以我们将类函数称为有状态组件
  }

  // render方法中，返回 React元素
  render() {
    return (
      <div onClick={this.clickHandler}>我是类组件</div>
    )
  }
}

// 导出 类组件
export default ClassCom;
```

#### 类组件中方法内部的 this 指向问题

解决this指向问题有3种方式

- 利用箭头函数（不推荐）

- 使用bind方法

  在构造器中，使用bind修改方法中的this指向

- 使用箭头函数形式声明实例方法（推荐）

```jsx
import React from 'react';

class ThisCom extends React.Component {
  constructor() {
    super()
    // 方式二：使用修改this指向
    this.clickHandler = this.clickHandler.bind(this);
  }

  // 不使用箭头函数
  clickHandler() {
    console.log(this);
  }

  // 使用箭头函数（推荐）
  clickHandlerFn = () => {
    console.log(this);
  }

  render() {
    return (
      <div>
        {/* 方式一：利用箭头函数，让函数体中的this可以指向实例 */}
        {/*        注意：如果这样的回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染，所以不推荐 */}
        <div onClick={() => { this.clickHandler() }}>利用箭头函数</div>
        {/* 方式二：在构造器中，使用bind方法修改函数this指向 */}
        <div onClick={this.clickHandler}>使用bind方法</div>
        {/* 方式三：直接声明时使用箭头函数 */}
        <div onClick={this.clickHandlerFn}>使用箭头函数形式声明</div>
      </div>
    )
  }
}

// 导出 类组件
export default ThisCom;
```



#### 给组件添加事件

##### 函数组件添加事件

```jsx
import React from 'react';
// 函数组件
function FnCom() {
  // 声明 事件处理函数
  const clickHandler = () => {
    console.log('函数组件事件');
  }

  return (
    // 直接通过函数名调用
    <div onClick={clickHandler}>我是函数式组件</div>
  )
}

// 导出 函数组件
export default FnCom;
```

##### 类组件添加事件

```jsx
import React from 'react';
// 类组件
class ClassCom extends React.Component {
  // 注意：这里是ES6的类 声明方法的语法
  clickHandler = () => {
    console.log('类组件事件');
  }

  render() {
    return (
      // 使用 this 调用方法
      <div onClick={this.clickHandler}>我是类组件</div>
    )
  }
}

// 导出 类组件
export default ClassCom;
```

##### 事件对象

```jsx
import React from 'react';

function FnCom() {
  const clickHandler = (e) => {
    console.log(e);
    // 此时的事件对象，已经是React包装过的事件对象
    // SyntheticBaseEvent {_reactName: "onClick", _targetInst: null, type: "click", nativeEvent: MouseEvent, target: div, …}
    // 想拿到原生的事件对象，需要 e.nativeEvent
    console.log(e.nativeEvent);
    // MouseEvent {isTrusted: true, screenX: 854, screenY: 216, clientX: 78, clientY: 9, …}
  }

  return (
    <div onClick={clickHandler}>我是函数式组件</div>
  )
}

// 导出 函数组件
export default FnCom;
```



### 状态State管理

#### 初始化状态：

有俩种方式

* 在 <font color=red>constructor</font> 中，通过<font color=red> `this.state` </font>来初始化
* 通过 <font color=red>ES6 实例属性</font> 的简化语法来初始化

**注意：** state是一个对象，是组件内部私有的状态，只能在组件内部使用

#### 修改状态：

**语法：**<font color=red> `this.setState({要修改的状态名：新值})`</font>

**注意：**

- `state` 不可以直接修改，因为state是只读属性
- `setState()` 方法有两个作用：<font color=#c00000>修改状态、更新视图层</font>

```jsx
import React from 'react';

class StateCom extends React.Component {
  // 初始化state 方式一
  // constructor() {
  //   super();
  //   // 初始化 state
  //   this.state = {
  //     count: 1
  //   }
  // }

  // 初始化state 方式二
  state = {
    count: 1
  }

  // 添加方法
  updateCount = () => {
    // 修改状态
    this.setState({
      // 注意 不能使用 后++
      count: ++this.state.count
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.updateCount}>按钮</button>
      </div>
    )
  }
}

// 导出 类组件
export default StateCom;
```



#### 受控组件

表单元素（input、select等）通常<font color=red>自己维护state</font>，并根据用户输入进行更新。而在React中，可变状态通常保存在组件的state属性中，并且只能通过使用 `setState()` 来更新

所以，我们可以把两者结合起来，使React的state成为<font color=red> ”唯一数据源“</font>，渲染表单的React组件还<font color=red>控制着用户输入过程中发生的操作</font>，<font color=#3aafa5>被React以这种方式控制取值</font>的 ***表单输入元素*** 就叫做 ”受控组件“

```jsx
import React, { Fragment } from 'react';

// 受控组件
class StickCom extends React.Component {
  // 初始化数据
  state = {
    msg: ""
  }
  // input值改变时的事件处理函数
  changeHandler = (e) => {
    // 更新 状态
    this.setState({
      msg: e.target.value
    })
  }

  render() {
    return (
      // 占位标签
      <Fragment>
        <div>受控组件</div>
        {/* 绑定状态，并控制用户输入过程中发生的操作 */}
        <input onChange={this.changeHandler} value={this.state.msg} />
      </Fragment >
    )
  }
}

// 导出 类组件
export default StickCom;
```



### 案例

```jsx
import React, { Fragment } from 'react';

class ClassCom extends React.Component {
  // 初始化状态
  state = {
    // 编号
    id: "",
    // 品牌名称
    name: "",
    // 搜索关键字
    searchKey: '',
    // 品牌列表
    brandList: [
      { id: 1, name: '奔驰', ctime: '2020/9/23' },
      { id: 2, name: '宝马', ctime: '2020/9/21' },
      { id: 3, name: '长安奔奔', ctime: '2014/6/23' },
      { id: 4, name: '千里马', ctime: '2020/5/3' }
    ],
  }

  // input输入事件
  inputChange = (e, stateName) => {
    // 更新状态
    this.setState({
      [stateName]: e.target.value
    })
  }

  // 添加品牌
  addBrand = () => {
    let { id, name } = this.state;
    // 更新数据
    this.setState({
      // 添加 新品牌
      brandList: [...this.state.brandList, { id, name, ctime: new Date().toLocaleDateString() }],
      // 清空id 和 name
      id: "",
      name: ""
    })
  }

  // 删除品牌
  delBrand = (id) => {
    this.setState({
      brandList: this.state.brandList.filter(val => val.id !== id)
    })
  }

  // 使用 getter 实现 计算属性
  get filterList() {
    return this.state.brandList.filter(val => val.name.indexOf(this.state.searchKey) !== -1)
  }

  // 或者使用一个方法 计算
  getFilterList() {
    return this.state.brandList.filter(val => val.name.includes(this.state.searchKey))
  }

  render() {
    return (
      <Fragment>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
          integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossOrigin="anonymous"></link>
        <div className="panel panel-primary" style={{ width: '1000px', margin: '50px auto' }}>
          <div className="panel-heading">
            <h3 className="panel-title" >添加品牌</h3>
          </div>
          <div className="panel-body">

            <div className="form-group form-inline">
              <div className="input-group">
                <div className="input-group-addon">编号</div>
                <input type="text" className="form-control" value={this.state.id} onChange={(e) => { this.inputChange(e, 'id') }} />
              </div>

              <div className="input-group">
                <div className="input-group-addon">品牌名称</div>
                <input type="text" className="form-control" value={this.state.name} onChange={(e) => { this.inputChange(e, 'name') }} />
              </div>

              <div className="input-group">
                <button className="btn btn-primary" onClick={this.addBrand}>添加</button>
              </div>

              <div className="input-group pull-right">
                <div className="input-group-addon">按名称搜索</div>
                <input type="text" className="form-control" value={this.state.searchKey} onChange={(e) => { this.inputChange(e, 'searchKey') }} />
              </div>
            </div>

            {/* 表格区域 start */}
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th>编号</th>
                  <th>品牌名称</th>
                  <th>添加时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {/* 使用 this.filterList 或者 this.getFilterList() 都行 */}
                {this.getFilterList().map(val =>
                  <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.ctime}</td>
                    <td><button onClick={this.delBrand.bind(this, val.id)}>删除</button></td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* 表格区域 end */}
          </div>
        </div>
      </Fragment>
    )
  }
}

// 导出 类组件
export default ClassCom;
```

