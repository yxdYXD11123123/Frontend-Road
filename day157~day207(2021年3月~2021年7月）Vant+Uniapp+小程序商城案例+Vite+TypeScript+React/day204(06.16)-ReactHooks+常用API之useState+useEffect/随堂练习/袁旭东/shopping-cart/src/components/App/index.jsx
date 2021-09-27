import { useState } from "react";


// 引入CartTitle
import CartTitle from "../CartTitle"
// 引入CartTotal
import CartTotal from "../CartTotal"
// 引入CartList
import CartList from "../CartList"


function App() {
  // 1.1.给根组件初始化状态-> name
  // 2.1.定义根组件的state -> list

  const [nameState] = useState("喜羊羊");

  const [listState, setListState] = useState([{
    id: 1,
    name: 'TCL彩电',
    price: 1000,
    num: 1,
    img: 'img/a.jpg'
  }, {
    id: 2,
    name: '机顶盒',
    price: 1000,
    num: 1,
    img: 'img/b.jpg'
  }, {
    id: 3,
    name: '海尔冰箱',
    price: 1000,
    num: 1,
    img: 'img/c.jpg'
  }, {
    id: 4,
    name: '小米手机',
    price: 1000,
    num: 1,
    img: 'img/d.jpg'
  }, {
    id: 5,
    name: 'PPTV电视',
    price: 1000,
    num: 2,
    img: 'img/e.jpg'
  }])

  // 4.3 在App组件中，定义一个删除商品的方法，把这个方法传递给子组件
  const deleteItem = (id) => {
    // 4.4 在删除商品的方法中, 接收CartList传递过来的ID, 通过iD筛选出没有被删除的商品，把list数据替换掉
    setListState(listState.filter(item => item.id !== id));
  }

  // 5.5 在App组件中，定义一个商品change的方法，把这个方法传递给子组件
  const changeItem = (option) => {
    // 5.6 接收CartList传递过来的1.type 2.id 3.num, 遍历找出那个要修改的item 把num改掉
    if (option.type === "change") {
      // 直接设置list
      setListState(listState.map(item => {
        // 找到list(数组)的某一个对象
        if (item.id === option.id) { // 找到这个对象了
          // return { ...item, num: option.num < 0 ? 0 : option.num }
          return { ...item, num: option.num }
        } else {
          return item;
        }
      }));
    } else if (option.type === "add") {
      // 直接设置list
      setListState(listState.map(item => {
        // 找到list(数组)的某一个对象
        if (item.id === option.id) { // 找到这个对象了
          return { ...item, num: (item.num + 1) < 0 ? 0 : (item.num + 1) }
        } else {
          return item;
        }
      }));
    }
  }

  return (
    <div className="container">

      <div className="cart">
        {/* 1.2.把根组件的state中的name 传参给子组件 CartTitle */}
        <CartTitle name={nameState}></CartTitle>
        {/* 把list数组传给了CartList */}
        <CartList list={listState} deleteItem={deleteItem} changeItem={changeItem}></CartList>
        {/* 2.2.把list数据传递给CartTotal组件 */}
        <CartTotal list={listState}></CartTotal>
      </div>
    </div>
  )

}

export default App