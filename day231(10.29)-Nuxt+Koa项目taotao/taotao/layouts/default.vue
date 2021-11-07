<template>
  <div class="container">
    <!-- 头部 start -->
    <header>
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrowv
        @click-left="goBack"
      >
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </header>
    <!-- 头部 end -->

    <!-- 主体 start -->
    <main>
      <Nuxt></Nuxt>
    </main>
    <!-- 主体 end -->

    <!-- 底部 start -->
    <van-tabbar class="footer" v-model="active">
      <van-tabbar-item icon="home-o" name="index" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="bag-o" name="cates" to="/cates"
        >分类</van-tabbar-item
      >
      <van-tabbar-item icon="shopping-cart-o" name="cart" to="/cart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" name="my" to="/my"
        >我的</van-tabbar-item
      >
    </van-tabbar>
    <!-- 底部 end -->
  </div>
</template>

<script>
const titles = {
  index: "淘淘-首页",
  cates: "淘淘-分类",
  cart: "淘淘-购物车",
  my: "淘淘-个人中心",
};

export default {
  computed: {
    // 当前激活项
    active: {
      get() {
        return this.$route.name.split("-")[0];
      },
      set() {},
    },
    // 页面标题
    title() {
      return titles[this.$route.name.split("-")[0]];
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>