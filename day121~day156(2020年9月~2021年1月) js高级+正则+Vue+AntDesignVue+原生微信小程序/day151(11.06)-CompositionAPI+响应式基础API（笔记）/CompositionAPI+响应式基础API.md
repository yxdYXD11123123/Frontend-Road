## Composition-API（组合式API）

### 为什么学习Composition

* 首先`composition-Api` 是根据逻辑相关性组织代码的，这样可以提高代码的可读性和可维护性
* 这种方式可以更好的重用逻辑代码，比如：在`Vue2`中如果想重用逻辑代码，可能会发生命名冲突，以及关系不清
* 在`Vue3`中，`composition-Api` 是可选的，并不是一定要使用这种新方式，也就是说我们依然可以使用以前的结构和用法
* 可以确定的是Vue3是兼容Vue2.x版本的，也就是说我们在日常工作中，可以是Vue3中使用Vue2.x的相关语法，但是当你真正开始使用Vue3写项目时，你会发现他比Vue2.x方便的多

### setup组件选项

我们会将setup返回的所有内容都暴露给组件的其余部分（computed, data, 生命周期钩子等等），以及组件的模板

#### 概述

1. setup函数是Vue3中新增的函数，它是我们在编写组件时，<font color=red>是用`composition-api`的入口</font>
2. setup函数是出于生命周期函数beforeCreate和Created之间的钩子函数，也就是说在setup函数中是无法使用data和methods中的数据和方法的
3. 在setup函数中定义的变量和方法最后都是需要return出去的，不然无法在模板中使用

#### 使用

1. 将<font color=red>props作为第一个参数</font>，而不是包含在上下文中

   * 组件将使用props的场景更多，有时候甚至只使用props
   * 将props独立出来作为第一个参数，可以让TypeScript对props单独做类型推导，不会和上下文中的其他属性相混淆。这也使得setup、render和其他使用了TSX的函数式组件的签名保持一致

2. 将<font color=red>context作为第二个参数</font>，从原来2.x中this选择性地暴露了一些property

   `attrs, slots, emit`

```js
export default {
  props: ["msg"],
  // setup函数
  setup(props, context) {
    console.log(props.msg);
    console.log(context);
  }
};
```

#### 注意：

1. 由于我们不能在setup函数中使用data和methods，所以vue为了避免我们错误的使用，直接将setup函数中的this修改成了undefined
2. setup函数只能是同步的不能是异步的



## 响应性基础 API

### 声明响应式状态

#### reactive

要为JavaScript对象创建响应式状态，可以使用 **reactive ** 方法

**对普通对象进行深层的响应式转换**

```js
import { reactive } from 'vue'

// 响应式状态
const state = reactive({
  count: 0
})
```

reactive相当于Vue2.x中的Vue.observable() API，该API返回一个响应式的对象状态。他<font color=red>会影响嵌套对象传递的所有property</font>（响应式转换时深度转换）

这就是Vue响应性系统的本质，当从组件中的 <font color=red>`data()` 返回一个对象时，它在内部交由 `reactive()` 使其成为响应式对象</font>。进而模板会被编译成能够使用这些响应式property的渲染函数。

**注意：**

reactive参数必须是对象（json/arr），否则无法实现响应式



### 创建独立的响应式值 作为 refs

#### ref

`ref`会返回一个可变的响应式对象，充当一个该对象内部值的响应式引用(reference)，这就是名称的来源，此对象只包含一个名为 `value` 的property

**ref也可以接收复杂的数据类型作为参数，只是建议不使用ref处理复杂类型数据**

```js
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

**ref的展开：**

ref作为setup中返回的对象上的property返回后，我们就可以在模板中访问，并将它自动展开为内部值，不需要再模板中追加`.value`

```vue
<template>
  <div>
    <!-- 使用时不需要加.value -->
    <span>{{ count }}</span>
    <button @click="count ++">Increment count</button>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const count = ref(0)
      // 返回
      return {
        count
      }
    }
  }
</script>
```

当`ref` 作为响应式对象的property被访问或更改时，他会自动展开内部值

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

Ref 展开仅发生在被响应式 `Object` 嵌套的时候。当从 `Array` 或原生集合类型如 [`Map`]访问 ref 时，不会进行展开

### 响应式状态解构

#### `toRefs`

将我们的响应式对象转换为一组 ref

```vue
<template>
  <!-- reactive形式 -->
  <div>{{ obj.title }}</div>
  <!-- ref形式 -->
  <p>{{ title }}</p>
  <button @click="handleChange">点击变化</button>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    let obj = reactive({
      title: "题目"
    });

    // 对响应式对象使用toRefs然后解构赋值，然后就可以直接使用了
    // 这些ref将保留与源对象的响应式关联
    let { title } = toRefs(obj);
    // 以ref形式使用
    title.value = "新题目";

    // 返回
    return {
      obj,
      title
    };
  },
  methods: {
    handleChange() {
      // 模板中俩个title都会变化
      this.title = "这个题目也变了";
    }
  }
};
</script>
```



### computed

传入一个拥有 get 和 set 函数的对象，创建一个可手动修改的计算状态

```vue
<template>
  <div>
    <h3>computed</h3>
    <p>num1: {{ num1 }}</p>
    <p>num2: {{ num2 }}</p>
    <p>sum: {{ sum }}</p>
    <button @click="num1++">num1加一</button>
    <button @click="sum = 10">让sum等于10</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    let num1 = ref(1);
    let num2 = ref(2);
    let sum = computed({
      get() {
        return num1.value + num2.value;
      },
      // 设置值（只要newNum发生值的变化，那么set方法就会触发）
      set(val) {
        num1.value = val - num2.value;
      }
    });

    return {
      num1,
      num2,
      sum
    };
  }
};
</script>
```



### readonly

获取一个对象 (响应式或纯对象) 或 [ref](https://vue3js.cn/docs/zh/api/refs-api.html#ref) 并返回原始代理的只读代理。只读代理是深层的：访问的任何嵌套 property 也是只读的。

```vue
<template>
  <div>readonly</div>
  <p>{{ copy.name }}</p>
</template>

<script>
import { reactive, readonly } from "vue";

export default {
  setup() {
    let person = reactive({
      name: "frank",
      age: 22
    });

    let copy = readonly(person);
    copy.name = "dong"; // 失败
    // Set operation on key "name" failed: target is readonly

    return {
      copy
    };
  }
};
</script>
```



### watchEffect

立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数

```vue
<template>
  <div>
    <h3>{{ num }}</h3>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  setup() {
    let num = ref(0);

    setInterval(() => {
      num.value += 1;
    }, 1000);

    // watchEffect 是一个方法，它有一个返回值也是一个方法，
    // 可以停止跟踪依赖的变化
    let stropFn = watchEffect(() => {
      console.log("响应式追踪其依赖---" + num.value);
    });

    setTimeout(() => {
      // 中止
      stropFn();
    }, 8000);

    return {
      num
    };
  }
};
</script>
```



### watch

对比watchEffect，watch有以下优点：

* 懒执行监听属性，也就是说仅在侦听的源变更时才执行回调
* 更明确哪些状态会触发侦听器重新运行
* 可以访问侦听状态变化前后的值

```vue
<template>
  <div>
    <h3>{{ state.count }}</h3>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
export default {
  setup() {
    let state = reactive({ count: 0 });
    // A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.
    // 只能监听 computed或者ref或者reactive或者是放这些类型的数组
    let stop = watch(state, () => {
      console.log("count变了");
    });

    setInterval(() => {
      state.count++;
    }, 1000);

    // 6秒后停止监听
    setTimeout(() => {
      stop();
    }, 6000);

    return {
      state
    };
  }
};
</script>
```

