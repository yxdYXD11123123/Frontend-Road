// 22.写一个函数， 传入3 个正数，判断能否构成一个三角形

function isTriangle(num1,num2,num3) {
    if (num1+num2>num3 && num2+num3>num1 && num3+num1>num2)
    {
        console.log('可以构成三角形');
    }
    else 
    {
        console.log('不可以构成三角形');
    }
}

isTriangle(3,4,5)
