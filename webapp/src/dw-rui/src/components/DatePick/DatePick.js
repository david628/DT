import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from "../Dropdown";
class DatePick extends Component {
  static propTypes = {
      defaultValue: PropTypes.any,
      value: PropTypes.any,
      format: PropTypes.string,
      onChange: PropTypes.func
  };
  static defaultProps = {
      format: 'YYYY/MM/DD'
  };
  constructor(props) {
      super(props);
      const value = new Date(props.value || props.defaultValue);
      this.state = {
          visible: false,
          inputValue: '',
          value
      }
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
      if('value' in nextProps) {
          const { value } = nextProps;
          this.setState({
              value: new Date(value)
          });
      }
  }
  componentDidUpdate() {

  }
  setValue(value) {
      this.setState({
          value: value
      });
  }
  getDaysOfMonth(year, month) {
      return [31, (year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }
  dateFormat(date, format) {
    let o = {
      "M+": date.getMonth() + 1, // month
      "D+": date.getDate(), // day
      "h+": date.getHours(), // hour
      "m+": date.getMinutes(), // minute
      "s+": date.getSeconds(), // second
      "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
      "S": date.getMilliseconds()
      // millisecond
    }, rs = format;
    if (/(Y+)/.test(rs)) {
      rs = rs.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(rs)) {
        rs = rs.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return rs;
  }
  getPervMonthLastDays(date) {
      let year = date.getFullYear();
      let month = date.getMonth();
      let currentWeek = new Date(year, parseInt(month, 10), 1).getDay();
      let pervNum = currentWeek != 0 ? currentWeek : currentWeek + 7;
      let rs = [];
      for(let i = 0; i < pervNum; i++) {
          rs.unshift({
              type: 'pervMonth',
              value: new Date(year, month, 0 - i)
          });
      }
      let num = this.getDaysOfMonth(year, month);
      for(let i = 0; i < num; i++) {
          rs.push({
              type: 'curMonth',
              value: new Date(year, month, i + 1)
          });
      }
      let nextNum = 42 - pervNum - num;
      for(let i = 0; i < nextNum; i++) {
          rs.push({
              type: 'nextMonth',
              value: new Date(year, month, num + i + 1)
          });
      }
      return rs;
  }
  onPopupVisibleChange = (visible) => {
      this.setState({
          visible
      });
  };
  onClick = (item) => {
      return e => {
          this.onChange(item.value);
      }
  }
  onChange = (v) => {
      const props = this.props;
      if(!('value' in props)) {
          this.setState({
            value: v
          });
          this.onPopupVisibleChange(false);
      }
      if(props.onChange) {
          let ret = props.onChange(v);
          if(!ret) {
              this.onPopupVisibleChange(false);
          }
      }
  }
  setDate = (type) => {
      return (e) => {
          const { value } = this.state;
          let v;
          if(type === 'prevYear') {
              v = new Date(value.getFullYear() - 1, value.getMonth(), value.getDate());
          } else if(type === 'prevMonth') {
              v = new Date(value.getFullYear(), value.getMonth() - 1, value.getDate());
          } else if(type === 'nextMonth') {
              v = new Date(value.getFullYear(), value.getMonth() + 1, value.getDate());
          } else if(type === 'nextYear') {
              v = new Date(value.getFullYear() + 1, value.getMonth(), value.getDate());
          }
          this.setState({
              value: v
          });
      }
  }
  handleChange = (e) => {

  }
  render() {
      const { props, state } = this;
      const sprefix = `dwrui`;
      let value = state.value,
      cls = [`${ sprefix }-datePick`],
      row = [],
      k = 0,
      inputValue = this.dateFormat(value, props.format),
      arr = this.getPervMonthLastDays(value);
      //if(state.visible) {
          //cls.push(`${ sprefix }-datePick-open`);
          //cls.push(`${ sprefix }-datePick-focused`);
      //}
      for(let i = 1; i < 7; i++) {
          let cell = [];
          for(let j = 0; j < 7; j++) {
              let type = [`${ arr[k].type }`];
              if(value.getTime() == arr[k].value.getTime()) {
                  type.push(`selected`);
              }
              cell.push(<td key={ `${ i }-${ j }` } className={ type.join(' ') } onClick={ this.onClick(arr[k]) }><div className={ `${ sprefix }-datePick-menu-text` }>{ arr[k].value.getDate() }</div></td>);
              k++;
          }
          row.push(<tr key={ i }>{ cell }</tr>);
      }
      const menu = (
          <div className={ `${ sprefix }-datePick-menu` }>
              <div className={ `${ sprefix }-datePick-menu-header` }>
                  <div className={ `${ sprefix }-datePick-menu-header-inner` }>
                      <a className={ `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-prev-year` } onClick={ this.setDate('prevYear') }></a>
                      <a className={ `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-prev-month` } onClick={ this.setDate('prevMonth') }></a>
                      <span className={ `${ sprefix }-datePick-selected` }>
                          <a className={ `${ sprefix }-datePick-selected-year` }>{ value.getFullYear() }</a>
                          <span>-</span>
                          <a className={ `${ sprefix }-datePick-selected-month` }>{ value.getMonth() }</a>
                      </span>
                      <a className={ `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-next-month` } onClick={ this.setDate('nextMonth') }></a>
                      <a className={ `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-next-year` } onClick={ this.setDate('nextYear') }></a>
                  </div>
              </div>
              <div className={ `${ sprefix }-datePick-menu-center` }>
                  <table border="0" cellPadding="0" cellSpacing="0">
                      <thead>
                          <tr>
                              <th>
                                  <span>日</span>
                              </th>
                              <th>
                                  <span>一</span>
                              </th>
                              <th>
                                  <span>二</span>
                              </th>
                              <th>
                                  <span>三</span>
                              </th>
                              <th>
                                  <span>四</span>
                              </th>
                              <th>
                                  <span>五</span>
                              </th>
                              <th>
                                  <span>六</span>
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          { row }
                      </tbody>
                  </table>
              </div>
              <div className={ `${ sprefix }-datePick-menu-footer` }>
                确定
              </div>
          </div>
      );
      return (
          <Dropdown
              sprefix={ `${ sprefix }-datePick` }
              menu={ menu }
              width={ 'auto' }
              visible={ this.state.visible }
              onPopupVisibleChange={ this.onPopupVisibleChange }
              trigger={ "click" }
          >
              <div className={ cls.join(' ') }>
                  <input className={ `${ sprefix }-input ${ sprefix }-datePick-input` } value={ inputValue } onChange={ this.handleChange }/>
                  <span className={ `${ sprefix }-datePick-arrow` } unselectable="on">
                      <i className={ `${ sprefix }-datePick-arrow-icon` }>
                          <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="calendar" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                              <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
                          </svg>
                      </i>
                  </span>
              </div>
          </Dropdown>
      );
  }
}
export default DatePick;
