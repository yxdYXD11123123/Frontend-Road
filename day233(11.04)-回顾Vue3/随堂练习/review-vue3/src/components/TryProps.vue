<template>
  <div>TryProps {{ msg }}</div>
</template>

<script>
import { watch, toRefs } from "vue";

export default {
  props: ["msg"],
  setup(props) {
    console.log(props);
    const { msg1 } = props;
    const { msg } = toRefs(props);
    // not OK
    watch(
      () => msg1,
      () => {
        console.log("直接解构");
      }
    );
    // OK
    watch(props, () => {
      console.log("props");
    });
    // OK
    watch(
      () => props.msg,
      () => {
        console.log("props.msg");
      }
    );
    // OK
    watch(msg, () => {
      console.log("msg");
    });
  },
};
</script>

<style></style>
