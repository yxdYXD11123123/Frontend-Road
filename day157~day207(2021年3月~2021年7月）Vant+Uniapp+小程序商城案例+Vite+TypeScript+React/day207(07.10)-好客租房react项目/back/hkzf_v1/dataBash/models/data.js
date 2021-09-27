const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = sequelize => {
    return {
        // 创建用户表
        User: sequelize.define('user', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            // 用户名
            userName: {
                // 数据类型
                type: DataTypes.STRING,
                // 在表中的名字
                field: 'user_name',
            },
            // 用户标记
            tags: {
                type: DataTypes.ENUM(''),
                field: 'tags'
            },
            // 用户的Code
            userCode: {
                type: DataTypes.STRING,
                field: 'user_code',

            },
            // 用户的性别
            userGender: {
                type: DataTypes.ENUM('1', '0'),
                field: 'user_gender',
                defaultValue: '0'
            },
            // 用户的ID
            userID: {
                type: DataTypes.INTEGER,
                field: 'user_id'
            },
            // 用户密码
            userPass: {
                type: DataTypes.STRING,
                field: 'user_pass'
            },
            // 用户手机号
            userPhone: {
                type: DataTypes.INTEGER,
                field: 'user_phone'
            },
            // 用户手机是否认证
            phoneCer: {
                type: DataTypes.BOOLEAN,
                field: 'phone_cer',
                defaultValue: false
            },
            // 用户的头像
            userAvatar: {
                type: DataTypes.STRING,
                field: 'user_avatar'
            },
            // 用户的昵称
            userNick: {
                type: DataTypes.STRING,
                field: 'user_nick'
            },
            // 用户的锁
            userLock: {
                type: DataTypes.BOOLEAN,
                field: 'user_lock',
                defaultValue: false
            },
            // 用户创建时间
            creationTime: {
                type: DataTypes.TIME,
                field: 'creation_time'
            }
        }, {
            // 添加时间戳属性 (updatedAt, createdAt)
            // timestamps: true,
            // 不使用驼峰式命令规则，这样会在使用下划线分隔
            // 这样 updatedAt 的字段名会是 updated_at
            // underscored: true,
            // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
            // paranoid 属性只在启用 timestamps 时适用
            // paranoid: true,
            // 禁止修改表名. 默认情况下
            // sequelize会自动使用传入的模型名（define的第一个参数）做为表名
            // 如果你不想使用这种方式你需要进行以下设置
            // freezeTableName: true,
            // 定义表名
            tableName: 'users',
            // 不想使用 createdAt
            // createdAt: false,
            // 要将 deletedAt 设置为 destroyTime (注意要启用paranoid)
            // deletedAt: 'destroyTime',
            // 想 updatedAt 的实际名为 'updateTimestamp'
            // updatedAt: 'updateTimestamp',
            // 表的字节码
            charset: 'utf8',
            // 字段的
            collate: 'utf8_bin'
        }),
        // 用户的收藏列表 中间件
        collection: sequelize.define('collection', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            decID: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'dec_id'
            },
            // 用户的code
            userColl: {
                type: DataTypes.INTEGER,
                field: 'user_coll'
            }
        }, {
            tableName: 'collections',
            charset: 'utf8',
            collate: 'utf8_bin'
        }),
        // 用户登录状态
        status: sequelize.define('status', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            userCode: {
                type: DataTypes.STRING,
                field: 'user_code'
            },
            userUUID: {
                type: DataTypes.STRING,
                field: 'user_UUID'
            }
        }),
        // 房屋
        House: sequelize.define('house', {
            // 房屋列表的图片
            carouselMap: {
                type: DataTypes.STRING(2048),
                field: 'carouselMap',
                allowNull: true
            },
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                allowNull: true,
                primaryKey: true,
                autoIncrement: true
            },
            // 房屋的code值
            houseCode: {
                type: DataTypes.STRING,
                field: 'houseCode',
                allowNull: true
            },
            // 房屋的标题
            title: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'title'
            },
            // 房屋简介
            description: {
                type: DataTypes.STRING(1234),
                allowNull: true,
                field: 'description'
            },
            // 整租 / 合租
            entire: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true,
                field: 'entire'
            },
            // 价格
            priceNum: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'price_num'
            },
            // 房型
            roomTypeName: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'room_type_name'
            },
            roomTypeID: {
                type: DataTypes.STRING
            },
            // 小区名
            community: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'community'
            },
            communityID: {
                type: DataTypes.STRING
            },
            // 朝向
            orientedName: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'oriented_name'

            },
            orientedID: {type: DataTypes.STRING},
            // 楼层
            floor: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'floor'
            },
            floorID: {type: DataTypes.STRING},
            // 发布时间
            time: {
                type: DataTypes.DATE,
                field: 'time'
            },
            // 房租类型
            priceType: {
                type: DataTypes.STRING,
                allowNull: true
            },
            priceTypeID: {type: DataTypes.STRING},
            // 租房设备
            supporting: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: ''
            },
            supportingID: {type: DataTypes.STRING},
            // 经纬度坐标
            coord: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: ''
            },
            // 房屋的位置
            areaName: {
                type: DataTypes.STRING,
                field: 'area_name',
                allowNull: true
            },
            areaID: {type: DataTypes.STRING},
            // 标签
            tags: {
                type: DataTypes.STRING,
                allowNull: true
            },
            tagsID: {type: DataTypes.STRING},
            // 地铁线路
            line: {
                type: DataTypes.STRING,
                field: 'line_name',
                allowNull: true
            },
            lineID: {type: DataTypes.STRING(1024)},
            lineNum: {
                type: DataTypes.STRING
            },
            // 房屋面积
            size: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            // 用户的code
            userCode: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            lock: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            // 特殊操作的code
            releaseNews: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            //  房屋设备
            characteristicName: {
                type: DataTypes.STRING,
                field: 'characteristic_name'
            },
            characteristicID: {type: DataTypes.STRING}

        }),
        // 中间件
        decoration: sequelize.define('decoration', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                allowNull: true,
                primaryKey: true,
                autoIncrement: true
            },
            areaID: {
                type: DataTypes.STRING,
                field: 'area_id'
            },
            cityID: {
                type: DataTypes.STRING,
                field: 'city_id'
            },
            subwayID: {
                type: DataTypes.STRING,
                field: 'subway_id'
            },
            characteristicID: {
                type: DataTypes.STRING,
                field: 'characteristic_id'
            },
            houseID: {
                type: DataTypes.STRING,
                field: 'house_id'
            },
            deviceID: {
                type: DataTypes.STRING,
                field: 'device_id'
            },
            roomTypeID: {
                type: DataTypes.STRING,
                field: 'room_type_id'
            },
            collectionID: {
                type: DataTypes.STRING,
                field: 'collection_id'
            },
            orientedID: {
                type: DataTypes.STRING,
                field: 'oriented_id'
            }
        }),
        // 地区
        area: sequelize.define('area', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            city: {
                type: DataTypes.STRING,
                field: 'city',
            },
            cityName: {
                type: DataTypes.STRING,
                field: 'city_name',
            },
            area: {
                type: DataTypes.STRING,
                field: 'area',
            },
            areaName: {
                type: DataTypes.STRING,
                field: 'area_name',
            },
            street: {
                type: DataTypes.STRING,
                field: 'street',
            },
            streetName: {
                type: DataTypes.STRING,
                field: 'street_name',
            },
            community: {
                type: DataTypes.STRING,
                field: 'community',
            },
            communityName: {
                type: DataTypes.STRING,
                field: 'community_name',
            }
        }),
        // 城市
        city: sequelize.define('city', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            // 城市名字
            name: {
                type: DataTypes.STRING,
                field: 'name',
                allowNull: true
            },
            // 城市code
            code: {
                type: DataTypes.STRING,
                field: 'code',
                allowNull: true
            },
            // 当前房屋的类型
            type: {
                type: DataTypes.INTEGER,
                field: 'type',
                allowNull: true
            },
            superior: {
                type: DataTypes.STRING,
                field: 'superior'
            }
        }),
        // 热门城市
        popularCities: sequelize.define('popularCities', {}),
        // 推荐房屋
        recommendedHouse: sequelize.define('recommendedHouse', {}),
        // 地铁
        subway: sequelize.define('subway', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            // 城市
            areaSubwayName: {
                type: DataTypes.STRING,
                field: 'area_subway_name'
            },
            // 几号站
            station: {
                type: DataTypes.STRING,
                field: 'station'
            },
            // 站台
            platform: {
                type: DataTypes.STRING,
                field: 'platform'
            },
            code: {
                type: DataTypes.STRING,
                field: 'code'
            }
        }),
        // 特色
        characteristic: sequelize.define('characteristic', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                field: 'name'
            },
            code: {
                type: DataTypes.STRING,
                field: 'code'
            }
        }),
        // 设备
        device: sequelize.define('device', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                field: 'name'
            },
            code: {
                type: DataTypes.STRING,
                field: 'code'
            }
        }),
        // 房型
        roomType: sequelize.define('roomType', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                field: 'name'
            },
            code: {
                type: DataTypes.STRING,
                field: 'code'
            },
        }),
        // 朝向
        oriented: sequelize.define('oriented', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                field: 'name'
            },
            code: {
                type: DataTypes.STRING,
                field: 'code'
            }
        }),
        // 管理员
        admin: sequelize.define('admin', {
            ID: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                field: 'user_name'
            },
            pass: {
                type: DataTypes.STRING,
                field: 'user_pass'
            }
        })
    }
};

