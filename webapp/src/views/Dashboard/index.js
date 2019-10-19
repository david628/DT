import React, { Component } from 'react';
import Dialog from '../../components/ui/Dialog';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select, { Option, OptGroup } from '../../components/ui/Select';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import Message from '../../components/ui/Message';
import './index.less';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      type: ['0'],
      visible: false,
      data: [],
      //current: 1,
      size: 5,
      total: 0,
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
        width: 150,
        render: item => {
          let rs;
          if (item.type == '0') {
            rs = <div>报表</div>;
          } else if (item.type == '1') {
            rs = <div>大屏</div>;
          } else {
            rs = <div>-</div>;
          }
          return rs;
        }
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
    this.getList({
      start: 0,
      limit: this.state.size
    });
  }
  onChange = (current, size) => {
    let param = {};
    param.start = (current - 1) * size;
    param.limit = size;
    this.getList(param);
  }
  getList(param) {
    fetch(`dashboard/list?start=${ param.start }&limit=${ param.limit }`, {
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
        data: rs.data,
        total: rs.total
      });
    });
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  };
  onSubmit = e => {
    e.preventDefault();
    const { id, name, type } = this.state;
    if(name == '') {
      this.showMessage(`名称不能为空！`);
      return;
    }
    if(!type) {
      this.showMessage(`类型不能为空！`);
      return;
    }
    fetch(id === null ? 'dashboard/save' : 'dashboard/update' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        name,
        type: type[0]
      })
    }).then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    }).then(rs => {
      this.getList({
        start: 0,
        limit: this.state.size
      });
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
          this.getList({
            start: 0,
            limit: this.state.size
          });
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
      const { id, name, type } = rs.data;
      let v = type + '';
      this.setState({
        visible: true,
        id,
        name,
        type: [v]
      });
    });
  };
  showDialog = (item, e) => {
    this.setState({
      visible: true,
      id: null,
      name: '',
      type: ['1']
    });
  };
  onCancel = (item, e) => {
    this.setState({
      visible: false
    });
  };
  showMessage = (msg) => {
    let m = `测试消息Message`;
    if(msg !== undefined) {
      m = msg;
    }
    Message.warning({
      msg: <div>{ m }</div>
    });
  };
  testMsg = (msg) => {
    return (e) => {
      this.showMessage(msg);
    }
  }
  selectChange = (v, label) => {
    this.setState({
       type: [v]
    })
  }
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
            <div style={{ width: '560px', padding: '0 30px' }}>
              <form onSubmit={ this.onSubmit }>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ width: '50px', float: 'left', padding: '10px', display: 'inline-block' }}>名称</label>
                  <div style={{ padding: '5px 10px', overflow: 'hidden' }}>
                    <Input type="text" name="name" value={ this.state.name } onChange={ this.handleChange }></Input>
                  </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ width: '50px', float: 'left', padding: '10px', display: 'inline-block' }}>类型</label>
                  <div style={{ padding: '5px 10px', overflow: 'hidden' }}>
                    <Select value={ this.state.type } onChange={ this.selectChange }>
                      <Option value={ 0 }>报表</Option>
                      <Option value={ 1 }>大屏</Option>
                    </Select>
                  </div>
                </div>
              </form>
            </div>
          </Dialog>
        </div>
        <div style={{ padding: '10px 10px 10px 0' }}>
          <Button type="button" onClick={ this.showDialog }>新增</Button>
          <Button type="button" onClick={ this.testMsg() } style={{ marginLeft: '10px' }}>测试消息Message</Button>
        </div>
        <Table
            cm={ this.state.cm }
            data={ this.state.data }
        >
        </Table>
        <div style={{ float: 'right' }}>
          <Pagination
            defaultCurrent={ 1 }
            //defaultSize={ 5 }
            //current={ this.state.current }
            size={ this.state.size }
            total={ this.state.total }
            onChange={ this.onChange }
          ></Pagination>
        </div>
      </div>
    );
  }
};
