import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import PopupTree from './PopupTree';
class Node extends Component {
    static propTypes = {
        sprefix: PropTypes.string,

    };
    static defaultProps = {
        sprefix: 'dwrui'
    };
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    switchNode = (e) => {
        e.preventDefault();
        this.setState({
           open: !this.state.open
        });
    }
    getAssetsElement() {
        const props = this.props;
        const { open } = this.state;
        let switchElement, fileTypeElementIcon;
        let switchCls = [`${ props.sprefix }-tree-switch`];
        if(open) {
            switchCls.push(`${ props.sprefix }-tree-switch-open`);
        } else {
            switchCls.push(`${ props.sprefix }-tree-switch-close`);
        }
        switchCls = switchCls.join(' ');
        if(props.children) {
            switchElement = (
                <span className={ switchCls }>
                    <i className={ `${ props.sprefix }-tree-switch-icon` }>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                        </svg>
                    </i>
                </span>
            );
            if(open) {
                fileTypeElementIcon = (
                    <span className={ `${ props.sprefix }-tree-directory` }>
                        <i className={ `${ props.sprefix }-tree-directory-icon` }>
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="folder-open" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 0 0-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zM136 256h188.5l119.6 114.4H748V444H238c-13 0-24.8 7.9-29.7 20L136 643.2V256zm635.3 512H159l103.3-256h612.4L771.3 768z"></path>
                            </svg>
                        </i>
                    </span>
                );
            } else {
                fileTypeElementIcon = (
                    <span className={ `${ props.sprefix }-tree-directory` }>
                        <i className={ `${ props.sprefix }-tree-directory-icon` }>
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="folder" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M880 298.4H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z"></path>
                            </svg>
                        </i>
                    </span>
                );
            }
        } else {
            switchElement = (
                <span className={ switchCls }></span>
            );
            fileTypeElementIcon = (
                <span className={ `${ props.sprefix }-tree-file` }>
                    <i className={ `${ props.sprefix }-tree-file-icon` }>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="file" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"></path>
                        </svg>
                    </i>
                </span>
            );
        }
        return (
            <span className={ `${ props.sprefix }-tree-asset` } onClick={ this.switchNode }>
                { switchElement }
                { fileTypeElementIcon }
            </span>
        );
    }
    getChildrenElement() {
        const props = this.props;
        const { open } = this.state;
        const subtreeCls = [`${ props.sprefix }-subtree`];
        let childrenElement;
        if(props.children) {
            if(open) {
                subtreeCls.push(`${ props.sprefix }-tree-node-open`);
            } else {
                subtreeCls.push(`${ props.sprefix }-tree-node-close`);
            }
            childrenElement = (
                <ul className={ subtreeCls.join(' ') }>
                    {
                        React.Children.map(props.children, (item, index) => {
                            return React.cloneElement(item);
                        })
                    }
                </ul>
            );
        }
        return childrenElement;
    }
    getLableElement() {
        return (
            <span className={ `${ this.props.sprefix }-tree-node-text` } title={ this.props.label }>{ this.props.label }</span>
        );
    }
    render() {
        const props = this.props;
        return (
            <li className={ `${ props.sprefix }-tree-node` }>
                { this.getAssetsElement() }
                { this.getLableElement() }
                { this.getChildrenElement() }
            </li>
        );
    }
}
export default Node;
