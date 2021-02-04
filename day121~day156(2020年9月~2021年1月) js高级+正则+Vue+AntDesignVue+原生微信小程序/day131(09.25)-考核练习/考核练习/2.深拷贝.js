// 例: 新对象和旧对象的内存地址要不一样,一样的算不对
var obj = {
    id: 1,
    name: "andy",
    msg: {
        age: 18,
    },
    color: ["pink", "red"],
};

let newObj = {}

function deepCopy(oldObj, newObj) {
    for (let key in oldObj) {
        if (Array.isArray(oldObj[key])) {
            newObj[key] = [];
            deepCopy(oldObj[key], newObj[key]);
        }
        else if (oldObj[key] instanceof Object) {
            newObj[key] = {};
            deepCopy(oldObj[key], newObj[key]);
        }
        else {
            newObj[key] = oldObj[key];
        }
    }
}

deepCopy(obj, newObj)

console.log(newObj.color == obj.color);