// 定义一个函数，用户输入任意两个不同数字,返回最后的最大值

function getMax(num1, num2) {
    if (num1 > num2) {
        return num1;
    }
    return num2;
}
console.log(getMax(3, 2));
