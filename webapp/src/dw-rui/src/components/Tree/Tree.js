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
    };
    static defaultProps = {
        sprefix: 'dwrui',
        defaultExpandAll: false
    };
    constructor(props) {
        super(props);
        let checkedKeys = props.defaultCheckedKeys || [];
        if ('checkedKeys' in props) {
            checkedKeys = props.checkedKeys || [];
        }
        let expandedKeys = props.defaultExpandedKeys || [];
        if ('expandedKeys' in props) {
            expandedKeys = props.expandedKeys || [];
        }
        expandedKeys = this.getExpandedKeys(props);
        let selectedKeys = props.defaultSelectedKeys || [];
        if ('selectedKeys' in props) {
            selectedKeys = props.selectedKeys || [];
        }
        this.state = {
            //nodeMap: [],
            checkedKeys,
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
    }
    componentDidUpdate() {

    }
    getExpandedKeys(props) {
        const nodeMap = {};
        this.getNodeMap(props.children.length ? props.children : [props.children], nodeMap);
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
        for(let i = 0; i < children.length; i++) {
            nodeMap[children[i].key] = {
                node: children[i],
                key: children[i].key,
                parent
            };
            if(children[i].props.children) {
                this.getNodeMap(children[i].props.children, nodeMap, children[i]);
            }
        }
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
    onExpand = (e, node, expanded) => {
        const { eventKey } = node.props;
        let arr, isExpanded = !expanded;
        if(isExpanded) {
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
                expanded: isExpanded,
                nativeEvent: e.nativeEvent,
            });
        }
    }
    onSelect = (e, node, selected) => {
        const { eventKey } = node.props;
        let arr, isSelected = !selected;
        if(isSelected) {
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
                selected: isSelected,
                nativeEvent: e.nativeEvent,
            });
        }
    }
    render() {
        const props = this.props;
        const { expandedKeys, selectedKeys } = this.state;
        return (
            <ul className={ `${ props.sprefix }-tree` }>
                {
                    React.Children.map(props.children, (item, index) => {
                        let newProps = {
                            onExpand: this.onExpand,
                            onSelect: this.onSelect,
                            eventKey: item.key,
                            expandedKeys,
                            selectedKeys
                            //expanded: expandedKeys.indexOf(item.key) !== -1,
                            //selected: selectedKeys.indexOf(item.key) !== -1
                        };
                        return React.cloneElement(item, newProps);
                    })
                }
            </ul>
        );
    }
}
export default Tree;
