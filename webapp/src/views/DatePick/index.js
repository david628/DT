import React, { Component } from 'react';
import { DatePick } from '../../dw-rui';
class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '2019/10/27'
        };
    }
    componentDidMount() {

    }
    onChange = v => {
        this.setState({
            value: v
        });
    }
    render() {
        return (
            <div style={{ width: '262px' }}>
                <DatePick value={ this.state.value } onChange={ this.onChange } format={ 'YYYY/MM/DD' }/>
            </div>
        );
    }
}
export default Page;
