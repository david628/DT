import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from "react-dom";
import MessageItem from './MessageItem';
import Popup from '../Dropdown/Popup';
import Dldh from '../Util/Dldh';
import PropTypes from "prop-types";

let seed = 0;
function getId() {
    return `msg-${ seed++ }`;
}

class Message extends Component {
    static propTypes = {
        sprefix: PropTypes.string,
        placement: PropTypes.string,
        closable: PropTypes.bool,
        duration: PropTypes.number,
        onClose: PropTypes.func,
    };
    static defaultProps = {
        sprefix: 'dldh',
        placement: 'c-c',
        closable: true,
        duration: 1.5,
        onClose: () => {},
        getDocument: () => {
            return window.document;
        }
    };
    constructor(props) {
        super(props);
        let visible = !!props.defaultVisible;
        if ('visible' in props) {
            visible = !!props.visible;
        }
        this.state = {
            visible,
            items: []
        };
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

    }
    componentWillUnmount() {
    }
    handlePortalUpdate = (prevProps, node) => {
        if(this.state.visible) {
            let listElement = findDOMNode(node);
            Dldh.Css.alignTo(listElement, this.getMountNode(), this.props.placement);
            listElement.style.top = 0;
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
    add(msg) {
        const { items } = this.state;
        const key = msg.key = msg.key || getId();
        const index = items.map(v => v.key).indexOf(key);
        const newItems = items.concat();
        if (index !== -1) {
            newItems.splice(index, 1, msg);
        } else {
            newItems.push(msg);
        }
        this.setState({
            items: newItems
        });
    }
    remove = (key) => {
        const { items } = this.state;
        const newItems = items.filter(msg => msg.key !== key);
        this.setState({
            items: newItems
        });
    }
    render() {
        const { visible, items } = this.state;
        const props = this.props;
        const popupProps = {
            sprefix: props.sprefix
        };
        let popup;
        if(visible || this._component) {
            // let closable;
            // if(props.closable) {
            //     closable = (
            //         <i className={ props.sprefix + "-message-close" } onClick={ this.onCancel }>
            //             <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            //                 <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
            //             </svg>
            //         </i>
            //     );
            // }

            const itemsElement = items.map((item, index) => {
                const key = item.key;
                const onClose = (e) => {
                    this.remove(key);
                };
                return (
                    <MessageItem
                        key={ key }
                        defaultVisible={ true }
                        onClose={ onClose }
                    >
                        { item.msg }
                    </MessageItem>
                );
            });
            popup = (
                <Popup
                    { ...popupProps }
                    visible={ visible }
                    getContainer={ this.getContainer }
                    didUpdate={ this.handlePortalUpdate }
                    ref={ this.savePopup }
                >
                    { itemsElement }
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
let instance;
Message.warning = (props, callback) => {
    if(instance) {
        instance.add(props);
        return;
    }
    let sprefix = 'dldh', timeout, div = document.createElement('div'), parent = document.body;
    div.className = `${sprefix}-message`;
    document.body.appendChild(div);
    const getContainer = function() {
        return div;
    }
    instance = ReactDOM.render(
        <Message
            //className={ className }
            defaultVisible={ true }
            closable={ false }
            getContainer={ getContainer }
            //onCancel={ onCancel }
            { ...props }
        />, div);
    instance.add(props);
}
export default Message;
