//  需求： 20.左奇右偶
//  10个整数的数组[26,67,49,38,52,66,7,71,56,87],元素重新排列，所有的奇数保存到数组左边，所有的偶数保存到数组右边。

//  分析：用循环遍历出所有数，在循环里用判断，判断元素是奇数还是偶数如果是奇数从数组开头加入，是偶数从末尾加入

//  步骤：
var arr = [26,67,49,38,52,66,7,71,56,87]
var arrnew = []
for (var i=0; i<arr.length; i++)
{
    if (arr[i]%2==0)
    {
        arrnew.push(arr[i])
    }
    else if (arr[i]%2!=0)
    {
        arrnew.unshift(arr[i])
    }
}
arr = arrnew
console.log(arr);

