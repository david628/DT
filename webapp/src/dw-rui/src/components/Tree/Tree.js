import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Node from './Node';
class Tree extends Component {
    static propTypes = {
        sprefix: PropTypes.string
    };
     static defaultProps = {
        sprefix: 'dwrui'
    };
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

    }
    componentDidUpdate() {

    }
    render() {
        const props = this.props;
        return (
            <ul className={ `${ props.sprefix }-tree` }>
                {
                    React.Children.map(props.children, (item, index) => {
                        return React.cloneElement(item);
                    })
                }
            </ul>
        );
    }
}
export default Tree;
