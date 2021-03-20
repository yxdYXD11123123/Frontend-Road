import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const derectiveHas = {
  /**
   * 所绑定元素所在页面的生命周期mounted时
   * @param {*} el 绑定的元素
   * @param {*} binding  binding.value获取指令的值
   * @param {*} vnode Vue生成的虚拟节点
   * @param {*} preVnode vue生成虚拟节点的前一个虚拟节点
   */
  mounted(el, binding, vnode, preVnode) {
    console.log(el, binding.value, vnode, preVnode);
  }
}

createApp(App).directive('has', derectiveHas).mount('#app')
