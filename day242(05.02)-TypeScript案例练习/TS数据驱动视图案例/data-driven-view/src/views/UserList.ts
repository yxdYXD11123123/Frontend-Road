import {CollectionView} from "./CollectionView";
import {User, UserProps} from "../models/User";
import {UserShow} from "./UserShow";

// 用户列表视图类
export class UserList extends CollectionView<User, UserProps> {
    renderItem(model: User, itemParent: Element) {
        new UserShow(itemParent, model).render();
    }
}