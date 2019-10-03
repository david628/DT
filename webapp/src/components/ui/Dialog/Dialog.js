import React, { Component } from 'react';
import {findDOMNode} from "react-dom";
import Popup from '../Dropdown/Popup';
import Dldh from '@/components/ui/Util/Dldh';
import PropTypes from "prop-types";

class Dialog extends Component {
    static propTypes = {
        sprefix: PropTypes.string,
        getDocument: PropTypes.func,
        afterPopupVisibleChange: PropTypes.func
    };
    static defaultProps = {
        sprefix: 'dldh',
        afterPopupVisibleChange: () => {},
        getDocument: () => {
            return window.document;
        }
    };
    constructor(props) {
        super(props);
        let visible;
        if ('visible' in props) {
            visible = !!props.visible;
        }
        this.prevVisible = visible;
        this.state = {
            visible
        };
    }
    componentDidMount() {
        this.componentDidUpdate({}, {
            visible: this.state.visible,
        });
    }
    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        if (visible !== undefined) {
            this.setState({
                visible
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const props = this.props;
        const state = this.state;
        this.prevVisible = prevState.visible;
        if (state.visible) {
            let currentDocument;
            if (!this.clickOutsideHandler) {
                currentDocument = props.getDocument();
                this.clickOutsideHandler = Dldh.Event.bind(currentDocument, 'mousedown', this.onDocumentClick);
            }
            // always hide on mobile
            if (!this.touchOutsideHandler) {
                currentDocument = currentDocument || props.getDocument();
                this.touchOutsideHandler = Dldh.Event.bind(currentDocument, 'touchstart', this.onDocumentClick);
            }
            return;
        }
        this.clearOutsideHandler();
    }
    componentWillUnmount() {
        //this.clearDelayTimer();
        this.clearOutsideHandler();
        //clearTimeout(this.mouseDownTimeout);
    }
    clearOutsideHandler() {
        const props = this.props;
        let currentDocument;
        if (this.clickOutsideHandler) {
            currentDocument = props.getDocument();
            this.clickOutsideHandler = Dldh.Event.unbind(currentDocument, 'mousedown', this.onDocumentClick)
        }
        if (this.touchOutsideHandler) {
            currentDocument = currentDocument || props.getDocument();
            this.touchOutsideHandler = Dldh.Event.unbind(currentDocument, 'touchstart', this.onDocumentClick);
        }
    }
    onDocumentClick = (event) => {
        const target = event.target;
        const root = findDOMNode(this);
        if(!root.contains(target)) {
            this.setState({
                visible: false
            });
        }
    }
    handlePortalUpdate = () => {
        if (this.prevVisible !== this.state.visible) {
            this.props.afterPopupVisibleChange(this.state.visible);
        }
        //if(this.state.visible) {
            //const listNode = findDOMNode(this._component);
            //listNode.style
        //}
    }
    getContainer = () => {
        const { props } = this;
        const popupContainer = document.createElement('div');
        popupContainer.className = 'dldh-dialog';
        const mountNode = props.getPopupContainer ? props.getPopupContainer(findDOMNode(this)) : props.getDocument().body;
        mountNode.appendChild(popupContainer);
        return popupContainer;
    }
    savePopup = (node) => {
        this._component = node;
    }
    // clearDelayTimer() {
    //     if (this.delayTimer) {
    //         clearTimeout(this.delayTimer);
    //         this.delayTimer = null;
    //     }
    // }
    // delaySetPopupVisible(visible, delayS, event) {
    //     const delay = delayS * 1000;
    //     this.clearDelayTimer();
    //     if (delay) {
    //         this.delayTimer = setTimeout(() => {
    //             this.setPopupVisible(visible);
    //             this.clearDelayTimer();
    //         }, delay);
    //     } else {
    //         this.setPopupVisible(visible);
    //     }
    // }
    // setPopupVisible(visible) {
    //     this.clearDelayTimer();
    //     if (this.state.visible !== visible) {
    //         if (!('visible' in this.props)) {
    //             this.setState({ visible });
    //         }
    //     }
    // }
    render() {
        const { visible } = this.state;
        const popupProps = {
            sprefix: this.props.sprefix
        };
        let popup;
        console.log(visible);
        if(visible || this._component) {
            popup = (
                <Popup
                    { ...popupProps }
                    visible={ visible }
                    getContainer={ this.getContainer }
                    didUpdate={ this.handlePortalUpdate }
                    ref={ this.savePopup }
                >
                    { this.props.children }
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
export default Dialog;
