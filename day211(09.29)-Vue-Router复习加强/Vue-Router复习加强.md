### Vue-Router

#### 命名路由

当我们使用命名路由时，我们可以使用 `params` 传递一个对象

<font color=red>当我们为任何路由提供`name`时，可以让此路由的 `params` 自动编码、解码</font>

如果我们使用 `对象形式的 params` 跳转，必须使用 `命名路由` 不然会有警告

或者我们 使用 `path形式 传递 params`，就可以不使用命名路由

```jsx
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>
// 编程式
router.push({ name: 'user', params: { username: 'erina' } })
```

* 进而在路由配置中，我们可以通过 `:username` 在 `path` 属性中使用

```jsx
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User
  }
]
```

* 并且进而可以 开启 路由配置的 `props` 属性

  ```js
  // 设置 props为true
  const routes = [{ path: '/user/:username', component: User, props: true }]
  
  // 在组件中
  const User = {
    // 在组件中通过 props 获取 params 中的数据
    props: ['username'],
    template: '<div>User {{ id }}</div>'
  }
  ```

  

#### 路由组件传参

##### 将 props 传递给路由组件

通过 使用 `props` 我们的路由组件中原本使用 `$route.params.id` 获取数据的方式，就可以替换成 `props: ['id']` ，可以提高路由组件的灵活性， 

* 布尔模式

  当 `props` 设置为 `true` 时，`route.params` 将被设置为组件的 `props`

* 对象模式

  当 `props` 是一个对象时，它将原样设置为组件 `props`。当 `props` 是静态的时候很有用

* 函数模式

  <font color=red>当 `props` 是一个函数时，我们可以通过函数的返回值，并使用 函数提供的 `route` 默认参数，随意设置 组件的 `props` </font>

  ```jsx
  // 跳转方式
  <router-link
          :to="{
            name: 'About',
            params: { some: 'some' },
            query: { what: 'what' },
          }"
  >
          About
  </router-link>
  
  // 路由配置中 props 配置函数
    {
      path: "/about/:some",
      name: "About",
      props: (route) => {
        // 将 query 和 params 都可以拿到，用来设置props
        return { queryAndParams: { query: route.query, params: route.params } }
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
        
  
  // 组件中 获取数据
  export default {
    props: ["queryAndParams"],
    created() {
      console.log(this.queryAndParams);
      // {params: {some: 'some'}, query: {what: 'what'}}
    },
  };
  ```

* 遇到 多个 **命名视图** ，要分别设置

  ```js
  const routes = [
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
  ```

  

### 命名视图

同级展示多个试图 可以使用 命名视图

```vue
// 没有添加名字的 默认为 default
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

同时为其配置多个组件

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // LeftSidebar: LeftSidebar 的缩写
        LeftSidebar,
        // 它们与 `<router-view>` 上的 `name` 属性匹配
        RightSidebar,
      },
    },
  ],
})
```

* 当我们有更多视图时，我们不需要的视图可以不去配置组件，留空。



### 导航守卫

#### 全局前置守卫 `beforeEach`

* 三个参数： `to, from, next`
* 返回值：`false` 表示取消导航

#### 全局解析守卫 `beforeResolve`

在 **每次导航** 时都会触发，但是确保在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用**

```js
// 判断用户是否允许权限，进而决定是否跳转
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
```

#### 全局后置钩子 `afterEach`

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数

##### 用处： 

可以用于分析，更改页面标题、声明页面等辅助功能以及许多其他事情都很有用



#### 路由独享的守卫 `beforeEnter`

**时期：**在 `beforeRouteUpdate` 之后，解析路由组件之前

在路由配置中定义

**优点：** 针对个别路由特别定制

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

还可以传递 **函数数组** <font color=#c80>便于复用</font>

```js
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: '/about',
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
]
```

#### 组件内的守卫

可以直接在路由组件内直接定义的路由导航守卫

* `beforeRouteEnter`

  在渲染该组件的对应路由被验证之前调用（通过`beforeEach` `beforeEnter`的验证）

  **注意：** 

  * 此时不可以使用 `this` ，因为组件实例还没被创建

  * 不过，可以通过 `next()` 参数中的回调函数，获取 组件实例，在导航被确认时执行

    ```js
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
      })
    }
    ```

* `beforeRouteUpdate`

  当路由改变，但是该组件<font color=red> 被复用时调用</font>

  * 什么时候会被复用呢：

    要知道，路由中的 `params, hash, query` 改变时，不会重新加载 路由组件，这是就会遇到复用的情况

* `beforeRouteLeave`

  在导航离开渲染该组件的对应路由时调用

  * 返回 `false` 可以取消导航

  ```js
  import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
  
  export default {
    setup() {
      // 与 beforeRouteLeave 相同，无法访问 `this`
      onBeforeRouteLeave((to, from) => {
        const answer = window.confirm(
          'Do you really want to leave? you have unsaved changes!'
        )
        // 取消导航并停留在同一页面上
        if (!answer) return false
      })
  
      const userData = ref()
  
      // 与 beforeRouteLeave 相同，无法访问 `this`
      onBeforeRouteUpdate(async (to, from) => {
        //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
        if (to.params.id !== from.params.id) {
          userData.value = await fetchUser(to.params.id)
        }
      })
    },
  }
  ```

在Vue3中，可以使用<font color=red>  `onBeforeRouteUpdate` 和 `onBeforeRouteLeave`  </font> Composition API



### 完整的导航解析流程

1. 导航被触发
2. 在失活的组件里调用 `beforeRouteLeave` 守卫
3. 调用全局的 `beforeEach` 守卫
4. 在重用的组件里调用 `beforeRouteUpdate` （当组件遇到复用时，会跳过下面的部分守卫，直接到`afterResolve`钩子）
5. 在路由配置里调用 `beforeEnter`
6. 解析异步路由组件
7. 在被激活的组件里调用 `beforeRouteEnter`
8. 调用 全局的 `beforeResolve` 守卫
9. 导航被确认
10. 调用全局的 `afterEach` 钩子
11. 触发 DOM 更新
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数 



### 路由元信息

当我们希望，在路由上 附加一些信息时，例如：过渡名称、谁可以访问路由等

可以通过 接收属性对象的 <font color=red>`meta`</font> 属性来实现，并且它可以在 <font color=red>**路由地址 **和 导航守卫</font>上都被访问到

**可以用来给路由组件做一些特定的设置**

```js
      {
        path: 'new',
        component: PostsNew,
        // 只有经过身份验证的用户才能创建帖子
        meta: { requiresAuth: true }
      },
```

#### 案例：给每个路由配置背景色

```jsx
// 配置路由
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { backgroundColor: "#c80" }
  },
  {
    path: "/about/:some",
    // name: "About",
    meta: { islogin: true, backgroundColor: 'grey' },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];
      

      
// 根组件App中，从route信息中获取，并且route是proxy，所以我们可以通过computed包装获取
<script>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    // 背景色
    const bgColor = computed(() => route.meta.backgroundColor);

    return {
      bgColor,
    };
  },
};
</script>
```



### 实用技巧

#### 响应路由参数的变化

当用户从 `/users/johnny` 导航到 `/users/jolyne` 时，**相同的组件实例将被重复使用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效

**不过，这也意味着组件的生命周期钩子不会被调用**

* 我们可以使用<font color=red> `beforeRouteUpdate` 导航守卫</font>，来取消导航，并且更新需要更新的部分

  ```js
  const User = {
    template: '...',
    async beforeRouteUpdate(to, from) {
      // 对路由变化做出响应...
      this.userData = await fetchUser(to.params.id)
    },
  }
  ```

  