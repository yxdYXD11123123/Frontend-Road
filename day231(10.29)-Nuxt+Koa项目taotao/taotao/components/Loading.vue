<template>
  <!-- 加载页 start -->
  <van-overlay v-show="isLoading" class="loading">
    <div class="wrapper" @click.stop>
      <van-loading type="spinner" color="#1989fa" size="44px" vertical
        >加载中...</van-loading
      >
    </div>
  </van-overlay>
  <!-- 加载页 end -->
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    start() {
      this.isLoading = true;
    },
    finish() {
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>