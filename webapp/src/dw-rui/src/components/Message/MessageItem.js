import React, { Component } from 'react';
import PropTypes from "prop-types";

class MessageItem extends Component {
    static propTypes = {
        sprefix: PropTypes.string,
        isAimated: PropTypes.bool,
        enterCls: PropTypes.string,
        leaveCls: PropTypes.string,
        closable: PropTypes.bool,
        duration: PropTypes.number,
        onClose: PropTypes.func
    };
    static defaultProps = {
        sprefix: 'dldh',
        isAimated: true,
        enter: 'moveUpIn',
        leave: 'moveUpOut',
        closable: true,
        duration: 3,
        onClose: () => {}
    };
    constructor(props) {
        super(props);
        let visible = !!props.defaultVisible;
        if ('visible' in props) {
            visible = !!props.visible;
        }
        this.state = {
            visible
        };
    }
    componentDidMount() {
        this.startTimer();
    }
    componentWillReceiveProps(nextProps) {

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.duration !== prevProps.duration) {
            this.restartTimer();
        }
    }
    componentWillUnmount() {
        this.clearTimer();
    }
    startTimer = () => {
        if (this.props.duration) {
            this.timer = setTimeout(() => {
                this.close();
            }, this.props.duration * 1000);
        }
    }
    clearTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    restartTimer() {
        this.clearTimer();
        this.startTimer();
    }
    close = e => {
        const props = this.props;
        props.onClose(e);
    }
    getCls(is) {
        const { sprefix, isAimated, enter, leave } = this.props;
        let rs = [`${ sprefix }-message-item-inner`];
        if(is) {
            rs.push(`${ sprefix }-message-open`);
            if(isAimated) {
                rs.push(`animated`);
            }
            rs.push(`${ enter }`);
        } else {
            rs.push(`${ sprefix }-message-hidden`);
            if(isAimated) {
                rs.push(`animated`);
            }
            rs.push(`${ leave }`);
        }
        return rs.join(' ');
    }
    render() {
        //const { visible, items } = this.state;
        const props = this.props;
        return (
            <div
                className={ props.sprefix + "-message-item" }
                onMouseLeave={ this.startTimer }
                onMouseEnter={ this.clearTimer }
                onClick={ props.onClick }
            >
                <div className={ this.getCls(this.state.visible) }>
                    <div className={ `${ props.sprefix }-message-content` }>
                        <i className={ `${ props.sprefix }-message-icon ${ props.sprefix }-message-success` } style={{ display: 'none' }}>
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
                            </svg>
                        </i>
                        <i className={ `${ props.sprefix }-message-icon ${ props.sprefix }-message-warning` }>
                            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path>
                            </svg>
                        </i>
                        <div className={ `${ props.sprefix }-message-center` }>{ props.children }</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MessageItem;
