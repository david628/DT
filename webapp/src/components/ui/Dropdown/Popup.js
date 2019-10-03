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
  	//console.log('start');
  }
  componentWillReceiveProps(nextProps) {

  }
  componentDidUpdate(prevProps, prevState) {
    var didUpdate = this.props.didUpdate;
    if (didUpdate) {
      //console.log('componentDidUpdate');
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
  savePopup = (node) => {
    this._component = node;
  }
  onMaskClick = e => {
    this.props.onMaskClick(e);
  }
  render() {
  	if (this._container) {
  	  const props = this.props;
      let sprefix = props.sprefix, className, mask;
      if(props.mask) {
        mask = <div className={ this.props.visible ? sprefix + "-popup-mask" : sprefix + "-popup-mask " + sprefix + "-popup-mask-hidden"} onClick={ this.onMaskClick }></div>;
      }
      if(props.visible) {
        className = `${sprefix}-popup-contain ${sprefix}-popup-contain-open ${sprefix}-dropdown slide-up-enter`;
      } else {
        className = `${sprefix}-popup-contain ${sprefix}-popup-contain-hidden ${sprefix}-dropdown slide-up-leave`;
      }
  	  //this._container.className = this.props.visible ? 'popup-contain' : 'popup-contain popup-contain-hidden';
      return ReactDOM.createPortal(
        <div className={ sprefix + "-popup-inner" }>
          { mask }
          <div
            className={ className }
            onMouseEnter={ props.onMouseEnter }
            onMouseLeave={ props.onMouseLeave }
            onMouseDown={ props.onMouseDown }
            onTouchStart={ props.onTouchStart }
            ref={ this.savePopup }
          >
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
