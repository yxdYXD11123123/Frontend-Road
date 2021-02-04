/**
 * 封装GET、POST、PUT、DELETE方法
 */

// 引入config.js
import featch from "./featch";
import { baseHost } from "../../config";

//  开发环境 development  上线环境 production
const env = process.env.NODE_ENV;
let serverURL = "";

/**
 * @method getURL 获取请求地址
 *
 * @param {String} type [请求 地址环境类型]
 */
const getURL = type => {
  switch (env) {
    case "production":
      serverURL = baseHost[type].pro_host;
      break;
    case "development":
      serverURL = baseHost[type].dev_host;
      break;
    case "testing":
      serverURL = baseHost[type].test_host;
      break;
  }

  return serverURL;
};

/**
 * @method httpGet
 *
 * import { httpGet } from '@/utils/http';
 *
 * httpGet('', payload).then().catch();
 *
 * @param {*} url [ 请求地址 ]
 * @param {*} payload [ 请求参数 ]
 * @param {*} type [ 设置 baseURL ]
 */
export const httpGet = async (url, payload, type = "API1") => {
  try {
    serverURL = getURL(type);
    featch.defaults.baseURL = serverURL;
    const response = await featch.get(`${url}`, {
      params: payload
    });

    const result = response.data;
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @method httpPost
 *
 * import { httpPost } from '@/libraries/axios/http'
 *
 * httpPost('', payload).then().catch()
 *
 * @param { String } url  [ 请求地址 ]
 * @param { Object } payload  [ 请求参数 ]
 */
export const httpPost = async (url, payload, type = "API1") => {
  try {
    serverURL = getURL(type);

    featch.defaults.baseURL = serverURL;

    const response = await featch.post(`${url}`, payload);

    const result = response.data;
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @method httpPut
 *
 * import { httpPut } from '@/utils/http'
 *
 * httpPut('', payload).then().catch()
 *
 *
 * @param {*} url [ 请求地址 ]
 * @param {*} payload [ 请求参数 ]
 * @param {*} type [ 设置 baseURL ]
 */
export const httpPut = async (url, payload, type = "API1") => {
  try {
    serverURL = getURL(type);
    featch.defaults.baseURL = serverURL;
    const response = await featch.put(`${url}`, payload);

    const result = response.data;
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @method httpDelete
 *
 * import { httpDelete } from '@/utils/http'
 *
 * httpDelete('', payload).then().catch()
 *
 * @param {*} url [ 请求地址 ]
 * @param {*} payload [ 请求参数 ]
 * @param {*} type [ 设置 baseURL ]
 */
export const httpDelete = async (url, payload, type = "API1") => {
  try {
    serverURL = getURL(type);
    featch.defaults.baseURL = serverURL;
    const response = await featch.delete(`${url}`, {
      data: payload
    });

    const result = response.data;
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
