<template>
  <div class="list">
    <div class="item" v-for="item in list" :key="item.id">
      <img :src="item.img" />
      <div class="name" v-text="item.name"></div>
      <div class="change">
        <a href="" @click.prevent="item.num <= 0 ? null : item.num--">－</a>
        <input type="text" class="num" v-model="item.num" />
        <a href="" @click.prevent="item.num++">＋</a>
      </div>
      <div class="del" @click="$emit('del', item.id)">×</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style>
</style>