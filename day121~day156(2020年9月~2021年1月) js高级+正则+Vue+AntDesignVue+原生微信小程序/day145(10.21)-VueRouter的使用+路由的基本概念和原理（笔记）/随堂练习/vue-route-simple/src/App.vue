<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- 使用router-link作为跳转链接，to属性值最后会赋值给location的hash值，实现跳转路由 -->
    <router-link to="/">首页的内容</router-link>
    <router-link to="/about">关于页的内容</router-link>
    <!-- 路由视图展示区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
