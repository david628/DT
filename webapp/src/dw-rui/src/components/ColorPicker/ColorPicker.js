import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from "../Dropdown";
import ColorPanel from "./ColorPanel";

class ColorPicker extends Component {
    static propTypes = {
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        //type: PropTypes.string,
        //placeholder: PropTypes.string,
        onChange: PropTypes.func
    };
    static defaultProps = {
        sprefix: 'dwrui'
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
    onChange = v => {
        const props = this.props;
        const { value } = this.state;
        if(v !== value) {
            if(!('value' in props)) {
                this.setState({
                    value: v
                });
                //this.onPopupVisibleChange(false);
            }
            if(props.onChange) {
                let ret = props.onChange(v);
                //if(!ret) {
                    //this.onPopupVisibleChange(false);
                //}
            }
        }
    }
    render() {
        const { value, visible } = this.state;
        const { sprefix } = this.props;
        const cls = [`${ sprefix }-colorPicker-wrap`];
        return (
            <Dropdown
                sprefix={ `${ sprefix }-colorPicker` }
                //menu={ <ColorPanel defaultValue={ '#00B7EE' }></ColorPanel> }
                //menu={ <ColorPanel defaultValue={ 'radial-gradient(at center center, rgba(214,0,0,0.1) 4.09836%,rgba(0,37,104,0.5) 11.4754%, #00B7EE 33.1967%,rgb(98,52,0) 56.5574%,rgb(93,0,15) 71.7213%,rgba(74,20,140,1) 92.623%)' }></ColorPanel> }
                menu={
                    <ColorPanel
                        value={ value }
                        onChange={ this.onChange }
                    ></ColorPanel>
                }
                width={ 'auto' }
                visible={ visible }
                onPopupVisibleChange={ this.onPopupVisibleChange }
                trigger={ "click" }
            >
                <div className={ cls.join(' ') }>
                    <div className={ `${ sprefix }-colorPicker-content` } style={{
                        background: value
                    }}></div>
                    <span className={ `${ sprefix }-colorPicker-arrow` } unselectable="on">
                        <i className={ `${ sprefix }-colorPicker-arrow-icon` }>
                            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="bg-colors" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M766.4 744.3c43.7 0 79.4-36.2 79.4-80.5 0-53.5-79.4-140.8-79.4-140.8S687 610.3 687 663.8c0 44.3 35.7 80.5 79.4 80.5zm-377.1-44.1c7.1 7.1 18.6 7.1 25.6 0l256.1-256c7.1-7.1 7.1-18.6 0-25.6l-256-256c-.6-.6-1.3-1.2-2-1.7l-78.2-78.2a9.11 9.11 0 0 0-12.8 0l-48 48a9.11 9.11 0 0 0 0 12.8l67.2 67.2-207.8 207.9c-7.1 7.1-7.1 18.6 0 25.6l255.9 256zm12.9-448.6l178.9 178.9H223.4l178.8-178.9zM904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8z"></path>
                            </svg>
                        </i>
                    </span>
                </div>
            </Dropdown>
        );
    }
}
export default ColorPicker;
