// 19.给定两个数组，编写一个函数来计算它们的交集。

function getSame(arr1,arr2) 
{
    var arrnew = []
    for (var i=0; i<arr1.length; i++)
    {
        for (var j=0; j<arr2.length; j++)
        {
            if (arr1[i]==arr2[j])
            {
                arrnew.push(arr1[i])
            }
        }
    }
    return arrnew;    
}
var one = [12,,3,24,3,62]
var two = [2,5,62,5,2]
console.log(getSame(one,two));
