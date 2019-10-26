import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import PopupTree from './PopupTree';
class Node extends Component {
    static propTypes = {
        sprefix: PropTypes.string,
        eventKey: PropTypes.string,
        loaded: PropTypes.bool,
        loading: PropTypes.bool,
        isLeaf: PropTypes.bool,
        onExpand: PropTypes.func,
        expandedKeys: PropTypes.arrayOf(PropTypes.string),
        selectedKeys: PropTypes.arrayOf(PropTypes.string)
    };
    static defaultProps = {
        sprefix: 'dwrui',
        onExpand: () => {}
    };
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {

    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    isDisabled = () => {
        const { disabled, tree } = this.props;
        if (disabled === false) {
            return false;
        }
        return !!(tree.disabled || disabled);
    };
    isCheckable = () => {
        const { checkable, tree } = this.props;
        if (!tree.checkable || checkable === false) return false;
        return tree.checkable;
    };
    isSelectable() {
        const { selectable, tree } = this.props;
        if (typeof selectable === 'boolean') {
            return selectable;
        }
        return tree.selectable;
    }
    getIsLeaf() {
        const { isLeaf, loaded, children, tree } = this.props;
        const hasChildren = children === undefined ? false : true;
        if (isLeaf === false) {
            return false;
        }
        return isLeaf || (!tree.onLoadData && !hasChildren) || (tree.onLoadData && loaded && !hasChildren);
    }
    onExpand = (e) => {
        const { tree } = this.props;
        e.preventDefault();
        const { expanded } = this.props;
        tree.onExpand(e, this, !expanded);
    }
    onSelect = (e) => {
        const { tree } = this.props;
        e.preventDefault();
        const { selected } = this.props;
        tree.onSelect(e, this, !selected);
    }
    onCheck = (e) => {
        e.preventDefault();
        if (this.isDisabled()) return;
        const { tree, checked } = this.props;
        if (!this.isCheckable() || tree.disableCheckbox) {
            return;
        }
        tree.onCheck(e, this, !checked);
    }
    savePopup = (node) => {
        this._component = node;
    }
    renderChildrenElement() {
        const props = this.props;
        const { expanded, tree } = props;
        const subtreeCls = [`${ props.sprefix }-subtree`];
        let childrenElement;
        if(props.children) {
            if(expanded) {
                childrenElement = (
                    <ul
                        className={ subtreeCls.join(' ') }>
                        {
                            React.Children.map(props.children, (item, index) => {
                                let newProps = {
                                    tree: tree,
                                    eventKey: item.key,
                                    checked: tree.checkedKeys.indexOf(item.key) !== -1,
                                    halfChecked: tree.halfCheckedKeys.indexOf(item.key) !== -1,
                                    expanded: tree.expandedKeys.indexOf(item.key) !== -1,
                                    selected: tree.selectedKeys.indexOf(item.key) !== -1,
                                    loading: tree.loadingKeys.indexOf(item.key) !== -1
                                };
                                return React.cloneElement(item, newProps);
                            })
                        }
                    </ul>
                );
                subtreeCls.push(`${ props.sprefix }-tree-node-open`);
            } else {
                subtreeCls.push(`${ props.sprefix }-tree-node-close`);
            }
        }
        return childrenElement;
    }
    renderLableElement() {
        const { selected, expanded } = this.props;
        let lableCls = [`${ this.props.sprefix }-tree-node-text`];
        if(selected) {
            lableCls.push(`${ this.props.sprefix }-tree-node-selected`);
        }
        return (
            <span className={ lableCls.join(' ') } title={ this.props.label } onClick={ this.onSelect }>{ this.props.label }</span>
        );
    }
    renderCheckboxElement = () => {
        const { sprefix, tree, checked, halfChecked } = this.props;
        const disabled = this.isDisabled();
        const checkable = this.isCheckable();
        if (!checkable) {
            return null;
        }
        let chkCls = [`${ sprefix }-tree-checkbox`];
        if(checked) {
            chkCls.push(`${ sprefix }-tree-checkbox-checked`);
        }
        if(!checked && halfChecked) {
            chkCls.push(`${ sprefix }-tree-checkbox-halfchecked`);
        }
        if(disabled || tree.disableCheckbox) {
            chkCls.push(`${ sprefix }-tree-checkbox-disabled`);
        }
        return (
            <span
                className={ chkCls.join(' ') }
                onClick={ this.onCheck }
            >
                <span className={ `${ sprefix }-tree-checkbox-inner` }></span>
            </span>
        );
    };
    renderSwitchElement() {
        const props = this.props;
        const { expanded, loading } = props;
        let switchCls = [`${ props.sprefix }-tree-switch`];
        if(expanded) {
            switchCls.push(`${ props.sprefix }-tree-switch-open`);
        } else {
            switchCls.push(`${ props.sprefix }-tree-switch-close`);
        }
        switchCls = switchCls.join(' ');
        if(!this.getIsLeaf()) {
            return (
                <span className={ `${ props.sprefix }-tree-asset` } onClick={ this.onExpand }>
                    <span className={ switchCls }>
                        <i className={ `${ props.sprefix }-tree-switch-icon` }>
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                            </svg>
                        </i>
                    </span>
                    {
                        loading ? this.renderLoadingElement() : (
                            <span className={ `${ props.sprefix }-tree-directory` }>
                                <i className={ `${ props.sprefix }-tree-directory-icon` }>
                                    {
                                        expanded ? (
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="folder-open" width="1em"
                                                 height="1em" fill="currentColor" aria-hidden="true">
                                                <path
                                                    d="M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 0 0-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zM136 256h188.5l119.6 114.4H748V444H238c-13 0-24.8 7.9-29.7 20L136 643.2V256zm635.3 512H159l103.3-256h612.4L771.3 768z"></path>
                                            </svg>
                                        ) : (
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="folder" width="1em"
                                                 height="1em" fill="currentColor" aria-hidden="true">
                                                <path
                                                    d="M880 298.4H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z"></path>
                                            </svg>
                                        )
                                    }
                                </i>
                            </span>
                        )
                    }
                </span>
            );
        } else {
            return (
                <span className={ `${ props.sprefix }-tree-asset` }>
                    <span className={ switchCls }></span>
                    <span className={ `${ props.sprefix }-tree-file` }>
                        <i className={ `${ props.sprefix }-tree-file-icon` }>
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="file" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"></path>
                            </svg>
                        </i>
                    </span>
                </span>
            );
        }
    }
    renderLoadingElement() {
        const props = this.props;
        return (
            <span className={ `${ props.sprefix }-tree-node-loading` }>
                <i className={ `${ props.sprefix }-tree-node-loading-icon` }>
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                    </svg>
                </i>
            </span>
        );
    }
    render() {
        const props = this.props;
        const { selected, expanded } = props;
        let nodeCls = [`${ props.sprefix }-tree-node`];
        if(selected) {
            nodeCls.push(`${ props.sprefix }-tree-selected`);
        }
        return (
            <li className={ nodeCls.join(' ') }>
                { this.renderSwitchElement() }
                { this.renderCheckboxElement() }
                { this.renderLableElement() }
                { this.renderChildrenElement() }
            </li>
        );
    }
}
export default Node;
