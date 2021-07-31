function CartList(props) {
  // 4.2 在事件的处理函数中, 调用父组件传给CartList的方法，并把参数传给这个方法
  const handlerDelete = (id) => {
    // console.log(id);
    props.deleteItem(id);
  }

  // 5.3 声明onChange事件的事件处理方法
  const handlerChange = (id, e) => {
    // 5.4 给父组件传: 1.type 2.id 3.num
    props.changeItem({
      type: "change",
      id: id,
      num: e.target.value
    })
  }

  const handlerAdd = (id) => {
    props.changeItem({
      type: "add",
      id: id
    })
  }

  // 1.3.渲染name
  return (
    <div>
      {
        props.list.map(item => (
          <div className="item" key={item.id}>
            <img src={item.img} alt="" />
            <div className="name">{item.name}</div>
            <div className="change">
              {/* eslint-disable-next-line */}
              <a href="#">－</a>
              {/* 5.1.渲染list中的商品数量 */}
              {/* 5.2.在input中声明OnChange事件 */}
              <input type="text" className="num" value={item.num} onChange={(e) => handlerChange(item.id, e)} />
              {/* eslint-disable-next-line */}
              <a href="#" onClick={() => handlerAdd(item.id)}>＋</a>
            </div>
            {/* 4.1 在CartList组件中 给删除按钮绑定事件(事件传参) */}
            <div className="del" onClick={() => handlerDelete(item.id)}>×</div>

            {/* <div className="del" onClick={() => { this.props.deleteItem(item.id) }}>×</div> */}
          </div>
        ))
      }
    </div>
  )

}

export default CartList