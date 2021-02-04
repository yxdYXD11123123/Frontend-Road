<template>
  <div>setup</div>
</template>

<script>
export default {
  props: ["msg"],
  // setup在beforecreated之后
  setup(props, context) {
    console.log(props.msg);
    console.log(context);
  }
};
</script>

<style>
</style>