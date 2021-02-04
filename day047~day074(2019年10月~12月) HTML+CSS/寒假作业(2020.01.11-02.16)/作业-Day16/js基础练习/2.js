// 2. 定义一个函数 function add(){}，求函数任意参数的和

// - 1) add(1,2,3)
// - 2) add(1,2,3,4,5)

function add() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    console.log("和为" + sum);
}

add(1, 23, 3);