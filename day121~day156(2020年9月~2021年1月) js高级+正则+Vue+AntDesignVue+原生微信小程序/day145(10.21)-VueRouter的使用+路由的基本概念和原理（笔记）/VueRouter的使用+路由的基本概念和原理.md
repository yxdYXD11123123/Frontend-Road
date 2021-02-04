## `Vue` Router

### 路由的基本概念和原理

#### 路由的概念

路由的本质就是一种对应关系，比如说我们在`url`地址中输入我们要访问的`url`地址之后，浏览器要去请求这个`url`地址对应的资源

那么`url`地址和真实的资源之间就有了一种对应关系，就是路由

路由分为前端路由和后端路由

* <font color=red>后端路由是有服务器端进行实现，并完成资源的分发</font>

* <font color=red>前端路由是依靠hash值（锚链接）的变化进行实现</font>

  ```html
  <body>
      <div id="app">
          <!-- 路由书写的地方 -->
          <nav>
              <a href="#/index">主页</a>
              <a href="#/tech">科技</a>
              <a href="#/depart">娱乐</a>
          </nav>
          <!-- 对应路由的内容 -->
          <main>
              <!-- 占位符：放什么组件，由is属性决定 -->
              <!-- 注意：需要赋值字符串 -->
              <component :is="currentRouter"></component>
          </main>
      </div>
      <script src="./lib/vue-3.0.0.js"></script>
      <script>
          let index = {
              template: `<h2>主页信息</h2>`
          };
          let tech = {
              template: `<h2>科技信息</h2>`
          };
          let depart = {
              template: `<h2>娱乐信息</h2>`
          };
          let vm = Vue.createApp({
              data() {
                  return {
                      currentRouter: 'index'
                  }
              },
              components: {
                  index,
                  tech,
                  depart
              }
          }).mount('#app');
          // 监听 hash改变
          window.onhashchange = function () {
              if (location.hash == '#/index') {
                  vm.currentRouter = 'index';
              }
              else if (location.hash == '#/tech') {
                  vm.currentRouter = 'tech';
              }
              else if (location.hash == '#/depart') {
                  vm.currentRouter = 'depart'
              }
          }
      </script>
  </body>
  ```

后端路由性能相对前端路由来说比较低

前端路由的基本概念：根据不同的事件来显示不同的页面内容，即事件与事件处理函数之间的对应关系

前端路由主要做的事情就是监听事件并分发执行事件处理函数

#### 单页面应用

所谓的单页面应用（SPA）就是 `single page appliaction`

* 优点：
  1. 良好的交互体验
  2. 良好的前后端分离工作（后端不再负责模板渲染、输出页面的工作，后端`api`通用化）
  3. 减轻服务器压力
* 缺点：
  1. 首屏加载慢
  2. 不利于 `SEO`

### `Vue` Router的介绍

它是官方提供的路由管理器，是一个功能更加强大的前端路由器，推荐使用

`Vue Router`和`Vue.js`非常契合，可以一起方便的实现SPA（single page web application，单页应用程序）应用程序的开发

`Vue Router` 依赖于`Vue`，所以需要先引入`Vue`，再引入`Vue Router`

`Vue Router`的特性:

- 支持`H5`历史模式或者hash模式
- 支持嵌套路由
- 支持路由参数
- 支持编程式路由
- 支持命名路由
- 支持路由导航守卫
- 支持路由过渡动画特效
- 支持路由懒加载
- 支持路由滚动行为

### `Vue Router`的基本使用

1. 下载 `vue-router`

   ```shell
   npm install vue-router@next
   ```

   

2. 准备路由组件（components文件夹）

   ```vue
   <template>
     <div><h2>我是About组件</h2></div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style></style>
   
   ```

   ```vue
   <template>
     <div><h2>我是Home组件</h2></div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style></style>
   
   ```

   

3. 引入，配置路由（`routes/index.js`）

   ```js
   // 路由文件
   
   // 引入vue-router
   import * as VueRouter from "vue-router";
   
   // 导入组件
   import HelloVue from "../components/HelloWorld.vue";
   import About from "../components/About.vue";
   
   // 设置路由
   const routes = [
       { path: "/", component: HelloVue },
       { path: "/about", component: About }
   ];
   
   // 创建路由
   const router = VueRouter.createRouter({
       routes,
       // 是使用 URL 中的 hash（#）部分去创建路由
       history: VueRouter.createWebHashHistory()
   });
   // 导出路由
   export default router;
   ```

   

4. 挂载路由到实例

   ```js
   import { createApp } from "vue";
   import App from "./App.vue";
   // 创建实例
   const app = createApp(App);
   // 导入路由
   import router from "./routes";
   // 把路由挂载到app实例上
   app.use(router);
   // 绑定
   app.mount("#app");
   ```

    

5. 添加路由链接 `<router-link>` 是路由中提供的标签，默认会被渲染为a标签，to属性默认被渲染为`href`属性，to属性的值默认被渲染成#开头的hash地址（`App.vue`）

   添加路由填充位（路由占位符）`<router-view></router-view>`

   ```vue
   <template>
     <div class="route">
       <!-- to属性相当于href 添加链接 -->
       <router-link to="/">首页</router-link>
       <router-link to="/about">关于</router-link>
   	<!-- 添加路由对应的视图 -->
       <router-view></router-view>
     </div>
   </template>
   ```




### `Vue Router` 的路由重定向

```js
// 配置路由
const routes = [
  // 重定向  当我们访问/时，自动跳转到/home
  { path: '/', redirect: "/home" },
  { path: "/home", component: HomePage },
  { path: "/about", component: AboutPage }
];
```

重定向的目标也可以是一个命名的路由

甚至是一个方法，动态返回重定向的目标

#### 还可以使用别名来替代路由重定向

**/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。**

```js
const router = new VueRouter({
  routes: [
      // alias 别名
    { path: '/a', component: A, alias: '/b' }
  ]
})
```



### 嵌套路由

1. 在父级路由中设置children选项，声明路由规则，指定组件

   ```js
   // 引入组件
   import LoginPage from "../components/LoginPage";
   import ByInput from "../components/LoginByInputPage";
   import ByEr from "../components/LoginByER";
   // 定义路由
   const routes = [
       {
           path: "/login",
           component: LoginPage,
           // 嵌套路由
           // 注意只要加上了 '/' 例如：/xxx ，访问时都是/xxx，不会和父路由相拼接
           children: [
               // 通过 /byinput 访问
               { path: "/byinput", component: ByInput },
               // 通过 /login/byer 访问
               { path: "byer", component: ByEr, alias: '/' }
           ]
       }
   ]
   ```

2. 通过router-link的to属性访问（在父级路由的组件中书写`<router-view> 标签`）

   ```vue
       <h2>This is Login</h2>
       <router-link to="/byinput">账号密码登录</router-link>
       <span> </span>
       <router-link to="/login/byer">扫码登录</router-link>
       <router-view></router-view>
   ```

   

### 路由传参

1. 在路由中设置接收参数

   ```js
   const routes = [
       {
           // 路由传参
           path: "/user/:id",
           component: UserPage,
           // props设为true :id（动态路径中的参数）即可被组件中props属性接收到
           // props: true
           // props也可以设为回调函数（默认参数是$router）
           props: (router) => ({ id: router.params.id, name: 'dong' })
       }
   ];
   ```

2. 在组件中接收参数

   ```vue
   <template>
     <div>
       <router-link to="/login">login</router-link>
       <!-- :id（动态路径参数）可以用$route.params.id直接接收 -->
       <h2>This is User id为{{ $route.params.id }}</h2>
       <!-- 路由中props开启后，可以用props接收 -->
       <p>id 为 {{ id }} ， 名字为 {{ name }}</p>
       <button @click="printParams">点我</button>
     </div>
   </template>
   
   <script>
   export default {
     props: ["id", "name"],
     methods: {
       printParams() {
         console.log(this.$route.params);
       }
     }
   };
   </script>
   ```

   

### 命名路由

1. 配置命名路由

   ```js
   import personal from '../components/Personal'
   
   // 配置路由
   const routes = [
     // 命名路由：给路由命名为personal
     { path: '/personal/:uname/:id', name: "personal", component: personal, props: true }
   ];
   ```

2. 使用命名路由

   ```vue
   <template>
     <div class="index">
       <div>这里是首页</div>
       <!-- 命名路由的好处：使用:to绑定属性 替换之前的硬编码写法 to="/personal" 自动编码解码 -->
       <!-- 还可以在params中传参 -->
       <router-link
         :to="{ name: 'personal', params: { uname: 'frank', id: '123' } }"
         >个人中心</router-link
       >
     </div>
   </template>
   ```

   

### 编程式导航

**在 `Vue` 实例内部，你可以通过 $router 访问路由实例**

想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

```vue
<template>
  <div class="index">
    <div>这里是首页</div>
    <div>
      <button @click="toPersonal">个人中心</button>
    </div>
    <div>
      <button @click="toForward">前进一页</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toPersonal() {
      // 实例中有$router对象 里面有push、back、go、forward等等方法
      console.log(this.$router);
      //注意： $router和$route的区别
      console.log(this.$route);
      // 使用push方法 参数为 字符串或者对象
      // this.$router.push("/personal/dong/123");
      // 或者
      this.$router.push({
        name: "personal",
        params: { uname: "dong", id: "123456" },
        // 还可以带有查询参数 query: {}
        query: {}
      });
    },
    toForward() {
      // forward() 前进一页
      // this.$router.forward();
      // go(1)和forward作用一样
      this.$router.go(1);
    },
    backPage() {
      // back()返回上一页
      // this.$router.back();
      // go(-1)和back()作用相同
      this.$router.go(-1);
    }
  }
};
</script>
```


