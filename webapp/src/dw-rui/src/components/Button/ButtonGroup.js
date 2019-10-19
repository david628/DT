import React from 'react';
import PropTypes from 'prop-types';
const prefix = 'dwrui-btn-group';
export default function ButtonGroup(props) {
  const { size, className, ...others } = props;
  const sizeCls = ({
    large: 'lg',
    small: 'sm',
  })[size] || '';
  return <div {...others} className={prefix}></div>;
}
ButtonGroup.propTypes = {
  size: PropTypes.oneOf(['large', 'default', 'small']),
};
