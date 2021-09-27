## React-Redux

### 安装

`npm install react-redux`

### 基本使用

* 在 `index.js` 中，引入 `Provider` , 给 根组件 注入 `store`
* 在 组件中，使用 `connect` ，可以设置映射方法，增强组件，然后导出

```js
// 映射store中数据到组件的props中
function mapStateToProps(state) {
  const { todos } = state
  return { todoList: todos.allIds }
}
// 导出的增强的组件
export default connect(mapStateToProps)(TodoList)
```

* 在组件中访问数据

  ```js
  this.props.count
  ```

* 在组件中访问dispatch方法

  ```js
  // connect的默认第二个参数，会将dispatch方法传递给props
  // 所以我们可以通过this.props.dispatch 使用 store的dispatch
  this.props.dispatch(xxxAction);
  ```

  

### 原理

* connect 方法应用了 高阶组件 的写法，其实是对组件的一种 <font color=red>增强</font> 
* Provider其实是应用了 `Context` 

```
1.react-redux的使用
0.在index.js中 注入store
1.1 映射数据
1.1.1 在组件中引入connect
1.1.2 声明mapStateToProps
1.1.3 调用connect(传入mapStateToProps,null)(组件)
1.1.4 在模板中 this.props.字段名
1.2 映射方法
1.1.1 在组件中引入connect
1.1.2 声明mapDispatchToProps
1.1.3 调用connect(null,传入mapDispatchToProps)(组件)
1.1.4 this.props.方法名
2.react-redux中connect的封装
2.1 使用connect正常显示组件
```

```js
import React from "react";
/**
 * 
 * @param { Function } mapStateToProps  映射state
 * @param { Function } mapDispatchToProps  映射dispatch
 */
const connect = (mapStateToProps, mapDispatchToProps) => {
  return function (WrappedComponent) {
    class AdvComponent extends React.Component {
  
      render() {
        return (<WrappedComponent />)
      }
    }
    return AdvComponent
  }
}

export default connect;
```

2.2 显示state

```js
import React from "react";
import store from "../store"
/**
 * 
 * @param { Function } mapStateToProps  映射state
 * @param { Function } mapDispatchToProps  映射dispatch
 */
const connect = (mapStateToProps) => {

  return function (WrappedComponent) {
    class AdvComponent extends React.Component {
      render() {
        return (<WrappedComponent {...mapStateToProps(store.getState())}
        />)
      }
    }
    return AdvComponent
  }
}

export default connect;
```

2.3 调用方法

```js
import React from "react";
import store from "../store"
/**
 * 
 * @param { Function } mapStateToProps  映射state
 * @param { Function } mapDispatchToProps  映射dispatch
 */
const connect = (mapStateToProps, mapDispatchToProps) => {

  return function (WrappedComponent) {
    class AdvComponent extends React.Component {

      render() {
        return (<WrappedComponent {...mapStateToProps(store.getState())}
          {...mapDispatchToProps(store.dispatch)}
        />)
      }
    }

    return AdvComponent
  }
}

export default connect;
```

2.4 更新数据

```js
import React from "react";
import store from "../store"
/**
 * 
 * @param { Function } mapStateToProps  映射state
 * @param { Function } mapDispatchToProps  映射dispatch
 */
const connect = (mapStateToProps, mapDispatchToProps) => {

  return function (WrappedComponent) {
    class AdvComponent extends React.Component {
      constructor() {
        super();
        this.state = {
          storeState: { ...mapStateToProps(store.getState()) }
        }

      }
        
      componentDidMount() {
        store.subscribe(() => {
          this.setState({
            storeState: { ...mapStateToProps(store.getState()) }
          })
        })
      }

      render() {
        return (<WrappedComponent {...mapStateToProps(store.getState())}
          {...mapDispatchToProps(store.dispatch)}
        />)
      }
    }
    return AdvComponent
  }

}

export default connect;
```