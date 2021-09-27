<template>
  <div>############# TryDirective ############</div>
  <div v-has="permissions"></div>
  <div>##################################</div>
</template>

<script>
export default {
  data() {
    return {
      permissions: ["del", "add"],
    };
  },
};
</script>

<style>
</style>