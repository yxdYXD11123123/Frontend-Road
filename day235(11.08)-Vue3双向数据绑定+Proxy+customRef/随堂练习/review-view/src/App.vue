<template>
  <!-- <CanModel v-model="msg" /> -->
  <use-custom-ref />
</template>

<script>
import CanModel from "./components/CanModel.vue";
import UseCustomRef from "./components/UseCustomRef.vue";
import { ref } from "vue";

export default {
  setup(props) {
    const msg = ref("some");

    return {
      msg,
    };
  },
  components: {
    CanModel,
    UseCustomRef,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
