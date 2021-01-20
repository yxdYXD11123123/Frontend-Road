// 18.给定一个整数，写一个函数来判断它是否是 3 的幂次方


var num = 9
while(true)
{
    num = num/3
    if (num==1)
    {
        console.log('yes');
        break;
    }
    if (num<1)
    {
        console.log('no');
        break;
    }
}