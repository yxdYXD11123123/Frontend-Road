// 声明抽象类（通用逻辑放入 抽象类）
export abstract class Sorter {
  // 声明抽象属性、方法
  abstract length: number;
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;
  // 排序方法
  sort(): void {
    const { length } = this;
    // 类型守卫
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}
