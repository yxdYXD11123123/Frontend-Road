import {Model} from "../models/Model";

// 通用视图类
export abstract class View<T extends Model<K>, K> {
    /**
     * @param parent 目标父元素
     * @param model 数据模型
     */
    constructor(public parent: Element, public model: T) {
        // 绑定数据模型，model数据变化时，重新render渲染视图
        this.bindModel();
    }

    // 目标父级元素
    regions: { [key: string]: Element } = {};

    // 默认渲染映射表
    regionsMap(): { [key: string]: string } {
        return {}
    };

    // 映射渲染目标
    mapRegions(fragment: DocumentFragment) {
        // 获取映射表
        const regionMap = this.regionsMap();
        // 遍历映射表
        for (const regionKey in regionMap) {
            // 获取 选择器
            const selector = regionMap[regionKey]
            // 获取 目标元素
            const element = fragment.querySelector(selector);
            if (element) {
                this.regions[regionKey] = element;
            }
        }
    }

    // 获取模板的函数
    abstract template(): string

    eventsMap(): { [key: string]: () => void } {
        return {}
    }

     onRender(): void {};

    // 渲染函数
    render() {
        // 每次渲染前 先清空之前的内容
        this.parent.innerHTML = ""
        // 利用template元素
        const templateElement = document.createElement('template')
        // 获取到新的模板 加入到template元素
        templateElement.innerHTML = this.template();
        // 通过template元素 绑定事件
        this.bindEvents(templateElement.content);
        // 获取到组件模板以后，根据组件模板获取目标父级元素
        this.mapRegions(templateElement.content);
        // 渲染子元素
        this.onRender();
        // 将元素插入根节点
        this.parent.appendChild(templateElement.content);
    }

    /**
     * 事件绑定
     * @param fragment
     */
    bindEvents(fragment: DocumentFragment): void {
        // 获取映射表
        const eventsMap = this.eventsMap();
        // 遍历
        for (let eventKey in eventsMap) {
            // 获取 事件名 和 事件元素选择器
            const [eventName, selector] = eventKey.split(':');
            // 从FragmentDom树中 找到元素
            fragment.querySelectorAll(selector).forEach(ele => {
                // 添加事件
                ele.addEventListener(eventName, eventsMap[eventKey])
            })
        }
    }

    // 绑定Model
    bindModel() {
        // 数据变化时，重新渲染
        this.model.on('change', () => {
            this.render();
        })
    }

    // 要渲染的其他视图的父级信息映射表
}
