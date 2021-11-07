import { Toast } from "vant";
import { httpcode } from "./httpcode";

export default function ({ $axios, store, redirect }) {
  // 请求拦截器
  $axios.onRequest(() => {
    const token = store.state.token;
    // 如果存在token
    // 使用 @nuxt/axios提供的 setToken 设置 token
    if (token) return $axios.setToken(token, "Bearer");
    $axios.setToken('123')
  });

  // 响应拦截器
  $axios.onResponse((res) => {
    // 请求结果失败
    const { data: { status, message } } = res;
    // 提示错误信息
    if (!status) Toast(message);
    return res;
  });


  // 拦截到错误时
  $axios.onError(err => {
    // 提示错误信息
    Toast.fail(httpcode[err.response.status])
    // 404
    if (err.response.status === 404) return redirect("404");
    // 未鉴权
    if (err.response.status === 401) {
      // 跳转登录页
      redirect("/my/login")
      // 因为这里onError对于$axios只是一段异步执行，这里终止并不会终止 原本asyncData等钩子函数的执行

      // 为了解决跳转路由后还会显示错误页面的问题，在返回Promise.reject()之前返回Prmoise.resolve(),防止跳转到错误页

      // 因为$get()等方法是直接获取get()结果内部的data，所以，我们给出Promise.reject({data:{}}), 
      // 最起码保障让$get()拿到空对象{}，以防止外界解构赋值时，再次跳转到错误页
      return Promise.resolve({ data: {} });
    };
  })
}