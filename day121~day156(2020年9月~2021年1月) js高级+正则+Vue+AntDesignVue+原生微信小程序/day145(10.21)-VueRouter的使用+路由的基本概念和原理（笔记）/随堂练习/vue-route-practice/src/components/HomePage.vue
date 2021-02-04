<template>
  <div>
    <h3>这是home页</h3>
    <router-link to="/about">转到关于页</router-link>
    <router-link to="/home/music">音乐中心</router-link>
    <router-link to="/home/setting">设置中心</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "HomePage"
};
</script>

<style></style>
