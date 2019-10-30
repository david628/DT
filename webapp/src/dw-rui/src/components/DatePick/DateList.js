import React, { Component } from 'react';
import PropTypes from 'prop-types';
class DateList extends Component {
    static propTypes = {
        defaultValue: PropTypes.any,
        value: PropTypes.any,
        format: PropTypes.string,
        defaultType: PropTypes.string,
        type: PropTypes.string,
        onChange: PropTypes.func
    };
    static defaultProps = {
        sprefix: 'dwrui',
        format: 'YYYY/MM/DD'
    };
    constructor(props) {
        super(props);
        const value = new Date(props.value || props.defaultValue);
        let type = props.type || props.defaultType;
        if(!type) {
            type = 'all';
        }
        this.state = {
            visible: false,
            curDate: value,
            value,
            type
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
        if(!('type' in props)) {
            this.setState({
                type: 'all'
            });
        }
        if(props.onChange) {
            props.onChange(v);
        }
    }
    setDate = (t) => {
        return (e) => {
            const { type, curDate } = this.state;
            let v, increment = type === 'year' ? 10 : 1;
            if(t === 'prevYear') {
                v = new Date(curDate.getFullYear() - increment, curDate.getMonth(), curDate.getDate());
            } else if(t === 'prevMonth') {
                v = new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate());
            } else if(t === 'nextMonth') {
                v = new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate());
            } else if(t === 'nextYear') {
                v = new Date(curDate.getFullYear() + increment, curDate.getMonth(), curDate.getDate());
            }
            this.setState({
                curDate: v
            });
        }
    }
    setYear(year) {
        return (e) => {
            const { curDate, value } = this.state;
            const month = value.getMonth(), day = value.getDate(), newDay = this.getDaysOfMonth(year, month);
            const date = new Date(year, month, day < newDay ? day : newDay);
            this.setState({
                curDate: date
            });
            this.onChange(date);
        }
    }
    setMonth(month) {
        return (e) => {
            const { curDate, value } = this.state;
            const year = value.getFullYear(), day = value.getDate(), newDay = this.getDaysOfMonth(year, month);
            const date = new Date(curDate.getFullYear(), month, day < newDay ? day : newDay);
            this.setState({
                curDate: date
            });
            this.onChange(date);
        }
    }
    setType = (type) => {
        return (e) => {
            this.setState({
                type: type === this.state.type ? 'all' : type
            });
        }
    }
    getYearPanel() {
        const { sprefix } = this.props;
        const { value, curDate } = this.state;
        const curYear = value.getFullYear();
        const year = curDate.getFullYear();
        let startYear = parseInt(year / 10, 10) * 10 - 1;
        if(startYear < 0) {
            startYear = 0;
        }
        let rs = [];
        for(let i = 0; i < 12; i += 3) {
            rs.push(
                <tr key={ 'month-' + i }>
                    <td title={ startYear + i } className={ startYear + i === curYear ? `${ sprefix }-datePick-menu-panel-cell ${ sprefix }-datePick-menu-panel-cell-selected` : `${ sprefix }-datePick-menu-panel-cell` }>
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setYear(startYear + i) }>{ startYear + i }</a>
                    </td>
                    <td title={ startYear + i + 1 } className={ startYear + i + 1 === curYear ? `${ sprefix }-datePick-menu-panel-cell ${ sprefix }-datePick-menu-panel-cell-selected` : `${ sprefix }-datePick-menu-panel-cell` }>
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setYear(startYear + i + 1) }>{ startYear + i + 1 }</a>
                    </td>
                    <td title={ startYear + i + 2 } className={ startYear + i + 2 === curYear ? `${ sprefix }-datePick-menu-panel-cell ${ sprefix }-datePick-menu-panel-cell-selected` : `${ sprefix }-datePick-menu-panel-cell` }>
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setYear(startYear + i + 2) }>{ startYear + i + 2 }</a>
                    </td>
                </tr>
            )
        }
        return (
            <table className={ `${ sprefix }-datePick-menu-panel-table` } border="0" cellPadding="0" cellSpacing="0">
                <tbody className={ `${ sprefix }-datePick-menu-panel-tbody` }>
                { rs }
                </tbody>
            </table>
        );
    }
    getMonthPanel() {
        const { sprefix } = this.props;
        const { value, curDate } = this.state;
        const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        const rs = [];
        let month = -1;
        if(value.getFullYear() === curDate.getFullYear() && value.getMonth() === curDate.getMonth()) {
            month = value.getMonth();
        }
        for(let i = 0; i < months.length; i += 3) {
            rs.push(
                <tr key={ 'month-' + i }>
                    <td title={ months[i] } className={ i === month ? `${ sprefix }-datePick-menu-panel-cell ${ sprefix }-datePick-menu-panel-cell-selected` : `${ sprefix }-datePick-menu-panel-cell` }>
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setMonth(i) }>{ months[i] }</a>
                    </td>
                    <td title={ months[i + 1] } className={ i + 1 === month ? `${ sprefix }-datePick-menu-panel-cell ${ sprefix }-datePick-menu-panel-cell-selected` : `${ sprefix }-datePick-menu-panel-cell` }>
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setMonth(i + 1) }>{ months[i + 1] }</a>
                    </td>
                    <td title={ months[i + 2] } className={ i + 2 === month ? `${ sprefix }-datePick-menu-panel-cell ${ sprefix }-datePick-menu-panel-cell-selected` : `${ sprefix }-datePick-menu-panel-cell` }>
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setMonth(i + 2) }>{ months[i + 2] }</a>
                    </td>
                </tr>
            )
        }
        return (
            <table className={ `${ sprefix }-datePick-menu-panel-table` } border="0" cellPadding="0" cellSpacing="0">
                <tbody className={ `${ sprefix }-datePick-menu-panel-tbody` }>
                    { rs }
                </tbody>
            </table>
        );
    }
    render() {
        const { sprefix } = this.props;
        const { type, curDate, value } = this.state;
        const arr = this.getPervMonthLastDays(curDate);
        let row = [], k = 0, yearPanelCls = [`${ sprefix }-datePick-menu-panel`], monthPanelCls = [`${ sprefix }-datePick-menu-panel`];
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
        if(type !== 'year') {
            yearPanelCls.push(`${ sprefix }-datePick-menu-hidden`);
        }
        if(type !== 'month') {
            monthPanelCls.push(`${ sprefix }-datePick-menu-hidden`);
        }
        return (
            <div className={ `${ sprefix }-datePick-menu` }>
                <div className={ `${ sprefix }-datePick-menu-header` }>
                    <div className={ `${ sprefix }-datePick-menu-header-inner` }>
                        <a className={ `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-prev-year` } onClick={ this.setDate('prevYear') }></a>
                        <a className={ type !== 'all' ? `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-prev-month ${ sprefix }-datePick-menu-hidden` : `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-prev-month` } onClick={ this.setDate('prevMonth') }></a>
                        <span className={ `${ sprefix }-datePick-selected` }>
                            <a title="选择年份" className={ `${ sprefix }-datePick-selected-year` } onClick={ this.setType('year') }>{ curDate.getFullYear() }</a>
                            <span>-</span>
                            <a title="选择月份" className={ `${ sprefix }-datePick-selected-month` } onClick={ this.setType('month') }>{ curDate.getMonth() + 1 }</a>
                        </span>
                        <a className={ type !== 'all' ? `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-next-month ${ sprefix }-datePick-menu-hidden` : `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-next-month` } onClick={ this.setDate('nextMonth') }></a>
                        <a className={ `${ sprefix }-datePick-header-btn ${ sprefix }-datePick-next-year` } onClick={ this.setDate('nextYear') }></a>
                    </div>
                    <div className={ yearPanelCls.join(' ') }>
                        { this.getYearPanel() }
                    </div>
                    <div className={ monthPanelCls.join(' ') }>
                        { this.getMonthPanel() }
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
                    { this.props.footer }
                </div>
            </div>
        );
    }
}
export default DateList;
