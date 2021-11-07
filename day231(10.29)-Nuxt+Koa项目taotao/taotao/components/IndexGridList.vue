<template>
  <!-- 宫格 start -->
  <div>
    <van-grid :column-num="3">
      <van-grid-item v-for="item in gridList" :key="item.id">
        <van-image :src="item.img_src"></van-image>
      </van-grid-item>
    </van-grid>
  </div>
  <!-- 宫格 end -->
</template>

<script>
export default {
  props: ["gridList"],
};
</script>

<style>
</style>