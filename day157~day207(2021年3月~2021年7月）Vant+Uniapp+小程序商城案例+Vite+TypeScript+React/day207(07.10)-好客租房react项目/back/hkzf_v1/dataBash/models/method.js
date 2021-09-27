let Sequelize = Symbol('sequelize');
module.exports = class method {
    constructor(sequelize) {
        this[Sequelize] = sequelize;
    }
    // 保存方法
    async saver(name, ...obj) {
        return await this[Sequelize][name].create(...obj);
    }
    // 获取所有的参数
    async find(name, obj) {
        return await this[Sequelize][name].findAll(obj);
    }
    // 获取单个方法
    async findOne(name, obj) {
        return await this[Sequelize][name].findOne(obj);
    }
    // 更新数据
    async update(name, condition, obj) {
        return await this[Sequelize][name].update(obj, condition);
    }
    // 查询总数
    async count(name, obj) {
        return await this[Sequelize][name].count(obj);
    }
    // 删除
    async delete(name, obj) {
        return await this[Sequelize][name].destroy(obj);
    }

};
