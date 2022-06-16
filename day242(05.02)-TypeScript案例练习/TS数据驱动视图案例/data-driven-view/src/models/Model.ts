import {HasId} from "./Sync";
import {AxiosPromise} from "axios";

interface ModelAttributes<T> {
    get<K extends keyof T>(key: K): T[K];

    set(value: T): void;

    getAll(): T;
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;

    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: () => void): void;

    trigger(eventName: string): void;
}

// 数据模型类
export class Model<T extends HasId> {
    constructor(
        private events: Events,
        private sync: Sync<T>,
        private attributes: ModelAttributes<T>
    ) {
    }

    // 缩减实例调用层级
    get = this.attributes.get;
    on = this.events.on;
    trigger = this.events.trigger;

    // 设置属性
    set(update: T) {
        // 先更新值
        this.attributes.set(update);
        // 触发 监听变化的事件
        this.trigger("change");
    };

    // 同步服务端数据
    fetch() {
        const id = this.get("id");
        // 添加类型守卫
        if (typeof id === "undefined") {
            throw new Error("用户实例中没有id，不能获取用户数据");
        }

        // 获取服务端 此id的 数据
        return this.sync.fetch(id).then((res) => {
            // 同步到这里
            this.set(res.data);
            return res.data;
        });
    };

    // 同步用户数据到服务端
    save(): void {
        this.sync
            .save(this.attributes.getAll())
            .then(() => {
                this.trigger("save");
            })
            .catch(() => {
                this.trigger("error");
            });
    };
}