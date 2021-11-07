<template>
  <div class="home">
    <!-- 轮播图 -->
    <IndexCarousel :swipperList="swipperList" />
    <!-- 宫格 -->
    <IndexGridList :gridList="gridList" />
    <!-- 活动组件 -->
    <IndexActive />
    <!-- 品牌组件 -->
    <IndexBrand />
    <!-- 运动专区 -->
    <IndexSports :sports="sports" />
  </div>
</template>

<script>
export default {
  async asyncData({ $api }) {
    // 获取首页数据
    // Promise.all() 同时发起所有获取请求的数据，等到全部请求数据
    const [{ swipperList }, { gridList }, { sports }] = await Promise.all([
      // 轮播图
      $api.IndexBanners(),
      // 宫格
      $api.IndexGridList(),
      // 运动专区
      $api.IndexSports(),
    ]);
    return { swipperList, gridList, sports };
  },
};
</script>

<style lang="scss" scoped>
</style>
