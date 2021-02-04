<template>
  <div>
    <h3>
      <!-- router-link到页面中会转为a标签，to转为href，to的属性值转为href的属性值 -->
    </h3>
    <!-- 代表路由视图区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style></style>
