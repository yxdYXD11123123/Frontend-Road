export default function ({ store }) {
  if (store.state.auth) {
    console.log("已登录");
  } else {
    console.log("未登录");
  }
}