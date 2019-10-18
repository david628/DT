import React, { Component } from 'react';
import Select, { Option, OptGroup } from '@/components/ui/Select';
class User extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div>
        <div style={{padding: '10px'}}>
          <Select defaultValue={ ["2"] }>
            <Option value="0">aa</Option>
            <Option value="1">bb</Option>
            <Option value="2">cc</Option>
            <Option value="3">dd</Option>
          </Select>
        </div>
        <div style={{padding: '10px'}}>
          <Select defaultValue={ ["4"] }>
            <OptGroup value="0" label="a">
              <Option value="1">aa</Option>
              <Option value="2">bb</Option>
              <OptGroup value="3" label="a1">
                <Option value="4">aa1</Option>
                <Option value="5">bb1</Option>
              </OptGroup>
            </OptGroup>
            <Option value="6">cc</Option>
          </Select>
        </div>
      </div>
    );
  }
}
export default User;
