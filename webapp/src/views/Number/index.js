import React, { Component } from 'react';
import { Number } from '../../dw-rui';
class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 200,
            precision: 0
        };
    }
    componentDidMount() {
    }
    onChange = (value) => {
        console.log('onChange:', value);
        this.setState({ value });
    }
    changeprecision = (e) => {
        this.setState({
            precision: parseInt(e.target.value, 10),
        });
    }
    render() {
        return (
            <div style={{ width: '100px' }}>
                <Number
                    value={ this.state.value }
                    step={ 100 }
                    unit="秒"
                    precision={ this.state.precision }
                    onChange={ this.onChange }
                >
                </Number>
                <p>
                precision:
                <input
                    type="number"
                    onChange={this.changeprecision}
                    value={this.state.precision}
                />
                </p>
            </div>
            
        );
    }
}
export default Page;
