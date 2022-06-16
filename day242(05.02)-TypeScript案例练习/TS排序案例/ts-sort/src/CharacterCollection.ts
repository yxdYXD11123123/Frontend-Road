import { Sorter } from "./Sorter";

// 字符串排序
export class CharacterCollection extends Sorter {
  constructor(public data: string) {
    super();
  }

  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return (
      this.data[leftIndex].toLocaleLowerCase() >
      this.data[rightIndex].toLocaleLowerCase()
    );
  }

  swap(leftIndex: number, rightIndex: number): void {
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
