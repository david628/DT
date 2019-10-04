import React, { Component } from 'react';
import ReactDOM, {findDOMNode, createPortal} from 'react-dom';
import PropTypes from 'prop-types';
class Popup extends Component {
  static propTypes = {
    sprefix: PropTypes.string,
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
    didUpdate: function() {},
    onMaskClick: function() {},
    onMouseEnter: function() {},
    onMouseLeave: function() {},
    onMouseDown: function() {},
    onTouchStart: function() {}
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  	this.createContainer();
  }
  componentWillReceiveProps(nextProps) {

  }
  componentDidUpdate(prevProps, prevState) {
    if(!this._component.contains(document.activeElement)) {
      this.focusElement.focus();
    }
    var didUpdate = this.props.didUpdate;
    if (didUpdate) {
      didUpdate(prevProps, this._component);
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
  render() {
  	if (this._container) {
  	  const props = this.props;
      let sprefix = props.sprefix, className;
      if(props.visible) {
        className = `${sprefix}-popup-contain ${sprefix}-popup-contain-open ${sprefix}-dropdown slide-up-enter`;
      } else {
        className = `${sprefix}-popup-contain ${sprefix}-popup-contain-hidden ${sprefix}-dropdown slide-up-leave`;
      }
  	  //this._container.className = this.props.visible ? 'popup-contain' : 'popup-contain popup-contain-hidden';
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
