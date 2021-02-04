## 请求传参

* 参数在url中：

  * 传统：http://localhost/data?username=dong&id=3

  * 占位符：

    定义：/data/:name/:id

    url：http://localhost/data/dong/3

    接收的方式：`req.params`

* 参数在请求体中：

  post、put、delete

  获取方式：req.body

## Fetch

* Fetch API是新的ajax解决方案，Fetch会返回Promise
* Fetch 不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象
* 语法：`fetch(url, option).then()`

#### 与 `jQuery.ajax()` 主要有三种方式不同

* 当接收到一个代表错误的HTTP状态码时，从`fetch()`返回的Promise不会被标记为`reject`（但是会将resolve的返回值设置为false），仅当网络故障时或请求被阻止时，才会标记为reject
* `fetch` 可以接收到跨域cookies，你也可以使用`fetch` 建立起跨域会话。
* `fetch` **不会发送 cookies**，除非你使用了credentials的初始化选项

```html
<body>
    <button>按钮</button>
    <script>
        let btn = document.querySelector('button');

        btn.onclick = function () {
            // fetch 基本用法（默认为get请求）
            fetch('http://localhost/fetchGet').then((data) => {
                // text() 方法属于fatchAPI的一部分，
                // 它返回一个Promise实例对象，用于获取后台返回的数据
                return data.text();
            }) // 继续使用 .then方法 拿到Promise的结果
                .then((result) => {
                    // 打印返回结果
                    console.log(result);
                })
        }
    </script>
</body>
```

#### Fetch API中的HTTP请求

HTTP协议，他给我们提供了很多的方法，如：`POST、GET、DELETE、UPDATE、PATCH、PUT`

* 默认的是GET请求
* 需要在options对象中指定对应的method（method就是请求使用的方法）
* post和put请求的时候，需要在options中设置请求头headers和body

#### post请求

````html
<body>
    <button>按钮</button>
    <script>
        let btn = document.querySelector('button');

        btn.onclick = function () {
            fetch('http://localhost/fetchPost', {
                method: 'POST',
                // 注意body里不能传引用类型
                body: 'id=12&name=dong',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((data) => {
                return data.text();
            }).then(result => {
                console.log(result);
            })
        }
    </script>
</body>
````

#### get 参数传递-Restful的URL方式

```js
fetch('http://localhost/fetchGet/123').then((res) => {
    return res.text();
}).then((result) => {
    console.log(result);
})
```

```js
app.get('/fetchGet/:id', (req, res) => {
    console.log(req.params.id); // 123
    res.status(200).send({
        code: 200,
        msg: '获取响应成功'
    })
});
```

#### delete 请求参数传递-Restful的URL方式

```js
fetch('http://localhost/fetchDelete/456', {
    method: 'delete'
}).then((res) => {
    return res.text();
}).then((result) => {
    console.log(result);
})
```

```js
app.delete('/fetchDelete/:id', (req, res) => {
    console.log(req.params.id);
    res.send({
        code: 200,
        msg: '这是fetch的delete请求'
    })
})
```



## axios

* 基于promise用于浏览器和node.js的http客户端
* 支持浏览器（创建XMLHttpRequests）和node.js（创建http请求）
* 支持promise
* 能拦截请求和响应
* 自动转换JSON数据
* 能转换请求和响应数据

### axios 基础用法

* get 和 delete 请求传递参数
  * 通过传统的url以?的形式传递数据
  * restful形式传递数据
  * 通过params形式传递参数

* post 和 put 请求传递参数
  * 通过选项传递参数
  * 通过 `URLSearchParams` 传递参数

####  `get` 请求

```js
axios.get('http://localhost/axiosGet').then((result) => {
    console.log(result);
});
// get请求传参
axios.get('http://localhost/axiosGet?name=dong').then((result) => {
    console.log(result);
});
```

#### `post` 请求

```js
// post请求传参
// 方法一：
axios.post('http://localhost/axiosPost', {
    name: 'dong'
}).then((result) => {
    console.log(result);
});
// 方法二：
axios({
    method: 'post',
    url: 'http://localhost/axiosPost',
    data: {
        name: 'dong'
    }
})
// 注意：后台接收axios传递的data数据时，
// 需要使用bodyParser.json来解析，才可以正常获取req.body
```

#### `delete` 请求

```js
// 设置baseUrl默认值
axios.defaults.baseURL = 'http://localhost';
// delete请求传参
// 第一种方式
// 注意：使用delete传递data数据时，
// 第二个参数必须写出data对象，在data对象里放数据
// （post请求则可以直接放一个对象作为data数据）
axios.delete('/axiosDelete', {
    // 必须在data里写数据，才可以用req.body接收
    data: {
        name: 'dong'
    },
    // 使用req.query接收params
    params: {
        age: 12
    }
}).then((result) => {
    console.log(result);
});
// post（第二个参数直接作为data数据对象）
axios.post('/axiosPost', {
    name: 'dong'
}).then((result) => {
    console.log(result);
})
// 第二种方式
let res = axios({
    url: '/axiosDelete',
    method: 'DELETE',
    data: {
        name: 'dong'
    },
    // 使用req.query接收params
    params: {
        age: 22
    }
})
```

#### `put` 请求

```js
// 设置baseUrl默认值
axios.defaults.baseURL = 'http://localhost';
// put 请求传参
// 第一种方式
axios.put('/axiosPut', {
    name: 'frank'
}).then((result) => {
    console.log(result);
})
// 第二种方式
axios({
    url: '/axiosPut',
    method: "put",
    data: {
        name: 'frank2'
    }
})
```

#### 通过`URLSearchParams`传递参数

````js
// 设置baseUrl默认值
axios.defaults.baseURL = 'http://localhost';
let params = new URLSearchParams();
params.append('name', 'dong')
// 使用 URLSearchParams传递参数（使用req.body接收）
axios.post('/axiosPost', params).then((result) => {
    console.log(result);
});
````

### axios 全局配置

```js
// 配置公共请求头
axios.defaults.baseURL = 'http://localhost';
// 配置 超时时间
axios.defaults.timeout = 2500;
// 配置公共的请求头
axios.defaults.headers.common['Authorzation'] = AUTH_TOKEN;
// 配置公共的post的Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

```

### axios 拦截器

* 请求拦截器

  * 请求拦截器的作用是在请求发送前进行一些操作

    例如：在每个请求体里加上token，统一做了处理以后要改也非常容易

* 响应拦截器

  * 响应拦截器的作用是在接收到响应后进行一些操作

    例如：在服务器返回登录状态失效，需要重新登录的时候，跳转到登录页

```js
// 请求拦截器
axios.interceptors.request.use(function (config) {
    console.log(config.url);
    // 任何请求都会经过这一步，在发送请求之前做些什么
    config.headers.mytoken = 'nihao';
    // 这里一定要return config 否则配置不成功
    return config;
}, function (err) {
    // 对请求错误做点儿什么
    console.log(err);
});
// 响应拦截器
axios.interceptors.response.use(function (res) {
    // 在接收响应时做些什么
    // 将响应结果变成响应结果中的data
    var data = res.data;
    // 这里也是必须返回结果，否则请求结果就是undefined
    return res;
})
axios({
    type: 'get',
    url: 'http://localhost/axiosGet'
}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

```



## async 和 await

* async 作为一个关键字放到函数前面（用来修饰方法）
  * 任何一个 `async` 函数都会隐式返回一个 `promise`
* `await` 关键字只能在使用 `async` 定义的函数中使用
  * await 后面可以直接跟一个`Promise`实例对象
  * await 函数不能单独使用

```js
let i = 1;
async function fn() {
    let result = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`完成${i++} `)
        }, 1500);
    })
    console.log(result);
    return result;
}
fn()// 完成
fn().then((result) => {
    console.log(result);
})

```

