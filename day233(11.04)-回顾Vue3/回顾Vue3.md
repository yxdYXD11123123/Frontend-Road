## 再学Vue3

#### 必要性

* <font style="color:#000;background-color:#ff0">**Vue3性能大幅提升（因为使用proxy代理后，不需要递归劫持）**</font>
* Vue3 支持<font color='#d00'> tree shaking，可以进行按需编译</font>，编译后的文件体积比Vue2更小
* 更支持 Typescript，有助于大型项目开发
* 更先进的功能，比如：teleport，suspense等
* 代码聚合

### 使用Vite

创建应用指令：

```shell
npm init vite-app xxx
```

本质上就是在执行

```shell
npx create-vite-app xxx
```

**但是，vite最新创建指令是：（最好用下面的新创建方式）** 

```shell
npm init vite xxx
```



<font color='#d00'>`npx` 是指临时下载 `create-vite-app` 包，帮我们创建项目，然后自动删除</font>

<font color='orange'>`npm` 要求项目命名不可以有大驼峰，可以用 `-`</font>

### VS Code 插件

* Volar：Vue3语法支持
* Vue.js AutoImport：引用组件
* Vue3 Snippets：Vue3代码片段
* Prettier-Code formatter：代码格式化
* ESLint：代码质量检查
* EditorConfig for VS Code：覆盖编辑器编码风格配置

### 入口函数 `setup`

* 返回的对象，被挂载到了 Vue实例对象上，所以才可以在模板中使用

### API

#### computed 计算属性

作用：基于现有状态，生成另外的状态

#### watch 监听

<font style="color:#000;background-color:#ff0">**A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.**</font>

监听的资源，必须是**一个 getter/effect 函数（遇到基本类型时使用getter）、一个ref、一个reactive对象（一个Proxy对象即可），或者这些类型组合的数组**。

* getter 函数

  ```js
      const num = ref(1);
  
      // getter形式
      watch(
        () => num.value,
        (newValue, oldValue) => {
          console.log(newValue, oldValue);
        }
      );
  ```

* ref 

  ```js
      const num = ref(1);
  
      // watch监听单个资源
      watch(num, (newValue, oldValue) => {
        console.log(newValue, oldValue);
      });
  ```

* reactive对象

  ```js
  const person = reactive({ name: "frank" });
  
  // watch监听单个资源
  watch(person, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  });
  ```

* 以上组合成的数组

  ```js
      const man = ref({ age: 22 });
      const person = reactive({ name: "frank" });
  
      // watch监听单个资源
      watch([() => man.value.age, person], (newValue, oldValue) => {
        console.log(newValue, oldValue);
      });
  ```



#### watchEffect

<font color='#d00'>**立即执行**传入的函数，同时响应式**追踪依赖**，并在其依赖改变时，重新运行该函数</font>

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
```



#### toRef 函数

<font color='#d00'>将原响应式数据内部的 `某个属性` 转为 `新的ref` 以供直接使用</font>，简化数据层级

##### 注意：

* toRef 接受的第一个参数要是一个对象，转引用类型的 ref 需要 `.value`

````js
  setup(props) {
    const man = ref({ age: 22 });
    const person = reactive({ name: "frank" });

    return {
      // 转 引用类型 ref，要用.value 拿到对象
      age: toRef(man.value, "age"),
      // 转 reative类型，直接用 reactive对象
      name: toRef(person, "name"),
    };
  },
````



#### toRefs 函数

<font color='#d00'>批量数据转换，将对象里每个属性 转为`ref`</font>，可以用来直接解构赋值

```js
    const man = ref({ age: 22 });
    const person = reactive({ name: "frank", gender: 0 });

    const { age } = toRefs(man.value);
    const { gender, name } = toRefs(person);
```



#### 获取props

##### 注意：

* 必须<font color='#d00'>在 props 属性中声明</font>，`setup(props)` 才可以拿到 `props` 中属性

* <font style="color:#000;background-color:#ff0">在 `setup` 中拿到的 `props` 不要直接解构赋值，会失去响应性，建议用 `toRefs` 解构使用</font>

  ```js
    props: ["msg"],
    setup(props) {
      const { msg1 } = props;
      const { msg } = toRefs(props);
      // not OK
      watch(
        () => msg1,
        () => {
          console.log("直接解构");
        }
      );
  		// OK
      watch(props, () => {
        console.log("props");
      });
      // OK
      watch(
        () => props.msg,
        () => {
          console.log("props.msg");
        }
      );
      // OK
      watch(msg, () => {
        console.log("msg");
      });
    },
  };
  ```

  