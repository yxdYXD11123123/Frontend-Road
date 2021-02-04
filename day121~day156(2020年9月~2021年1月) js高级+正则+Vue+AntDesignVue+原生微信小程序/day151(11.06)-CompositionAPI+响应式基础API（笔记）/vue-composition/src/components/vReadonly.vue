<template>
  <div>readonly</div>
  <p>{{ copy.name }}</p>
</template>

<script>
import { reactive, readonly } from "vue";

export default {
  setup() {
    let person = reactive({
      name: "frank",
      age: 22
    });

    let copy = readonly(person);
    copy.name = "dong"; // 失败
    // Set operation on key "name" failed: target is readonly

    return {
      copy
    };
  }
};
</script>

<style>
</style>