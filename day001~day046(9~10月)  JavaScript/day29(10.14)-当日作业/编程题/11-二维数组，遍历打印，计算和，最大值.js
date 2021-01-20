// 11.现有二维数组，var  array=[[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]];                                       
//    1. 遍历打印二维数组的所有元素
//    2. 计算二维数组中所有元素的和
//    3. 求二维数组中所有元素的最大值

// 步骤：
var  array=[[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]];
var sum = 0
var max = array[0][0]
// 遍历打印二维数组
for (var i=0; i<array.length; i++)
{
    for (var j=0; j<array[i].length; j++)
    {
        console.log(array[i][j]);
        // 计算二维数组中所有元素的和
        sum += array[i][j]
        // 判断出所有元素最大值
        if (max<array[i][j])
        {
            max = array[i][j]
        }
    }
}
console.log('总和为'+sum);
console.log('最大值为'+max);

