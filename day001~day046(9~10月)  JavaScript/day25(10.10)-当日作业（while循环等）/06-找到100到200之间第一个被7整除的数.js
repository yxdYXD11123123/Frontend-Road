//  6. 找到100到200之间第一个能被7整除的数字
for (var i=100; i<=200; i++)
{
    if (i%7==0)
    {
        console.log(i);
        break
    }
}


// 方法二：用while
var a = 100
while (a<=200) {
    if (a%7==0)
    {
        console.log(a);
        break 
    }
    a++
}
