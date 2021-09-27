import React from 'react';

class Son extends React.Component {

  render() {
    return (
      <div>
        子组件二 {this.props.msg}
      </div>
    )
  }
}

export default Son;
