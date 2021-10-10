<template>
  <div>
    <!-- 动态插槽名 -->
    <div style="color: orange">
      <slot name="dynamicTwo"></slot>
    </div>

    <!-- 默认插槽 -->
    <div style="color: red">
      <slot></slot>
    </div>

    <!-- 具名插槽 -->
    <div style="color: green">
      <slot name="named"> </slot>
    </div>

    <!-- 作用域插槽 -->
    <div style="color: blue">
      <slot name="scope" :data="scopeData"></slot>
    </div>

    <!-- 动态插槽名 -->
    <div style="color: yellow">
      <slot name="dynamicOne"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scopeData: {
        str: "作用域插槽（让使用插槽的人可以使用插槽内部的数据）",
      },
    };
  },
};
</script>

<style>
</style>