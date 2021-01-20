// 14.写一个函数,去掉任意数组中重复的元素

function quChong(arr) 
{
    for (var i=0; i<arr.length; i++)
    {
        for (var j=i+1; j<arr.length; j++)
        {
            if (arr[i]==arr[j])
            {
                arr.splice(j,1)
                j--
            }
        }
    }    
    return arr
}

var arr1 = [1,4,2,6,2,4,5]
console.log(quChong(arr1));
