## Vuex基本使用（Store directory）

`store` 文件夹包含 `Vuex Store 文件`。`Nuxt` 自带 `VueX`，但是默认情况下是禁用的。

我们在 `store` 文件夹下 创建一个 `index.js` 文件，就会激活 `VueX store`

然后，`Nuxt` 会自动：

* 引入 `VueX`
* 在 `Vue根实例` 上添加 `store` 选项

### 使用

在`.js`文件中导出 `state`，`mutations`，`actions`

```js
export const state = () => ({
  count: 0
}); // 这里 state

export const mutations = {
  SET_COUNT(state, payload) {
    state.count = payload;
  }
}
```

##### 注意：

- 你的 `state` 要用一个 `function` 返回，以避免在服务端不需要的共享状态

### 模块化

`store` 文件夹中，每个 `.js` 文件会被转换为 一个命名空间模块（`index.js` 会成为根模块）

### 添加插件

我们可以在文件中以 `plugins` 的方式添加插件，导出

```js
import myPlugin from 'myPlugin'

// 添加插件
export const plugins = [myPlugin];

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```

### `The nuxtServerInit Action`

如果 我们在 store 全局中定义了 `nuxtServerInit` action， 那么 `Nuxt` 会在服务端用 `context` 调用它。

#### 使用场景

* 当我们在<font color='red'>服务端有一些想要直接给客户端的数据</font>时，可以使用

例如：我们可以通过 `req.session.user` 获取用户信息，直接给客户端

```js
export default actions= {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

#### 参数

* 第一个参数：`store`
* 第二个参数：`context`

#### 注意：

* 如果有异步过程，一定要返回 `promise`

  ```js
  export const actions = {
    nuxtServerInit({ commit }, { req }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit("SET_COUNT", 1);
          resolve()
        }, 2000);  // 客户端会延迟 2秒 出现页面
      })
    }
  }
  
  // 或者
  export const actions = {
    async nuxtServerInit({ dispatch }) {
      await dispatch('core/load')
    }
  }
  ```

### 开启严格模式

在 `store/index.js` 中

```js
export const strict = false
```



其余用法参考 `Vuex` 官方文档