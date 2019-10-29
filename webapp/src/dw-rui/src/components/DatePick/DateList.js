import React, { Component } from 'react';
import PropTypes from 'prop-types';
class DateList extends Component {
    static propTypes = {
        defaultValue: PropTypes.any,
        value: PropTypes.any,
        format: PropTypes.string,
        type: PropTypes.string,
        onChange: PropTypes.func
    };
    static defaultProps = {
        sprefix: 'dwrui',
        format: 'YYYY/MM/DD',
        type: 'all'
    };
    constructor(props) {
        super(props);
        const value = new Date(props.value || props.defaultValue);
        this.state = {
            visible: false,
            curDate: value,
            value
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if('value' in nextProps) {
            const { value } = nextProps;
            let v = new Date(value);
            this.setState({
                value: v
                //curDate: v
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
    static dateFormat(date, format) {
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
        }
        if(props.onChange) {
            props.onChange(v);
        }
    }
    setDate = (type) => {
        return (e) => {
            const { curDate } = this.state;
            let v;
            if(type === 'prevYear') {
                v = new Date(curDate.getFullYear() - 1, curDate.getMonth(), curDate.getDate());
            } else if(type === 'prevMonth') {
                v = new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate());
            } else if(type === 'nextMonth') {
                v = new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate());
            } else if(type === 'nextYear') {
                v = new Date(curDate.getFullYear() + 1, curDate.getMonth(), curDate.getDate());
            }
            this.setState({
                curDate: v
            });
        }
    }
    setType = (type) => {
        return (e) => {
            this.setState({
                type
            });
        }
    }
    render() {
        const { sprefix } = this.props;
        const { type, curDate, value } = this.state;
        const arr = this.getPervMonthLastDays(curDate);
        let row = [], k = 0;
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
        return (
            <div className={ `${ sprefix }-datePick-menu` }>
                <div className={ `${ sprefix }-datePick-menu-header` }>
                    <div className={ `${ sprefix }-datePick-menu-header-inner` }>
                        <a className={ `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-prev-year` } onClick={ this.setDate('prevYear') }></a>
                        <a className={ `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-prev-month` } onClick={ this.setDate('prevMonth') }></a>
                        <span className={ `${ sprefix }-datePick-selected` }>
                          <a className={ `${ sprefix }-datePick-selected-year` } onClick={ this.setType('year') }>{ curDate.getFullYear() }</a>
                          <span>-</span>
                          <a className={ `${ sprefix }-datePick-selected-month` } onClick={ this.setType('month') }>{ curDate.getMonth() + 1 }</a>
                      </span>
                        <a className={ `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-next-month` } onClick={ this.setDate('nextMonth') }></a>
                        <a className={ `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-next-year` } onClick={ this.setDate('nextYear') }></a>
                    </div>
                    <div className={ `${ sprefix }-datePick-menu-panel` }>Year</div>
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
                    { this.props.footer }
                </div>
            </div>
        );
    }
}
export default DateList;
