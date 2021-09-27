// 导入 高阶组件
import withMousePosition from "../MovePosition"

// 创建一个函数组件
function CurPosition(props) {
  // 组件中通过props 使用高阶组件提供的功能
  return (
    <div>
      <div>坐标位置{props.x}--{props.y}</div>
      <p>{props.msg}</p>
    </div>
  )
}

// 使用 高阶组件 包装 普通的函数组件，然后导出
export default withMousePosition(CurPosition);