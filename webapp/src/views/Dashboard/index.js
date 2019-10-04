import React, { Component } from 'react';
import Dialog from '../../components/ui/Dialog';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Table from '../../components/ui/Table';
import './index.less';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      visible: false,
      data: [],
      cm: [{
        header: '名称',
        dataStore: 'name',
      },
      {
        header: '创建者',
        dataStore: 'createUser',
        width: 150
      },
      {
        header: '修改时间',
        dataStore: 'updateDate',
        width: 150
      },
      {
        header: '类型',
        dataStore: 'type',
        width: 150
      },
      {
        header: '操作',
        width: 200,
        align: 'center',
        render: item => (
            <div>
              <Button type="button" onClick={ e => this.edit(item, e) } style={{ margin: '0 5px' }}>编辑</Button>
              <Button type="button" onClick={ e => this.del(item, e) } style={{ margin: '0 5px' }}>删除</Button>
            </div>
        )
      }]
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
    const { id, name } = this.state;
    fetch(id === null ? 'dashboard/save' : 'dashboard/update' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        name
      })
    }).then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    }).then(rs => {
      this.getList();
      this.onCancel();
    });
  };
  del = (item, e) => {
    const confirm = Dialog.Confirm({
      onSubmit: () => {
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
          confirm.close();
        });
        return true;
      },
      onCancel: () => {

      }
    });
  };
  edit = (item, e) => {
    const { id } = item;
    fetch(`dashboard/get?id=${id}`, {
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
      const { id, name } = rs.data;
      this.setState({
        visible: true,
        id,
        name
      });
    });
  };
  showDialog = (item, e) => {
    this.setState({
      visible: true,
      id: null,
      name: ''
    });
  };
  onCancel = (item, e) => {
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div>
        <div>
          <Dialog
              title={ this.state.id === null ? '新增' : '编辑' }
              visible={ this.state.visible }
              onCancel={ this.onCancel }
              onSubmit={ this.onSubmit }
          >
            <div style={{ width: '600px' }}>
              <form onSubmit={ this.onSubmit }>
                <div>
                  <label style={{ padding: '5px 10px 5px 0', display: 'inline-block' }}>名称</label>
                  <Input type="text" name="name" value={ this.state.name } onChange={ this.handleChange }></Input>
                </div>
              </form>
            </div>
          </Dialog>
        </div>
        <div style={{ padding: '10px 10px 10px 0' }}>
          <Button type="button" onClick={ this.showDialog }>新增</Button>
        </div>
        <div style={{ display: 'none' }}>
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
                      <Button type="button" onClick={ e => this.edit(item, e) } style={{ margin: '0 5px' }}>编辑</Button>
                      <Button type="button" onClick={ e => this.del(item, e) } style={{ margin: '0 5px' }}>删除</Button>
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
        <Table
            cm={ this.state.cm }
            data={ this.state.data }
        >

        </Table>
      </div>
    );
  }
};
