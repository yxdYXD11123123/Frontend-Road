const add = (num1, num2) => {
    return num1 + num2;
};
const minus = (num1, num2) => {
    return num1 - num2;
};
// 一次性导出
export { add, minus };
const fn = () => {
    console.log("默认导出的方法");
};
// 默认导出
export default fn;
