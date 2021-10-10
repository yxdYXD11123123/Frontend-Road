##  自定义`loading`

`loading` 组件会在路由切换时 显示

#### 组件属性 `loading`

在页面组件中，我们可以通过这个属性，去<font color='red'>禁止</font>显示 默认的 加载进度条（在路由跳转过程中显示）

```vue
<template>
  <h1>My page</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```

### 自定义 `loading` 组件

我们还可以通过 `nuxt.config.js` 中的 `loading` 属性 去<font color='red'>自定义 `loading` 组件</font>

* Type：`Boolean` 设为 false 可以全局禁用

  ```js
  export default {
    loading: false
  }
  ```

* Type：`Object`  可以通过对象，设置 `loading` 样式等属性

  ```js
  export default {
    loading: {
      color: 'blue', // 颜色
      height: '5px' // 高度
    }
  }
  ```

  还可以设置：

  | Key         | Description                                  |
  | ----------- | -------------------------------------------- |
  | failedColor | 导航失败时的颜色                             |
  | throttle    | 在展示进度条时，等待多长时间（用来防止闪烁） |
  | duration    | 进度条最长会持续多长时间                     |
  | continuous  | 超出duration时，是否保持进度条动画状态       |
  | css         | 设置为false，可以移除样式，添加自己样式      |
  | trl         | 将进度条设置为从右向左的方向                 |

* Type：`String`  自定义 `loading.vue` 的文件路径

  我们必须在 组件中添加下列方法

  * <font color='red'>`start()` </font>路由切换开始时，被调用（<font color='cornflowerblue'>我们也可以通过<font color='red'> `this.$nuxt.$loading.start()` </font>主动调用</font>）

    所以这个方法里，要展示出自定义的loading组件

  * <font color='red'>`finish()` </font>路由切换完成时，会自动调用 

    这个方法里，要隐藏自定义的loading组件

  可选 添加

  * `fail()` 失败时调用
  * `increase()` 在路由加载期间调用 ，默认参数 `num` 最大值为100

  ##### 自定义 `loading ` 组件

  ```vue
  <template>
    <div v-if="show">加载中.... {{ num }}</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: false,
        num: 0,
      };
    },
    methods: {
      start() {
        this.show = true;
      },
      finish() {
        this.show = false;
      },
      increase(num) {
        this.num = num;
      },
    },
  };
  </script>
  
  <style>
  </style>
  ```

  添加配置

  ```js
    loading: "~/components/loading.vue"
  ```

  

## Head 配置

我们在开发网站时，为了提升SEO优化，除了SSR，还可以<font color='red'>设置网页 `TDK` （title, description, keywords）</font>

#### 全局配置

在 `nuxt.config.js` 中配置

```js
export default {
  head: {
    titleTemplate: '%s - Nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // hid is used as unique identifier. 用来保证不会出现重复的meta
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```



#### 页面配置

可以<font color='red'>设置 `Object` 或者 `Function`</font>

```vue
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello World!'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }
  }
</script>
```



## 生命周期中的hooks

* `beforeCreate, created, asyncData, fetch, middleware`

  在服务端，客户端都会运行  

* Vue2 除了 `beforeCreate, created` 都运行在客户端

#### 总结：

* 需要服务端渲染，就不要用 `mounted`以后的hooks
* 需要客户端渲染，就不要用`asyncData`等可以运行在服务端的钩子



## 项目部署

### nginx

高效轻量的web服务器

#### 安装

下载后解压到电脑指定目录

#### 命令

* <font color='orange'>`nginx -t` 校验配置是否正确</font>
* `nginx.exe -s stop` 记录下已经启动的pid文件，kill指定进程
* `nginx.exe -v` 显示指定信息

每次更新配置，都需要重启 `nginx` 服务，我们可以使用 `.bat` 文件，配置一键更新

#### 配置

* <font color='red'>`nginx -c conf/nginx.conf` 配置指定 `nginx`配置文件 并 启动</font>

### 项目打包

#### 静态部署

网站静态化：将网站所有页面，调用接口，动态交互等，全部在服务端给你最终渲染成html静态页面，相当于整个网站所有页面全部是静态的 html, css

* 使用 `yarn generate` 打包

##### 优点：

* 访问速度非常快

##### 缺点：

* 不能实时更新（股票网站就不可以做静态化）

#### 动态部署

本质上就是，开启一个 node服务器，帮你的网站通过node启动你的项目

##### 优点：

- 数据可以实时更新

##### 缺点：

- 问速度变满，是因为每个页面都是动态渲染，动态调用接口，拿到数据再去渲染