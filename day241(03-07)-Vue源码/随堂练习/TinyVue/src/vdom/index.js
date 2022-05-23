// 创建虚拟文本元素
export function createText(vm, text) {
  return { vm, text };
}

// 创建虚拟DOM元素
export function createElement(vm, tagName, props = {}, ...children) {
  return {
    vm,
    tagName,
    props,
    children,
    key: props.key,
  };
}

// 是否是相同节点
export function isSameNode(v1, v2) {
  return v1.tagName === v2.tagName && v1.key === v2.key;
}
