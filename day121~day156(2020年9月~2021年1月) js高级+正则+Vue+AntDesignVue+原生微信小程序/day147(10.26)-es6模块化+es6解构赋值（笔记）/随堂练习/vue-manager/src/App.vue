<template>
  <div>
    <header>传智后台管理系统</header>
    <main>
      <aside>
        <ul>
          <li><router-link to="/users">用户管理</router-link></li>
          <li><router-link to="/rights">权限管理</router-link></li>
          <li><router-link to="/goods">商品管理</router-link></li>
          <li><router-link to="/orders">订单管理</router-link></li>
        </ul>
      </aside>
      <article>
        <router-view></router-view>
      </article>
    </main>
    <footer>版权信息</footer>
  </div>
</template>


<style>
body,
html,
ul {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header,
footer {
  background-color: rgb(172, 164, 164);
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

main {
  overflow: hidden;
  height: 100%;
}

aside {
  float: left;
  width: 20%;
  height: 100%;
}
li {
  list-style: none;
  padding: 0;
  margin: 1px 0px;
  background-color: grey;
}

a {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #2c3e50;
}

table {
  width: 100%;
}

article {
  float: right;
  width: 80%;
}
</style>
