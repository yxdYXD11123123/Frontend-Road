function subtractNum(num1, ...rest) {
    for (let i = 0, len = rest.length; i < len; i++) {
        num1 -= rest[i]
    }
    return num1
}
// console.log(subtractNum(1, 2, 3));

module.exports = {
    subtract: subtractNum
}

