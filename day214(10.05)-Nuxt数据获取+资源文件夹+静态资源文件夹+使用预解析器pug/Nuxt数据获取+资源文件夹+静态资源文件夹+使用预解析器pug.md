## 数据获取 （Data Fetching）

Nuxt支持传统的Vue在客户端加载数据的模式，例如在 `mounted` 中获取数据

然而，为了在服务端渲染期间可以渲染数据，我们需要使用 Nuxt 特别提供的钩子函数。正是这样让我们的页面在客户端带着所有需要的数据一起渲染出来。

* 在 `mixin` 中定义 `fetch, asyncData`， 会被组件中定义的 `fetch, asyncData` 覆盖

### `asyncData`

`Nuxt.js` 扩展了 `Vue.js`，增加了一个叫 `asyncData` 的钩子函数，使得我们可以在设置组件的数据之前<font color='orange'>异步获取或处理数据。</font>

#### 功能

* `asyncData` 可以便捷地将它的<font color='red'>返回值</font> 合并到你组件的<font color='red'>状态（State，也就是data对象）</font>中，所以可以直接在页面中使用
* 获取的数据可以显示到页面的源代码中，有利于SEO

#### 默认参数：

接收 `context` 为它的默认参数

```js
  export default {
    async asyncData({ params, $http, query, route }) {
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
      return { post }
    }
  }
```

#### 注意：

* <font color='red'>只能用在页面组件，并且不可以获取 `this`</font>
* 有时在服务端运行，有时在客户端运行，要用 <font color='orange'>`process.server`</font> 判断
* `asyncData` 方法在 `query` 参数改变时，默认不会被调用。如果你想改变这个行为（例如：建造一个分页组件时），你可以设置 `watchQuery` 属性设置 `query`的监听器，`query` 改变时 执行组件方法 `asyncData`、`fetch`、`validate`等
* <font color='orange'>`Nuxt`会等到`asyncData`完成时，才跳转下一个页面</font>。如果这里出错，会阻止路由导航，并显示一个页面错误
* 在客户端加载时，不会展示 加载占位器
* 因为 `asyncData` 只能帮助页面`pages`异步加载数据，那么在组件`components`中，如果想要实现加载异步数据后渲染页面要怎么办呢？ 使用下面的 <font color='red'>新的`fetch(){}` 钩子函数</font>（Nuxt 2.12 以后的版本）



### `The fetch hook` 

这个钩子函数可以被放在任何组件中

##### 时期：

* `fetch` 是一个在服务端渲染期间，组件实例被<font color='red'>创建之后</font>被调用，在客户端<font color='red'>导航时</font>被调用

##### 返回值：

* <font color='red'>必须返回一个 `promise`</font>， 隐式或者显式调用 `async/await` 都可以。

```js
export default {
  data() {
    return {
      data: [],
    };
  },
  async fetch() {
    const res = await this.$axios.get("https://cnodejs.org/api/v1/topics");
    if (res.status === 200) this.data = res.data.data;
  },
};
```



## 文件夹

### 资源文件夹（Assets directory）

`assets` 文件夹 包含了 未编译的资源文件，例如：<font color='#0af'>`stylus` `sass files` `images` `fonts`</font>

#### Images

* 在 `vue` 模板中使用

  ```vue
  <template>
    <img src="~/assets/your_image.png" />
  </template>
  ```

  会被解析为

  ```js
  createElement('img', { attrs: { src: require('~/assets/image.png') } })
  ```

* 在 `css` 文件中使用（不加 反斜线）

  ```css
  background: url('~assets/banner.svg');
  ```

* 在行内样式中使用

  ```jsx
  <img :src="require(`~/assets/img/${image}.jpg`)" />
  
  // 或者
  <div>
    <img :src="imgSrc" alt="" />
  </div>
  
  export default {
    data() {
      return {
        imgSrc: require("~/assets/images/pic.jpg"),
      };
    },
  };
  ```



#### Styles

我们可以直接在 `nuxt.config.js` 中 使用 <font color='red'> `css`属性</font> 配置全局 样式文件

```js
export default {
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    'bulma',
    // CSS file in the project
    '~/assets/css/main.css',
    // SCSS file in the project
    '~/assets/css/main.scss'
  ]
}
```

##### 使用 Sass

* 安装

```shell
yarn add -D sass sass-loader@10 fibers
```

* <font color='red'>使用全局变量</font>时，我们需要将 全局变量文件 引入局部

  但是为了避免每次都手动引入，我们需要使用<font color='orange'> ` @nuxtjs/style-resources` </font> 来完成这个事（原来的版本提供了  `styleResources`去完成这个事， 但是为了提高性能，废弃了这个属性）

  * 下载

    ```shell
    yarn add -D @nuxtjs/style-resources
    ```

  * 在 `nuxt.config.js` 中配置

    ```js
      // buildModules 是用来导入 在项目开发和打包期间 需要用的依赖
      buildModules: [
        '@nuxtjs/style-resources',
      ],
    	// @nuxtjs/style-resources 会接管 styleResources 属性，进而让我们进行设置
      styleResources: {
        scss: ["~/assets/scss/vars.scss"]
      },
    ```

    然后，所有的样式文件就都会引入 `vars.scss` 文件

  * 注意：
    * 我们尽量不要这样引入真实的样式，那样会降低 ` build/HMR` 性能，并且会给我们造成样式问题。
    * 只去引入 <font color='red'>变量，mixins，functions</font>



#### Webpack Assets

Nuxt 会用 Webpack 的 ` vue-loader, file-loader , url-loader ` 去处理我们的资源。你可以用 `static` 文件夹，存放 不想经过 webpack 运行的文件。

* `url-loader`

  可以让小于一定大小的资源，转为 `URLData`

* `file-loader`

  可以通过版本哈希对文件命名，让我们收益于 长期缓存



### 静态资源文件夹（Static directory）

该目录下的文件，不会经过 webpack 处理，会<font color='red'>直接映射到服务器的根目录</font>

#### 使用

```html
<!-- Static image from static directory -->
<!-- 直接从根目录访问 -->
<img src="/my-image.png" />
```

#### `prefix`

如果将 `Nuxt` 部署到了子文件夹，路由基地会被默认添加到静态资源路径上，我们可以通过 `nuxt.config.js` 设置

```js
export default {
  static: {
    prefix: false
  }
}
// Default: /blog/my-image.png

// With static.prefix disabled: /my-image.png
```



## 预解析器 `Pre-processors`

多亏 `Vue Loader`， 我们可以在 `<template>` `<style>` 中使用各种 预解析器 （通过配置 <font color='orange'>`lang` </font>属性）

```vue
<template lang="pug">
  h1.red Hello {{ name }}!
</template>

<style lang="scss">
  .red {
    color: red;
  }
</style>
```

* `pug` 通过 `yarn add -D pug pug-plain-loader` 来安装















