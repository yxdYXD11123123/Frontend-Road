function divideNum(num1, ...rest) {
    for (let i = 0, len = rest.length; i < len; i++) {
        num1 /= rest[i]
    }
    return num1
}
// console.log(divideNum(1, 2));

module.exports = {
    divide: divideNum
}