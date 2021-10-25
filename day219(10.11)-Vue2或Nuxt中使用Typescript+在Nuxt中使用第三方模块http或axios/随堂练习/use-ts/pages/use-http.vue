<template>
  <div>
    <h2>使用官方推荐 http和axios</h2>
    <div>msg: {{ msg }}</div>
    <div>msg2:{{ msg2 }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  async asyncData({ $axios }) {
    const res = await $axios.$get("/api/data");
    return { msg2: res.msg };
  },
  async fetch() {
    const res: { msg: string } = await this.$http.$get("/api/data");
    this.$data.msg = res.msg;
  },
})
export default class UseHttp extends Vue {
  msg: string = "";
}
</script>

<style>
</style>