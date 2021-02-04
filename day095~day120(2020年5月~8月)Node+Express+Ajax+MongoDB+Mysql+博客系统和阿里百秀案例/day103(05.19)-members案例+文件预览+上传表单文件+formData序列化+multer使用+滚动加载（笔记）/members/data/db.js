// 数据库的增删改查功能都写到这里
const path = require("path")
// 导入数据
const backup = require(path.join(__dirname, "backup.json"))
// 导入fs模块
const fs = require("fs");

// 并将功能导出
module.exports = {
    // 获取部分数据的功能
    /**
     * @param {*} lastId 从哪个数据之后开始提取
     * @param {*} amount 提取多少个
     */
    getPart: function (last, amount) {
        // 先判断，如果id为""，从0开始  , 如果不是null，处理成数字类型
        let lastId = !last ? 0 : parseInt(last);
        // 找到那个对应id的数据, 也就是上一条数据  findIndex找到符合条件的第一个元素的索引
        let lastIndex = backup.findIndex((item) => {
            return item.id === lastId;
        })
        // 用slice方法拷贝 前端想要的部分数据 注意：slice方法，如果我们start索引超出，只会返回一个空数组
        let returnData = backup.slice(lastIndex + 1, lastIndex + 1 + amount)
        return returnData;
    },
    // 获取对应id号的某条数据
    getDetailById: function (id) {
        // 使用find方法找到数据
        let dataFromId = backup.find((item) => {
            return item.id === id;
        })
        return dataFromId;
    },
    // 添加新数据
    addData: function (data) {
        // 读取
        let newBackup = backup
        // 添加
        newBackup.unshift(data);
        // 写入(采用同步方式)
        fs.writeFileSync(path.join(__dirname, "backup.json"), JSON.stringify(newBackup), (err) => {
            if (err != null) {
                console.log(err);
            }
        })
    },
    // 删除数据
    deleteData: function (id) {
        // 找到要删除的索引
        let deleteIndex = backup.findIndex((item) => {
            return item.id === id;
        })
        if (deleteIndex == -1) {
            return "找不到数据"
        }
        // 读取
        let newBackup = backup;
        // 删除
        newBackup.splice(deleteIndex, 1);
        // 写入
        fs.writeFileSync(path.join(__dirname, "backup.json"), JSON.stringify(newBackup), (err) => {
            if (err != null) {
                console.log(err);
            }
        })
    }
}