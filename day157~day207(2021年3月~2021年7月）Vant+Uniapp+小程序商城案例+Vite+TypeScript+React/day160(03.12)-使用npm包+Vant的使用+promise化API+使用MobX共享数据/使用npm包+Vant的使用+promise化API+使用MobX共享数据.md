## 使用npm包

### 小程序对npm的支持与限制

目前，小程序中已经支持使用npm安装第三方包，从而来提高小程序的开发效率

但是，在小程序中使用npm包有如下3个限制：

1. 不支持依赖于Node.js内置库的包(`fs模块`)
2. 不支持依赖于浏览器内置对象的包
3. 不支持依赖于C++插件的包

总结：虽然npm上有很多包，但是能供小程序使用的却不多



## `Vant`安装和使用

`Vant Weapp`是一套小程序UI组件库，助力开发者快速搭建小程序应用。

官方文档地址：https://youzan.github.io/vant-weapp

### `Vant Weapp` - 安装

1. 首先初始化package.json文件

2. 通过npm安装（建议指定版本为@1.3.3），下载到项目根目录下的node-modules

3. 使用微信开发者工具，构建npm包，使用npm模块

4. 修改app.json，将app.json中的 `"styple": "v2"` 去除 

5. 修改app.json

   ```json
   "setting":{
       "packNmpManually": true,
       "packNpmRelationList": [
           {
               "packageJsonPath": "./package.json",
               "miniprogramNpmDisDir": "./"   这里根据官方文档提示调整
           }
       ]
   }
   ```

### `Vant Weapp` - 使用 `Vant` 组件

在app.json的`usingComponents`节点中引入需要的组件，即可在wxml中直接使用组件



### `Vant Weapp` - 定制全局主题样式

`Vant Weapp` 使用 `CSS` 变量来实现定制主题。关于CSS变量的基本在用法，请参考MDN文档：

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties

在`app.wxss`中，写入CSS变量，即可对全局生效：

```css
page {
	--button--danger-background-color: #c00000	
}
/* 更多的定制主题的css变量名，在下方文件中，可以查找 */
```

所有可用的颜色变量，请参考Vant官方提供的配置文件：

https://github.com/youzan/vant-weapp/blob/dev/packages/common/style/var.less



## API Promise化 

### 为什么要把API promise化

默认情况下，小程序官方提供的异步API都是基于回调函数实现的

这种代码容易造成回调地狱的问题。

 ### 如何Promise化

1. 安装

   ```text
   npm install --save miniprogram-api-promise
   ```

2. 下载后，构建npm包的时候，最好删除现有的`miniprogram_npm`，然后重新构建

3. 使用

   ```js
   import { promisifyAll, promisify } from "miniprogram-api-promise";
   
   // promisifyAll 是用来将wx对象里的所有方法都promise化交给一个新对象
   const wxp = {};
   promisifyAll(wx, wxp);
   
   // promisify 是 单一的 Promise化API
   
   // 导出使用
   module.exports = {
     promisify,
     wxp
   };
   ```

   ```js
   wxp.getSystemInfo().then((res)=>{console.log(res);})
   ```

   

## 全局数据共享

### 什么是全局数据共享

全局数据共享（又称：状态管理）

是为了解决组件之间数据共享的问题

开发中常用的全局数据共享方案有：`Vuex、Redux、MobX` 等

### 小程序中的全局数据共享方案-安装

在小程序中，可使用 `mobx-miniprogram` 配合 `mobx-miniprogram-bindings` 实现全局数据共享。

其中：

`mobx-miniprogram` 用来创建Store实例对象

`mobx-miniprogram-bindings` 用来把Store中的共享数据或方法，绑定到组件或者页面中使用

* 安装

  ```shell
  npm install --save mobx-miniprogram@4.13.2 mobx-miniprogram-bindings@1.2.1
  ```

### 创建MobX的Store实例

创建store文件夹，放入`store.js`

```js
// store.js
// 按需导入第三方包observable, action
import { observable, action } from 'mobx-miniprogram'

// 创建实例对象并将其导出
export const store = observable({
  // 数据字段
  numA: 1,
  numB: 2,

  // 计算属性
  // 在计算属性的方法前，必须加get修饰符，代表sum的值是只读的，无法进行修改
  // 计算属性sum 依赖于numA和numB的值，因此sum函数的返回值就是最终的值
  get sum() {
    return this.numA + this.numB
  },

  // actions
  // 定义actions方法，用来修改store中的数据
  updateNumA: action(function (step) {
    this.numA += step;
  }),
  updateNumB: action(function (step) {
    this.numB += step;
  })
})
```

#### 在页面中使用

```js
// index.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
// 导入共享库
import {store} from "../../store/store"

Page({
  data: {
    
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      // 指定绑定的store
      store,
      // 指定要绑定的数据
      fields: ["numA", "numB", "sum"],
      // 指定要绑定的actions
      actions: ['updateNumA', "updateNumB"]
    })
  },
  /**
   * 加数字
   */
  addNum() {
    this.updateNumA(11)
    this.updateNumB(2)
  }
})
```

页面中

```html
  <van-button type="primary" bindtap="addNum">{{numA}}主要按钮</van-button>
  {{sum}}
```

#### 在组件中使用

```js
// components/newCom/newCom.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Component({
  behaviors: [storeBindingsBehavior],
  /**
   * 组件的属性列表
   */
  storeBindings: {
    store,
    fields: {
      numA: () => store.numA,
      numB: (store) => store.numB,
      sum: 'sum'
    },
    actions: {
      buttonTap: 'updateNumA'
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    updateNum() {
      this.buttonTap(1)
    }
  }
})
```

```html
<!--components/newCom/newCom.wxml-->
<view>我是newCom start</view>
<view>
  {{numA}}+{{numB}}={{sum}}
</view>
<view bindtap="updateNum">我是newCom end</view>
```

