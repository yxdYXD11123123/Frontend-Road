<template>
  <div>
    parent
    <h1>{{ $store.state.count }}</h1>
    <button @click="increment">同步加</button>
    <button @click="asyncIncrement">异步加</button>
  </div>
</template>

<script>
export default {
  // mounted() {
  //   console.log(this.$store);
  //   this.$store.dispatch("asyncIncrement");
  // },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    asyncIncrement() {
      this.$store.dispatch("asyncIncrement");
    },
  },
};
</script>

<style>
</style>