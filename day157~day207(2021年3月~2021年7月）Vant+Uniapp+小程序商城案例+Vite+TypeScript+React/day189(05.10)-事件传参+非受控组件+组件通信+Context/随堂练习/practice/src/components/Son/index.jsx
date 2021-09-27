import React from 'react';
// 引入 prop-types
// import PropTypes from "prop-types";
// 引入context
import ThemeContext from "../../utils/context-theme";

// 子组件
// class Son extends React.Component {
//   render() {
//     return (
//       <div>
//         {/* 使用props */}
//         子组件 -- {this.props.msg}
//       </div>
//     )
//   }
// }



// function Son(props) {
//   return (
//     <div>
//       {/* 使用props */}
//       子组件 -- {props.msg}
//     </div>
//   )
// }


// 使用子组件给父组件传值
class Son extends React.Component {
  state = {
    msgFromSon: "我是来自子组件的信息"
  }

  // 4.子组件的方法中，通过props调用父组件传来的方法 并 传递数据
  toFather = () => {
    this.props.receiveMsgFromSon(this.state.msgFromSon);
  }

  render() {
    return (

      <div>
        <div>给父组件传值</div>
        {/* 3.通过事件触发子组件的方法 */}
        <button onClick={this.toFather}>传！</button>
        <ThemeContext.Consumer>
          {value => <p>主题：{value}</p>}
        </ThemeContext.Consumer>

      </div>
    )
  }
}

// Son.propTypes = {
//   // 要求参数必传，且必须是字符串
//   msg: PropTypes.string.isRequired
// }


export default Son;
