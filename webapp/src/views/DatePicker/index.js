import React, { Component } from 'react';
import { DatePicker, RangePicker } from '../../dw-rui';
class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '2019/10/27 20:15:09'
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
                    <DatePicker/>
                </div>
                <div style={{ padding: '10px' }}>
                    <RangePicker/>
                </div>
            </div>
        );
    }
}
export default Page;
