### 子传父

可以通过 `setup(props, {emit})` 获取 `$emit` 

#### 注意：

* 正常情况下直接使用即可，但是如果当前组件 是一个<font color='#d00'>**碎片组件**</font>（不是唯一的根组件）

  <font color='orange'>需要在 `emits` 中声明自定义事件</font>

  ```vue
  <template>
    <!-- 碎片组件(没有根组件) -->
    <div>helloWorld：{{ msg }}</div>
    <button @click="onClick">button</button>
  </template>
  
  <script>
  export default {
    name: "HelloWorld",
    props: ["msg"],
    // 添加 emits
    emits: ["changeMsg"],
    setup(props, { emit }) {
      const onClick = () => {
        emit("changeMsg", "子组件修改");
      };
  
      return {
        onClick,
      };
    },
  };
  </script>
  ```



### 获取DOM对象

#### 批量获取、动态获取

<font color='#e44'>标签的特殊属性 `ref`，可以传递回调函数，回调函数可以获取 标签的真实DOM</font>

```vue
<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        :ref="
          (el) => {
            listDOM[index] = el;
          }
        "
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const list = ref(["a", "b", "c"]);
    // 通过 ref属性 传递回调函数 获取DOM元素，批量获取DOM元素
    const listDOM = ref([]);

    // 因为 ref本身就是在模板渲染时，作为渲染函数的结果创建且注册的，所以只能在模板渲染后使用
    onMounted(() => {
      console.log(listDOM.value);
    });

    return {
      list,
      listDOM,
    };
  },
};
</script>
```





### `Teleport` 传送

```vue
<template>
  <div class="box">
    <div>我是一个子组件</div>
    <!-- 将弹出框传送到body标签下，避免样式影响 -->
    <Teleport to="body">
      <div class="modal">弹出框</div>
    </Teleport>
  </div>
</template>

<script>
export default {};
</script>

<style>
.box {
  width: 500px;
  height: 500px;
  background-color: aquamarine;
  /* 这里的transform会影响子组件的fixed定位 */
  transform: translate(3px);
}

.modal {
  position: fixed;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: beige;
}
</style>

```

#### 扩充 注意点：

* <font color='#e44'>`position: fixed` </font>虽然是根据视窗定位的，但是如果父组件使用了 `transform` 样式属性，会根据父组件定位。



### `Suspense` 组件

在正确渲染组件之前进行一些异步请求是很常见的事。原来我们会在组件自身内处理这些事，但是`suspense` 组件提供了另一种方案，允许将等待过程提升到组件树中处理，而不是在单个组件中。

#### 接收两个插槽

* <font color='cornflowerblue'>`default` </font>

  只接收一个子节点

* <font color='cornflowerblue'>`fallback`</font>

  只接收一个子节点

正常情况下，<font color='#e44'>`default` 插槽会展示出来，如果不能，则展示 `fallback` 插槽内容</font>

但是异步组件不需要作为 `suspense` 的直接子节点，可以在组件树的任意深度的位置，只有所有的后代组件都准备就绪，该内容才会被认为解析完毕。

另一个触发 `fallback` 的方式，是让后代组件<font style="color:#000;background-color:#ff0">从 `setup` 中</font>返回一个Promise。通常这是通过 <font style="color:#000;background-color:#ff0">`async` </font>实现的，而不用显式返回一个Promise

```js
export default {
  async setup() {
    // 在 `setup` 内部使用 `await` 需要非常小心
    // 因为大多数组合式 API 函数只会在
    // 第一个 `await` 之前工作
    const data = await loadData()

    // 它隐性地包裹在一个 Promise 内
    // 因为函数是 `async` 的
    return {
      // ...
    }
  }
}
```

例如：

`AsyncCom.vue` 组件

```vue
<template>
  <div>异步组件</div>
</template>

<script>
export default {
  async setup() {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    return {};
  },
};
</script>
```

父组件中

```vue
<template>
  <div>
    <suspense>
      <!-- AsyncCom 一秒后才会显示， -->
      <!-- 因为 async setup 相当于返回一个pormise， -->
      <!-- 会触发fallback显示 等待 -->
      <AsyncCom />
      <template #fallback>
        <div>加载中。。。</div>
      </template>
    </suspense>
  </div>
</template>
```

