<template>
  <div>child1</div>
</template>

<script>
export default {
  middleware: ["auth"],
  transition: {
    name: "slide-fade",
  },
};
</script>

<style>
</style>