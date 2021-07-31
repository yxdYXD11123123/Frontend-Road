import React, { Component } from 'react';
// 导入AppGrSon
import AppGrSon from "./AppGrSon";
// 引入connect 
import { connect } from "react-redux"

class AppSon extends Component {
    render() {
        return (
            <div className="App-son">
                <div className="container">
                    <h2>AppSon--记录信息</h2>
                    {/* 信息列表：记录信息 */}
                    <ul>
                        {this.props.msgList.map(val => (
                            <li key={val.id}> {val.updateTime.toLocaleString()}——{val.msg}——{val.status ? "已读" : "未读"}</li>
                        ))}
                    </ul>
                </div>
                {/* AppGrSon */}
                <AppGrSon />
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        msgList: state.msgList
    }
}

export default connect(mapStateToProps)(AppSon);