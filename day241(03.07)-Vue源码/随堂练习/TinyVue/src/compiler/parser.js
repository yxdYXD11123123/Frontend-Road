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
