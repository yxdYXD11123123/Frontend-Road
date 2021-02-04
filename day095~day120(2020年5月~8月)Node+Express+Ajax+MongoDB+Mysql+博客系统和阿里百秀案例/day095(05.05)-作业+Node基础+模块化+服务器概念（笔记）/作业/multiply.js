function multiplyNum(...rest) {
    let result = 1;
    for (let i = 0, len = rest.length; i < len; i++) {
        result *= rest[i]
    }
    return result;
}
// console.log(subtractNum(2, 5, 2));

module.exports = {
    multiply: multiplyNum
}
