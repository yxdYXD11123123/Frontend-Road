//13.写一个函数,求任意数组中的最大值

function getMax(arr)
{
    var max = arr[0]
    for (var i=0; i<arr.length; i++)
    {
        if (max<arr[i])
        {
            max = arr[i]
        }
    }
    return max
}

var arr1 = [1,3,6,3,45,2]
console.log(getMax(arr1));
