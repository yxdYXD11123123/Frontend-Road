<template>
  <div>
    <h2>我的页面</h2>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  meta: {
    xx: "xxx",
  },
  methods: {
    logout() {
      this.$store.commit("SET_AUTH", "");
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>