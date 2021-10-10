export default function (context, inject) {
  // 注册 hello 方法 // 
  if (process.server) {
    // 只在服务端注册的话，只能在服务端渲染的时候使用（通过Vue实例/context都可以获取），到了客户端就没有这个插件了
    // console.log("在服务端注册了 hello方法");
  } else {
    // 只在客户端注册的话，只能在客户端使用（通过Vue实例/context都可以获取）
    inject("hello", msg => {
      console.log("hello，" + msg);
    })
    // console.log("在客户端注册了 hello方法");
  }
}