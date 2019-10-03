import React, { Component } from 'react';
import Dialog from '@/components/ui/Dialog';
import './index.less';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      visible: false,
      data: []
    };
  }
  componentDidMount() {
    this.getList();
  }
  getList() {
    fetch('dashboard/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    }).then(rs => {
      this.setState({
        data: rs.data
      });
    });
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  };
  onSubmit = e => {
    e.preventDefault();
    fetch('dashboard/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    }).then(rs => {
      this.getList();
    });
  };
  del = (item, e) => {
    fetch('dashboard/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: item.id
      })
    }).then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    }).then(rs => {
      this.getList();
    });
  };
  edit = (item, e) => {
    console.log(item);
  };
  showDialog = (item, e) => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  render() {
    return (
      <div>
        <div>
          <button type="button" onClick={ this.showDialog }>对话框</button>
          <Dialog
              title="Basic Modal"
              visible={ this.state.visible }
          >
            <div style={{ width: '600px', height: '500px' }}>Title</div>
          </Dialog>
        </div>
        <div>
          <form onSubmit={ this.onSubmit }>
            <div style={{ padding: '10px 10px 10px 0' }}>
              <input type="text" name="name" value={ this.state.name } onChange={ this.handleChange } style={{ padding: '5px 10px' }}/>
              <input type="submit" value="Save" style={{ padding: '5px 10px' }}/>
            </div>
          </form>
        </div>
        <div>
          <table cellPadding="0" cellSpacing="0" border="0" className="ui-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>创建者</th>
                <th>修改时间</th>
                <th>类型</th>
                <th style={{ width: '160px', textAlign: 'center' }}>操作</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{ item.name }</td>
                    <td>{ item.createUser }</td>
                    <td>{ item.updateDate }</td>
                    <td>{ item.type }</td>
                    <td style={{ textAlign: 'center' }}>
                      <button type="button" onClick={ e => this.edit(item, e) } style={{ margin: '0 5px' }}>编辑</button>
                      <button type="button" onClick={ e => this.del(item, e) } style={{ margin: '0 5px' }}>删除</button>
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
