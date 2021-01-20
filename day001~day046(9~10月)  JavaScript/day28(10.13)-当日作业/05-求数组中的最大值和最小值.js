// 需求： 15. 求数组中的最大值和最小值, var arr =  [11, 32，55, 47，79，23]

// 分析：用for循环遍历出所有元素，然后准备两个变量，一个作为保存最大值的，一个作为保存最小值的,最后输出两个值

// 步骤：
var arr =  [11, 32.55, 47,79,23]
var da = arr[0]
var xiao = arr[0]
for (var i=0; i<arr.length; i++)
{
    if (da<arr[i])
    {
        da = arr[i]
    }
    if (xiao>arr[i])
    {
        xiao = arr[i]
    }
}
console.log(`最大值为${da}，最小值为${xiao}`);
