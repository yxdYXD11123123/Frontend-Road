/**
 * 所有的 请求接口 
 */

// 导入封装好的请求
import request from "../utils/request";

// 获取首页轮播图
export const getHomeSwiper = () => {
  return request.get('/home/swiper');
}

// 获取租房小组
export const getHomeGroups = () => {
  return request.get('/home/groups');
}

// 获取租房小组
export const getHomeNews = () => {
  return request.get('/home/news');
}

// 获取地区列表
export const getAreaCity = (level) => {
  return request.get("/area/city", { level })
}

// 获取热门城市
export const getHotCity = () => {
  return request.get("/area/hot")
}

// 登录
export const login = (data) => {
  return request.post("/user/login", data)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get("/user")
}