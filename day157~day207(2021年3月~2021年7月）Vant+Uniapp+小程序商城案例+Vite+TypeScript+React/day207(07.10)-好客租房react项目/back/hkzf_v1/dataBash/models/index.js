// 数据库公共方法
const method = require('./method');
const models = require('../models/data');
const init = require('./initialization');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let sequelize;


// 用户的一些方法
class User extends method {
    constructor() {
        super(sequelize)
    }

    // 用户添加
    async userAdd(obj) {
        return await this.saver('User', obj);
    }

    // 查询用户
    async userFind(obj) {
        return await this.findOne('User', obj);
    }

    // 更新用户信息
    async userInfo(condition, obj) {
        return await this.update('User', condition, obj)
    }

    // 用户登录转态创建
    async userStatus(obj) {
        return await this.saver('status', obj);
    }

    // 查询用户登录转态
    async userStatusFind(obj) {
        return await this.findOne('status', obj);
    }

    // 用户登出
    async userLogout(obj) {
        return await this.delete('status', obj);
    }

    // 收藏
    async favorites(obj) {
        return await this.find('collection', obj);
    }

    // 查询收藏是否存在
    async favorite(obj) {
        return await this.findOne('collection', obj);
    }

    // 添加收藏
    async addFavorites(obj) {
        return await this.saver('collection', obj);
    }

    // 删除收藏
    async deleteFavorites(obj) {
        return await this.delete('collection', obj);
    }


}

// 操作房屋的一些方法
class House extends method {
    constructor() {
        super(sequelize)
    }

    // 地区
    async areaSave(obj) {
        return await this.saver('area', obj);
    }

    async areaFindOne(obj) {
        return await this.findOne('area', obj);
    }

    async areaFind(obj) {
        return await this.find('area', obj)
    }

    //城市
    async citySave(obj) {
        return await this.saver('city', obj);
    }

    async cityFind(obj) {
        return await this.find('city', obj)
    }

    async cityFindOne(obj) {
        return await this.findOne('city', obj)
    }

    // 房屋朝向
    async orientedSaver(obj) {
        return await this.saver('oriented', obj);
    }

    async orientedFind(obj) {
        return await this.find('oriented', obj);
    }

    async orientedFindOne(obj) {
        return await this.findOne('oriented', obj);
    }

    // 房屋的地铁线路
    async subwaySaver(obj) {
        return await this.saver('subway', obj);
    }

    async subwayFind(obj) {
        return await this.find('subway', obj);
    }

    // 特色
    async characteristicSaver(obj) {
        return await this.saver('characteristic', obj);
    }

    async characteristicFind(obj) {
        return await this.find('characteristic', obj);
    }

    // 房型
    async roomTypeSaver(obj) {
        return await this.saver('roomType', obj);
    }

    async roomTypeFindOne(obj) {
        return await this.findOne('roomType', obj);
    }

    async roomTypeFind(obj) {
        return await this.find('roomType', obj)
    }

    // 设备
    async deviceSaver(obj) {
        return await this.saver('device', obj);
    }

    async deviceFind(obj) {
        return await this.find('device', obj);
    }

    // 房屋
    async houseSave(obj) {
        return await this.saver('House', obj);
    }

    async houseFind(obj) {
        //配置锁 和排序顺序
        obj.where = {...obj.where, lock: false};
        obj.order = [['time', 'DESC']];
        return await this.find('House', obj);
    }

    async houseFindOne(obj) {
        return await this.findOne('House', obj);
    }

    async houseCount(obj) {
        obj.where = {...obj.where, lock: false};
        return await this.count('House', obj);
    }

    async houseUpdate(condition, obj) {
        return await this.update('House', condition, obj);
    }

}

class Admin extends method {
    constructor() {
        super(sequelize)
    }

    // 管理员
    async addAdmin(obj) {
        return await this.saver('admin', obj);
    }

    async findAdmin(obj) {
        return await this.findOne('admin', obj);
    }

    // 用户登录转态创建
    async userStatus(obj) {
        return await this.saver('status', obj);
    }

    // 查询用户登录转态
    async userStatusFind(obj) {
        return await this.findOne('status', obj);
    }

    // 用户登出
    async userLogout(obj) {
        return await this.delete('status', obj);
    }

    // 房屋
    async house(obj) {
        return await this.find('House', obj);
    }

    async houseList(condition, obj) {
        return await this.update('House', condition, obj);
    }

    // 查询总数
    async houseCount(obj) {
        return await this.count('House' , obj);
    }

    // 用户
    async users(obj) {
        return await this.find('User', obj);
    }

    async user(obj) {
        return await this.findOne('User', obj);
    }

    async usersUpdate(condition, obj) {
        return await this.update('User', condition, obj)
    }
}

// 将创建的方法暴露出来
module.exports = Sequelize => {
    sequelize = models(Sequelize);
    return {
        User, House, Admin,
        init: new init(sequelize)
    }
};
