// 【冒泡排序】对下面的数组进行从小到大排序，不允许使用sort

var arr = [4, 2, 7, 5, 3, 1, 6, 9, 8]
for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
            let temp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = temp;
        }
    }
}
console.log(arr);
