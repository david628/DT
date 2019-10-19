import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '@/utils/history';
import { Dropdown, Button } from '../../dw-rui';
import './HeaderMenu.less';

const loginAction = {
    exit: param => {
        return dispatch => {
            localStorage.removeItem('user');
            dispatch({
                type: "login",
                user: null
            });
            //history.push("/");
        }
    }
}

@connect(
  state => state.login,
  dispatch => bindActionCreators(loginAction, dispatch)
)
class HeaderMenu extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  onMenuClick = (e) => {
    //if(e.key === 'logout') {
      this.props.exit();
    //}
  };
  render() {
    const { exit, user } = this.props;
    const collapsed = false;
    const triggerList = (
      <div style={{
        width: '70px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
      }}>
        <a href="" onClick={ this.onMenuClick } style={{ fontSize: '13px', lineHeight: '60px',padding: '0 10px',display: 'inline-block',textDecoration: 'none',color: 'rgba(0, 0, 0, 0.65)' }}>退出</a>
      </div>
    );
    return (
      <div className="header-menu">
        <div style={{ position: 'absolute',right: 0,top: '20px',padding: '0 20px',height: '100%' }}>
          <Dropdown menu={ triggerList } trigger="hover"><span style={{ padding: '0 10px', color: '#00c1de' }}>{ user && user.userName ? user.userName : "登录" }</span></Dropdown>
        </div>
      </div>
    );
  }
}
export default HeaderMenu;
