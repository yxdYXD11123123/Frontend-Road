## 双向数据绑定

数据驱动视图，视图驱动数据

`Vue2` 到 `Vue3`，`v-model` 指令 做了不少变动

* prop的默认名称已更改：`value ->  modelValue`
* 事件的默认名称已更改：`input -> update:modelValue`
* `Vue3`可以在 `v-model` 上加参数
* 可在同一个组件上绑定多个 `v-model`
* 可以自定义 `v-model` 修饰符

#### 自定义组件 双向数据绑定

在 `3.x` 中，<font color='#e44'>**自定义组件上的 `v-model` 相当于传递了 `modelValue` prop 并接收抛出的 `update:modelValue` 事件：**</font>

```vue
<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

#### 示例：

双向数据绑定的组件

```vue
<template>
  <div>
    <div>双向绑定组件</div>
    <div>{{ modelValue }}</div>
    <button @click="onClick">更新数据</button>
  </div>
</template>

<script>
export default {
  // 接受默认名为modelValue的props
  props: ["modelValue"],
  setup(props, { emit }) {
    const onClick = () => {
      // 触发默认名为 update:modelValue 的自定义事件，即可更新 model
      emit("update:modelValue", "new some");
    };

    return {
      onClick,
    };
  },
};
</script>
```

使用

```vue
<template>
  <CanModel v-model="msg" />
</template>
```

##### 自定义参数

```vue
<template>
  <div>
    <div>双向绑定组件</div>
    <div>{{ msg }}</div>
    <button @click="onClick">更新数据</button>
  </div>
</template>

<script>
export default {
  // 改为自定义的props名
  props: ["msg"],
  setup(props, { emit }) {
    const onClick = () => {
      // 改为自定义的porps名
      emit("update:msg", "new some");
    };

    return {
      onClick,
    };
  },
};
</script>
```

使用

```vue
<template>
  <CanModel v-model:msg="msg" />
</template>
```



## `customRef`

<font style="color:#000;background-color:#ff0">**创建具有自定义行为的响应式数据**</font>，通过拦截响应式数据的读取和设置实现

```js
    // 可以在 set 和 get 时自定义行为
    const data = customRef((track, trigger) => {
      let value = "xxxx";
      return {
        get() {
          // 告诉vue追踪数据
          track();
          return value;
        },
        set(newValue) {
          // 告诉vue更新视图
          trigger();
          value = newValue;
        },
      };
    });
```

#### 可以用来实现防抖更新

```vue
<script>
import { customRef } from "vue";

export default {
  setup(props) {
    // 可以在 set 和 get 时自定义行为
    const data = useDebouncedRef("data", 700);

    const onClick = () => {
      data.value += 1;
    };

    return {
      data,
      onClick,
    };
  },
};

function useDebouncedRef(value, delay) {
  return customRef((track, trigger) => {
    let timer = null;
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        // 防抖
        clearTimeout(timer);
        timer = setTimeout(() => {
          trigger();
          value = newValue;
        }, delay);
      },
    };
  });
}
</script>
```



## `Proxy` 代理对象

用于创建一个对象的代理，从而<font color='#e44'>**监听对被代理对象的操作**</font>

```js
const obj = { name: "frank" }
// 给对象进行代理
const objProxy = new Proxy(obj, {
  get(target, property) {
    return target[property]
  },
  set(target, property, value) {
    target[property] = value;
  },
  deleteProperty(target, property) {
    // 保护name属性不被删除
    if (property === 'name') {
      return false
    };
    delete target[property]
    return true;
  }
});
```

