import { isSameNode } from "./index";

/**
 * 功能一：根据 虚拟Dom 创建 真实Dom插入
 * 功能二：对比 新旧虚拟Dom 更新Dom
 * @param {*} oldVNode 真实Dom 或者 旧的虚拟Dom
 * @param {*} newVNode 虚拟Dom 或者 新的虚拟Dom
 * @returns
 */
export function patch(oldVNode, newVNode) {
  const isRealNode = oldVNode.nodeType;
  // 如果是真实节点 进行初始化
  if (isRealNode) {
    // 根据虚拟节点创建真实Dom对象
    const element = createEle(newVNode);
    // 获取父节点
    const parentNode = oldVNode.parentNode;
    // 插入真实DOM
    parentNode.insertBefore(element, oldVNode.nextSibling);
    // 移除模板Dom
    parentNode.removeChild(oldVNode);
    return element;
  }
  // 如果是虚拟节点，进行虚拟节点比对
  else {
    // 1. 节点比对
    // 1.1 比对是否是同一个节点 如果不是同一个节点，创建新节点替换老节点
    if (!isSameNode(oldVNode, newVNode)) {
      return oldVNode.el.parentNode.replaceChild(
        createEle(newVNode),
        oldVNode.el
      );
    }
    // 1.2 如果是同一个节点，复用真实Dom
    let el = (newVNode.el = oldVNode.el);
    // 1.3 检测当前节点是否是文本节点，如果是文本节点直接对比文本是否相同，如果不同 使用新的文本替换
    if (!oldVNode.tagName) {
      // 如果新旧文本不同
      if (oldVNode.text !== newVNode.text) {
        // 将 新虚拟Dom的文本内容 设置为 当前dom文本内容
        el.textContent = newVNode.text;
      }
    }
    // 2. 属性比对
    updateProps(newVNode, oldVNode.props);
    // 3. 子元素比对
    let newChildren = newVNode.children || [];
    let oldChildren = oldVNode.children || [];
    // 3.1 如果新节点没有子节点、旧节点有子节点
    if (newChildren.length === 0 && oldChildren.length > 0) {
      // 清空当前子节点
      el.innerHTML = "";
    }
    // 3.2 如果新节点有子节点，旧节点没有子节点
    else if (newChildren.length > 0 && oldChildren.length === 0) {
      // 遍历新虚拟节点，创建 插入
      newChildren.forEach((child) => {
        el.appendChild(createEle(child));
      });
    }
    // 3.3 如果新旧节点都有子节点
    else {
      updateChildren(el, newChildren, oldChildren);
    }
  }
}

/**
 * 创建真实DOM
 * @param {*} vnode 虚拟节点
 */
export function createEle(vnode) {
  const { tagName, text, props, children } = vnode;
  // 如果有 标签名
  if (typeof tagName === "string") {
    // 就创建DOM元素，并存到 虚拟节点 的el属性中，方便后面 虚拟节点对比更新时，直接找到对应的真实DOM
    vnode.el = document.createElement(tagName);
    // 为元素添加属性
    updateProps(vnode, props);
    // 创建元素子节点
    // 遍历children中虚拟子节点，递归创建子节点并添加到真实DOM的子节点中
    children.forEach((child) => vnode.el.appendChild(createEle(child)));
  } else {
    // 否则创建文本节点
    vnode.el = document.createTextNode(text);
  }
  // 返回真实dom对象
  return vnode.el;
}

/**
 * 为真实DOM元素添加属性
 * @param {*} newVNode 新的虚拟节点
 * @param {*} oldProps 旧属性
 */
function updateProps(newVNode, oldProps = {}) {
  // 获取虚拟节点 当前所指的真实Dom
  let el = newVNode.el;
  // 获取新的props
  let newProps = newVNode.props || {};
  // 获取新的style
  let newStyle = newProps.style;
  let oldStyle = oldProps.style;

  // 遍历所有新属性
  for (const key in newProps) {
    // 如果是样式属性，
    if (key === "style") {
      // 遍历样式键值对
      for (const style in newStyle) {
        // 添加样式
        el.style[style] = newStyle[style];
      }
    }
    // 否则直接设置属性
    else {
      el.setAttribute(key, newProps[key]);
    }
  }

  // 遍历旧属性
  for (const key in oldProps) {
    // 如果新属性中没有这个旧属性，删除属性
    if (!newProps[key]) {
      el.removeAttribute(key);
    } else {
      // 遍历旧样式
      if (key === "style") {
        for (const style in oldStyle) {
          // 移除新样式中没有的样式
          if (!newStyle[style]) {
            el.style[style] = "";
          }
        }
      }
    }
  }
}

/**
 * 更新子节点
 * @param {*} el dom元素
 * @param {*} newChildren 新的虚拟子节点列表
 * @param {*} oldChildren 旧的虚拟子节点列表
 */
function updateChildren(el, newChildren, oldChildren) {
  // 获取 旧的子节点相关信息
  let oldStartIndex = 0;
  let oldStartVNode = oldChildren[oldStartIndex];
  let oldEndIndex = oldChildren.length - 1;
  let oldEndVNode = oldChildren[oldEndIndex];
  // 获取 新的子节点相关信息
  let newStartIndex = 0;
  let newStartVNode = newChildren[newStartIndex];
  let newEndIndex = newChildren.length - 1;
  let newEndVNode = newChildren[newEndIndex];

  // 创建映射表
  function makeKeyByIndex(oldChildren) {
    const map = {};
    // 遍历旧节点列表
    oldChildren.forEach((item, index) => {
      // 记录 key值：索引
      map[item.key] = index;
    });
    return map;
  }

  const mapping = makeKeyByIndex(oldChildren);

  // 如果 旧的开始指针 或 新的开始指针 超出 最大长度 停止循环
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 如果遍历到节点值为undefined，继续步进，跳过本次循环
    if (!oldStartVNode) {
      oldStartVNode = oldChildren[++oldStartIndex];
    } else if (!oldEndVNode) {
      oldEndVNode = oldChildren[--oldEndIndex];
    }
    // 如果 开始的新旧子节点 相同，说明可以从头开始比较
    else if (isSameNode(oldStartVNode, newStartVNode)) {
      // 深度遍历（比较两个节点 去更新）
      patch(oldStartVNode, newStartVNode);
      // 步进 索引及节点
      oldStartVNode = oldChildren[++oldStartIndex];
      newStartVNode = newChildren[++newStartIndex];
    }
    // 如果 结束的新旧节点 相同，说明可以从尾部开始倒序比较
    else if (isSameNode(oldEndVNode, newEndVNode)) {
      // 深度遍历（比较两个节点 去更新）
      patch(oldEndVNode, newEndVNode);
      // 步进 索引及节点回退
      oldEndVNode = oldChildren[--oldEndIndex];
      newEndVNode = newChildren[--newEndIndex];
    }
    // 新尾 旧头 比较
    else if (isSameNode(oldStartVNode, newEndVNode)) {
      patch(oldStartVNode, newEndVNode);
      // 将旧的头节点 插入到 旧的尾节点的下一个兄弟节点之前（用来复用旧节点）
      el.insertBefore(oldStartVNode.el, oldEndVNode.el.nextSibling);
      // 步进 旧开始索引++ 新结束索引--
      oldStartVNode = oldChildren[++oldStartIndex];
      newEndVNode = newChildren[--newEndIndex];
    }
    // 旧尾 新头 比较
    else if (isSameNode(oldEndVNode, newStartVNode)) {
      patch(oldEndVNode, newStartVNode);
      // 将旧的头节点 插入到 旧的尾节点之前（用来复用旧节点）
      el.insertBefore(oldEndVNode.el, oldStartVNode.el);
      // 步进 旧结束索引-- 新开始索引++
      oldEndVNode = oldChildren[--oldEndIndex];
      newStartVNode = newChildren[++newStartIndex];
    }
    // 乱序比对
    else {
      // 用新节点的key值，寻找 映射表中 是否有相同节点
      const index = mapping[newStartVNode.key];
      if (index === undefined) {
        // 如果没有找到，说明 旧节点中没有相同节点
        // 创建新元素
        el.insertBefore(createEle(newStartVNode), oldStartVNode.el);
      } else {
        // 如果找到，说明 旧节点中 有相同节点可以复用
        // 复用节点
        const moveVNode = oldChildren[index];
        // 比对差异
        patch(moveVNode, newStartVNode);
        el.insertBefore(moveVNode.el, oldStartVNode.el);
        // 加undefined占位
        oldChildren[index] = undefined;
      }
      // 步进 新节点开始索引++
      newStartVNode = newChildren[++newStartIndex];
    }
  }

  // 如果 新的开始索引 小于 新的结束索引
  // 说明：新节点还有没有遍历到的
  if (newStartIndex <= newEndIndex) {
    // 如果 旧结束索引后面的一个位置，如果存在值，说明是倒序对比
    const anchor = oldChildren[1 + oldEndIndex];
    // 遍历没有遍历到的 新节点
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      if (anchor) {
        el.insertBefore(createEle(newChildren[i]), anchor.el);
      } else {
        // 插入 没有的新节点
        el.appendChild(createEle(newChildren[i]));
      }
    }
  }

  // 如果 旧的开始索引 小于 旧的结束索引
  // 说明：旧节点有不需要的
  if (oldStartIndex <= oldEndIndex) {
    // 遍历 不需要存在的旧节点
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      // 避免最后要删除的节点是undefined
      let child = oldChildren[i];
      // 移除
      child && el.removeChild(child.el);
    }
  }
}
