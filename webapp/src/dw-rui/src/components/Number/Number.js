import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Number extends Component {
    static propTypes = {
        defaultValue: PropTypes.string,
        value: PropTypes.number,
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
        precision: 0,
        step: 1,
        unit: '',
        name: '',
        disabled: false
    };
    constructor(props) {
        super(props);
        const value = props.value || props.defaultValue;
        // const step = props.step;
        // const min = props.min;
        // const max = props.max;
        // const unit = props.unit;
        // const precision = props.precision;
        // const disabled = props.disabled;
        this.state = {
            value
            // step,
            // min,
            // max,
            // unit,
            // precision,
            // disabled
        };
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        // if('value' in nextProps) {
        //     const { value } = nextProps;
        //     this.setState({
        //         value
        //     });
        // }
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
    onChange = v => {
        const props = this.props;
        const { value } = this.state;
        
    }
    handleAdd = e => {
        const { disabled, value, step } = this.state;
        if(disabled) {
            return;
        }
        this.setState({
            value: value + step
        });
    };
    handleReduce = e => {
        const { disabled, value, step } = this.state;
        if(disabled) {
            return;
        }
        console.log(value, step);
        this.setState({
            value: value - step
        });
    };
    handleMouseDown = e => {
        //e.preventDefault();

    };
    handleChange = e => {
        this.setState({
            value: e.target.value
        });
    };
    render() {
        const { value } = this.state;
        const { sprefix, placeholder } = this.props;
        const cls = [`${ sprefix }-number`];
        return (
            <div className={ cls } onMouseDown={ this.handleMouseDown }>
                <input className={ `${ sprefix }-number-hidden` } value={ value } type="hidden"/>
                <input className={ `${ sprefix }-number-input` } 
                    placeholder={ placeholder }
                    value={ value } 
                    onChange={ this.handleChange }
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
