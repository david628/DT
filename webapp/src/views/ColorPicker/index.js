import React, { Component } from 'react';
import { ColorPicker } from '../../dw-rui';
class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //value: '#00B7EE',
            value: 'radial-gradient(at center center, rgba(4, 96, 255, 0.97) 0%, rgb(242, 9, 9) 19.6721%, rgb(14, 102, 218) 34.0164%, rgb(93, 0, 15) 46.3115%, rgb(239, 167, 41) 72.9508%, rgb(74, 20, 140) 100%)'
        };
    }
    componentDidMount() {
        //<RangePicker value={ this.state.value } onChange={ this.onChange }></RangePicker>
    }
    onChange = v => {
        console.log('color', v);
        this.setState({
            value: v
        });
    }
    render() {
        return (
            <div style={{ height: '600px', background: this.state.value }}>
                <div style={{ width: '80px' }}>
                    <ColorPicker
                        value={ this.state.value }
                        onChange={ this.onChange }
                    />
                </div>
            </div>
        );
    }
}
export default Page;
