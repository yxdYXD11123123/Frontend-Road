import React from 'react';
// 引入后代组件
import Father from "../Father";
// 引入context
import ThemeContext from "../../utils/context-theme";

class Ancestor extends React.Component {

  render() {
    return (
      // 注入
      <ThemeContext.Provider value="黑色主题">
        <div>
          {/* 里面放后代组件 */}
          <Father></Father>
        </div>
      </ThemeContext.Provider>
    )
  }
}

export default Ancestor;
