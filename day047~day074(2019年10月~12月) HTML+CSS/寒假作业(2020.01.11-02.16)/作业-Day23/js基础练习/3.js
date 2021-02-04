// 获取url中的用户名和密码 https://www.test.com/login?name=zs&pwd=123,
// 并且控制台输出对象的格式{name:'zs',pwd:123}

let url = "https://www.test.com/login?name=zs&pwd=123"
function getObj(url) {
    url = url.split('?')[1].split("&")
    let obj = new Object();
    for (let i = 0; i < url.length; i++) {
        obj[url[i].split('=')[0]] = url[i].split('=')[1]
    }
    return obj;
}
console.log(getObj(url));
