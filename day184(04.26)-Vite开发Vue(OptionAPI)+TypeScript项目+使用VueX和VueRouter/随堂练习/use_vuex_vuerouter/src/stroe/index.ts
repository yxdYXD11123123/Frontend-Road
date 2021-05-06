import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

// 自己要声明一份 state中的类型接口规范
export interface State {
  title: string
}

// 定义一个注入关键字（使用useStore时，带上key就可以让TypeScript）
export let key: InjectionKey<Store<State>>;

// 创建共享库时，将 上面声明的接口 传到类型参数中 
export const store = createStore<State>({
  // 这里写数据时，就会按照 接口 要求state类型
  state: {
    title: "Title"
  },
  mutations: {
    /**
     * 编辑title
     * @param state 
     * @param payload 新title
     */
    Edit_Title(state, payload: string) {
      state.title = payload;
    }
  },
  actions: {
    /**
     * 编辑title
     * @param context 
     * @param payload 
     */
    Edit_Title_Action(context, payload: string) {
      context.commit("Edit_Title", payload);
    }
  }
})
