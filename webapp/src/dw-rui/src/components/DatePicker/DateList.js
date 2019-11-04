import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import DateUtil from './DateUtil';
class DateList extends Component {
    static propTypes = {
        defaultRange: PropTypes.any,
        range: PropTypes.any,
        defaultMin: PropTypes.any,
        min: PropTypes.any,
        defaultMax: PropTypes.any,
        max: PropTypes.any,
        defaultCurDate: PropTypes.any,
        curDate: PropTypes.any,
        defaultValue: PropTypes.any,
        value: PropTypes.any,
        showTime: PropTypes.bool,
        format: PropTypes.string,
        defaultType: PropTypes.string,
        type: PropTypes.string,
        onChange: PropTypes.func,
        onPanelChange: PropTypes.func,
        onMouseEnter: PropTypes.func
    };
    static defaultProps = {
        sprefix: 'dwrui',
        showTime: true,
        format: 'YYYY/MM/DD',
        onMouseEnter: function() {}
    };
    constructor(props) {
        super(props);
        let range = props.range || props.defaultRange;
        let value = props.value || props.defaultValue;
        let curDate = props.curDate || props.defaultCurDate;
        let min = props.min || props.defaultMin;
        let max = props.max || props.defaultMax;
        if(!value) {
            value = null;
            if(!curDate) {
                curDate = new Date();
                curDate.setHours(0);
                curDate.setMinutes(0);
                curDate.setSeconds(0);
            }
        } else {
            if(!curDate) {
                curDate = this.checkDate(value) ? value : new Date();
            }
        }
        let type = props.type || props.defaultType;
        if(!type) {
            type = 'default';
        }
        //console.log('value', value, 'curDate', curDate);
        this.state = {
            visible: false,
            min,
            max,
            range,
            curDate,
            value,
            type
        }

    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        if('value' in nextProps) {
            const { value } = nextProps;
            this.setValue(value);
        }
        if('range' in nextProps) {
            const { range } = nextProps;
            this.setState({
                range
            });
        }
        if('curDate' in nextProps) {
            const { curDate } = nextProps;
            this.setState({
                curDate
            });
        }
        if('min' in nextProps) {
            const { min } = nextProps;
            this.setState({
                min
            });
        }
        if('max' in nextProps) {
            const { max } = nextProps;
            this.setState({
                max
            });
        }
    }
    componentDidUpdate() {
        const { value, curDate } = this.state;
        const _value = value || curDate;
        this.scroll(_value.getHours(), this._h);
        this.scroll(_value.getMinutes(), this._m);
        this.scroll(_value.getSeconds(), this._s);
    }
    checkDate(value) {
        if(!value) {
            return false;
        }
        return value != 'Invalid Date';
    }
    setValue(value) {
        this.setState({
            value: !value ? null : value
        });
    }
    submit = (e) => {
        const props = this.props;
        if(props.submit) {
            props.submit();
        }
        //if(props.onChange) {
            //props.onChange(this.state.value);
        //}
    }
    onClick = (item) => {
        return e => {
            this.onChange(item.value, 'day');
        }
    }
    onChange = (v, dateType, visible) => {
        const props = this.props;
        if(!('value' in props)) {
            this.setValue(v);
        }
        if(props.onChange) {
            props.onChange(v, dateType, visible);
        }
    }
    setCurDate(curDate) {
        if(!('curDate' in this.props)) {
            this.setState({
                curDate
            });
        }
        if(this.props.onPanelChange) {
            this.props.onPanelChange(curDate);
        }
    }
    setDate = (t, value) => {
        return (e) => {
            const { type, curDate } = this.state;
            let v = DateUtil.getDateByPrevOrNext(curDate, t, type === 'year' ? 10 : 1, value);
            this.setCurDate(v);
        }
    }
    setYear(year, value) {
        return (e) => {
            const month = value.getMonth(), day = value.getDate(), newDay = DateUtil.getDaysOfMonth(year, month);
            const date = new Date(year, month, day < newDay ? day : newDay, value.getHours(), value.getMinutes(), value.getSeconds());
            this.setCurDate(date);
            this.setState({
                type: 'default'
            });
            this.onChange(date, 'year', true);
        }
    }
    setMonth(month, value) {
        return (e) => {
            const { curDate } = this.state;
            const year = value.getFullYear(), day = value.getDate(), newDay = DateUtil.getDaysOfMonth(year, month);
            const date = new Date(curDate.getFullYear(), month, day < newDay ? day : newDay, value.getHours(), value.getMinutes(), value.getSeconds());
            this.setCurDate(date);
            this.setState({
                type: 'default'
            });
            this.onChange(date, 'month', true);
        }
    }
    setType = (type) => {
        return (e) => {
            this.setState({
                type: type === this.state.type ? 'default' : type
            });
        }
    }
    saveH = (node) => {
        this._h = node;
    }
    saveM = (node) => {
        this._m = node;
    }
    saveS = (node) => {
        this._s = node;
    }
    scroll(v, node) {
        const list = ReactDom.findDOMNode(node);
        const top = list.children[v];
        list.parentNode.scrollTop = top.offsetTop;
    }
    getYearPanel(value) {
        const { sprefix } = this.props;
        const { curDate } = this.state;
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
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setYear(startYear + i, value) }>{ startYear + i }</a>
                    </td>
                    <td title={ startYear + i + 1 } className={ startYear + i + 1 === curYear ? `${ sprefix }-datePick-menu-panel-cell ${ sprefix }-datePick-menu-panel-cell-selected` : `${ sprefix }-datePick-menu-panel-cell` }>
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setYear(startYear + i + 1, value) }>{ startYear + i + 1 }</a>
                    </td>
                    <td title={ startYear + i + 2 } className={ startYear + i + 2 === curYear ? `${ sprefix }-datePick-menu-panel-cell ${ sprefix }-datePick-menu-panel-cell-selected` : `${ sprefix }-datePick-menu-panel-cell` }>
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setYear(startYear + i + 2, value) }>{ startYear + i + 2 }</a>
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
    getMonthPanel(value) {
        const { sprefix } = this.props;
        const { curDate } = this.state;
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
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setMonth(i, value) }>{ months[i] }</a>
                    </td>
                    <td title={ months[i + 1] } className={ i + 1 === month ? `${ sprefix }-datePick-menu-panel-cell ${ sprefix }-datePick-menu-panel-cell-selected` : `${ sprefix }-datePick-menu-panel-cell` }>
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setMonth(i + 1, value) }>{ months[i + 1] }</a>
                    </td>
                    <td title={ months[i + 2] } className={ i + 2 === month ? `${ sprefix }-datePick-menu-panel-cell ${ sprefix }-datePick-menu-panel-cell-selected` : `${ sprefix }-datePick-menu-panel-cell` }>
                        <a className={ `${ sprefix }-datePick-menu-panel-cell-link` } onClick={ this.setMonth(i + 2, value) }>{ months[i + 2] }</a>
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
    setHours(h, value) {
        return e => {
            const v = new Date(value.getFullYear(), value.getMonth(), value.getDate(), h, value.getMinutes(), value.getSeconds());
            this.onChange(v, 'hours', true);
        };
    }
    setMinutes(m, value) {
        return e => {
            const v = new Date(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), m, value.getSeconds());
            this.onChange(v, 'minutes', true);
        };
    }
    setSeconds(s, value) {
        return e => {
            const v = new Date(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes(), s);
            this.onChange(v, 'seconds', true);
        };
    }
    getTimePanel(value) {
        const { sprefix } = this.props;
        const hv = value.getHours(),
            mv = value.getMinutes(),
            sv = value.getSeconds(),
            h = [],
            m = [],
            s = [];
        let v;
        for(let i = 0; i < 60; i++) {
            v = i < 10 ? `0${ i }` : i;
            if(i < 24) {
                h.push(
                    <li onClick={ this.setHours(i, value) } className={ hv == i ? `${ sprefix }-datePick-time-col-item ${ sprefix }-datePick-time-col-item-selected` : `${ sprefix }-datePick-time-col-item` } key={ 'h' + i }>{ v }</li>
                );
            }
            m.push(
                <li onClick={ this.setMinutes(i, value) } className={ mv == i ? `${ sprefix }-datePick-time-col-item ${ sprefix }-datePick-time-col-item-selected` : `${ sprefix }-datePick-time-col-item` } key={ 'm' + i }>{ v }</li>
            );
            s.push(
                <li onClick={ this.setSeconds(i, value) } className={ sv == i ? `${ sprefix }-datePick-time-col-item ${ sprefix }-datePick-time-col-item-selected` : `${ sprefix }-datePick-time-col-item` } key={ 's' + i }>{ v }</li>
            );
        }
        return (
            <div className={`${ sprefix }-datePick-time`}>
                <div className={`${ sprefix }-datePick-time-inner`}>
                    <div className={`${ sprefix }-datePick-time-col`}>
                        <ul ref={ this.saveH }>{ h }</ul>
                    </div>
                    <div className={`${ sprefix }-datePick-time-col`}>
                        <ul ref={ this.saveM }>{ m }</ul>
                    </div>
                    <div className={`${ sprefix }-datePick-time-col`}>
                        <ul ref={ this.saveS }>{ s }</ul>
                    </div>
                </div>
            </div>
        );
    }
    onMouseEnter = (current) => {
        return (e) => {
            this.props.onMouseEnter(e, current);
        }
    }
    render() {
        const { sprefix, showTime, footer } = this.props;
        const { type, curDate, range, value, min, max } = this.state;
        const _value = this.checkDate(value) ? value : curDate;
        const arr = DateUtil.getPervMonthLastDays(curDate, _value);
        let row = [],
            k = 0,
            startValue,
            endValue,
            prevYearHandle = true,
            prevMonthHandle = true,
            nextMonthHandle = true,
            nextYearHandle = true,
            prevYearCls = [`${ sprefix }-datePick-header-btn`, `${ sprefix }-datePick-prev-year`],
            prevMonthCls = [`${ sprefix }-datePick-header-btn`, `${ sprefix }-datePick-prev-month`],
            nextMonthCls = [`${ sprefix }-datePick-header-btn`, `${ sprefix }-datePick-next-month`],
            nextYearCls = [`${ sprefix }-datePick-header-btn`, `${ sprefix }-datePick-next-year`],
            yearPanelCls = [`${ sprefix }-datePick-menu-panel`],
            monthPanelCls = [`${ sprefix }-datePick-menu-panel`],
            timePanelCls = [`${ sprefix }-datePick-time-panel`];
        if(range) {
            startValue = range[0];
            endValue = range[1];
        }
        for(let i = 1; i < 7; i++) {
            let cell = [];
            for(let j = 0; j < 7; j++) {
                let type = [`${ arr[k].type }`];
                if(DateUtil.eq(new Date(), arr[k].value, 'day')) {
                    type.push(`today`);
                }
                if(range) {
                    range.forEach(item => {
                        if(arr[k].type === 'curMonth' && this.checkDate(item) && DateUtil.eq(item, arr[k].value, 'day')) {
                            type.push(`selected`);
                        }
                    });
                    if(arr[k].type === 'curMonth' && (startValue !== null && startValue !== undefined) && (endValue !== null && endValue !== undefined)) {
                        if((startValue === null || startValue === undefined) && this.checkDate(endValue) && DateUtil.isBefore(arr[k].value, endValue, 'day')) {
                            type.push(`range`);
                        } else if((endValue === null || endValue === undefined) && this.checkDate(startValue) && DateUtil.isAfter(arr[k].value, startValue, 'day')) {
                            type.push(`range`);
                        } else if(DateUtil.isAfter(arr[k].value, startValue) && DateUtil.isBefore(arr[k].value, endValue, 'day')) {
                            type.push(`range`);
                        }
                    }
                } else {
                    if(this.checkDate(value) && DateUtil.eq(value, arr[k].value, 'day')) {
                        type.push(`selected`);
                    }
                }
                cell.push(<td key={ `${ i }-${ j }` } className={ type.join(' ') } onClick={ this.onClick(arr[k]) } onMouseEnter={ arr[k].disbaled ? null : this.onMouseEnter(arr[k]) }><div className={ `${ sprefix }-datePick-menu-text` }>{ arr[k].value.getDate() }</div></td>);
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
        if(type !== 'time') {
            timePanelCls.push(`${ sprefix }-datePick-menu-hidden`);
        }
        if(min && this.checkDate(min)) {
            if(!DateUtil.isBefore(min, new Date(curDate.getFullYear(), curDate.getMonth() - 1), 'month')) {
                prevMonthCls.push(`${ sprefix }-datePick-menu-disabled`);
                prevYearCls.push(`${ sprefix }-datePick-menu-disabled`);
                prevYearHandle = false;
                prevMonthHandle = false;
            }
        }
        if(max && this.checkDate(max)) {
            if(!DateUtil.isBefore(new Date(curDate.getFullYear(), curDate.getMonth() + 1), max, 'month')) {
                nextMonthCls.push(`${ sprefix }-datePick-menu-disabled`);
                nextYearCls.push(`${ sprefix }-datePick-menu-disabled`);
                nextMonthHandle = false;
                nextYearHandle = false;
            }
        }
        if(type !== 'default') {
            prevMonthCls.push(`${ sprefix }-datePick-menu-hidden`);
            nextMonthCls.push(`${ sprefix }-datePick-menu-hidden`);
        }
        return (
            <div className={ `${ sprefix }-datePick-menu` }>
                <div className={ `${ sprefix }-datePick-menu-header` }>
                    <div className={ `${ sprefix }-datePick-menu-header-inner` }>
                        <a className={ prevYearCls.join(' ') } onClick={ prevYearHandle ? this.setDate('prevYear', _value) : null }></a>
                        <a className={ prevMonthCls.join(' ') } onClick={ prevMonthHandle ? this.setDate('prevMonth', _value) : null }></a>
                        <span className={ `${ sprefix }-datePick-selected` }>
                            <a title="选择年份" className={ `${ sprefix }-datePick-selected-year` } onClick={  this.setType('year') }>{ curDate.getFullYear() }</a>
                            <span>-</span>
                            <a title="选择月份" className={ `${ sprefix }-datePick-selected-month` } onClick={  this.setType('month') }>{ curDate.getMonth() + 1 }</a>
                        </span>
                        <a className={ nextMonthCls.join(' ') } onClick={ nextMonthHandle ? this.setDate('nextMonth', _value) : null }></a>
                        <a className={ nextYearCls.join(' ') } onClick={ nextYearHandle ? this.setDate('nextYear', _value) : null }></a>
                    </div>
                    <div className={ yearPanelCls.join(' ') }>
                        { this.getYearPanel(_value) }
                    </div>
                    <div className={ monthPanelCls.join(' ') }>
                        { this.getMonthPanel(_value) }
                    </div>
                    {
                        showTime ? (
                            <div className={ timePanelCls.join(' ') }>
                                { this.getTimePanel(_value) }
                            </div>
                        ) : null
                    }
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
                {
                    footer ? footer : (
                        <div className={ `${ sprefix }-datePick-menu-footer-inner` }>
                            { showTime ? <a className={ `${ sprefix }-datePick-time` } onClick={ this.setType('time') }>选择时间</a> : null }
                            {/*<a className={ `${ sprefix }-datePick-submit` } onClick={ this.submit }>确定</a>*/}
                        </div>
                    )
                }
                </div>
            </div>
        );
    }
}
export default DateList;
