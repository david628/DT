import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from "react-dom";
import Popup from '../Dropdown/Popup';
import Dldh from '../Util/Dldh';
import PropTypes from "prop-types";
import Dialog from "../Dialog";

class MessageItem extends Component {
    static propTypes = {
        //sprefix: PropTypes.string,
        placement: PropTypes.string,
        title: PropTypes.string,
        closable: PropTypes.bool
    };
    static defaultProps = {
        sprefix: 'dldh',
        placement: 'c-c',
        title: '',
        closable: true
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
        this.prevVisible = visible;
    }
    componentDidMount() {
        this.componentDidUpdate({}, {
            visible: this.state.visible,
        });
    }
    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        if(this.state.visible !== visible) {
            if (visible !== undefined) {
                this.setState({
                    visible
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        this.prevVisible = prevState.visible;
    }
    componentWillUnmount() {
    }
    handlePortalUpdate = (prevProps, node) => {
        if(this.prevVisible !== this.state.visible || (this.prevVisible && this.state.visible)) {
            Dldh.Css.alignTo(findDOMNode(node), this.getMountNode(), this.props.placement);
        }
    }
    getMountNode() {
        if(!this.mountNode) {
            this.mountNode = this.props.getPopupContainer ? this.props.getPopupContainer(findDOMNode(this)) : this.props.getDocument().body;
        }
        return this.mountNode;
    }
    getContainer = () => {
        const props = this.props;
        if(props.getContainer !== undefined) {
            return props.getContainer();
        } else {
            const popupContainer = document.createElement('div');
            popupContainer.className = `${ props.sprefix }-dialog`;
            const mountNode = this.getMountNode();
            mountNode.appendChild(popupContainer);
            return popupContainer;
        }
    }
    onCancel = e => {
        const props = this.props;
        if(!('visible' in props)) {
            this.setState({
                visible: false
            });
        }
        props.onCancel(e);
    }
    savePopup = (node) => {
        this._component = node;
    }
    render() {
        const { visible } = this.state;
        const props = this.props;
        const popupProps = {
            sprefix: props.sprefix
        };
        let popup;
        if(visible || this._component) {
            let closable;
            if(props.closable) {
                closable = (
                    <i className={ props.sprefix + "-dialog-close" } onClick={ this.onCancel }>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                        </svg>
                    </i>
                );
            }
            popup = (
                <Popup
                    { ...popupProps }
                    visible={ visible }
                    getContainer={ this.getContainer }
                    didUpdate={ this.handlePortalUpdate }
                    ref={ this.savePopup }
                >
                    <div className={ props.sprefix + "-message-inner" }>
                        <div className={ props.sprefix + "-message-header" }>
                            <div className={ props.sprefix + "-message-title" }>{ props.title }</div>
                            { closable }
                        </div>
                        <div className={ props.sprefix + "-message-center" }>
                            { props.children }
                        </div>
                    </div>
                </Popup>
            );
        }
        return (
            <React.Fragment>
                { popup }
            </React.Fragment>
        );
    }
}
export default MessageItem;
