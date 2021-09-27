<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script >
export default {
  props: ["msg"],
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>