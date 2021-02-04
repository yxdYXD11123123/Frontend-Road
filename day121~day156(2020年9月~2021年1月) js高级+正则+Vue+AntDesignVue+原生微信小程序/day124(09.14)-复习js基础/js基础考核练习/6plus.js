//  给定一个整数数组 nums 和一个目标值 target，
//  请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
//  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
//  示例:
//  给定 nums = [2, 7, 11, 15], target = 9
//  因为 nums[0] + nums[1] = 2 + 7 = 9
//  所以返回 [0, 1]

let nums = [2, 7, 11, 15];
let target = 9;

// let indexArr = [];
// for (let i = 0; i < nums.length; i++) {
//     for (let j = i; j < nums.length; j++) {
//         console.log(1);
//         if (nums[i] + nums[j] == target) {
//             console.log(i, j);
//         }

//     }
// }

function index(nums, target) {
    // 双循环
    for (let i = 0; i < nums.length; i++) {
        console.log(i);
        for (let j = 0; j < i; j++) {
            console.log(1);
            // 循环比较
            if (nums[i] + nums[j] == target) {
                console.log([j, i]);;
            }
        }
    }
}


let result = index(nums, target);
console.log(result);