<template>
  <div class="title">{{ username }}的商品</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    // 接收用户名
    username: {
      type: String,
      required: true,
    },
  },
});
</script>

<style>
</style>