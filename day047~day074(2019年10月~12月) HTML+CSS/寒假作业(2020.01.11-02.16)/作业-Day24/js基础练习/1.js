// 使用Set集合对下面数组去重

// 1) [1,1,2,2,3,3,4,4,5,5]
// 2) [true,'66',null,true,66,null,88,'set',88]
// 3) [1,[0],1,[0],1,[0]]

let arrA = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
arrA = [...new Set(arrA)]
console.log(arrA);

let arrB = [true, '66', null, true, 66, null, 88, 'set', 88]
arrB = Array.from(new Set(arrB))
console.log(arrB);

let arrC = [1, [0], 1, [0], 1, [0]]
let setC = new Set(arrC)
console.log(setC);

arrC = Array.from(new Set(arrC))
console.log(arrC);


