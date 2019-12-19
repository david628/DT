import React, { Component } from 'react';
import { ColorPicker } from '../../dw-rui';
class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '#00B7EE'
        };
    }
    componentDidMount() {
        //<RangePicker value={ this.state.value } onChange={ this.onChange }></RangePicker>
    }
    onChange = v => {
        this.setState({
            value: v
       });
    }
    render() {
        return (
            <div style={{ width: '262px' }}>
                <div style={{ padding: '10px' }}>
                    <ColorPicker
                        defaultValue={ this.state.value }
                        //onChange={ this.onChange }
                    />
                </div>
            </div>
        );
    }
}
export default Page;
