var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
    a[i]();
}
a[6](); // 6 
a[7](); // 7  
a[8](); // 8  
a[9](); // 9  