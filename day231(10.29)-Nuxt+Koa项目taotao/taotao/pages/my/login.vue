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

<style scoped>
.register {
  padding-right: 20px;
  text-align: right;
}
</style>