<template>
  <div>
    <h2>使用资源</h2>
    <!-- 直接引用 -->
    <div>
      <!-- 使用 assets中 资源 -->
      <img src="~/assets/images/pic.jpg" alt="" />
      <!-- 使用 static中 资源 -->
      <img src="/images/pic.jpg" alt="" />
    </div>

    <!-- css中使用 -->
    <div class="with-bg"></div>

    <!-- 当作变量使用 -->
    <div>
      <img :src="imgSrc" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require("~/assets/images/pic.jpg"),
    };
  },
};
</script>

<style>
img {
  width: auto;
  height: 300px;
}

.with-bg {
  height: 300px;
  background-image: url("~assets/images/pic.jpg");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>