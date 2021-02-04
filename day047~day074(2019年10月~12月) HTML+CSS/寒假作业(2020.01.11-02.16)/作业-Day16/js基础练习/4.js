// 写一个函数,求数组中的最大值,  var arr = [18, 45, 0, 58, 32,59]

var arr = [18, 45, 0, 58, 32, 59]
function getMax(arr) {
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    return max;
}
console.log(getMax(arr));
