type PersonType = {
  name: string
  study(): void
}

interface PersonInterface {
  name: string
  study(): void
}

let p1: PersonInterface & PersonType = {
  name: '',
  study() { }
}

type OneType = {
  aaa: string
} & {
  bbb: number
}

let obj1: OneType = {
  aaa: 'a',
  bbb: 1
}

// interface 会自动合并
interface FirstInter {
  x: number
}
interface FirstInter {
  y: string
}

let obj2: FirstInter = {
  x: 1,
  y: '1'
}

type MyNum = 1 | 2;
let val: MyNum = 1; // okay
// let val2: MyNum = 3; // 报错

// 正方形
interface Square {
  kind: "square" // 共同的可辨识特征
  size: number
}
// 长方形
interface Rectangle {
  kind: "rectangle" // 共同的可辨识特征
  width: number
  height: number
}
// 圆形
interface Circle {
  kind: "circle" // 共同的可辨识特征
  radius: number
}

type Shape = Square | Rectangle | Circle;


/**
 * 没有被穷尽所有可能
 */
function noExhaust(x: never) {
  throw new Error('没有被穷尽所有可能')
}

function getArea(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.width * s.height;
    case "circle":
      return Math.PI * s.radius ** 2;  // ** 代表幂
    default:
      return noExhaust(s);
  }
}

let area = getArea({ kind: 'rectangle', width: 1, height: 2 })
console.log(area);
