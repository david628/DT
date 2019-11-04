import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from "../Dropdown";
import DateList from './DateList';
import DateUtil from "./DateUtil";
class RangePicker extends Component {
    static propTypes = {
        defaultValue: PropTypes.any,
        value: PropTypes.any,
        type: PropTypes.string,
        format: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func
    };
    static defaultProps = {
        sprefix: 'dwrui',
        placeholder: '请选择日期',
        format: 'YYYY/MM/DD',
        type: 'default'
    };
    constructor(props) {
        super(props);
        let value = props.value || props.defaultValue;
        value = value || [];
        let dateState = this.getDateState(value);
        this.state = {
            visible: false,
            select: [],
            ...dateState
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if('value' in nextProps) {
            const { value } = nextProps;
            let dateState = this.getDateState(value);
            this.setState({
                ...dateState
            });
        }
    }
    componentDidUpdate() {

    }
    getDateState(value) {
        let start = value[0] || null, end = value[1] || null, rs;
        if((start === null || start === undefined) && (end === null || end === undefined)) {
            let current = new Date();
            rs = {
                start: null,
                end: null,
                startCurDate: current,
                endCurDate: new Date(current.getFullYear(), current.getMonth() + 1, current.getDate(), 0, 0, 0),
                startRange: [null, null],
                endRange: [null, null]
            };
        } else if((start === null || start === undefined) && end) {
            rs = {
                start: end,
                end: null,
                startCurDate: end,
                endCurDate: new Date(end.getFullYear(), end.getMonth() + 1, end.getDate(), end.getHours(), end.getMinutes(), end.getSeconds()),
                startRange: [end, null],
                endRange: [end, null]
            };
        } else if(start && (end === null || end === undefined)) {
            rs = {
                start: start,
                end: null,
                startCurDate: start,
                endCurDate: new Date(start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds()),
                startRange: [start, null],
                endRange: [start, null]
            };
        } else {
            rs = {
                start: start,
                end: end,
                startCurDate: start,
                endCurDate: end,
                startRange: [start, end],
                endRange: [start, end]
            };
            if(DateUtil.eq(start, end, 'month')) {
                rs.endCurDate = new Date(start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds());
            } else if(DateUtil.isAfter(start, end, 'month')) {
                rs.start = end;
                rs.end = start;
                rs.startCurDate = end;
                rs.endCurDate = start;
            }
        }
        rs.inputValue = DateUtil.dateFormat(rs.start, this.props.format) + ' ~ ' + DateUtil.dateFormat(rs.end, this.props.format);
        return rs;
    }
    onPopupVisibleChange = (visible) => {
        this.setState({
            visible
        });
    };
    setInputValue(sd) {
        this.setState({
            inputValue: DateUtil.dateFormat(sd[0], this.props.format) + ' ~ ' + DateUtil.dateFormat(sd[1], this.props.format)
        });
    }
    onChange = (v, eventType, visible) => {
        const props = this.props;
        const { select } = this.state;
        const is = !!visible;
        let sd = [];
        if(eventType === 'day') {
            if(select.length >= 2) {
                sd = [v];
            } else {
                sd = this.arrAdd(select, v);
                if(sd.length >= 2) {
                    this.setInputValue(sd);
                }
            }
            this.setState({
                select: sd
            });
        }
        //console.log(`sd`, sd);
        if(!('value' in props)) {
            //console.log('value', v);
            this.setState({
                startRange: sd,
                endRange: sd
            });
            //this.onPopupVisibleChange(is);
        }
        if(props.onChange) {
            let ret = props.onChange(v);
            if(!ret) {
                //this.onPopupVisibleChange(is);
            }
        }
    }
    onLeftChange = (v, eventType, visible) => {
        this.onChange(v, eventType, visible);
    }
    onRightChange = (v, eventType, visible) => {
        this.onChange(v, eventType, visible);
    }
    arrAdd(list, value) {
        const clone = list.slice();
        if (clone.indexOf(value) === -1) {
            clone.push(value);
        }
        return clone.sort(function(a, b) {
            return a.getTime() - b.getTime()
        });
    }
    static dateFormat(v, format) {
        return DateList.dateFormat(v, format);
    }
    onStartPanelChange = (curDate) => {
        const { endCurDate } = this.state;
        let s = curDate, e = endCurDate;
        if(DateUtil.eq(curDate, endCurDate, 'month')) {
            s = curDate;
            e = new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate(), curDate.getHours(), curDate.getMinutes(), curDate.getSeconds());
        } else if(DateUtil.isAfter(s, e, 'month')) {
            s = endCurDate;
            e = curDate;
        }
        this.setState({
            startCurDate: s,
            endCurDate: e
        });
    }
    onEndPanelChange = (curDate) => {
        const { startCurDate } = this.state;
        let s = startCurDate, e = curDate;
        if(DateUtil.eq(curDate, startCurDate, 'month')) {
            s = curDate;
            e = new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate(), curDate.getHours(), curDate.getMinutes(), curDate.getSeconds());
        } else if(DateUtil.isAfter(s, e, 'month')) {
            s = curDate;
            e = startCurDate;
        }
        this.setState({
            startCurDate: s,
            endCurDate: e
        });
    }
    handleChange = (e) => {

    }
    onMouseEnter = (e, current) => {
        //console.log(current);
    }
    render() {
        const { props, state } = this;
        const { sprefix, format, placeholder } = props;
        const { startRange, endRange, startCurDate, endCurDate, inputValue } = state;
        let cls = [`${ sprefix }-datePick`];
        //if(state.visible) {
        //cls.push(`${ sprefix }-datePick-open`);
        //cls.push(`${ sprefix }-datePick-focused`);
        //}
        return (
            <Dropdown
                sprefix={ `${ sprefix }-datePick` }
                menu={
                    <div className={ `${ sprefix }-datePick-wrap` }>
                        <div className={ `${ sprefix }-datePick-range` }>
                            <div className={ `${ sprefix }-datePick-range-left` }>
                                <DateList
                                    sprefix={ sprefix }
                                    format={ format }
                                    range={ startRange }
                                    curDate={ startCurDate }
                                    onChange={ this.onLeftChange }
                                    onMouseEnter={ this.onMouseEnter }
                                    onPanelChange={ this.onStartPanelChange }
                                    max={ endCurDate }
                                    //footer={ <div>&nbsp;</div> }
                                ></DateList>
                            </div>
                            <div className={ `${ sprefix }-datePick-range-right` }>
                                <DateList
                                    sprefix={ sprefix }
                                    format={ format }
                                    range={ endRange }
                                    curDate={ endCurDate }
                                    onChange={ this.onRightChange }
                                    onMouseEnter={ this.onMouseEnter }
                                    onPanelChange={ this.onEndPanelChange }
                                    min={ startCurDate }
                                    //footer={ <div>&nbsp;</div> }
                                ></DateList>
                            </div>
                        </div>
                    </div>
                }
                width={ 'auto' }
                visible={ this.state.visible }
                onPopupVisibleChange={ this.onPopupVisibleChange }
                trigger={ "click" }
            >
                <div className={ cls.join(' ') }>
                    <input className={ `${ sprefix }-input ${ sprefix }-datePick-input` } value={ inputValue } placeholder={ placeholder } onChange={ this.handleChange }/>
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
export default RangePicker;
