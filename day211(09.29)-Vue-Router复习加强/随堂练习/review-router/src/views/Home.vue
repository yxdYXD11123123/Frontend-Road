<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  beforeRouteLeave() {
    console.log("Leave Home");
  },
  beforeRouteUpdate() {
    console.log("Update Home");
  },
};
</script>
