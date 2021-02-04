<template>
  <div>
    <!-- <vSetup :msg="'props内容'"></vSetup> -->
    <!-- <vRef></vRef> -->
    <!-- <vReactive2></vReactive2> -->
    <vWatch></vWatch>
  </div>
</template>

<script>
// import vSetup from "./components/vSetup.vue";
// import vRef from "./components/vRef";
// import vReactive2 from "./components/vReactive2";
// import vComputed from "./components/vComputed";
// import vReadonly from "./components/vReadonly";
// import vWatchEffect from "./components/vWatchEffect";
import vWatch from "./components/vWatch";

export default {
  name: "App",
  components: {
    // vSetup
    // vRef
    // vReactive2
    // vComputed
    // vReadonly
    // vWatchEffect
    vWatch
  }
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
