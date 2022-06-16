"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterCollection = void 0;
class CharacterCollection {
    constructor(data) {
        this.data = data;
    }
    get length() {
        return this.data.length;
    }
    compare(leftIndex, rightIndex) {
        return (this.data[leftIndex].toLocaleLowerCase() >
            this.data[rightIndex].toLocaleLowerCase());
    }
    swap(leftIndex, rightIndex) {
        // 转为数组
        const arr = this.data.split("");
        // 交换值
        let leftHand = arr[leftIndex];
        arr[leftIndex] = arr[rightIndex];
        arr[rightIndex] = leftHand;
        // 转回字符串
        this.data = arr.join("");
    }
}
exports.CharacterCollection = CharacterCollection;
