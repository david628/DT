import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from "../Dropdown";
import DateList from './DateList';
import DateUtil from "./DateUtil";
class DatePicker extends Component {
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
        format: 'YYYY/MM/DD',
        placeholder: '请选择日期',
        type: 'default'
    };
    constructor(props) {
        super(props);
        let value = props.value || props.defaultValue;
        this.state = {
            visible: false,
            value
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if('value' in nextProps) {
            const { value } = nextProps;
            this.setState({
                value
            });
        }
    }
    componentDidUpdate() {

    }
    onPopupVisibleChange = (visible) => {
        this.setState({
            visible
        });
    };
    onChange = (v, dateType, visible) => {
        const props = this.props;
        const is = !!visible;
        if(!('value' in props)) {
            this.setState({
                value: v
            });
            this.onPopupVisibleChange(is);
        }
        if(props.onChange) {
            let ret = props.onChange(v);
            if(!ret) {
                this.onPopupVisibleChange(is);
            }
        }
    }
    static dateFormat(v, format) {
        return DateUtil.dateFormat(v, format);
    }
    handleChange = (e) => {

    }
    render() {
        const { props, state } = this;
        const { sprefix, format, type, placeholder } = props;
        let value = state.value,
        cls = [`${ sprefix }-datePick`],
        inputValue = DatePicker.dateFormat(value, format);
        //if(state.visible) {
            //cls.push(`${ sprefix }-datePick-open`);
            //cls.push(`${ sprefix }-datePick-focused`);
        //}
        return (
            <Dropdown
                sprefix={ `${ sprefix }-datePick` }
                menu={
                    <div className={ `${ sprefix }-datePick-wrap` }>
                        <DateList
                            sprefix={ sprefix }
                            format={ format }
                            defaultType={ type }
                            value={ value }
                            onChange={ this.onChange }
                            //footer={ <div>Today</div> }
                        ></DateList>
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
export default DatePicker;
