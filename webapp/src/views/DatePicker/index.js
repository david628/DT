import React, { Component } from 'react';
import { DatePicker, RangePicker } from '../../dw-rui';
class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            range: [new Date('2019/09/09 05:25:39'), new Date('2019/09/27 20:15:09')],
            value: new Date('2019/10/27 20:15:09')
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
                    <DatePicker
                        defaultValue={ this.state.value }
                        //onChange={ this.onChange }
                    />
                </div>
                <div style={{ padding: '10px' }}>
                    <RangePicker
                        defaultValue={ this.state.range }
                    />
                </div>
            </div>
        );
    }
}
export default Page;
