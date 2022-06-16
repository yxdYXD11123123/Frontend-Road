import {UserForm} from "./views/UserForm";
import {User, UserProps} from "./models/User";
import {UserEdit} from "./views/UserEdit";
import {Collection} from "./models/Collection";
import {UserList} from "./views/UserList";

const root = document.getElementById('root')

const user = User.buildUser({name: 'xxx', age: 12, id:3})

if (root !== null) {
    const userEdit = new UserEdit(root, user);
    userEdit.render()
} else  {
    throw  new Error('root element not found')
}


const users = new Collection<User, UserProps>("http://localhost:3000/users", (value: UserProps)=>User.buildUser(value))

users.on('change', ()=>{
    const root = document.getElementById("list")
    if (root) {
        new UserList(root, users).render()
    }
})

users.fetch();