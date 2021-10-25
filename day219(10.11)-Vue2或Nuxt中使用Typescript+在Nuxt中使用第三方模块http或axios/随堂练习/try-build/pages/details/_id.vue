<template>
  <div v-if="detailInfo">{{ detailInfo.detail }}</div>
</template>

<script>
export default {
  data() {
    return {
      detailInfo: null,
    };
  },
  async fetch() {
    const res = await this.$axios.$get("/details?id=" + this.$route.params.id);
    this.detailInfo = res.data;
  },
};
</script>

<style>
</style>