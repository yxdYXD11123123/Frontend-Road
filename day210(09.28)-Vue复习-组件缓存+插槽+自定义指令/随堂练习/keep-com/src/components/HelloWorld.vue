<template>
  <div class="hello">HelloWorld</div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    console.log("组件HelloWorld 创建");
  },
  unmounted() {
    console.log("组件HelloWorld 卸载");
  },
  activated() {
    console.log("组件HelloWorld 被激活");
  },
  deactivated() {
    console.log("组件HelloWorld 取消激活");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
