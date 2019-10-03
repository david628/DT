import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
//import { loginAction } from '@/action/login.action';
import history from '@/utils/history';
import './index.less';

// const loginAction = {
//   loginOut: param => {
//     return dispatch => {
//       localStorage.removeItem('user');
//       dispatch({
//         type: "login",
//         user: null
//       });
//       //history.push("/login");
//     }
//   }
// }

// @connect(
//     state => state.login,
//     dispatch => bindActionCreators({
//       loginOut: param => {
//         return dispatch => {
//           localStorage.removeItem('user');
//           dispatch({
//             type: "login",
//             user: null
//           });
//           //history.push("/login");
//         }
//       }
//     }, dispatch)
// )
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }

  render() {
    return (
      <div>Home Page</div>
    );
  }
};
