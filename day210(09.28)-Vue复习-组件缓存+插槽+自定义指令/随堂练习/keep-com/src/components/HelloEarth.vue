<template>
  <div class="hello">HelloEarth</div>
</template>

<script>
export default {
  name: "HelloEarth",
  props: {
    msg: String,
  },

  created() {
    console.log("组件HelloEarth 创建");
  },
  unmounted() {
    console.log("组件HelloEarth 卸载");
  },
  activated() {
    console.log("组件HelloEarth 被激活");
  },
  deactivated() {
    console.log("组件HelloEarth 取消激活");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
