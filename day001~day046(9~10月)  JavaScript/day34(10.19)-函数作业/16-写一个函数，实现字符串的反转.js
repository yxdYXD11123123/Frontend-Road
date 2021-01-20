// 16.写一个函数, 实现字符串反转,输入：["h","e","l","l","o"],输出：["o","l","l","e","h"]

// function reverseArr(arr) 
// {
//     arr.reverse()
//     return arr    
// }
// var arr1 = ["h","e","l","l","o"]
// console.log(reverseArr(arr1));

function reverseArr(arr) 
{
    for (var i=0; i<arr.length/2; i++)
    {
        var temp = arr[i]
        arr[i] = arr[arr.length-1-i]
        arr[arr.length-1-i] = temp
    }
    return arr;
}
var arr1 = ["h","e","l","l","o"]
console.log(reverseArr(arr1));