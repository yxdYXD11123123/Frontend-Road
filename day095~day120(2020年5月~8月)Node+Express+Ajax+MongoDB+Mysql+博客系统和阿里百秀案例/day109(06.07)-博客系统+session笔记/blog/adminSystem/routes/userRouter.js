const express = require("express");
const userRouter = express.Router();
const { showUser, editUser, findUsers, deleteUser, showAdd, addUser, findOneUser, modifyUser } = require("../controller/userCtrl")
// 显示用户页面
userRouter.get("/", showUser);

// 获取所有用户
userRouter.get("/findAll", findUsers);

// 删除用户
userRouter.get("/deleteUser", deleteUser);

// 显示用户编辑页面
userRouter.get("/edit", editUser);

// 显示添加页面
userRouter.get("/add", showAdd);

// 添加用户功能
userRouter.post("/addUser", addUser);

// 查找一个用户信息功能
userRouter.get("/findOneUser", findOneUser)

// 更新一个用户信息功能
userRouter.put("/modifyUser", modifyUser)

module.exports = userRouter;