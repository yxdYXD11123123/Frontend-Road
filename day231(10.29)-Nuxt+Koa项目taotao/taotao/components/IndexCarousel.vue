<template>
  <!-- 首页轮播图 start -->
  <van-swipe class="home-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in swipperList" :key="item.id">
      <van-image :src="item.img_src"></van-image>
    </van-swipe-item>
  </van-swipe>
  <!-- 首页轮播图 end -->
</template>

<script>
export default {
  props: ["swipperList"],
};
</script>

<style>
</style>