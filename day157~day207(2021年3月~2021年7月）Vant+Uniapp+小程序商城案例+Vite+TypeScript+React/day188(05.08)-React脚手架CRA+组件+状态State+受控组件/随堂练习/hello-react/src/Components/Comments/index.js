import React from 'react';

const list = [
  { id: 1, name: "jack", content: "1111111111111111" },
  { id: 2, name: "rose", content: "2222222222222222" },
  { id: 3, name: "tom", content: "3333333333333333" },
]

function Comment() {
  return (
    <div>
      评论
      <ul>
        {/* {list.map(item)} */}
      </ul>
    </div>
  )
}


export default Comment;