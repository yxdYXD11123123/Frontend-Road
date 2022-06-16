import { generate } from "./generate";
import { parserHTML } from "./parserHTML";

// 将模板解析为 render函数 可使用的渲染函数
export function compileToFunction(template) {
  // 获取 ast 语法树
  const ast = parserHTML(template);
  // 构建render 函数
  // 先拼接 render 函数内部的代码字符串
  const code = generate(ast);
  // 新建 函数，函数体为 render代码字符串
  return new Function(`with(this) {return ${code}}`);
}
