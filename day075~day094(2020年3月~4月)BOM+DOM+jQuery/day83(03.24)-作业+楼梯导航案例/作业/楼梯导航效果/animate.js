// 变速运动的函数   缓动动画
function animate(element, target) {
    clearInterval(element.timerIn);
    element.timerIn = setInterval(function () {
        let current = element.scrollTop;
        // 计算步长（这里获取元素当前位置，也可以用getStyle函数），这样计算可以使最后的步进一定会降到1px之内
        let step = (target - current) / 10;
        console.log(current, step);

        // 如果步长出现小数，要往大取整 0.1-1
        // 如果我们目标值是负数，要往小取整 -0.1~-1
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (current == target) {
            clearInterval(element.timerIn)
        } else {
            element.scrollTop = current + step
        }
    }, 20)
}
// document.documentElement.scrollTop = louCeng.children[i].offsetTop;
