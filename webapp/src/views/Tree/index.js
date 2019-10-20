import React, { Component } from 'react';
import { Tree, Node, Input } from '../../dw-rui';
class Page extends Component {
  constructor(props) {
      super(props);
      this.state = {};
  }
  componentDidMount() {
    
  }
  render() {
      return (
          <Tree
              onSelect={this.onSelect}
              onCheck={this.onCheck}
          >
              <Node label="parent 1" key="0-0">
                  <Node label="parent 1-0" key="0-0-0">
                      <Node label="leaf" key="0-0-0-0" />
                      <Node label="leaf" key="0-0-0-1" />
                      <Node label="leaf" key="0-0-0-2" />
                  </Node>
                  <Node label="parent 1-1" key="0-0-1">
                      <Node label="leaf" key="0-0-1-0" />
                  </Node>
                  <Node label="parent 1-2" key="0-0-2">
                      <Node label={ <div style={{ color: "red" }}>leaf</div> } key="0-0-2-0" />
                      <Node label="leaf" key="0-0-2-1" />
                  </Node>
              </Node>
          </Tree>
      );
  }
}
export default Page;
