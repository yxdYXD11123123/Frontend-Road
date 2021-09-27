import React from "react"

function CartTitle(props) {
  // 1.3.渲染name
  return (<div className="title">{props.name}的商品</div>)
}

export default CartTitle