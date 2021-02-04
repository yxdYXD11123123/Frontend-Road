<template>
  <h3>这是用户{{ name }}的详情页 -- {{ id }}</h3>
  <button @click="goBack">返回</button>
</template>

<script>
export default {
  props: ["id", "name"],
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style>
</style>