import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ColorPanel extends Component {
    static propTypes = {
        defaultValue: PropTypes.any,
        value: PropTypes.any,
        type: PropTypes.string,
    };
    static defaultProps = {
        sprefix: 'dwrui',
        type: 'default'
    };
    constructor(props) {
        super(props);
        let value = props.value || props.defaultValue;
        this.state = {
            value
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if('value' in nextProps) {
            const { value } = nextProps;
            this.setState({
                value
            });
        }
    }
    componentDidUpdate() {

    }
    render() {
        const { props, state } = this;
        const { sprefix, format, type, placeholder } = props;
        let value = state.value,
        cls = [`${ sprefix }-colorPicker-panel`];
        return (
            <div className={ cls.join(' ') }>
                sdfsdf
            </div>
        );
    }
}
export default ColorPanel;
