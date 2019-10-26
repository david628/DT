import React, { Component } from 'react';
import { Tree, Node, Input } from '../../dw-rui';
function generateTreeNodes(node) {
    const arr = [];
    const key = node.props.eventKey;
    for (let i = 0; i < 3; i++) {
        arr.push({ label: `leaf ${key}-${i}`, key: `${key}-${i}` });
    }
    return arr;
}
function getNewTreeData(treeData, curKey, child, level) {
    const loop = (data) => {
        if (level < 1 || curKey.length - 3 > level * 2) return;
        data.forEach((item) => {
            if (curKey.indexOf(item.key) === 0) {
                if (item.children) {
                    loop(item.children);
                } else {
                    item.children = child;
                }
            }
        });
    };
    loop(treeData);
    //setLeaf(treeData, curKey, level);
}
class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: ['0-0-0-1-1'],
            selectedKeys: ['0-0-0-1-1'],
            checkedKeys: ['0-0-0-1-1'],
            data: [
                { label: 'pNode 0-0', key: '0-0' },
                { label: 'pNode 0-1', key: '0-1' },
                { label: 'pNode 0-2', key: '0-2', isLeaf: true }
            ]
        };
    }
    componentDidMount() {
    
     }
    onExpand = (expandedKeys, obj) => {
        console.log('onExpand', expandedKeys, obj.expanded);
        this.setState({
            expandedKeys
        });
    };
    onSelect = (selectedKeys, obj) => {
        console.log('onSelect', selectedKeys, obj.selected);
        this.setState({
            selectedKeys
        });
    };
    onCheck = (checkObject, obj) => {
        console.log('onCheck', checkObject, obj);
        this.setState(checkObject);
    }
    onExpandEx = (expandedKeys, obj) => {
        console.log('onExpand', expandedKeys, obj.expanded);

    };
    onLoadData = (node) => {
        console.log('onLoadData', node);
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('start...');
                const treeData = [ ...this.state.data ];
                getNewTreeData(treeData, node.props.eventKey, generateTreeNodes(node), 2);
                this.setState({ treeData });
                resolve();
            }, 500);
        });
    };
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return <Node label={ item.label } key={item.key}>{ this.renderTreeNodes(item.children) }</Node>;
            }
            return (
                <Node label={ item.label } key={ item.key } isLeaf={ item.isLeaf }/>
            );
        });
    };
    render() {
        const nodeElement = this.renderTreeNodes(this.state.data);
        return (
            <div>
                <Tree
                    checkable
                    //checkStrictly
                    expandedKeys={ this.state.expandedKeys }
                    selectedKeys={ this.state.selectedKeys }
                    checkedKeys={this.state.checkedKeys}
                    //expandedKeys={ this.state.expandedKeys }
                    //selectedKeys={ this.state.selectedKeys }
                    //defaultExpandAll
                    onSelect={ this.onSelect }
                    onCheck={ this.onCheck }
                    onExpand={ this.onExpand }
                >
                    <Node label="parent 0-0" key="0-0">
                        <Node label="parent 0-0-0" key="0-0-0">
                            <Node label="leaf 0-0-0-0" key="0-0-0-0" />
                            <Node label="leaf 0-0-0-1" key="0-0-0-1" >
                                <Node label="leaf 0-0-0-1-0" key="0-0-0-1-0" />
                                <Node label="leaf 0-0-0-1-1" key="0-0-0-1-1">
                                    <Node label="leaf 0-0-0-1-1-0" key="0-0-0-1-1-0" />
                                    <Node label="leaf 0-0-0-1-1-1" key="0-0-0-1-1-1" />
                                    <Node label="leaf 0-0-0-1-1-2" key="0-0-0-1-1-2" />
                                </Node>
                                <Node label="leaf 0-0-0-1-2" key="0-0-0-1-2" />
                                <Node label="leaf 0-0-0-1-3" key="0-0-0-1-3" />
                            </Node>
                            <Node label="leaf 0-0-0-2" key="0-0-0-2" />
                        </Node>
                        <Node label="parent 0-0-1" key="0-0-1">
                            <Node label="leaf 0-0-1-0" key="0-0-1-0" />
                        </Node>
                        <Node label="parent 0-0-2" key="0-0-2">
                            <Node label={ <div style={{ color: "red" }}>leaf 0-0-2-0</div> } key="0-0-2-0" />
                            <Node label="leaf 0-0-2-1" key="0-0-2-1" />
                        </Node>
                    </Node>
                </Tree>
                <Tree
                    checkable
                    //checkStrictly
                    //expandedKeys={ this.state.expandedKeys }
                    //selectedKeys={ this.state.selectedKeys }
                    defaultCheckedKeys={this.state.checkedKeys}
                    //expandedKeys={ this.state.expandedKeys }
                    //selectedKeys={ this.state.selectedKeys }
                    //defaultExpandAll
                    //onSelect={ this.onSelect }
                    //onCheck={ this.onCheck }
                    onLoadData={ this.onLoadData }
                    //onExpand={ this.onExpandEx }
                >
                    { nodeElement }
                </Tree>
            </div>
        );
    }
}
export default Page;
