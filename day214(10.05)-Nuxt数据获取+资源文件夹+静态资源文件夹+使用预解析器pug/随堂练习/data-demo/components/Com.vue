<template>
  <div>
    <h2>Com组件</h2>
    <div v-for="item in data" :key="item.id">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  async fetch() {
    const res = await this.$axios.get("https://cnodejs.org/api/v1/topics");
    if (res.status === 200) this.data = res.data.data;
  },
};
</script>

<style>
</style>