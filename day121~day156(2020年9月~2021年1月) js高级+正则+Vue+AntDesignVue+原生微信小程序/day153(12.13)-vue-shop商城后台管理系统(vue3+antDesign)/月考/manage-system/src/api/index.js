// 关于用户的接口
export const user = {
  LoginUser: "login", // 用户登录
};

// 关于用户管理的接口
export const users = {
  // 获取用户列表
  GetUsers: "users",
  // 添加用户
  AddUser: "users",
  // 查询用户
  GetUser: "users",
  // 编辑用户
  EditUser: "users",
  // 删除用户
  DelUser: 'users'
}

// 关于权限的接口
export const rights = {
  AsideMenus: "menus", // 获取左侧菜单权限
};

// 关于商品分类管理的接口
export const categories = {
  // 获取所有商品分类
  GetCategories: "categories"
}

// 关于商品参数管理的接口
export const attributes = {
  // 获取所有商品分类参数
  GetAttributes: "categories",
  // 添加参数
  AddAttributes: "categories",
  // 删除参数
  DelAttributes: "categories"
}
