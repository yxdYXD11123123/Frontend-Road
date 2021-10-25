<template>
  <div>
    <h2>请登录</h2>
    <br />
    <label>用户名：<input type="text" /></label>
    <br />
    <label>密码<input type="text" /></label>
    <br />
    <button @click="login">登录</button>
  </div>
</template>

<script>
import Cookie from "js-cookie";

export default {
  methods: {
    login() {
      setTimeout(() => {
        // 登录 获取 auth
        const auth = "xxxxxxxxxxxx";
        // 存储
        this.$store.commit("SET_AUTH", auth);
        Cookie.set("auth", auth);
        // 跳转首页
        this.$router.push("/");
      }, 300);
    },
  },
};
</script>

<style>
</style>