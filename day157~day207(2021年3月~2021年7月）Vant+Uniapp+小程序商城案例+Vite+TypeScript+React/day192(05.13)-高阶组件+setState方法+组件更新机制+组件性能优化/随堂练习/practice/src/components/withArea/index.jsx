import React from "react";

// 高阶组件
function withArea(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super();
      // console.log(props);
    }
    getArea = () => {
      // console.log(this.props);
      return this.props.width * this.props.height
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} getArea={this.getArea}></WrappedComponent>
    }
  }
}

export default withArea;