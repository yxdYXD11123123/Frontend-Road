<template>
  <div>
    <div class="item" v-for="item in list" :key="item.id">
      <img :src="item.img" />
      <div class="name" v-text="item.name"></div>
      <div class="change">
        <a href="" @click.prevent="item.num <= 0 ? null : item.num--">－</a>
        <input
          type="text"
          class="num"
          :value="item.num"
          @blur="$emit('change-num', item.id)"
        />
        <a href="" @click.prevent="item.num++">＋</a>
      </div>
      <div class="del" @click="$emit('remove-product', item.id)">×</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: ["list"]
};
</script>

<style></style>
