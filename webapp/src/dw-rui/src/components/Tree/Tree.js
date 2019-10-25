import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import Node from './Node';
class Tree extends Component {
    static propTypes = {
        sprefix: PropTypes.string,
        defaultExpandAll: PropTypes.bool,
        defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
        defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
        defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
        checkedKeys: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
            PropTypes.object,
        ]),
        expandedKeys: PropTypes.arrayOf(PropTypes.string),
        selectedKeys: PropTypes.arrayOf(PropTypes.string),
        disableCheckbox: PropTypes.bool,
        checkStrictly: PropTypes.bool,
        focusable: PropTypes.bool,
        selectable: PropTypes.bool,
        disabled: PropTypes.bool,
        multiple: PropTypes.bool,
        checkable: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.node,
        ]),
        draggable: PropTypes.bool
    };
    static defaultProps = {
        sprefix: 'dwrui',
        defaultExpandAll: false,
        selectable: true,
        multiple: false,
        checkable: false,
        disableCheckbox: false,
        checkStrictly: false,
        disabled: false,
        draggable: false
    };
    constructor(props) {
        super(props);
        let expandedKeys = props.defaultExpandedKeys || [];
        if ('expandedKeys' in props) {
            expandedKeys = props.expandedKeys || [];
        }
        const nodeMap = {};
        expandedKeys = this.getExpandedKeys(props, nodeMap);
        let selectedKeys = props.defaultSelectedKeys || [];
        if ('selectedKeys' in props) {
            selectedKeys = props.selectedKeys || [];
        }
        const { checkedKeys, halfCheckedKeys } = this.getCheckedKeys(props, nodeMap);
        this.state = {
            nodeMap,
            checkedKeys,
            halfCheckedKeys,
            expandedKeys,
            selectedKeys
        };
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if(this.props.selectedKeys !== nextProps.selectedKeys) {
            let selectedKeys = nextProps.selectedKeys || [];
            this.setState({
                selectedKeys
            });
        }
        if(this.props.expandedKeys !== nextProps.expandedKeys) {
            let expandedKeys = nextProps.expandedKeys || [];
            this.setState({
                expandedKeys
            });
        }
        if(this.props.checkedKeys !== nextProps.checkedKeys) {
            const { checkedKeys, halfCheckedKeys } = this.getCheckedKeys(nextProps, this.state.nodeMap);
            this.setState({
                checkedKeys,
                halfCheckedKeys
            });
        }
    }
    componentDidUpdate() {

    }
    getCheckedKeys(props, nodeMap) {
        let checkedKeys = [], halfCheckedKeys = [];
        if (props.checkable) {
            let checkedKeyEntity;
            if ('checkedKeys' in props) {
                checkedKeyEntity = this.parseCheckedKeys(props.checkedKeys) || {};
            } else if(props.defaultCheckedKeys) {
                checkedKeyEntity = this.parseCheckedKeys(props.defaultCheckedKeys) || {};
            }
            if (checkedKeyEntity) {
                checkedKeys = checkedKeyEntity.checkedKeys || [];
                halfCheckedKeys = checkedKeyEntity.halfCheckedKeys || [];
                if (!props.checkStrictly) {
                    const conductKeys = this.conductCheck(checkedKeys, true, nodeMap);
                    checkedKeys = conductKeys.checkedKeys;
                    halfCheckedKeys = conductKeys.halfCheckedKeys;
                }
            }
        }
        return {
            checkedKeys,
            halfCheckedKeys
        }
    }
    getExpandedKeys(props, nodeMap) {
        let children = [];
        if(props.children) {
            if(props.children.length) {
                children = props.children;
            } else {
                children = [props.children];
            }
        }
        this.getNodeMap(children, nodeMap);
        let expandedKeys = props.defaultExpandedKeys || [];
        if ('expandedKeys' in props) {
            expandedKeys = props.expandedKeys || [];
        }
        let keys;
        if(props.defaultExpandAll) {
            keys = Object.keys(nodeMap);
        } else {
            keys = this.getAllExpandKeysBykeys(expandedKeys, nodeMap);
        }
        return keys;
    }
    delExpandedKeys(value) {
        const arr = this.state.expandedKeys.slice();
        const index = arr.indexOf(value);
        if (index >= 0) {
            arr.splice(index, 1);
        }
        return arr;
    }
    addExpandedKeys(value) {
        const arr = this.state.expandedKeys.slice();
        if (arr.indexOf(value) === -1) {
            arr.push(value);
        }
        return arr;
    }
    getNodeMap(children, nodeMap, parent) {
        let list = [];
        for(let i = 0; i < children.length; i++) {
            nodeMap[children[i].key] = {
                node: children[i],
                key: children[i].key,
                parent
            };
            let ch = [];
            if(children[i].props.children) {
                if(children[i].props.children.length) {
                    ch = children[i].props.children;
                } else {
                    ch = [children[i].props.children];
                }
                nodeMap[children[i].key].children = this.getNodeMap(ch, nodeMap, nodeMap[children[i].key]);
            }
            list.push(nodeMap[children[i].key]);
        }
        return list;
    }
    getAllParentKeys(key, nodeMap, expandedKeys) {
        if (expandedKeys[key]) return;
        const entity = nodeMap[key];
        if (!entity) return;
        expandedKeys[key] = true;
        const { parent, node } = entity;
        if (parent) {
            this.getAllParentKeys(parent.key, nodeMap, expandedKeys);
        }
    }
    getAllExpandKeysBykeys(keyList, nodeMap) {
        const expandedKeys = {};
        (keyList || []).forEach((key) => {
            this.getAllParentKeys(key, nodeMap, expandedKeys);
        });
        return Object.keys(expandedKeys);
    }
    parseCheckedKeys(keys) {
        if (!keys) {
            return null;
        }
        let keyProps;
        if (Array.isArray(keys)) {
            keyProps = {
                checkedKeys: keys,
                halfCheckedKeys: undefined,
            };
        } else if (typeof keys === 'object') {
            keyProps = {
                checkedKeys: keys.checked || undefined,
                halfCheckedKeys: keys.halfChecked || undefined,
            };
        } else {
            return null;
        }
        keyProps.checkedKeys = this.keyListToString(keyProps.checkedKeys);
        keyProps.halfCheckedKeys = this.keyListToString(keyProps.halfCheckedKeys);
        return keyProps;
    }
    keyListToString(keyList) {
        if (!keyList) return keyList;
        return keyList.map(key => String(key));
    }
    isCheckDisabled(node) {
        const { disabled, disableCheckbox } = node.props || {};
        return !!(disabled || disableCheckbox);
    }
    conductUp(key, checkedKeys, halfCheckedKeys, isCheck, keyEntities) {
        if (checkedKeys[key] === isCheck) return;
        const entity = keyEntities[key];
        if (!entity) return;
        const { children, parent, node } = entity;
        if (this.isCheckDisabled(node)) return;
        let everyChildChecked = true;
        let someChildChecked = false; // Child checked or half checked
        (children || [])
            .filter(child => !this.isCheckDisabled(child.node))
            .forEach(({ key: childKey }) => {
                const childChecked = checkedKeys[childKey];
                const childHalfChecked = halfCheckedKeys[childKey];
                if (childChecked || childHalfChecked) someChildChecked = true;
                if (!childChecked) everyChildChecked = false;
            });
        if (isCheck) {
            checkedKeys[key] = everyChildChecked;
        } else {
            checkedKeys[key] = false;
        }
        halfCheckedKeys[key] = someChildChecked;
        if (parent) {
            this.conductUp(parent.key, checkedKeys, halfCheckedKeys, isCheck, keyEntities);
        }
    }
    conductDown(key, checkedKeys, halfCheckedKeys, isCheck, keyEntities) {
        if (checkedKeys[key] === isCheck) return;
        const entity = keyEntities[key];
        if (!entity) return;
        const { children, node } = entity;
        if (this.isCheckDisabled(node)) return;
        checkedKeys[key] = isCheck;
        (children || []).forEach((child) => {
            this.conductDown(child.key, checkedKeys, halfCheckedKeys, isCheck, keyEntities);
        });
    }
    conduct(key, checkedKeys, halfCheckedKeys, isCheck, keyEntities) {
        const entity = keyEntities[key];
        if (!entity) {
            return;
        }
        const { children, parent, node } = entity;
        checkedKeys[key] = isCheck;
        if (this.isCheckDisabled(node)) return;
        (children || [])
            .filter(child => !this.isCheckDisabled(child.node))
            .forEach((child) => {
                this.conductDown(child.key, checkedKeys, halfCheckedKeys, isCheck, keyEntities);
            });
        if (parent) {
            this.conductUp(parent.key, checkedKeys, halfCheckedKeys, isCheck, keyEntities);
        }
    }
    conductCheck(keyList, isCheck, keyEntities, checkStatus = {}) {
        const checkedKeys = {};
        const halfCheckedKeys = {};
        (checkStatus.checkedKeys || []).forEach((key) => {
            checkedKeys[key] = true;
        });
        (checkStatus.halfCheckedKeys || []).forEach((key) => {
            halfCheckedKeys[key] = true;
        });
        (keyList || []).forEach((key) => {
            this.conduct(key, checkedKeys, halfCheckedKeys, isCheck, keyEntities, checkStatus);
        });
        const checkedKeyList = [];
        const halfCheckedKeyList = [];
        Object.keys(checkedKeys).forEach((key) => {
            if (checkedKeys[key]) {
                checkedKeyList.push(key);
            }
        });
        Object.keys(halfCheckedKeys).forEach((key) => {
            if (!checkedKeys[key] && halfCheckedKeys[key]) {
                halfCheckedKeyList.push(key);
            }
        });
        return {
            checkedKeys: checkedKeyList,
            halfCheckedKeys: halfCheckedKeyList,
        };
    }
    onExpand = (e, node, expanded) => {
        const { eventKey } = node.props;
        let arr;
        if(expanded) {
            arr = this.addExpandedKeys(eventKey);
       } else {
            arr = this.delExpandedKeys(eventKey);
        }
        if(!('expandedKeys' in this.props)) {
            this.setState({
                expandedKeys: arr
            });
        }
        if(this.props.onExpand) {
            this.props.onExpand(arr, {
                node,
                expanded: expanded,
                nativeEvent: e.nativeEvent,
            });
        }
    }
    onSelect = (e, node, selected) => {
        const { eventKey } = node.props;
        let arr;
        if(selected) {
            arr = [eventKey];
        } else {
            arr = [];
        }
        if(!('selectedKeys' in this.props)) {
            this.setState({
                selectedKeys: arr
            });
        }
        if(this.props.onSelect) {
            this.props.onSelect(arr, {
                node,
                selected: selected,
                nativeEvent: e.nativeEvent,
            });
        }
    }
    onCheck = (e, node, checked) => {
        const { nodeMap, checkedKeys: oriCheckedKeys, halfCheckedKeys: oriHalfCheckedKeys } = this.state;
        const { checkStrictly, onCheck } = this.props;
        const { props: { eventKey } } = node;
        let checkedObj;
        const eventObj = {
            event: 'check',
            node,
            checked,
            nativeEvent: e.nativeEvent,
        };
        if (checkStrictly) {
            const checkedKeys = checked ? this.arrAdd(oriCheckedKeys, eventKey) : this.arrDel(oriCheckedKeys, eventKey);
            const halfCheckedKeys = this.arrDel(oriHalfCheckedKeys, eventKey);
            eventObj.checkedNodes = checkedKeys
                .map(key => nodeMap[key])
                .filter(entity => entity)
                .map(entity => entity.node);
            if(!('checkedKeys' in this.props)) {
                this.setState({ checkedKeys });
            }
            if (this.props.onCheck) {
                this.props.onCheck({
                    checkedKeys
                }, eventObj);
            }
        } else {
            const { checkedKeys, halfCheckedKeys } = this.conductCheck([eventKey], checked, nodeMap, {
                checkedKeys: oriCheckedKeys, halfCheckedKeys: oriHalfCheckedKeys,
            });
            eventObj.checkedNodes = [];
            eventObj.halfCheckedKeys = halfCheckedKeys;
            checkedKeys.forEach((key) => {
                const entity = nodeMap[key];
                if (!entity) {
                    return;
                }
                const { node, pos } = entity;
                eventObj.checkedNodes.push(node);
            });
            if(!('checkedKeys' in this.props)) {
                this.setState({
                    checkedKeys,
                    halfCheckedKeys,
                });
            }
            if (this.props.onCheck) {
                this.props.onCheck({
                    checkedKeys,
                    halfCheckedKeys,
                }, eventObj);
            }
        }
    }
    arrDel(list, value) {
        const clone = list.slice();
        const index = clone.indexOf(value);
        if (index >= 0) {
            clone.splice(index, 1);
        }
        return clone;
    }
    arrAdd(list, value) {
        const clone = list.slice();
        if (clone.indexOf(value) === -1) {
            clone.push(value);
        }
        return clone;
    }
    render() {
        const props = this.props;
        const { expandedKeys, selectedKeys, checkedKeys, halfCheckedKeys } = this.state;
        return (
            <ul className={ `${ props.sprefix }-tree` }>
                {
                    React.Children.map(props.children, (item, index) => {
                        let newProps = {
                            tree: {
                                selectable: props.selectable,
                                multiple: props.multiple,
                                checkable: props.checkable,
                                disabled: props.disabled,
                                draggable: props.draggable,
                                disableCheckbox: props.disableCheckbox,
                                expandedKeys,
                                selectedKeys,
                                checkedKeys,
                                halfCheckedKeys,
                            },
                            onExpand: this.onExpand,
                            onSelect: this.onSelect,
                            onCheck: this.onCheck,
                            eventKey: item.key,
                            checked: checkedKeys.indexOf(item.key) !== -1,
                            halfChecked: halfCheckedKeys.indexOf(item.key) !== -1,
                            expanded: expandedKeys.indexOf(item.key) !== -1,
                            selected: selectedKeys.indexOf(item.key) !== -1
                        };
                        return React.cloneElement(item, newProps);
                    })
                }
            </ul>
        );
    }
}
export default Tree;
