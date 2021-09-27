const dataBash = require('../dataBash'),
    config = require("../config/index"),
    houseConfig = require('../config/dataModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');

module.exports = {
    // 管理员注册
    registered: async ctx => {
        let {username, password} = ctx.request.body;
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };

        if (!username || username.length < 3 || !password || password < 3) {
            ctx.body.status = 400;
            ctx.body.description = "你输入的账号或者密码异常";
            return;
        }

        let data = await dataBash.Admin.findAdmin({
            where: {name: username}
        });

        if (data) {
            ctx.body.status = 400;
            ctx.body.description = "你输入的账号名重复";
            return;
        }

        let user = await dataBash.Admin.addAdmin({
            name: username,
            pass: password
        });
        let token = config.getToken({
            AdminID: user.ID
        });
        await dataBash.Admin.userStatus({
            userCode: token
        });
        ctx.body.status = 200;
        ctx.body.description = "创建成功";
        ctx.body.body = {toke: token}
    },

    // 登录
    login: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };

        let {username, password} = ctx.request.body;
        let data = await dataBash.Admin.findAdmin({
            where: {
                name: username,
                pass: password
            }
        });

        if (!data) {
            ctx.body.status = 400;
            ctx.body.description = "你的账号或者密码异常";
            return;
        }

        let token = config.getToken({
            AdminID: data.ID
        });

        await dataBash.Admin.userStatus({
            userCode: token
        });

        ctx.body.status = 200;
        ctx.body.description = "账号登录成功";
        ctx.body.body = {token};
    },

    // 管理员权限管理
    permission: async (ctx, next) => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };

        let {authorization} = ctx.headers;

        if (!authorization) {
            ctx.body.status = 400;
            ctx.body.description = "token没有";
            return;
        }

        let userCode = config.setToken(authorization);
        if (!userCode) {
            ctx.body.status = 400;
            ctx.body.description = "token异常或者过期";
            return;
        }
        authorization = await dataBash.Admin.userStatusFind({
            where: {userCode: authorization}
        });

        if (!authorization && !userCode.AdminID) {
            ctx.body.status = 400;
            ctx.body.description = "token异常或者过期";
            return;
        }
        ;

        ctx.headers.userCode = userCode;
        await next(ctx);
    },

    // 管理员登出
    logout: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let {authorization} = ctx.headers;
        await dataBash.Admin.userLogout({where: {userCode: authorization}})

        ctx.body.status = 200;
        ctx.body.description = "退出成功";
    },

    // 获取用户列表
    users: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let {start = 1, end = 20} = ctx.query;

        let list = await dataBash.Admin.users({
            offset: --start,
            limit: end - start
        });
        let arr = [];
        for (let i = 0; i < list.length; i++) {
            let v = list[i];
            arr.push({
                "code": v.ID,
                "nickname": v.userNick,
                "username": v.userName,
                "phone": v.userPhone,
                "gender": v.userGender,
                "houseCount": await dataBash.Admin.houseCount({where: {userCode: v.ID}}),
                "disabled": v.userLock
            })
        }
        ctx.body.status = 200;
        ctx.body.body = arr;
    },

    // 禁用用户
    usersId: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let {id} = ctx.params;
        let {disabled} = ctx.request.body;

        let data = await dataBash.Admin.usersUpdate({where: {ID: id}}, {userLock: disabled})

        if (!data) {
            ctx.body.status = 400;
            ctx.body.description = "保存失败";
            return;
        }

        ctx.body.status = 200;
        ctx.body.description = "保存成功";
    },

    // 获取房屋；列表
    houses: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let {cur_page = 1, page_size = 10, community, userName, disabled, start, end} = ctx.query;
        let id;
        if (userName) {
            id = await dataBash.Admin.user({
                where: {userName}
            });
        }

        let where = {};
        if (id) where.userCode = id.ID;
        if (community) {
            where.areaID = {[Op.like]: `%${community}%`}
        }

        if (start && end) {
            where.time = {
                [Op.lte]: new Date(end),
                [Op.gte]: new Date(start),
            };
        }
        if (disabled && disabled !== "null") where.lock = disabled === "true";

        let houseList = await dataBash.Admin.house({
            where, offset: cur_page, limit: page_size
        });
        ctx.body.status = 200;
        ctx.body.body = houseConfig.houseList(houseList);
    },

    // 下架房屋
    housesID: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let {disabled} = ctx.request.body;
        let {id} = ctx.params;

        if (!disabled) {
            ctx.body.description = "缺少参数";
            return;
        }
        let data = await dataBash.Admin.houseList({
            where: {houseCode: id}
        }, {lock: disabled === "true"});

        if (!data) {
            ctx.body.description = "更新失败";
            return;
        }

        ctx.body.status = 200;
        ctx.body.description = "更新成功";
    },

    //base64
    image: async ctx => {
        let base64Data = ctx.request.body.base64;
        base64Data = base64Data.replace(/^data:image\/\w+;base64,/, "");
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        if (!base64Data) {
            ctx.body.description = "没有内容";
            ctx.body.status = 400;
            return
        }
        let dataBuffer = new Buffer(base64Data, 'base64');
        let buffType = Buffer.isBuffer(dataBuffer);

        if (!buffType) {
            ctx.body.description = "传入的数据类型异常";
            ctx.body.status = 400;
            return
        }
        let path = '/userHeaderImg/' + Date.now() + '.png';
        let err = await fsWrite(path, dataBuffer);
        if (err) console.log(err);
        ctx.body.body = {path};
        ctx.body.status = 200;
    }
};
