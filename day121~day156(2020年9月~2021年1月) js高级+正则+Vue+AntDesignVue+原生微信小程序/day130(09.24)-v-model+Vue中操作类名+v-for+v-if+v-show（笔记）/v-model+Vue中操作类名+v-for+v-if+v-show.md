### `Vue`中model数据的存储位置

```html
<body>
    <div id="app">
        {{msg}}
    </div>

    <script src='../../09-22/随堂练习/lib/vue-3.0.js'></script>
    <script>
        let vm = Vue.createApp({
            data() {
                return {
                    msg: '试试'
                }
            }
        }).mount('#app');
        console.log(vm);  // proxy 代理
        console.log(vm.$data.msg); 
        console.log(vm.msg); 
        // proxy 中有
        // [target] 数据存在target中的$data
        // [handle]

        // 更新数据
        // Vue2.0 响应式的实现 通过defineProperty
        // Vue3.0 响应式的实现 通过Proxy
        
        // 更新数据，view视图也会同步更新
        vm.$data.msg = '不试'
    </script>
</body>
```



### `Vue` 指令之 `v-model`

实现<font  color=red>双向数据绑定</font>

1. 使用：

   可以把页面上数据的变化，自动同步更新到 `VM` 实例的 `data` 中。例如：

   ```html
   <input type="text" v-model="msg"/>
   <!-- v-model只能用于input textarea 组件等 -->
   ```

2. 和`v-bind`的区别：

   v-bind只是单向数据绑定，可以让**数据**影响**视图层**，但是不能让视图层影响数据，而v-model双向都可以

3. 注意： 

   - `v-model` <font color=red>只能 和 **表单元素** 配合使用</font>，例如 `input、select、textarea` 等；
   - `v-model` 是 `Vue` 中<font color=red> **唯一支持** 双向数据绑定</font>的指令；

4. 应用场景：

   - 【案例】自动计算文本框中，字符串的长度
   - 【案例】简易加法计算器

#### 案例：加法计算器

```html
<body>
    <div id="app">
        <input type="number" class="num1" v-model="num1">
        <span>+</span>
        <input type="number" class="num2" v-model="num2">
        <button @click='Sum'>=</button>
        <input type="text" disabled :value="sum">
    </div>

    <script src="./lib/vue-3.0.js"></script>
    <script>
        let vm = Vue.createApp({
            data() {
                return {
                    num1: '',
                    num2: '',
                    sum: ''
                }
            },
            methods: {
                Sum() {
                    this.sum = parseFloat(this.num1) + parseFloat(this.num2)
                }
            }
        }).mount('#app')
    </script>
</body>
```



### 在 `Vue`中 操作 class 类名

#### 方式一：类名数组

通过 `v-bind:` 为元素的 `class` 绑定具体的类名：

```html
    <style>
        .red {
            color: red;
        }

        .bolder {
            font-weight: bolder;
        }
    </style>
</head>

<body>
    <div id="app">
        
        <span :class="['red','bolder']">ssssss</span>
    </div>

    <script src="./lib/vue-3.0.js"></script>
    <script>
        let vm = Vue.createApp({
            data() {
                return {
                }
            }
        }).mount('#app')
    </script>
</body>

<!-- 或者 -->
<!-- 用数据在数组中带入值 -->
<span :class="[font_red,font_bolder]">ssssss</span>

<script>
    let vm = Vue.createApp({
        data() {
            return {
                font_red: 'red',
                font_bolder: 'bolder'
            }
        }
    }).mount('#app')
</script>
```

#### 方式二：三元表达式

使用**三元表达式**，按需为元素添加某些类名

```html
    <style>
        .red {
            color: red;
        }

        .bolder {
            font-weight: bolder;
        }
    </style>
</head>

<body>
    <div id="app">
        <!-- 使用三元运算符控制数组元素添加类名 -->
        <span :class="[isRed?'red':'','bolder']">ssssss</span>
    </div>
    <!-- 引入Vue -->
    <script src="./lib/vue-3.0.js"></script>
    <script>
        let vm = Vue.createApp({
            data() {
                return {
                    isRed: false
                }
            }
        }).mount('#app')
    </script>
</body>
```

#### 方式三：类名对象

```html
    <style>
        .red {
            color: red;
        }

        .bolder {
            font-weight: bolder;
        }

        .bigger {
            font-size: 60px;
        }
    </style>
</head>

<body>
    <div id="app">
        <!-- 'red'值为true 表示 添加 red，加上引号，就会与数据的red无关
            bolder（没有加引号，表示数据中来源可以，自己赋值也可以）即使数据值为false，这里的值为true 依然 表示 添加bolder
            或者像 bigger 这里，用数据中的一个flag布尔值来控制类名是否起作用 -->
        <span :class="{'red':true, bolder:true, bigger: isBigger}">我是span标签</span>
        <!-- 渲染结果： <span class="red bolder bigger">我是span标签</span> -->
    </div>

    <script src="./lib/vue-3.0.js"></script>
    <script>
        let vm = Vue.createApp({
            data() {
                return {
                    red: false,
                    bolder: false,
                    isBigger: true
                }
            }
        }).mount('#app')
    </script>
</body>
```



### `v-for` 循环

遍历数组

```html
<body>
    <div id="app">
        <ul>
            <!-- for循环遍历arr数据，i 是数组元素， -->
            <li v-for='i in arr' v-text='i'></li>
        </ul>
    </div>

    <script src="./lib/vue-3.0.js"></script>
    <script>
        let vm = Vue.createApp({
            data() {
                return {
                    arr: [1, 2, 3, 4]
                }
            }
        }).mount('#app');
    </script>
</body>
```

遍历对象

```html
<body>
    <div id="app">
        <ul>
            <!-- for循环遍历arr数据，i 是数组元素， -->
            <!-- 这里的 :key='item.id' 将数据的id传给Vue内部，
                帮助Vue在内部处理：根据model变换时，只重新渲染有变动的，而不是全部重新渲染-->
            <li v-for='item in data' :key='item.id'>{{item.name}}的年龄是{{item.age}}</li>
        </ul>
    </div>

    <script src="./lib/vue-3.0.js"></script>
    <script>
        let vm = Vue.createApp({
            data() {
                return {
                    data: [
                        // 这里加id是为了在视图层通过:key 传给Vue内部
                        {
                            id: 1,
                            name: '张三',
                            age: 2
                        },
                        {
                            id: 2,
                            name: '李四',
                            age: 12
                        },
                        {
                            id: 3,
                            name: '王五',
                            age: 3
                        }
                    ]
                }
            }
        }).mount('#app');
    </script>
</body>
```



### `v-if` 是否添加

如果是条件是 false，元素不会添加到 `html` 页面中

```html
<body>
    <div id="app">
        <!-- 可以直接写 true flase -->
        <p v-if="false">这是第一个p标签</p>
        <p v-else-if="true">这是第二个p标签</p>
        <p v-else>这是第三个p标签</p>
        <!-- 也可以 用数据来决定 -->
        <h2 v-if='flag'>这是第1个标题标签</h2>
        <h2 v-else-if="flag">这是第2个标题标签</h2>
        <h2 v-else>这是第3个标题标签</h2>
    </div>

    <script src="./lib/vue-3.0.js"></script>
    <script>
        let vm = Vue.createApp({
            data() {
                return {
                    flag: false
                }
            }
        }).mount('#app')
    </script>
</body>
```



### `v-show`

如果条件为 false，会让元素  `display:none` 不显示

```html
<body>
    <div id="app">
        <h1 v-show='false'>这是v-show为false</h1>
        <!-- 结果：<h1 style="display: none;">这是v-show为false</h1> -->
        <h1 v-show=flag>这里的v-show为flag数据，flag数据为true</h1>
        <!-- 结果：正常显示 -->
    </div>

    <script src="./lib/vue-3.0.js"></script>
    <script>
        let vm = Vue.createApp({
            data() {
                return {
                    flag: true
                }
            }
        }).mount('#app')
    </script>
</body>
```

