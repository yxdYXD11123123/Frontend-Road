<template>
  <div>
    <h3>个人中心</h3>
    <div>aname：<span v-text="aname"></span></div>
    <div>bname: <span v-text="bname"></span></div>
    <button @click="$router.back()">返回首页</button>
  </div>
</template>

<script>
export default {
  props: ["aname", "bname"]
};
</script>

<style>
</style>