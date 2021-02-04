<template>
  <div class="grid">
    <div>
      <h1>图书管理</h1>
      <h5>书籍数量：{{ books.length }}</h5>
      <div class="book">
        <div>
          <label for="id">
            编号：
          </label>
          <input type="text" id="id" v-model="id" disabled="false" />
          <label for="name">
            名称：
          </label>
          <input type="text" id="name" v-model="name" />
          <button :disabled="hadName" @click="addBook">
            {{ isModify ? "修改" : "提交" }}
          </button>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>编号</th>
          <th>名称</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in books" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ new Date(item.date).toLocaleString() }}</td>
          <td>
            <a href="" @click.prevent="modifyBook(item.id)">修改</a>
            <span>|</span>
            <a href="" @click.prevent="removeBook(item.id)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      books: [],
      id: "",
      name: "",
      isModify: false,
      hadName: false
    };
  },
  created() {
    this.getBooks();
  },
  methods: {
    async getBooks() {
      let res = await axios.get("http://localhost:3000/books");
      this.books = res.data;
    },
    async addBook() {
      if (this.name.trim().length == 0) {
        return alert("书名不能为空");
      }
      if (this.isModify) {
        let res = await axios.put("http://localhost:3000/books/" + this.id, {
          name: this.name.trim()
        });
        if (res.data.status == 200) {
          this.getBooks();
          this.name = "";
          this.id = "";
          this.isModify = false;
        }
      } else {
        let res = await axios.post("http://localhost:3000/books", {
          name: this.name.trim()
        });
        if (res.data.status == 200) {
          this.getBooks();
          this.name = "";
        }
      }
    },
    async removeBook(id) {
      let res = await axios.delete("http://localhost:3000/books/" + id);
      if (res.data.status == 200) {
        this.getBooks();
      }
    },
    async modifyBook(id) {
      let res = await axios.get("http://localhost:3000/books/" + id);
      if (res.status == 200) {
        this.id = res.data.id;
        this.name = res.data.name;
        this.isModify = true;
      }
    }
  },
  watch: {
    // 检查是否是已有名字
    name(val) {
      let result = this.books.some(ele => {
        if (ele.name == val) {
          this.hadName = true;
          return true;
        }
      });
      if (result == false) {
        this.hadName = false;
      }
    }
  }
};
</script>

<style>
.grid {
  margin: auto;
  width: 530px;
  text-align: center;
}

.grid table {
  border-top: 1px solid #c2d89a;
  width: 100%;
  border-collapse: collapse;
}

.grid th,
td {
  padding: 10;
  border: 1px dashed orange;
  height: 35px;
  line-height: 35px;
}

.grid th {
  background-color: orange;
}

.grid .book {
  padding-bottom: 10px;
  padding-top: 5px;
  background-color: orange;
}
</style>
