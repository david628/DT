import React, { Component } from 'react';
import { Tree, Node, Input } from '../../dw-rui';
class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: ['0-0-0'],
            selectedKeys: ['0-0-0']
        };
    }
    componentDidMount() {
    
     }
    onExpand = (expandedKeys, obj) => {
        console.log('onExpand', expandedKeys);
        // this.setState({
        //     expandedKeys
        // });
    };
    onSelect = (selectedKeys, obj) => {
        console.log('onSelect', selectedKeys);
        // this.setState({
        //     selectedKeys
        // });
    };
    render() {
        return (
            <Tree
                defaultExpandedKeys={ this.state.expandedKeys }
                defaultSelectedKeys={ this.state.selectedKeys }
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
              </Node>
              <Node label="parent 0-0-2" key="0-0-2">
                  <Node label={ <div style={{ color: "red" }}>leaf 0-0-2-0</div> } key="0-0-2-0" />
                  <Node label="leaf 0-0-2-1" key="0-0-2-1" />
              </Node>
          </Tree>
        );
    }
}
export default Page;
