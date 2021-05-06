## 使用Vite 开发 Vue(OptionAPI) + TypeScript 项目

### 使用Vite创建 Vue 项目

* 创建Vite项目

```shell
yarn create @vitejs/app
```

* 输入项目名
* 选择vue
* 选择TypeScript
* `yarn`   安装包
* `yarn dev` 运行

### 使用TypeScript

##### 选择ts语言

```vue
<script lang="ts">
```

##### 引入默认组件

```ts
import { defineComponent } from "vue";
```

##### 注意：

在Vite中引入组件时，<font color=red>必须把路径、文件后缀写全</font>，否则会报错

```ts
// 导入 购物车标题 组件
import CartTitle from "./components/CartTitle/index.vue";
```

#### OptionsAPI

和之前几乎没有差别

因为使用OptionsAPI，在其它组件选项中<font color=red>使用 `data` 中的数据时，并没有推断类型</font>，所以有时我们需要<font color=red>在 `/src` 目录下，新建一个 `types` 文件夹</font>，里面专门来<font color=red>存放</font>我们定义的<font color=red>类型别名、接口</font>，在OptionsAPI中<font color=red>引入使用，去声明类型</font>

`types/interfaces.ts`

```ts
export interface product {
  id: number,
  name: string,
  price: number,
  num: number,
  img: string,
}
```

组件中引入使用

```ts
import { product } from "../../types/interfaces";

export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  computed: {
    price(): number {
      let sum = 0;
      // 给list元素添加类型声明
      this.list.forEach((val: product) => {
        sum += val.price * val.num;
      });
      return sum;
    },
  },
});
```



#### CompositionAPI

##### 声明变量

变量都会<font color=red>有TS的类型推断</font>

使用 **`ref`**

```ts
import { defineComponent, ref } from "vue";
```

```ts
// 可以在ref后面加<>声明复杂类型
const username = ref<string | String>("frank");
```

使用 **`reactive`**

<font color=red>有三种声明类型方式</font>

```ts
import { defineComponent, reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const book = reactive<Book>({ title: 'Vue 3 Guide' })
    // or
    const book: Book = reactive({ title: 'Vue 3 Guide' })
    // or
    const book = reactive({ title: 'Vue 3 Guide' }) as Book
  }
})
```

##### 声明方法

```ts
    //#region 删除商品
    const deleteProduct = (id: number) => {
      list.value = list.value.filter((val) => val.id != id);
    };
    //#endregion
```

##### 接收父组件传来的props值

在 `setup()` 函数中，不需要将类型传递给 `props` 参数，因为它将<font color=red>从 `props` 组件选项推断类型</font>。

所以我们可以用 <font color=red>PropType</font> 强制转换

```ts
// 引入computed, PropType
import { defineComponent, computed, PropType } from "vue";
```

````tsx
  props: {
    list: {
      // 可以使用 PropType帮助props设置类型，避免使用时因为未知类型报错
      type: Array as PropType<{ price: number; num: number }[]>,
      required: true,
    },
  },
````

##### 使用computed 计算属性

```ts
  setup(props) {
    const price = computed(() => {
      let sum = 0;
      // 由于上面的PropType，这里props.list会有类型提示
      props.list.forEach((val) => {
        sum += val.price * val.num;
      });
      return sum;
    });
		
    // 返回
    return {
      price,
    };
  },
```

##### 事件类型

事件参数可以使用 `MouseEvent`等事件类型 标注

```vue
<a href="" @click.prevent="productAdd($event, item.id)">＋</a>
```

```ts
    // 添加商品数量
    const productAdd = (e: MouseEvent, id: number) => {
      console.log(e);
      emit("add", id);
    };
```



#### 注意：

* 使用vue3+TypeScipt时，因为创建组件使用的是<font color=red> `defineComponent` ，对`setup`中的类型推断做了更好的支持</font>，所以<font color=red>尽量使用 `CompositionAPI` </font>



### 使用 VueX

* 首先使用 `yarn add vuex@next --save` 下载

* 创建 `store` 文件夹 ，`store.ts` 文件

* 引入 创建共享数据库的方法 `createStore`

* 为了让 store 中的 state数据 有类型推断，<font color=red>声明 state中数据的接口 `interface State`</font>

  并在使用createStore时<font color=red> 传入 类型参数</font>

  ```ts
  import { createStore } from "vuex";
  
  // 自己要声明一份 state中的类型接口规范
  export interface State {
    title: string
  }
  
  // 创建共享库时，将 上面声明的接口 传到类型参数中 
  export const store = createStore<State>({
    // 这里写数据时，就会按照 接口 要求state类型
    state: {
      title: "Title"
    },
  })
  ```

* 为了在组件中使用 useStore 时，使用里面的state数据有类型推断

  引入 `InjectionKey` 注入关键字接口、 `Store` 类 

  <font color=red>使用 `InjectionKey`和`Store` ，传入`State`类型参数，声明出 对应的 注入关键字</font>，并导出

  ```ts
  import { InjectionKey } from "vue";
  import { createStore, Store } from "vuex";
  
  // 定义一个注入关键字（使用useStore时，带上key就可以让TypeScript）
  export let key: InjectionKey<Store<State>>;
  ```

* 将 store 挂载到 vue 实例上

* CompostionAPI `setup`中使用

  引入共享库 ` useStore` ，导入注入关键字 `key`

  <font color=red>通过 ` useStore(key)` 获取共享库</font> ，`store.state` 中的数据就会有相应的<font color=red>类型推断</font>了

  ```ts
  import { computed, defineComponent } from "vue";
  // 引入 使用共享库
  import { useStore } from "vuex";
  // 导入 注入关键字
  import { key } from "../../stroe/index";
  
  export default defineComponent({
    setup() {
      // 使用 useStore时，传入对应注入关键字（相当于使用了State接口）
      const store = useStore(key);
        
      const title = computed(
        () => store.state.title /* 这里title类型会被推断为string */
      );
  
      return {
        title,
      };
    },
  });
  ```

#### 完整示例

`store/index.ts`

````ts
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

// 自己要声明一份 state中的类型接口规范
export interface State {
  title: string
}

// 定义一个注入关键字（使用useStore时，带上key就可以让TypeScript）
export let key: InjectionKey<Store<State>>;

// 创建共享库时，将 上面声明的接口 传到类型参数中 
export const store = createStore<State>({
  // 这里写数据时，就会按照 接口 要求state类型
  state: {
    title: "Title"
  },
  mutations: {
    /**
     * 编辑title
     * @param state 
     * @param payload 新title
     */
    Edit_Title(state, payload: string) {
      state.title = payload;
    }
  },
  actions: {
    /**
     * 编辑title
     * @param context 
     * @param payload 
     */
    Edit_Title_Action(context, payload: string) {
      context.commit("Edit_Title", payload);
    }
  }
})
````

挂载共享库 `main.ts`

```ts
// 引入共享库
import { store } from "./stroe/index";

createApp(App).use(store).mount('#app');
```

`组件.vue`

```vue
<template>
  <div>
    <div>主页</div>
    <h2>{{ title }}</h2>
    <button @click="changeTitle">点击切换新标题</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
// 引入 使用共享库
import { useStore } from "vuex";
// 导入 注入关键字
import { key } from "../../stroe/index";

export default defineComponent({
  setup() {
    // 使用 useStore时，传入对应注入关键字（相当于使用了State接口）
    const store = useStore(key);

    const title = computed(
      () => store.state.title /* 这里title类型会被推断为string */
    );

    const changeTitle = () => {
      store.dispatch("Edit_Title_Action", "New Title");
    };

    return {
      title,
      changeTitle,
    };
  },
});
</script>

<style>
</style>
```



### 使用 VueRouter

和之前用法差不多

但是vue-router中自带d.ts  所以这里写的代码都会有类型推断

#### 示例代码

```ts
import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../pages/Home/index.vue";
// vue-router中自带d.ts  所以这里写的代码都会有类型推断
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    }
  ]
})


// 导出
export default router;
```



