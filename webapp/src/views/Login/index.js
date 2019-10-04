import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from '../../components/ui/Form';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
//import { loginAction } from '@/action/login.action';
import history from '@/utils/history';
import './index.less';

// const loginAction = {
//   login: param => {
//     return dispatch => {
//       const user = {
//         id: 0,
//         userName: param.userName
//       }
//       localStorage.setItem('user', JSON.stringify(user));
//       dispatch({
//         type: "login",
//         user
//       });
//       history.push('/');
//     }
//   }
// }

@connect(
    state => state.login,
    dispatch => bindActionCreators({
      login: param => {
        return dispatch => {
          const user = {
            id: 0,
            userName: param.userName
          }
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({
            type: "login",
            user
          });
          history.push('/');
        }
      }
    }, dispatch)
)
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
  }
  componentDidMount() {
    
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  };
  submit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };
  render() {
    return (
      <div className="login" onSubmit={ this.submit }>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div style={{padding: '10px'}}>
            <Input type="text" name="userName" value={ this.state.userName } onChange={this.handleChange} placeholder="请输入name"/>
          </div>
          <div style={{padding: '10px'}}>
            <Input type="password" name="password" value={ this.state.password } onChange={this.handleChange} placeholder="请输入password"/>
          </div>
          <div style={{padding: '10px'}}>
            <Button type="submit">Login In</Button>
          </div>
        </Form>
      </div>
    );
  }
};
