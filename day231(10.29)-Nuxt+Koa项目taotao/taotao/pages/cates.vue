<template>
  <!-- 分类页 start -->
  <div>
    <van-tree-select
      height="90vh"
      :items="oneCategory"
      :main-active-index.sync="active"
    >
      <template #content>
        <!-- 二级分类 start  -->
        <van-grid :column-num="3">
          <van-grid-item v-for="item in twoCategory" :key="item.id">
            <img :src="item.brandLogo" alt="" width="100%" />
            <p>{{ item.brandName }}</p>
          </van-grid-item>
        </van-grid>
        <!-- 二级分类 end -->
      </template>
    </van-tree-select>
  </div>
  <!-- 分类页 end -->
</template>

<script>
export default {
  data() {
    return {
      // 二级分类
      twoCategory: [],
    };
  },
  computed: {
    // 当前一级分类选中项（依赖在query中，保证页面刷新不会回到第一个）
    active: {
      get() {
        // 默认为0
        return this.$route.query.active || 0;
      },
      set(val) {
        // 切换路由
        this.$router.replace("/cates?active=" + val);
      },
    },
  },
  async asyncData({ $api }) {
    // 获取一级分类
    let { oneCategory } = await $api.CatesOneCategory();
    if (oneCategory)
      oneCategory = oneCategory.map((val) => ({
        ...val,
        text: val.categoryName,
      }));
    return {
      // 一级分类
      oneCategory,
    };
  },
  async fetch() {
    await this.getTwoCategory();
  },
  watch: {
    active() {
      this.getTwoCategory();
    },
  },
  methods: {
    // 获取二级分类
    async getTwoCategory() {
      // 获取id
      const id = this.oneCategory[this.active].id;
      // 获取二级分类
      const { twoCategory } = await this.$api.CatesTwoCategory(id);
      this.twoCategory = twoCategory;
    },
  },
};
</script>

<style>
</style>