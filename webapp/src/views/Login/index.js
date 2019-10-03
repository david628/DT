import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
      <form onSubmit={ this.submit }>
        <div className="login">
          <div>
            <input type="text" name="userName" value={ this.state.userName } onChange={ this.handleChange }/>
          </div>
          <div>
            <input type="password" name="password" value={ this.state.password } onChange={ this.handleChange }/>
          </div>
          <div>
            <input type="submit" value="Login"/>
          </div>
        </div>
      </form>
    );
  }
};
