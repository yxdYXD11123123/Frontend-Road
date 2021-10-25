<template>
  <div>
    <div>使用 类组件 方式{{ message }} {{ newMessage }}</div>
    <button @click="hello">新信息</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  asyncData() {
    console.log("获取数据");
  },
})
export default class WithClass extends Vue {
  // 声明数据
  message: string = "Hello";

  asyncData() {
    console.log(111);
  }

  // 使用生命周期钩子
  mounted() {
    console.log("on mounted");
  }

  // 声明方法
  hello() {
    this.message = "msg";
    console.log("hello world");
  }

  // 使用计算属性
  get newMessage() {
    return this.message + " on now";
  }
}
</script>

<style>
</style>