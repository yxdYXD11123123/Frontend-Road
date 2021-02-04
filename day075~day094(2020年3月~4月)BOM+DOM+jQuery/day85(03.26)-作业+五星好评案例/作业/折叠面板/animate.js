function getStyle(element, attr) {
    // 看看这个方法是否存在
    if (window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr]
    }
    // 否则就是IE8一下等，就用这个方法
    else {
        return element.currentStyle[attr];
    }
}


function animate(element, attrObj, callback) {
    clearTimeout(element.timer);
    element.timer = setInterval(function () {
        let flag = true;
        for (let attr in attrObj) {
            // z-index没有过渡阶段，所以直接改
            if (attr == 'zIndex') {
                // 如果属性名是z-index，就直接把zIndex的值赋值给元素
                element.style[attr] = attrObj[attr];
            }
            else if (attr == 'opacity') {
                // 获取当前值
                var current = parseInt(getStyle(element, attr) * 100);
                // 获取目标值
                var target = attrObj[attr] * 100;
                // 获取步进值
                let step = (target - current) / 10;
                // 处理步进值
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                // 累加
                current += step
                // 赋值
                element.style[attr] = current / 100;
            }
            else {
                // 这里必须用var  为了下面能读取的到current和target
                var current = parseInt(getStyle(element, attr));
                var target = attrObj[attr];
                let step = parseInt(target - current) / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current + "px"
            }
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            clearTimeout(element.timer)
            // 这里用三元运算符判断，是否有callback参数，没有，就不执行，防止报错
            callback ? callback() : null;
        }
    }, 20)
}