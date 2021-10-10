<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  props: ["queryAndParams"],
  created() {
    // console.log(this.queryAndParams);
    console.log("About组件创建");
    // {params: {some: 'some'}, query: {what: 'what'}}
  },
  // 进入组件之前
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter About");
    next((vm) => {
      console.log(
        "beforeRouteEnter的next回调，可以获取组件实例",
        vm.$props,
        to.meta
      );
    });
  },
  // 组件被重用，更新时
  beforeRouteUpdate() {
    console.log("beforeRouteUpdate About");
  },
  // 离开组件前
  beforeRouteLeave() {
    console.log("Leave About");
  },
};
</script>