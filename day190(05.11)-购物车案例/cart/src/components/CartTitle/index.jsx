import React from "react";
import PropTypes from "prop-types"

// 标题组件
class CartTitle extends React.Component {
  render() {
    return (
      <div className="title">{this.props.userName}的购物车</div>
    )
  }
}

// 类型检查
CartTitle.propTypes = {
  userName: PropTypes.string.isRequired
}

export default CartTitle;