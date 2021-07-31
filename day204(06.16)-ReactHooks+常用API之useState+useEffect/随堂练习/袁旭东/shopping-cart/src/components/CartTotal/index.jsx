import React from "react"

function CartTotal(props) {

  // 2.3.定义一个方法 用来计算总价
  const comutedTotal = () => {
    let sum = 0;
    props.list.forEach(item => {
      sum += item.price * item.num;
    });
    return sum;
  }


  // 1.3.渲染name
  return (
    <div className="total">
      <span>总价：{comutedTotal()}</span>
      <button>结算</button>
    </div>
  )

}

export default CartTotal