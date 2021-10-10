<template>
  <div>
    <h2>About页面</h2>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => {
        this.$nuxt.$loading.finish();
      }, 2000);
    });
  },
};
</script>

<style>
</style>