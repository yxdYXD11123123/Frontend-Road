import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import {Model} from "./Model";
import {Collection} from "./Collection";

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = "http://localhost:3000/users";

// 用户
export class User extends Model<UserProps>{
  static buildUser(attrs: UserProps): User {
    return  new User(
        new Eventing(),
        new Sync<UserProps>(rootUrl),
        new Attributes<UserProps>(attrs)
    );
  }
  static buildCollection():Collection<User, UserProps> {
    return  new Collection<User, UserProps>(rootUrl, (value => User.buildUser(value)))
  }
  // 随机设置年龄
  setRandomAge=()=> {
    this.set({age: Math.round(Math.random()*100)})
  }
}
