// 3.获取url中的用户名和密码 https://www.test.com/login?name=zs&pwd=123,
// 并且控制台输出对象的格式{name:'zs',pwd:123}

// 步骤：
let str = 'https://www.test.com/login?name=zs&pwd=123'
// 准备一个空对象
let obj = {}
// 找到第一个等号的索引位置
let whereDeng = str.indexOf('=')
// 找到第一个& 的索引位置
let whereAnd = str.indexOf('&')
// 利用以上的两个索引位置，找到需要的用户名和密码信息，并用slice截取出来，并添加给对象
obj.name = str.slice(whereDeng + 1, whereAnd)
obj.pwd = str.slice(whereAnd + 5, str.length)
console.log(obj);
