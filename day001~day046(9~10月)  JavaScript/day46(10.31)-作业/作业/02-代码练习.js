// JSON

// 符合对象格式的字符串
// 虽然json是对象格式的，但是键必须用双引号，如果
let obj = {
    name: 'dong',
    age: 18
}
let objJson = '{"name":"dong","age":18}'

// 符合数组格式的字符串
let arr = ['a', 'b', 'c']
let arrJson = '["a","b","c"]'

// JSON的方法：
// 将JSON字符串转为 js对象  使用   JSON.parse(JSON字符串)
let obj2 = JSON.parse(objJson);
// 将对象或数组转为 JSON    使用   JSON.stringify(对象或数组)
let arrJson2 = JSON.stringify(arr)

