import React, { Component } from 'react';
import ReactDOM, {findDOMNode, createPortal} from 'react-dom';
import PropTypes from 'prop-types';
class Popup extends Component {
  static propTypes = {
    sprefix: PropTypes.string,
    isAimated: PropTypes.bool,
    enterCls: PropTypes.string,
    leaveCls: PropTypes.string,
    getContainer: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    didUpdate: PropTypes.func,
    onMaskClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseDown: PropTypes.func,
    onTouchStart: PropTypes.func
  };
  static defaultProps = {
    sprefix: 'dldh',
    isAimated: true,
    enter: 'slideInUp',
    leave: 'slideOutUp',
    didUpdate: function() {},
    onMaskClick: function() {},
    onMouseEnter: function() {},
    onMouseLeave: function() {},
    onMouseDown: function() {},
    onTouchStart: function() {}
  };
  constructor(props) {
    super(props);
    this.timeoutId;
  }
  componentDidMount() {
  	this.createContainer();
  }
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate(prevProps, prevState) {
    clearTimeout(this.timeoutId);
    if(this.props.visible) {
      this._component.style.display = 'block';
    }
    if(!this._component.contains(document.activeElement)) {
      this.focusElement.focus();
    }
    const didUpdate = this.props.didUpdate;
    if (didUpdate) {
      didUpdate(prevProps, this._component);
    }
    if(!this.props.visible) {
      this.timeoutId = setTimeout(() => {
        if(this._component) {
          this._component.style.display = 'none';
        }
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }, 200);
    }
  }
  componentWillUnmount() {
  	this.removeContainer();
  }
  createContainer = () => {
  	this._container = this.props.getContainer();
    this.forceUpdate();
  }
  removeContainer = () => {
  	if (this._container) {
      this._container.parentNode.removeChild(this._container);
    }
  }
  saveRef = (name) => (node) => {
    this[name] = node;
  }
  getCls(is) {
    const { sprefix, isAimated, enter, leave } = this.props;
    let rs = [`${ sprefix }-popup-contain`];
    if(is) {
      rs.push(`${ sprefix }-dropdown`);
      rs.push(`${ sprefix }-popup-contain-open`);
      if(isAimated) {
        rs.push(`animated`);
      }
      rs.push(`${ enter }`);
    } else {
      rs.push(`${ sprefix }-dropdown`);
      rs.push(`${ sprefix }-popup-contain-hidden`);
      if(isAimated) {
        rs.push(`animated`);
      }
      rs.push(`${ leave }`);
    }
    return rs.join(' ');
  }
  render() {
  	if (this._container) {
  	  const props = this.props;
  	  const { sprefix } = props;
      let className = this.getCls(props.visible);
      return ReactDOM.createPortal(
        <div className={ sprefix + "-popup-inner" }>
          { props.mask }
          <div
            className={ className }
            onMouseEnter={ props.onMouseEnter }
            onMouseLeave={ props.onMouseLeave }
            onMouseDown={ props.onMouseDown }
            onTouchStart={ props.onTouchStart }
            ref={ this.saveRef('_component') }
          >
            <div
                tabIndex="0"
                ref={ this.saveRef('focusElement') }
                aria-hidden="true"
            />
            { this.props.children }
          </div>
        </div>,
      	this._container
      );
    }
    return null;
  }
}
export default Popup;
