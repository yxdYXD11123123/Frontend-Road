<template>
  <div>
    <h2>ComOne</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "111",
    };
  },
  mounted() {
    console.log("mounted");
    setTimeout(() => {
      this.content = "2222";
    }, 2000);
  },
};
</script>

<style>
</style>