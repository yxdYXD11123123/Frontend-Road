<template>
  <div>
    <h4>请求参数</h4>
    <div v-if="detailInfo">{{ detailInfo.detail }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailInfo: null,
    };
  },
  async fetch() {
    const res = await this.$axios.$get("/details?id=" + this.$route.query.id);
    this.detailInfo = res.data;
  },
};
</script>

<style>
</style>