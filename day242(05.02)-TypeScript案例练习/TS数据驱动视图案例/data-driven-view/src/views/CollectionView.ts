import {Collection} from "../models/Collection";

export abstract class CollectionView<T, K> {
    constructor(public parent: Element, public collection: Collection<T, K>) {
    }

    abstract renderItem(model: T, itemParent: Element): void;

    // 渲染函数
    render(): void {
        // 每次渲染前 先清空之前的内容
        this.parent.innerHTML = "";
        // 利用template元素
        const templateElement = document.createElement('template')
        // 遍历模型列表数据
        for (let model of this.collection.models) {
            // 为每个数据 创建 div 元素
            const itemParent = document.createElement('div');
            // 执行渲染函数
            this.renderItem(model, itemParent);
            // 插入template
            templateElement.content.append(itemParent);
        }
        // 将元素插入根节点
        this.parent.append(templateElement.content);
    }
}