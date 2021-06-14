import React, { Fragment } from 'react';

class ClassCom extends React.Component {
  // 初始化状态
  state = {
    // 编号
    id: "",
    // 品牌名称
    name: "",
    // 搜索关键字
    searchKey: '',
    // 品牌列表
    brandList: [
      { id: 1, name: '奔驰', ctime: '2020/9/23' },
      { id: 2, name: '宝马', ctime: '2020/9/21' },
      { id: 3, name: '长安奔奔', ctime: '2014/6/23' },
      { id: 4, name: '千里马', ctime: '2020/5/3' }
    ],
  }

  // input输入事件
  inputChange = (e, stateName) => {
    // 更新状态
    this.setState({
      [stateName]: e.target.value
    })
  }

  // 添加品牌
  addBrand = () => {
    let { id, name } = this.state;
    // 更新数据
    this.setState({
      // 添加 新品牌
      brandList: [...this.state.brandList, { id, name, ctime: new Date().toLocaleDateString() }],
      // 清空id 和 name
      id: "",
      name: ""
    })
  }

  // 删除品牌
  delBrand = (id) => {
    this.setState({
      brandList: this.state.brandList.filter(val => val.id !== id)
    })
  }

  // 使用 getter 实现 计算属性
  get filterList() {
    return this.state.brandList.filter(val => val.name.indexOf(this.state.searchKey) !== -1)
  }

  // 或者使用一个方法 计算
  getFilterList() {
    return this.state.brandList.filter(val => val.name.includes(this.state.searchKey))
  }

  render() {
    return (
      <Fragment>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
          integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossOrigin="anonymous"></link>
        <div className="panel panel-primary" style={{ width: '1000px', margin: '50px auto' }}>
          <div className="panel-heading">
            <h3 className="panel-title" >添加品牌</h3>
          </div>
          <div className="panel-body">

            <div className="form-group form-inline">
              <div className="input-group">
                <div className="input-group-addon">编号</div>
                <input type="text" className="form-control" value={this.state.id} onChange={(e) => { this.inputChange(e, 'id') }} />
              </div>

              <div className="input-group">
                <div className="input-group-addon">品牌名称</div>
                <input type="text" className="form-control" value={this.state.name} onChange={(e) => { this.inputChange(e, 'name') }} />
              </div>

              <div className="input-group">
                <button className="btn btn-primary" onClick={this.addBrand}>添加</button>
              </div>

              <div className="input-group pull-right">
                <div className="input-group-addon">按名称搜索</div>
                <input type="text" className="form-control" value={this.state.searchKey} onChange={(e) => { this.inputChange(e, 'searchKey') }} />
              </div>
            </div>

            {/* 表格区域 start */}
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th>编号</th>
                  <th>品牌名称</th>
                  <th>添加时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {/* 使用 this.filterList 或者 this.getFilterList() 都行 */}
                {this.getFilterList().map(val =>
                  <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.ctime}</td>
                    <td><button onClick={this.delBrand.bind(this, val.id)}>删除</button></td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* 表格区域 end */}
          </div>
        </div>
      </Fragment>
    )
  }
}

// 导出 类组件
export default ClassCom;