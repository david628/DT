import React, { Component } from 'react';
import history from '@/utils/history';
import './index.less';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div>header</div>
                <div>
                    <div>left</div>
                    <div>center</div>
                    <div>right</div>
                </div>
                <div>footer</div>
            </div>
        );
    }
};
