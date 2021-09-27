import React, { Component } from 'react';
// 引入
import { connect } from "react-redux"
// 导入actions
import { changeStatus } from './store/action';

class AppGrSon extends Component {
    // 获取未读信息列表
    getUnRead = () => {
        return this.props.msgList.filter(val => !val.status)
    }

    render() {
        return (
            <div className="App-gr-son">
                <h3>AppGrSon--待读信息</h3>
                {/* 未读信息 */}
                <ul>
                    {this.getUnRead().map(val => (
                        <li key={val.id}>{val.msg}——<button onClick={() => { this.props.dispatch(changeStatus(val.id)) }}>点击已读</button></li>
                    ))}
                    {this.getUnRead().length === 0 ? "暂无" : ""}
                </ul>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        msgList: state.msgList
    }
}

export default connect(mapStateToProps)(AppGrSon);