// 写一个函数，求出`3`在数组 var arr = {3,4,3,5,7,9};中出现的次数

function getTimes(num, arr) {
    let time = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == num) {
            time++;
        }
    }
    console.log("出现了" + time + "次");
}

let num = 3;
let arr = [3, 4, 3, 5, 3, 7, 9]

getTimes(num, arr)