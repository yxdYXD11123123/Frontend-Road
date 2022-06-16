import {View} from "./View";
import {User, UserProps} from "../models/User";

// 用户信息展示视图类
export class UserShow extends View<User, UserProps> {
    template(): string {
        return `
        <div>
            <h1>用户信息</h1>
            <div>姓名：${this.model.get('name')}</div>
        </div>
        `;
    }
}