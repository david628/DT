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
        sprefix: 'dwrui'
    };
    constructor(props) {
        super(props);
        // let checkedKeys = props.defaultCheckedKeys || [];
        // if ('checkedKeys' in props) {
        //     checkedKeys = props.checkedKeys || [];
        // }
        // let expandedKeys = props.defaultExpandedKeys || [];
        // if ('expandedKeys' in props) {
        //     expandedKeys = props.expandedKeys || [];
        // }
        // let selectedKeys = props.defaultSelectedKeys || [];
        // if ('selectedKeys' in props) {
        //     selectedKeys = props.selectedKeys || [];
        // }
        //expandedKeys = this.getExpandedKeys(props);
        this.state = {
            checkedKeys: [],
            expandedKeys: [],
            selectedKeys: []
        };
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        const expandedKeys = this.getExpandedKeys(nextProps);
        this.setState({
            expandedKeys
        });
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
        console.log(123);
        return this.getAllExpandKeysBykeys(expandedKeys, nodeMap);
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
        let arr;
        if(!expanded) {
            arr = this.addExpandedKeys(eventKey);
       } else {
            arr = this.delExpandedKeys(eventKey);
        }
        this.setState({
            expandedKeys: arr
        });
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
