import {Eventing} from "./Eventing";
import axios, {AxiosResponse} from "axios";

export class Collection<T, K> {
    // 存储集合
    models: T[] = [];
    // 事件管理器
    private events: Eventing = new Eventing();
    on = this.events.on;
    trigger = this.events.trigger;

    constructor(public rootUrl: string, public deserialize: (value: K)=>T) {
    }

    fetch() {
       return  axios.get(this.rootUrl).then((res: AxiosResponse<K[]>) => {
            res.data.forEach((user) => {
                this.models.push(this.deserialize(user))
            })
            this.trigger('change')
        })
    }
}