const dataBash = require('../dataBash'),
    config = require("../config/index"),
    houseConfig = require('../config/dataModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    // 注册
    registered: async ctx => {
        let { username, password } = ctx.request.body;
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

        let data = await dataBash.User.userFind({
            where: { userName: username }
        });

        if (data) {
            ctx.body.status = 400;
            ctx.body.description = "你输入的账号名重复";
            return;
        }

        let user = await dataBash.User.userAdd({
            userName: username,
            userPass: password,
            userGender: 1,
            userAvatar: "/img/avatar.png",
            userNick: "好客_" + parseInt(Math.random() * 1000000)
        });
        let token = config.getToken({
            ID: user.ID
        });
        await dataBash.User.userStatus({
            userCode: token
        });
        ctx.body.status = 200;
        ctx.body.description = "创建成功";
        ctx.body.body = { toke: token }
    },

    // 登录
    login: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };

        let { username, password } = ctx.request.body;
        let data = await dataBash.User.userFind({
            where: {
                userName: username,
                userPass: password,
                userLock: false
            }
        });

        if (!data) {
            ctx.body.status = 400;
            ctx.body.description = "你的账号或者密码异常";
            return;
        }

        let token = config.getToken({
            ID: data.ID
        });

        await dataBash.User.userStatus({
            userCode: token
        });

        ctx.body.status = 200;
        ctx.body.description = "账号登录成功";
        ctx.body.body = { token };
    },

    // 用户权限管理
    permission: async (ctx, next) => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };

        let { authorization } = ctx.headers;

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
        authorization = await dataBash.User.userStatusFind({
            where: { userCode: authorization }
        });

        if (!authorization) {
            ctx.body.status = 400;
            ctx.body.description = "token异常或者过期";
            return;
        }
        ;

        ctx.headers.userCode = userCode;
        await next(ctx);
    },

    // 用户登出接口
    logout: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let { authorization } = ctx.headers;
        await dataBash.User.userLogout({ where: { userCode: authorization } })

        ctx.body.status = 200;
        ctx.body.description = "退出成功";
    },

    // 更新用户的信息
    updateInfo: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let { userCode } = ctx.headers;
        let { avatar, gender, nickname, phones } = ctx.request.body;
        let search = {};
        if (avatar) search.userAvatar = avatar;
        if (gender) search.userGender = gender;
        if (nickname) search.userNick = nickname;
        if (phones) search.userPhone = phones;

        await dataBash.User.userInfo(
            { where: { ID: userCode.ID } }, search
        );

        ctx.body.status = 200;
        ctx.body.description = "用户数据更新成功"

    },

    // 获取用户的数据；
    info: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let { userCode } = ctx.headers;

        let userData = await dataBash.User.userFind({
            where: { ID: userCode.ID }
        });

        ctx.body.status = 200;
        ctx.body.description = "请求用户数据成功";
        ctx.body.body = {
            avatar: userData.userAvatar,
            gender: userData.userGender,
            nickname: userData.userNick,
            phone: userData.userPhone,
            id: userData.ID
        }

    },

    // 收藏列表
    favoritesList: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };

        let { userCode } = ctx.headers;

        let favorites = await dataBash.User.favorites({
            where:
                { userColl: userCode.ID }
        });
        let search = favorites.map(v => {
            return { houseCode: v.decID }
        });
        // console.log(search)
        search = await dataBash.House.houseFind({ where: { [Op.or]: search } });
        // console.log(search);
        ctx.body.status = 200;
        ctx.body.body = houseConfig.houseList(search);

    },

    // 判断是否收藏
    favoritesID: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let { id } = ctx.params;
        let { userCode } = ctx.headers;

        if (!id) {
            ctx.body.description = "传入的房屋id异常";
            return;
        }
        let data = await dataBash.User.favorite({
            where:
                { decID: id, userColl: userCode.ID }
        });

        ctx.body.status = 200;
        ctx.body.body = { isFavorite: !!data }

    },

    // 添加收藏
    addFavorites: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };

        let { id } = ctx.params;
        let { userCode } = ctx.headers;

        if (!id) {
            ctx.description = "房屋id传入错误";
            return;
        }

        await dataBash.User.addFavorites({
            decID: id,
            userColl: userCode.ID
        });

        ctx.body.status = 200;
        ctx.body.description = "添加收藏";
    },

    // 删除收藏
    deleteFavorites: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };

        let { id } = ctx.params;
        let { userCode } = ctx.headers;

        let fl = await dataBash.User.deleteFavorites({
            where: {
                decID: id,
                userColl: userCode.ID
            }
        });
        if (!fl) {
            ctx.body.status = 400;
            ctx.body.description = "没有找到你要删除的东西";
        }
        ctx.body.status = 200;
        ctx.body.description = "删除收藏";
    },

    // 添加新的房屋
    addHouse: async ctx => {
        let houseData = {
            "title": ctx.request.body.title,
            "description": ctx.request.body.title,
            "houseImgs": ctx.request.body.houseImgs,
            "oriented": ctx.request.body.oriented,
            "supporting": ctx.request.body.supporting,
            "price": ctx.request.body.price,
            "roomType": ctx.request.body.roomType,
            "size": ctx.request.body.size,
            "floor": ctx.request.body.floor,
            "community": ctx.request.body.community,
            "line": ctx.request.body.line
        };

        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let { userCode } = ctx.headers;
        let data = {};
        // 轮播图
        if (houseData.houseImgs.length) {
            data.carouselMap = houseData.houseImgs.join("|");
        }
        // 获取用户的朝向
        if (houseData.oriented) {
            data.orientedID = houseData.oriented;
            data.orientedName = (await dataBash.House.orientedFindOne({ code: houseData.oriented })).name;
        }
        // 获取用户的标签
        if (houseData.supporting.length) {
            data.supporting = houseData.supporting.join("|");
        }
        // 获取 房屋类型
        if (houseData.roomType) {
            data.roomTypeID = houseData.roomType;
            data.roomTypeName = (await dataBash.House.roomTypeFindOne({ code: houseData.roomTypeName })).name;
        }

        // 获取小区
        if (houseData.community) {
            let cityName = await dataBash.House.areaFindOne({
                where: { community: houseData.community }
            });
            data.areaID = `${cityName.city}|${cityName.area}|${cityName.street}|${cityName.community}`;
            data.areaName = `${cityName.cityName}|${cityName.areaName}|${cityName.streetName}|${cityName.communityName}`;
            data.community = cityName.community;
        }
        // l楼层
        if (houseData.floor) {
            // 楼层
            let floorData = [
                { label: "不限", value: "null" },
                { label: "高楼层", value: "FLOOR|1" },
                { label: "中楼层", value: "FLOOR|2" },
                { label: "低楼层", value: "FLOOR|3" }
            ];
            data.floor = floorData.find(v => v.value === houseData.floor).label;
        }
        if (houseData.line) {
            data.entire = houseData.line === "true";
        }
        // 房屋的code
        data.houseCode = config.GUID();
        data.time = new Date();
        // 用户id
        data.userCode = userCode.ID;

        await dataBash.House.houseSave(data);
        ctx.body.status = 200;
    },

    //查看发布房源的列表
    houseLIst: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let { userCode } = ctx.headers;
        let list = await dataBash.House.houseFind({
            where: { userCode: userCode.ID }
        });

        ctx.body.status = 200;
        ctx.body.body = houseConfig.houseList(list);
    },

    //上下架房屋
    shelving: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let { userCode } = ctx.headers;
        let { id } = ctx.params;
        let { shelf } = ctx.request.body;

        let fl = await dataBash.House.houseUpdate({ where: { houseCode: id, userCode: userCode.ID } }, { lock: shelf })

        if (!fl) {
            ctx.body.description = "下架失败，可能没有找到你的房屋或者房屋不是你的";
        } else {
            ctx.body.status = 200;
            ctx.body.description = "更新房屋成功"
        }


    }
};


