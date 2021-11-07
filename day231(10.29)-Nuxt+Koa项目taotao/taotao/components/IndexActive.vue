<template>
  <div class="cz_active">
    <a href="#">
      <img src="images/active1.png" alt />
      <img src="images/active2.png" alt />
    </a>
    <a href="#">
      <img src="images/active3.png" alt />
    </a>
    <a href="#">
      <img src="images/active4.png" alt />
      <img src="images/active5.png" alt />
    </a>
  </div>
</template>

<style scoped>
.cz_active {
  border-top: 1px solid #ccc;
  margin-top: 15px;
  padding: 0 10px;
}
.cz_active a:nth-child(2n + 1) {
  width: 67.1%;
  float: left;
}
.cz_active a:nth-child(2n + 1) img {
  width: 50%;
  float: left;
}
.cz_active a:nth-child(2) {
  width: 32.9%;
  float: right;
}
.cz_active a:nth-child(2) img {
  width: 100%;
}
</style>