// 匹配 {{}} 中的内容
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

export function generate(ast) {
  // 获取 属性
  const props = genProps(ast.attrs);
  // 获取 子元素
  const children = genChildren(ast.children);

  return `_c("${ast.tagName}", ${props}${children ? "," + children : ""})`;
}

// 生成属性字符串
function genProps(attrs) {
  if (attrs.length) {
    // 有属性
    let str = "{";
    for (let i = 0; i < attrs.length; i++) {
      // 处理特殊属性 style
      if (attrs[i].name === "style") {
        // 整理style属性
        const style = {};
        // 去除空格
        attrs[i].value
          .replace(/\s/g, "")
          // 获取 style 键值对
          .replace(/([^:;]+):([^:;]+)/g, function () {
            style[arguments[1]] = arguments[2];
          });
        // 重新赋值属性值
        attrs[i].value = style;
      }
      // 拼接属性
      str += `${attrs[i].name}:${JSON.stringify(attrs[i].value)},`;
    }
    return str.slice(0, -1) + "}";
  }
  return undefined;
}

// 生成子元素字符串
function genChildren(children) {
  // 如果有子元素
  if (children.length) {
    // [{type: 2, text: 'Hello'}, {type: 2, text: 'TinyVue'}] => [_v('Hello'), _v('TinyVue')]
    // 转为
    // [_v('Hello'), _v('TinyVue')] => _c("div", undefined, _v('hello'), _v('TinyVue'))
    // 遍历子元素，使用gen方法转成字符串，拼接
    return children.map((child) => gen(child)).join(",");
  }
  return false;
}

function gen(child) {
  if (child.type === 1) {
    // 递归创建元素
    return generate(child);
  } else {
    const { text } = child;
    // 如果当前是普通文本, 直接返回 _v("xxx")
    if (!defaultTagRE.test(text)) return `_v("${text}")`;
    // 由于上面使用正则处理text后，该正则的 lastIndex 已经改变，所以需要重置
    defaultTagRE.lastIndex = 0;
    // 如果包含插值文本，需要遍历 将 插值文本与普通文本 整合拼接
    let match;
    let startIndex = 0;
    // 存放 插值文本和普通文本 数组
    let tokens = [];
    while ((match = defaultTagRE.exec(text))) {
      if (match.index > startIndex) {
        // 如果匹配到的索引位置 不是 现在的开始位置，说明前面还有普通文本
        // 那么就先添加普通文本
        tokens.push(JSON.stringify(text.slice(startIndex, match.index)));
      }
      // 然后添加 插值文本 的_s函数
      tokens.push(`_s(${match[1]})`);
      // 步进开始索引
      startIndex = defaultTagRE.lastIndex;
    }
    // 如果 开始索引 没有到结尾
    if (startIndex < text.length) {
      // 说明后面还有普通文本，继续添加
      tokens.push(text.slice(startIndex));
    }
    // 返回整理好的文本元素
    return `_v(${tokens.join("+")})`;
  }
}
