// 5.一张纸的厚度大约是0.08mm，对折多少次之后能达到珠穆朗玛峰的高度（8848.13米）？

// 步骤：
let height = 0.08 * 0.1 * 0.1 * 0.1
let time = 0;
while (height <= 8848.13) {
    height *= 2;
    time++
}
console.log(time);

