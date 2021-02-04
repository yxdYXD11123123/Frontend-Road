<template>
  <div class="personal">
    <button @click="backPage">返回上一页</button>
    <div>这里是个人中心</div>
    <p>uname为{{ uname }} id为{{ id }}</p>
  </div>
</template>

<script>
export default {
  props: ["uname", "id"],
  methods: {
    backPage() {
      // back()返回上一页
      // this.$router.back();
      // go(-1)和back()作用相同
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>