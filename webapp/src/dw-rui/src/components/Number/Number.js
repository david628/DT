import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Number extends Component {
    static propTypes = {
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        min: PropTypes.number,
        max: PropTypes.number,
        precision: PropTypes.number,
        step: PropTypes.number,
        unit: PropTypes.string,
        name: PropTypes.string,
        disabled: PropTypes.bool
    };
    static defaultProps = {
        sprefix: 'dwrui',
        placeholder: 'Input...',
        onChange: function() {},
        min: -30000,
        max: 30000,
        precision: 2,
        step: 1,
        unit: '',
        name: '',
        disabled: false
    };
    constructor(props) {
        super(props);
        const value = props.value || props.defaultValue;
        this.state = {
            value
            //inputText
        };
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if('value' in nextProps) {
            const { value } = nextProps;
            if(value !== this.props.value) {
                this.setState({
                    value
                });
            }
        }    
    }
    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate', prevProps);
        //const { value } = this.props;
        // if(prevProps) {
        //     if(prevProps.value !== value) {
        //         this.setState({
        //             value
        //         });
        //     }
        // }
    }
    handleAdd = e => {
        const { value } = this.state;
        const { disabled, step } = this.props;
        if(disabled) {
            return;
        }
        this.setState({
            value: parseFloat(value, 10) + step
        });
    };
    handleReduce = e => {
        const { value } = this.state;
        const { disabled, step } = this.props;
        if(disabled) {
            return;
        }
        this.setState({
            value: parseFloat(value, 10) - step
        });
    };
    handleMouseDown = e => {
        // e.preventDefault();
        // const { disabled } = this.props;
        // if(disabled) {
        //     return;
        // }
        // this.distance = 0;
        // this.isMove = true;
        // this.prevPointer = [e.clientX, e.clientY];
        // this.onMouseDownValue = this.state.value;
        // document.addEventListener('mousemove', this.handleMouseMove, false);
        // document.addEventListener('mouseup', this.handleMouseUp, false);
    };
    handleMouseMove = e => {
        //this.pointer = [e.clientX, e.clientY];
        // this.prevPointer = [e.clientX, e.clientY];
        // this.distance = this.prevPointer[0] - this.prevPointer[1];
        // let value = this.onMouseDownValue + (this.distance / (e.shiftKey ? 5 : 5)) * this.props.step;
        // console.log(this.onMouseDownValue, this.distance);
        // value = Math.min(this.props.max, Math.max(this.props.min, value));
        // this.setState({
        //     value
        // });
    };
    handleMouseUp = e => {
        //document.removeEventListener('mousemove', this.handleMouseMove, false);
        //document.removeEventListener('mouseup', this.handleMouseUp, false);
    };
    handleChange = e => {
        let value = e.target.value;
        if(!('value' in this.props)) {
            this.setState({
                value
            });
        }
        this.props.onChange(value);
    };
    handleBlur = e => {
        console.log('handleBlur...');
        const { value } = this.state;
        const inputText = this.getInputText(value);
        //console.log('inputText', inputText);
        this.setState({
            value: inputText
        });
    };
    getInputText(v) {
        let value = (typeof v === 'string' ? v.trim() : v), inputText;
        if(value === '') {
            //inputText = value + ' ' + this.props.unit;
            inputText = value;
        } else if(value !== undefined) {
            if(isNaN(value)) {
                value = 0;       
            } else {
                value = parseFloat(value, 10);
            }
            if(value < this.props.min) {
                value = this.props.min;
            }
            if(value > this.props.max) {
                value = this.max;
            }
            //inputText = value.toFixed(this.props.precision < 0 ? 0 : this.props.precision) + this.props.unit;
            inputText = value.toFixed(this.props.precision < 0 ? 0 : this.props.precision);
        }
        return inputText;
    }
    render() {
        const { value } = this.state;
        const { sprefix, placeholder } = this.props;
        const cls = [`${ sprefix }-number`];
        const inputText = this.getInputText(value);
        //const inputText = value;
        return (
            <div className={ cls } onMouseDown={ this.handleMouseDown }>
                <input className={ `${ sprefix }-number-hidden` } value={ value } type="hidden"/>
                <input className={ `${ sprefix }-number-input` } 
                    placeholder={ placeholder }
                    value={ inputText }
                    onChange={ this.handleChange }
                    //onBlur={ this.handleBlur }
                    type="text"
                />
                <div className={ `${ sprefix }-number-oper-wrap` }>
                    <span className={ `${ sprefix }-number-oper ${ sprefix }-number-add` } onClick={ this.handleAdd }></span>
                    <span className={ `${ sprefix }-number-oper ${ sprefix }-number-reduce` } onClick={ this.handleReduce }></span>
                </div>
            </div>
        );
    }
}
export default Number;
