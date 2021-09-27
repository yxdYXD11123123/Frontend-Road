const fs = require('fs'),
    path = require('path'),
    dataBash = require('../dataBash'),
    config = require("../config/dataModel");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const pinyin = require("node-pinyin");
module.exports = {

    // 根据地区类型返回地区的code
    getAreaType: async ctx => {
        let {
            level: type
        } = ctx.query;
        ctx.body = {
            status: 400,
            description: "",
            body: null
        };

        if (!type) {
            ctx.body.description = "数据缺失";
            return
        }

        let list = await dataBash.House.cityFind({
            where: {
                type
            }
        });

        if (!list) {
            ctx.body.description = "传入的数据错误";
            return;
        }

        ctx.body.status = 200;
        ctx.body.description = "请求成功";
        ctx.body.body = config.city(list).filter(v => v.label);
    },

    // 根据地区的code 返回房屋的列表
    getHouses: async ctx => {
        ctx.body = {
            status: 400,
            description: "",
            body: null
        };
        let {
            code
        } = ctx.params;
        let {
            start = 0, end = 20
        } = ctx.query;

        if (!code) {
            ctx.body.description = "数据缺失";
            return
        }

        let list = await dataBash.House.houseFind({
            where: {
                areaID: {
                    [Op.like]: `%${code}%`
                }
            },
            offset: +start,
            limit: end - start
        });
        let count = await dataBash.House.houseCount({
            where: {
                areaID: {
                    [Op.like]: `%${code}%`
                },
                lock: false
            }
        });
        if (!list) {
            ctx.body.description = "传入的数据异常";
            return;
        };

        ctx.body.status = 200;
        ctx.body.description = "获取数据成功";
        ctx.body.body = {
            list: config.houseList(list),
            count
        };
    },

    // 根据房屋的code返回具体信息
    getHouse: async ctx => {
        ctx.body = {
            status: 400,
            description: "",
            body: null
        };
        let {
            id: code
        } = ctx.params;

        if (!code) {
            ctx.body.description = "数据缺失";
            return;
        }

        let list = await dataBash.House.houseFindOne({
            where: {
                houseCode: code
            }
        });

        if (!list) {
            ctx.body.description = "数据异常";
            return;
        }

        ctx.body.status = 200;
        ctx.body.description = "请求成功";
        ctx.body.body = config.house(list);
    },

    //查询房屋的各种条件,
    dimension: async ctx => {
        ctx.body = {
            status: 400,
            description: "",
            body: null
        };
        let {
            id: code
        } = ctx.query;

        if (!code) {
            ctx.body.description = "数据缺失";
            return
        }

        // 地区
        let areaList = await dataBash.House.areaFind({
            where: {
                city: code
            },
        });
        if (!areaList) {
            ctx.body.description = "传入的参数异常";
            return;
        }
        let areaObj = {};
        areaList.map(v => {
            if (!areaObj[v.areaName]) areaObj[v.areaName] = {
                label: v.areaName,
                value: v.area,
                children: {}
            };
            if (!areaObj[v.areaName]['children'][v.streetName]) areaObj[v.areaName]['children'][v.streetName] = {
                label: v.streetName,
                value: v.street,
                children: {}
            };
            if (!areaObj[v.areaName]['children'][v.streetName]['children'][v.communityName])
                areaObj[v.areaName]['children'][v.streetName]['children'][v.communityName] = {
                    label: v.communityName,
                    value: v.community
                }
        });
        let area = [{
            label: "不限",
            value: "null"
        }];
        // console.log(areaObj);
        Object.keys(areaObj).forEach(v => {
            let obj = {
                label: areaObj[v].label,
                value: areaObj[v].value,
                children: [{
                    label: "不限",
                    value: "null"
                }]
            };
            area.push(obj);
            // console.log(v.children)
            Object.keys(areaObj[v].children).forEach(v1 => {
                let obj1 = {
                    label: areaObj[v].children[v1].label,
                    value: areaObj[v].children[v1].value,
                    children: [{
                        label: "不限",
                        value: "null"
                    }]
                };

                obj.children.push(obj1);
                Object.keys(areaObj[v].children[v1].children).forEach(v2 => {
                    let obj2 = {
                        label: areaObj[v].children[v1].children[v2].label,
                        value: areaObj[v].children[v1].children[v2].value
                    };
                    obj1.children.push(obj2);
                })
            })
        });
        area = {
            label: "区域",
            value: "area",
            children: area
        };

        //特色
        let charaList = await dataBash.House.characteristicFind({
            where: {}
        });
        charaList = charaList.map(v => ({
            label: v.name,
            value: v.code
        }));

        // 楼层
        let floor = [{
                label: "高楼层",
                value: "FLOOR|1"
            },
            {
                label: "中楼层",
                value: "FLOOR|2"
            },
            {
                label: "低楼层",
                value: "FLOOR|3"
            }
        ];

        // 合租和整租
        let line = [{
                label: "不限",
                value: "null"
            },
            {
                label: "整租",
                value: "true"
            },
            {
                label: "合租",
                value: "false"
            }
        ];

        // 方位
        // let oriented = await dataBash.House.orientedFind({});
        // oriented = oriented.map(v => ({
        //     label: v.name,
        //     value: v.code
        // }));
        let oriented = [{
                label: "东",
                value: "ORIEN|141b98bf-1ad0-11e3"
            },
            {
                label: "西",
                value: "ORIEN|103fb3aa-e8b4-de0e"
            },
            {
                label: "南",
                value: "ORIEN|61e99445-e95e-7f37"
            },
            {
                label: "北",
                value: "ORIEN|caa6f80b-b764-c2df"
            },
            {
                label: "东南",
                value: "ORIEN|dfb1b36b-e0d1-0977"
            },
            {
                label: "东北",
                value: "ORIEN|67ac2205-7e0f-c057"
            },
            {
                label: "西南",
                value: "ORIEN|2354e89e-3918-9cef"
            },
            {
                label: "西北",
                value: "ORIEN|80795f1a-e32f-feb9"
            }
        ]
        // 价格
        let price = [{
                label: "不限",
                value: "null"
            },
            {
                label: "1000及以下",
                value: "PRICE|1000"
            },
            {
                label: "1000 - 2000",
                value: "PRICE|2000"
            },
            {
                label: "2000 - 3000",
                value: "PRICE|3000"
            },
            {
                label: "3000 - 4000",
                value: "PRICE|4000"
            },
            {
                label: "4000 - 5000",
                value: "PRICE|5000"
            },
            {
                label: "5000 - 7000",
                value: "PRICE|7000"
            },
            {
                label: "7000以上",
                value: "PRICE|100001"
            }
        ];

        // 房屋类型
        // let roomType = await dataBash.House.roomTypeFind({});
        // roomType = roomType.map(v => ({
        //     label: v.name,
        //     value: v.code
        // }));
        let roomType = [{
                label: "一室",
                value: "ROOM|d4a692e4-a177-37fd"
            },
            {
                label: "二室",
                value: "ROOM|d1a00384-5801-d5cd"
            },
            {
                label: "三室",
                value: "ROOM|20903ae0-c7bc-f2e2"
            },
            {
                label: "四室",
                value: "ROOM|ce2a5daa-811d-2f49"
            },
            {
                label: "四室+",
                value: "ROOM|2731c38c-5b19-ff7f"
            }
        ]


        // 地铁线路
        let subway = await dataBash.House.subwayFind({
            where: {
                areaSubwayName: areaList[0].cityName
            }
        });
        let subwayArr = [{
            label: "不限",
            value: "null"
        }];
        let subwayObj = {};
        subway.forEach(v => {
            if (!subwayObj[v.station]) subwayObj[v.station] = {
                label: v.station,
                value: v.station,
                children: [{
                    label: "不限",
                    value: "null"
                }]
            };
            subwayObj[v.station].children.push({
                label: v.platform,
                value: v.code
            })
        });
        Object.keys(subwayObj).forEach(v => {
            subwayArr.push({
                label: subwayObj[v].label,
                value: subwayObj[v].value,
                children: subwayObj[v].children
            })
        });
        subwayArr = {
            label: "地铁",
            value: "subway",
            children: [...subwayArr]
        }
        // console.log(subwayArr, roomType, price, oriented, line, floor, charaList, area)
        ctx.body.status = 200;
        ctx.body.description = "请求成功";
        ctx.body.body = {
            area,
            characteristic: charaList,
            floor,
            rentType: line,
            oriented,
            price,
            roomType,
            subway: subwayArr

        }
    },

    // 根据各种条件查询房屋
    House: async ctx => {
        ctx.body = {
            status: 400,
            description: "",
            body: null
        };
        let {
            cityId: code
        } = ctx.query;
        let {
            area,
            characteristic,
            subway,
            floor,
            rentType: line,
            oriented,
            price,
            roomType,
            start = 1,
            end = 20,
            more
        } = ctx.query;

        more && more.split(',').forEach(v => {
            if (/AREA/.test(v)) area = v;
            else if (/PRICE/.test(v)) price = v.replace("PRICE|", "");
            else if (/ORIEN/.test(v)) oriented = v;
            else if (/SUY/.test(v)) subway = v;
            else if (/ROOM/.test(v)) roomType = v;
            else if (/FLOOR/.test(v)) floor = v;
            else if (v === "true" || v === "false") line = v;
            else if (/CHAR/.test(v)) characteristic = v;
            else if (v !== "null" && v) subway = v;
        });

        let search = {
            where: {}
        };

        // 楼层
        let floorData = [{
                label: "不限",
                value: "null"
            },
            {
                label: "高楼层",
                value: "FLOOR|1"
            },
            {
                label: "中楼层",
                value: "FLOOR|2"
            },
            {
                label: "低楼层",
                value: "FLOOR|3"
            }
        ];
        // 地区
        if (area && area !== "null") search.where.areaID = {
            [Op.like]: `%${area}%`
        };
        else if (code) search.where.areaID = {
            [Op.like]: `%${code}%`
        };
        // 标签
        if (characteristic && characteristic !== "null") search.where.tagsID = {
            [Op.like]: `%${characteristic}%`
        };

        // 地铁
        if (subway && subway !== "null") search.where.lineID = {
            [Op.like]: `%${subway}%`
        };

        // 楼层
        if (floor && floor !== "null") search.where.floor = floorData.find(v => floor === v.value).label;

        // 整租
        if (line && line !== "null") search.where.entire = line === "true";

        // 朝向
        if (oriented && oriented !== "null") search.where.orientedName = (await dataBash.House.orientedFindOne({
            where: {
                code: oriented
            }
        })).name;

        // 价格
        if (price && price !== "null") {
            if (price <= 10000) {
                search.where.priceNum = {
                    [Op.gte]: +price - 1000,
                    [Op.lte]: +price
                }
            } else {
                search.where.priceNum = {
                    [Op.lte]: 7000
                }
            }
        }

        // 房屋类型
        if (roomType && roomType !== "null") search.where.roomTypeID = roomType;

        let count = await dataBash.House.houseCount(search);
        start--;
        search.offset = +start;
        search.limit = end - start;
        search.order = [
            ['time', 'DESC']
        ];
        let list = await dataBash.House.houseFind(search);
        ctx.body.status = 200;
        ctx.body.description = "请求成功";
        ctx.body.body = {
            list: config.houseList(list),
            count
        }
    },

    // 热门城市
    popular: async ctx => {
        ctx.body = {
            status: 200,
            body: [{
                    "label": "北京",
                    "value": "AREA|88cff55c-aaa4-e2e0",
                    "pinyin": "beijing",
                    "short": "bj"
                },
                {
                    "label": "广州",
                    "value": "AREA|e4940177-c04c-383d",
                    "pinyin": "guangzhou",
                    "short": "gz"
                },
                {
                    "label": "上海",
                    "value": "AREA|dbf46d32-7e76-1196",
                    "pinyin": "shanghai",
                    "short": "sh"
                },
                {
                    "label": "深圳",
                    "value": "AREA|a6649a11-be98-b150",
                    "pinyin": "shenzhen",
                    "short": "sz"
                },
            ],
            description: "请求成功"
        }
    },

    // 城市具体信息
    areaName: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let {
            name
        } = ctx.query;
        // let data = await dataBash.House.cityFindOne({
        //     where: {name}
        // });

        // if (!data) {
        //     name = "上海";
        //     data = await dataBash.House.cityFindOne({
        //         where: {name}
        //     });
        // }
        let arr = [{
                "label": "北京",
                "value": "AREA|88cff55c-aaa4-e2e0"
            },
            {
                "label": "广州",
                "value": "AREA|e4940177-c04c-383d"
            },
            {
                "label": "上海",
                "value": "AREA|dbf46d32-7e76-1196"
            },
            {
                "label": "深圳",
                "value": "AREA|a6649a11-be98-b150"
            },
        ];

        let list = arr.find(v => (new RegExp(v.label).test(name)))

        ctx.body.description = "请求成功";
        ctx.body.status = 200;
        ctx.body.body = list || {
            "label": "上海",
            "value": "AREA|dbf46d32-7e76-1196"
        }
    },

    // 搜索小区
    community: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let {
            name,
            id: code
        } = ctx.query;

        let list = await dataBash.House.areaFind({
            where: {
                city: code,
                communityName: {
                    [Op.like]: `%${name}%`
                }
            },
            offset: 0,
            limit: 10
        });

        ctx.body.status = 200;
        ctx.body.body = list.map(v => ({
            "city": v.city,
            "cityName": v.cityName,
            "area": v.area,
            "areaName": v.areaName,
            "street": v.street,
            "streetName": v.streetName,
            "community": v.community,
            "communityName": v.communityName,
        }))
    },

    // 查询城市坐标
    position: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };
        let {
            id: code
        } = ctx.query;
        let list = await dataBash.House.cityFind({
            where: {
                superior: code
            }
        });

        let arr = list.map(v => new Promise(async resolve => {

            let coord = (await dataBash.House.houseFindOne({
                where: {
                    areaID: {
                        [Op.like]: `%${v.code}%`
                    },
                    areaName: {
                        [Op.like]: `%${v.name}%`
                    }
                }
            }));


            let count = (await dataBash.House.houseCount({
                where: {
                    areaID: {
                        [Op.like]: `%${v.code}%`
                    }
                }
            }))
            resolve({
                label: v.name,
                value: v.code,
                coord: coord && JSON.parse(coord.coord),
                count
            })
        }));
        list = await Promise.all(arr);
        list = list.filter(v => v.coord);
        ctx.body.status = 200;
        ctx.body.body = list
    },

    // 查询城市的下级
    subordinate: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };

        let {
            id: code
        } = ctx.query;

        let list = await dataBash.House.cityFind({
            where: {
                superior: code
            }
        });

        ctx.body.status = 200;
        ctx.body.body = list.map(v => ({
            "label": v.name,
            "value": v.code,
            "pinyin": pinyin(v.name, {
                style: 'normal'
            }).join(""),
            "short": v.name && v.name.split("").map(v => pinyin(v, {
                style: 'normal'
            }).join("")[0]).join("")
        }))
    },

    // 用户发布房屋的各种条件
    release: async ctx => {
        ctx.body = {
            status: 400,
            description: "请求成功",
            body: null
        };

        // 楼层
        let floor = [{
                label: "高楼层",
                value: "FLOOR|1"
            },
            {
                label: "中楼层",
                value: "FLOOR|2"
            },
            {
                label: "低楼层",
                value: "FLOOR|3"
            }
        ];

        // 设备
        let deviceFind = await dataBash.House.deviceFind();
        deviceFind = deviceFind.map(v => ({
            label: v.name,
            value: v.code
        }));

        // 方向
        let orientedFind = await dataBash.House.orientedFind();
        orientedFind = orientedFind.map(v => ({
            label: v.name,
            value: v.code
        }));

        // 房屋类型
        let roomType = await dataBash.House.roomTypeFind();
        roomType = roomType.map(v => ({
            label: v.name,
            value: v.code
        }));

        ctx.body.status = 200;
        ctx.body.body = {
            floor,
            supporting: deviceFind,
            oriented: orientedFind,
            roomType
        }
    },

    image: async ctx => {

        ctx.body = {
            status: 400,
            description: "请求成功"
        }

        let files = (ctx.request.files.file instanceof Array) ? ctx.request.files.file : [ctx.request.files.file];
        if (!files) {
            ctx.body.description = "图片上传异常";
        } else {
            // console.log(files);
            ctx.body.body = files.map(v => {
                // console.log(v);
                // let filesNameH = v.name.split(".");
                let filesName = v.path ? "upload_" + v.path.split("upload_")[1] : v.name;
                return `/uploads/${filesName}`
            });
            ctx.body.status = 200;
        }
    },
    // 轮播图
    swiper: async ctx => {
        let list = [{
                id: 1,
                imgSrc: "/img/swiper/1.png",
                alt: ""
            },
            {
                id: 2,
                imgSrc: "/img/swiper/2.png",
                alt: ""
            },
            {
                id: 3,
                imgSrc: "/img/swiper/3.png",
                alt: ""
            }
        ];
        ctx.body = {
            description: "请求成功",
            status: 200,
            body: list
        };
    },

    //租房小组
    groups: async ctx => {
        let {
            area
        } = ctx.query;

        let list = [{
                id: 1,
                title: "家住回龙观",
                desc: "归属的感觉",
                imgSrc: "/img/groups/1.png"
            },
            {
                id: 2,
                title: "宜居四五环",
                desc: "大都市生活",
                imgSrc: "/img/groups/2.png"
            },
            {
                id: 3,
                title: "喧嚣三里屯",
                desc: "繁华的背后",
                imgSrc: "/img/groups/3.png"
            },
            {
                id: 4,
                title: "比邻十号线",
                desc: "地铁心连心",
                imgSrc: "/img/groups/4.png"
            }
        ];
        ctx.body = {
            description: "请求成功",
            status: 200,
            body: list
        };
    },

    // 资讯
    news: async ctx => {
        let {
            area
        } = ctx.query;

        // let search = {where: {}, order: [['time', 'DESC']]};
        //
        // search["areaID"] = {[Op.like]: `%${area}%`};
        // search.offset = 0;
        // search.limit = 4;
        //
        // let list = await dataBash.House.houseFind(search)

        let list = [{
                id: 1,
                title: '置业选择 | 安贞西里 三室一厅 河间的古雅别院',
                imgSrc: '/img/news/1.png',
                from: '新华网',
                date: "两天前"
            },
            {
                id: 2,
                title: '置业佳选 | 大理王宫 苍山洱海间的古雅别院',
                imgSrc: '/img/news/2.png',
                from: '新华网',
                date: "一周前"
            },
            {
                id: 3,
                title: '置业选择 | 安居小屋 花园洋房 清新别野',
                imgSrc: '/img/news/3.png',
                from: '新华网',
                date: "一周前"
            }

        ]

        ctx.body = {
            description: "请求成功",
            status: 200,
            body: list
        };
    }
};