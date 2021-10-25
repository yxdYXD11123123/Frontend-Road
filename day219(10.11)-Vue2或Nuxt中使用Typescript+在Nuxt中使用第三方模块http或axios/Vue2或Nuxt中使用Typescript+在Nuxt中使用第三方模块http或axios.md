### 权限校验

#### cookie 插件

* `js-cookie` 可以用来管理本地cookie
* `cookieparser` 用来解析 cookie 字符串



## 使用TypeScript 

由于 `Nuxt` 使用的是 `Vue2`， 但是`Vue2` 对于 `Typescript` 的支持不是很好

我们在用 `TS` 书写 Vue 组件的时候，有两种书写方式

* <font color='#a00'>`Vue.extend()` </font>

  虽然与原来的`option API` 形式最为接近，但是为了 `TS` 能正确推断类型，不得不做一些额外的处理。

  ```tsx
  <template>
    <div>信息：{{ msg }}</div>
  </template>
  
  <script lang="ts">
  import Vue, { PropOptions } from "vue";
  
  interface User {
    firstName: string;
  }
  
  export default Vue.extend({
    props: {
      user: {
        type: Object,
      } as PropOptions<User>,
    },
  
    data() {
      return {
        msg: "some some",
      };
    },
  
    methods: {
      getMsg() {
        console.log(this.msg);
        console.log(this.user.firstName);
      },
    },
  });
  </script>
  ```

* <font color='red'>`vue-class-componet` </font> （官方维护的装饰器，修饰类组件）

  通常与 <font color='red'>`vue-property-decorator` </font>一起使用，提供一系列装饰器，能让我们书写<font style="color:#000;background-color:#ff0">类风格</font>的 Vue 组件

  * 而<font style="color:#000;background-color:#ff0">**类**</font>做为 TypeScript 特殊的存在（它既可以作为类型，也可以作为值），当我们使用 `vue-class-component` 并通过 `$refs` 绑定为子类组件时，便能获取子组件上暴露的类型信息

例如在给 *props实现类型推断* 这件事上，得益于`vue-property-decorator` ，书写方式相较于 `vue.extend()` 会更简单

```js
import { Component, Vue, Prop } from 'vue-property-decorator'
// class-component 方式更简单
@Component
export default class Test extends Vue {
 @Prop({ type: Object })
 private test: { value: string }
}
```

#### <font color='red'>`vue-class-componet` </font> 

让我们以类样式语法创建Vue组件

官方文档：https://class-component.vuejs.org/

<font style="color:#000;background-color:#ff0">我们可以通过 `@component decorator` 注释类，以直观和标准的类语法来定义组件数据和方法</font>

```js
import Vue from 'vue'
import Component from 'vue-class-component'

// HelloWorld class will be a Vue component
@Component
export default class HelloWorld extends Vue {}
```

我们可以很容易的用 类样式的组件 替换 组件，因为它和 `options API` 定义的对象组件等效。

<font color='red'>`vue-property-decortor` </font>是 `vue-class-compoent` 的一个超集，是社区推荐的库，完全依赖 `vue-class-compoent`

它封装了 `@Compoent, @Prop, @Watch, @Emit` 等常用的装饰器，用于像原生 ES class 那样声明基于类的Vue 组件。

##### `@Component`

让我们的类成为Vue组件

##### `Data`

类中的属性就是 组件的数据

##### `Methods`

类中的方法就是 组件的 `methods`

##### `computed 属性` 计算属性

可以直接用 类的 `getter / setter` 来声明

##### 其它 生命周期的 `hooks`

也是直接声明成类中的 方法，所以我们自定义的方法应该避免关键字重名

```vue
<template>
  <div>
    <div>使用 类组件 方式{{ message }} {{ newMessage }}</div>
    <button @click="hello">新信息</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class WithClass extends Vue {
  // 声明数据
  message: string = "Hello";

  asyncData() {
    console.log(111);
  }

  // 使用生命周期钩子
  mounted() {
    console.log("on mounted");
  }

  // 声明方法
  hello() {
    this.message = "msg";
    console.log("hello world");
  }

  // 使用计算属性
  get newMessage() {
    return this.message + " on now";
  }
}
</script>
```

##### 其他的options，例如：`components`, Nuxt 的 `asyncData`

在 `vue-class-compoent` 时，添加 `components` 属性需要传到 修饰器中

```ts
import Vue from 'vue'
import Component from 'vue-class-component'
import OtherComponent from './OtherComponent.vue'

@Component({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    OtherComponent
  }
})
export default class HelloWorld extends Vue {}
```

Nuxt 的 `asyncData`

```ts
import { Vue, Component } from "vue-property-decorator";

@Component({
  asyncData() {
    console.log("获取数据");
  },
})
export default class WithClass extends Vue {}
```



### 在 Nuxt 中

我们只需在创建项目时，选择 `typescipt` 即可配置好 `ts` 所需的配置

或者 参照 官网手动配置 https://typescript.nuxtjs.org/guide/setup#configuration



## Composition API

#### 安装

```shell
 yarn add @vue/composition-api
```

#### 注册插件

<font color='red'>`plugins/componsition-api.js`</font>

```js
import Vue from 'vue';
import VueComposition  from '@vue/composition-api'

Vue.use(VueComposition);
```

配置

```js
  plugins: [
    '~/plugins/componsition-api'
  ],
```

#### 使用

```vue
<template>
  <div>
    <h2>使用 Composition API</h2>
    <div>{{ count }}</div>
    <button @click="countIncrease">加</button>
    <button @click="countDecrease">减</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

const useCounter = () => {
  const count = ref(0);

  const countIncrease = () => {
    count.value += 1;
  };

  const countDecrease = () => {
    count.value -= 1;
  };

  return {
    count,
    countIncrease,
    countDecrease,
  };
};

export default defineComponent({
  setup() {
    return {
      ...useCounter(),
    };
  },
});
</script>
```



## 模块

#### 第三方模块 

* <font color='red'>`@nuxt/http`</font>：基于[ky-universal](https://github.com/sindresorhus/ky-universal)的轻量级和通用的HTTP请求
* <font color='red'>`@nxutjs/axios`</font>：安全和使用简单 `Axios` 与 `Nuxt.js` 集成用来请求 HTTP
* 官方推荐使用 `@nuxt/http` 模块

##### 使用 `nuxt/http`

* 安装

  ```shell
  yarn add @nuxt/http -D
  ```

* 使用

  ```vue
  <script>
  export default {
      async asyncData ({ $http }) {
         let {data } = await $http.$get('https://cnodejs.org/api/v1/topics?page=2')
         return {
           list: data
         }
      }
  }
  </script>
  ```

  

我们可以在 `nuxt.config.js` 中配置请求模块的 **`baseURL`** 

```js
export default {
  axios: {
    baseURL: 'https://api.nuxtjs.dev'
  }
  modules: ['@nuxtjs/axios']
  
  // http 同样用法
  http: {
    baseURL: "http://localhost:8000"
  },
  modules: ["@nuxt/http"]
}
```

#### 在 `ts` 中使用

需要到<font color='red'> `tsconfig.json` 中添加配置</font>

```json
{
  "compilerOptions": {
    "types": [
      "@nuxt/http",
      "@nuxtjs/axios"
    ]
  }
}
```

#### 解决跨域

在 `nuxt.config.js` 中<font style="color:#000;background-color:#ff0">配置代理</font>

```json
  http: {
    // baseURL: "http://localhost:8000",
    proxy: true
  },
  axios: {
    // baseURL: 'http://localhost:8000'
    proxy: true
  },
  proxy: {
    "/api/": {
      target: 'http://localhost:8000',
      pathRewrite: { '^/api/': '' }
    }
  },
```

使用

```vue
<template>
  <div>
    <h2>使用官方推荐 http和axios</h2>
    <div>msg: {{ msg }}</div>
    <div>msg2:{{ msg2 }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  async asyncData({ $axios }) {
    // 使用 axios
    const res = await $axios.$get("/api/data");
    return { msg2: res.msg };
  },
  async fetch() {
    // 使用 http
    const res: { msg: string } = await this.$http.$get("/api/data");
    this.$data.msg = res.msg;
  },
})
export default class UseHttp extends Vue {
  msg: string = "";
}
</script>
```

