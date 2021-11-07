## Vuex状态持久化（登录保持）`nuxtServerInit` 应用

<font style="color:#000;background-color:#ff0"> 在用户成功登录时，使用插件 `js-cookie` 设置 cookies 保存 token</font>

`登录页`

```vue
<template>
  <div class="login">
    <!-- 登录表单 start -->
    <van-form :show-error="false" @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="validator.usernameRules"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="validator.passwordRules"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- 登录表单 end -->
    <div class="register">
      <nuxt-link to="/my/register">去注册</nuxt-link>
    </div>
  </div>
</template>

<script>
// 导入校验器
import { validator } from "~/utils/validator";
import { Toast } from "vant";
// Cookie
import Cookie from "js-cookie";

export default {
  data() {
    return {
      username: "",
      password: "",
      validator,
    };
  },
  methods: {
    // 登录
    async onSubmit(values) {
      // 登录
      const { status, data } = await this.$api.UserLogin(values);
      if (status === 200) {
        Toast.success("登录成功");
        // 保存token
        this.$store.commit("SET_TOKEN", data.token);
        // 存入cookie，做持久化
        Cookie.set("token", data.token);
        // 保存用户信息
        this.$store.commit("SET_USERINFO", data.userInfo);
        // 跳转首页
        this.$router.push("/");
      }
    },
  },
};
</script>
```

<font style="color:#000;background-color:#ff0">利用 `nuxtServerInit` 在一进入Nuxt的时候，从cookies中用`cookieparser`解析token，存入Vuex</font>

<font color='#d00'>因为 `cookies` 是存在 `req.headers` 中的，所以前后端分离的服务端渲染时，只能从这里（`nuxtServerInit()`可以拿到 `req`）拿到 用户的token </font>，不能像之前使用 `localstorage`

`store/index.js`

```js
import CookieParser from "cookieparser"

export const state = () => {
  return {
    token: ""
  }
}

export const mutations = {
  // 保存token
  SET_TOKEN(state, payload) {
    state.token = payload;
  }
}


export const actions = {
  // 我们之前做Vuex数据持久化时，会使用vuex-persistedstate，本质就是存到localStorage中，
  // 但是Nuxt在服务端渲染时，是拿不到localStorage的，这时就需要使用cookie了，
  // 因为cookie是存在headers中，nuxtServerInit可以获取请求req的请求头
  nuxtServerInit({ commit }, { req }) {
    commit("SET_TOKEN", CookieParser.parse(req.headers.cookie).token)
  }
}
```

