// 属性管理类
export class Attributes<T> {
    constructor(private data: T) {
    }

    // 获取属性值
    // 获取data中属性（声明参数类型K K继承于 通过 keyof 获取  T类型 的"键"类型范围 ）
    get = <K extends keyof T>(propName: K): T[K] => {
        return this.data[propName];
    };

    // 设置属性
    // 通过接口规范 update类型，要求开发者在修改信息时，只能修改规范中定义的属性
    set = (update: T) => {
        Object.assign(this.data, update);
    };

    // 获取用户所有信息
    getAll = () => {
        return this.data;
    };
}
