import {User, UserProps} from "../models/User";
import {View} from "./View";

// 渲染用户表单的视图类
export class UserForm extends View<User, UserProps> {
    // 事件关系映射表
    eventsMap(): { [key: string]: () => void } {
        return {
            "click:.set-age": this.model.setRandomAge,
            "click:.set-name": this.onSetNameClick,
            "click:.save-user":  this.model.save
        }
    }

    // 模板
    template(): string {
        return `
        <div>
         <div>${this.model.get('name')}</div>
         <div>${this.model.get('age')}</div>
        </div>
        <input type="text"  placeholder="${this.model.get("name")}"/>
        <button class="save-user">保存用户</button>
        <button class="set-name">设置姓名</button>
        <button class="set-age">设置随机年龄</button>
       `
    }

    // 注意这里写箭头函数，否则函数中this指向元素
    onSetNameClick = () => {
        // 获取input输入值
        const input = this.parent.querySelector("input");
        if (input) {
            const name = input.value;
            // 更新值
            this.model.set({name})
        }
    }
}