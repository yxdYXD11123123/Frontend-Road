function addNum(...rest) {
    let result = 0
    for (let i = 0; i < rest.length; i++) {
        result += rest[i]
    }
    return result;
}
// console.log(addNum(1, 2, 4));

module.exports = {
    add: addNum
}
