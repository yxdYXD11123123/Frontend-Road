import {View} from "./View";
import {User, UserProps} from "../models/User";
import {UserShow} from "./UserShow";
import {UserForm} from "./UserForm";

// 用户编辑视图类
export class UserEdit extends View<User, UserProps> {
    // 渲染目标映射表
    regionsMap(): { [key: string]: string } {
        return {
            userShow: ".user-show",
            userForm: ".user-form",
        }
    }

    template(): string {
        return `
        <div class="user-show"></div>
        <div class="user-form"></div>
        `;
    }

    onRender(): void {
        new UserShow(this.regions.userShow, this.model).render();
        new UserForm(this.regions.userForm, this.model).render();
    }
}