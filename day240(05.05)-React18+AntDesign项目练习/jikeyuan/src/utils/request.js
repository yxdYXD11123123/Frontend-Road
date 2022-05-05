// 引入axios
import axios from "axios";
const BASE_URL = process.env["REACT_APP_BASE_URL"];

// 创建实例
const instance = axios.create({
  // 配置基地址
  baseURL: BASE_URL,
  // 超时
  timeout: 3000,
});

/**
 * 使用axios实例发起请求
 * @param {*} options 请求实例配置项
 * @returns {Promise} 请求结果
 */
const baseRequest = (options) => {
  // 添加 鉴权token
  if (localStorage.getItem("jike_token")) {
    options.headers = {
      authorization:
        "Bearer " + JSON.parse(localStorage.getItem("jike_token")).token,
    };
  }

  // 返回实例请求结果
  return instance(options)
    .then((res) => {
      const data = res.data || {};
      // 请求失败时
      if (res.status !== 201 && res.status !== 200) {
        // 请求失败时，在这里集中处理
        // 这里请求失败时，会被下面catch捕捉
        return Promise.reject({ res, data });
      }

      // 请求成功时
      if (res.status === 200 || res.status === 201) {
        // 返回获取数据
        return Promise.resolve(data);
      }
    })
    .catch((err) => {
      // 401时，代表token鉴权出现问题
      if (err.request.status === 401) {
        // 移除用户信息和token
        localStorage.removeItem("jike_token");
        return Promise.reject(err);
      }
      // 这里捕获的err，
      // 如果是 instance(options) 中reject触发，那么捕获的err就是 instance(options) 中reject 给的 err
      // 如果是 上面Promise.reject({ res, data }) 触发，那么捕获的err就是 { res, data }
      return Promise.reject({ msg: "请求失败", err });
    });
};

// 封装 请求
const request = ["post", "put", "patch"].reduce((request, method) => {
  /**
   * 给请求添加方法
   * @param {*} url 请求路由
   * @param {*} data 请求数据
   * @param {*} option 请求配置选项
   * @returns
   */
  request[method] = (url, data = {}, option = {}) => {
    // 调用 axios实例
    return baseRequest(
      // 使用assign拷贝 键值对 用作 axios请求参数
      Object.assign({ method, url, data }, option)
    );
  };
  return request;
}, {});

["get", "delete", "head"].forEach((method) => {
  /**
   *
   * @param url string 接口地址
   * @param params object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, params = {}, options = {}) => {
    return baseRequest(Object.assign({ url, params, method }, options));
  };
});

export default request;
