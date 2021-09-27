### 获取数据时，预先规范数据类型

```ts
// 定义接口
interface goods {
  checked: boolean;
  price: number;
}
// 商品列表
const list = ref<goods[]>([]);
// 获取数据
axios.get("/data/list.json").then((res) => {
  list.value = res.data;
});
```





### 使用 `Array.find()` 

使用 `Array.find()` 方法时，需要<font color=red>非空断言</font>

```ts
// 留言列表
const list = ref([
  {
    id: 1,
    nickname: "笑话",
    content: "今天天气真好",
    date: new Date(),
  },
  {
    id: 2,
    nickname: "小草",
    content: "是呀，那咱们出去晒太阳吧",
    date: new Date(),
  },
]);

// 因为find()返回值如果没有找到可能是undefined
editvalue.value = list.value.find((val) => val.id == id)!.content;
```

