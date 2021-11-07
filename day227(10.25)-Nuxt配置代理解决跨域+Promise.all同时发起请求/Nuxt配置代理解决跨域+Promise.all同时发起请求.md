## 乐淘 移动端

![1635168540541](随堂笔记/乐淘项目演示.gif)

### 目标

完成乐淘前端项目初始化

### 开发注意事项

#### `@nuxt/axios` 中 `get()` 和 `$get()` 的区别

<font color='red'>`$axsio.$get()` 是 `$axsio.get()` 封装后的函数，可以直接获取从服务端获取的关键数据 `{staus:200, data:xxx}`</font>

#### 前端解决跨域时，可以通过配置代理解决

```js
  axios: {
    proxy: true,
    // 加前缀
    prefix: "/api"
  },
  // 配置代理
  proxy: {
    '/api/': { target: 'http://xxx.34.xxx.xx:3002', pathRewrite: { '^/api/': '' } }
  },
```

#### 获取数据时，可以通过 `Promise.all()` 同时发起请求，一起获取

<font style="color:#000;background-color:#ff0">可以节省很多时间</font>

```js
export default {
  async asyncData({ $axios }) {
    // 获取首页数据
    // Promise.all() 同时发起所有获取请求的数据，等到全部请求数据
    const [{ swipperList }, { gridList }, { sports }] = await Promise.all([
      // 轮播图
      $axios.$get("/banners"),
      // 宫格
      $axios.$get("/gridList"),
      // 运动专区
      $axios.$get("/sports"),
    ]);

    return { swipperList, gridList, sports };
  },
};
```

