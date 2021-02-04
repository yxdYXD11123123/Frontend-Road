// axios 配置项

// 引入axios库
import axios from "axios";
// 创建 axios 实例
const instance = axios.create({
  // 返回数据类型
  responseType: "json",
  // 超时时间
  timeout: 7000,
  // 最大发包长度
  maxContentLength: 2000,
  // 重试次数
  retry: 3,
  // 重试延时，3秒重试一次
  retryDelay: 3000,
  // 重试条件，默认只要是错误都需要重试
  shouldRetry: () => true
});

// 3.声明请求拦截器()
// setRequestHeader("token","token之")
instance.interceptors.request.use(
  config => {
    // 在headers头上添加参数
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    const token = window.sessionStorage.getItem("token");
    // 判断是否有token令牌
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 4.声明响应拦截器
instance.interceptors.response.use(
  response => {
    const { status: code } = response.data.meta;
    // 这里可以对后端的一些状态码进行处理
    switch (code) {
      // 如果返回的状态码为200说明接口请求成功
      // 否则的话抛出错误
      case 200:
        return Promise.resolve(response);
      case 201:
        return Promise.resolve(response);
      // 服务器状态码不是2开头的情况
      //  这里可以跟你们的后台开发人员协商好统一的错误状态码
      // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
      case 400:
        return Promise.resolve(response);
    }
  },
  error => {
    // 获取error对象的config属性
    const { config } = error;
    // 如果config不存在，或者retry选项没有设置，用reject
    if (!config || !config.retry) return Promise.reject(error);

    // 设置变量来跟踪重试次数
    config.__retryCount = config.__retryCount || 0;

    // 检查我们重试的次数是否超出最大重试次数
    if (config.__retryCount >= config.retry) {
      // 使用reject方法抛出错误
      Notification({
        title: "请求超时",
        message: "当前网络不佳，请稍后刷新重试"
      });

      return Promise.reject(error);
    }

    // 计算重试次数
    config.__retryCount += 1;
    // 创建一个新的Promise 来处理 exponential backoff
    let backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, config.retryDelay || 1);
    });

    // return the promise in which  recalls axios to retry the request
    return backoff.then(function() {
      return instance(config);
    });
  }
);

export default instance;
