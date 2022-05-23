// 匹配能够作为标签的字符
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
// 获取标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// 匹配开始标签 <div id="app"></div> => <div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// 匹配属性
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // a=b  a="b"  a='b'
// 匹配开始标记是否结束
const startTagClose = /^\s*(\/?)>/;
// 匹配结束标签 </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
// 匹配 {{}} 中的内容
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

export function parserHTML(template) {
  // ast 语法树的根节点
  let root = null;
  // 辅助构建 ast 语法树
  let stack = [];

  while (template) {
    // 确定模板的开始位置是标签还是内容
    const index = template.indexOf("<");
    if (index === 0) {
      // 继续确定是 开始标签 还是 结束标签
      const startTagMatch = matchStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      // 如果时结束标签
      const endTagMatch = template.match(endTag);
      if (endTagMatch) {
        template = template.substring(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }
    // 开始位置是内容
    if (index > 0) {
      // 获取内容
      const content = template.substring(0, index);
      if (content) {
        text(content);
        // 删除内容
        template = template.substring(content.length);
      }
    }
  }

  function matchStartTag() {
    const startTag = template.match(startTagOpen);
    if (startTag) {
      const result = {
        // 标签名
        tagName: startTag[1],
        // 属性
        attrs: [],
      };
      // 删除以匹配完成的标签部分
      template = template.substring(startTag[0].length);
      // 匹配标记属性
      let matchStartTagClose;
      let matchAttribute;
      // 如果：
      // 1. 开始标记没结束
      // 2. 开始标记有属性
      // 证明有属性需要处理
      while (
        !(matchStartTagClose = template.match(startTagClose)) &&
        (matchAttribute = template.match(attribute))
      ) {
        // 添加属性
        result.attrs.push({
          name: matchAttribute[1],
          value: matchAttribute[3],
        });
        // 删除已匹配完成的属性部分
        template = template.substring(matchAttribute[0].length);
      }
      //删除结束标记
      template = template.substring(matchStartTagClose[0].length);
      return result;
    }
    return false;
  }

  // 拿到开始标签
  function start(tagName, attrs) {
    // 首先创建一个 ast元素
    const element = createASTElement(tagName, attrs);
    // 如果根节点为null，设此元素就是根节点
    if (root === null) root = element;
    // 获取父元素
    const parent = stack[stack.length - 1];
    if (parent) {
      // 如果存在父元素，记录
      element.parent = parent;
      // 并给父元素的children添加 本元素
      parent.children.push(element);
    }
    // 栈中添加本元素
    stack.push(element);
  }

  // 拿到内容
  function text(content) {
    // 获取父级
    const parent = stack[stack.length - 1];
    // 给父级 添加 文本类型子节点
    parent.children.push({
      type: 2,
      text: content,
      parent,
    });
  }

  // 拿到结束标签
  function end(tagName) {
    // 弹出最后一个元素
    const elm = stack.pop();
    if (elm.tagName !== tagName) {
      // 如果最后弹出的元素 和 拿到的结束标签 不同，有可能是单标签，还有可能是开发者html代码出错
      throw new Error("标记闭合错误");
    }
  }

  return root;
}

// 创建ast元素
function createASTElement(tagName, attrs) {
  return {
    type: 1,
    tagName,
    attrs,
    parent: null,
    children: [],
  };
}
