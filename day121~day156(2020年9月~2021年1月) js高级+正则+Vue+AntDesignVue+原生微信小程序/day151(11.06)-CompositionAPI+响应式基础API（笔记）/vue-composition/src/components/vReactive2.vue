<template>
  <!-- reactive形式 -->
  <div>{{ refObj.title }}</div>
  <button @click="handleChange">点击变化</button>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let obj = {
      title: "题目"
    };
    let refObj = ref(obj);
    refObj.value.title = "新题目";
    console.log(refObj.value);
    obj.title = "时尚大方";
    console.log(refObj.value);

    // 返回
    return {
      refObj
    };
  },
  methods: {
    handleChange() {
      console.log(this.refObj);
    }
  }
};
</script>

<style>
</style>