<template>
  <div class="cart">
    <TopTitle :uname="uname"></TopTitle>
    <List
      :list="list"
      @change-num="changeNum"
      @remove-product="reomveProduct"
    ></List>
    <Total :list="list"></Total>
  </div>
</template>

<script>
import TopTitle from "./TopTitle";
import List from "./List";
import Total from "./Total";
export default {
  name: "Cart",
  data() {
    return {
      uname: "frank",
      list: [
        {
          id: 1,
          name: "TCL彩电",
          price: 1000,
          num: 1,
          img: require("../assets/img/a.jpg")
        },
        {
          id: 2,
          name: "机顶盒",
          price: 1000,
          num: 1,
          img: require("../assets/img/b.jpg")
        },
        {
          id: 3,
          name: "海尔冰箱",
          price: 1000,
          num: 1,
          img: require("../assets/img/c.jpg")
        },
        {
          id: 4,
          name: "小米手机",
          price: 1000,
          num: 1,
          img: require("../assets/img/d.jpg")
        },
        {
          id: 5,
          name: "PPTV电视",
          price: 1000,
          num: 2,
          img: require("../assets/img/e.jpg")
        }
      ]
    };
  },
  components: {
    TopTitle,
    List,
    Total
  },
  methods: {
    changeNum(id) {
      let num = parseInt(event.target.value);
      let index = this.list.findIndex(ele => {
        return ele.id == id;
      });
      this.list[index].num = num;
      if (num < 0) {
        alert("不可以为负数");
        this.list[index].num = 0;
      }
    },
    reomveProduct(id) {
      this.list = this.list.filter(ele => ele.id != id);
    }
  }
};
</script>

<style></style>
