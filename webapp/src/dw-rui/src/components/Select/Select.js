import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown';
import Menu, { Item as MenuItem, ItemGroup as MenuItemGroup } from '../Menu';
class Select extends Component {
  static propTypes = {
    defaultValue: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func
  };
  static defaultProps = {
    onChange: () => {}
  };
  constructor(props) {
    super(props);
    let value = props.defaultValue || [];
    if ('value' in props) {
      value = props.value || [];
    }
    this.state = {
      visible: false,
      inputValue: '',
      value
    }
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if('value' in nextProps) {
      const { value } = nextProps;
      if(nextProps.value !== this.state.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }
  componentDidUpdate() {

  }
  getKey(singleValue) {
    return `option-${ singleValue }`;
  }
  getLableFromProps(props, value) {
    const options = this.getComopentFromChildren(props.children);
    //const optionsInfo = {};
    for(let i = 0; i < options.length; i++) {
      const item = options[i];
      const singleValue = this.getValuePropValue(item);
      if(value == singleValue) {
        return item.props.children;
      }
    }
    // options.forEach(item => {
    //   const singleValue = this.getValuePropValue(item);
    //   console.log(value == singleValue);
    //   if(value == singleValue) {
    //     return item.props.children
    //   }
    //   // optionsInfo[this.getKey(singleValue)] = {
    //   //   item,
    //   //   value: singleValue,
    //   //   label: item.props.children,
    //   //   title: item.props.title
    //   // };
    // });
    return '';
  }
  getComopentFromChildren(children, options = []) {
    children.forEach(item => {
      if (!item) {
        return;
      }
      if (item.type.isSelectOptGroup) {
        this.getComopentFromChildren(item.props.children, options);
      } else {
        options.push(item);
      }
    });
    return options;
  }
  getValuePropValue(child) {
    if (!child) {
      return null;
    }
    const props = child.props;
    if ('value' in props) {
      return props.value;
    }
    if (child.key) {
      return child.key;
    }
    if (child.type && child.type.isSelectOptGroup && props.label) {
      return props.label;
    }
  }
  getOptions = (children, childrenKeys, menuItems) => {
    let options = [];
    React.Children.forEach(children, child => {
      if (!child) {
        return;
      }
      if (child.type.isSelectOptGroup) {
        let label = child.props.label;
        let key = child.key;
        if (!key && typeof label === 'string') {
          key = label;
        } else if (!label && key) {
          label = key;
        }
        const innerItems = this.getOptions(
          child.props.children,
          childrenKeys,
          menuItems
        );
        if (innerItems.length) {
          options.push(
            <MenuItemGroup key={ key } title={ label }>
              { innerItems }
            </MenuItemGroup>
          );
        }
      } else {
        const childValue = this.getValuePropValue(child);
        const menuItem = (
          <MenuItem
            value={ childValue }
            key={ childValue }
            role="option"
            { ...child.props }
          />
        );
        menuItems.push(menuItem);
        options.push(menuItem);
      }
    });
    return options;
  };
  setValue(value) {
    this.setState({
      value: [value]
    });
  }
  setInputValue(inputValue) {
    if (inputValue !== this.state.inputValue) {
      this.setState(
        {
          inputValue
        }
      );
    }
  }
  onInputChange = (event) => {
    const v = event.target.value;
    this.setInputValue(v);
  }
  onSelect = (item) => {
    if(!('value' in this.props)) {
      if(this.state.value.indexOf(item.key) == -1) {
        this.setInputValue(item.children);
        this.setValue(item.key);
      }
    }
    this.onPopupVisibleChange(false);
    this.props.onChange(item.key, item.children, item);
  };
  onPopupVisibleChange = (visible) => {
    this.setState({
      visible
    });
  };
  render() {
    const { props, state } = this;
    const menuItems = [];
    const childrenKeys = [];
    const sprefix = `dwrui`;
    let value = state.value;
    let values;
    let hidden = false;
    if (state.inputValue) {
      hidden = true;
    }
    if (state.value.length) {
      hidden = true;
    }
    const menu = (
      <Menu
        sprefix={`${ sprefix }-select-dropdown`}
        selectedKeys={ this.state.value }
        onClick={ this.onSelect }
      >
        { this.getOptions(this.props.children, childrenKeys, menuItems) }
      </Menu>
    );
    let selectCls = [`${ sprefix }-select`],
        selectionCls = [`${ sprefix }-select-selection`],
        multipleElement = '';
    if(state.visible) {
      selectCls.push(`${ sprefix }-select-open`);
      selectCls.push(`${ sprefix }-select-focused`);
    }
    if(props.multiple) {
      selectionCls.push(`${ sprefix }-select-selection-multiple`);
      multipleElement = (
        <ul className={ `${ sprefix }-select-ul` }>
          <li className={ `${ sprefix }-select-search ${ sprefix }-select-search-inline` }>
            <div className={ `${ sprefix }-select-search-field-wrap` }>
              {/*<input className={ `${ sprefix }-select-search-field` } value={ this.state.inputValue } onChange={ this.onInputChange }/>*/}
              <span className={ `${ sprefix }-select-search-field-mirror` }></span>
            </div>
          </li>
        </ul>
      );
      values = value;
    } else {
      selectionCls.push(`${ sprefix }-select-selection-single`);
      values = value[0];
    }
    const label = this.getLableFromProps(props, values);
    return (
      <Dropdown sprefix={ `${ sprefix }-select` }
        menu={ menu }
        visible={ this.state.visible }
        onPopupVisibleChange={ this.onPopupVisibleChange }
        trigger={ "click" }
      >
        <div className={ selectCls.join(' ') }>
          <div className={ selectionCls.join(' ') }>
            <div className={ `${ sprefix }-select-selection-rendered` }>
              <div className={ `${ sprefix }-select-selection-placeholder` }
                unselectable="unselectable"
                style={{ display: hidden ? 'none' : 'block' }}
              >Please Select</div>
              <div className={ `${ sprefix }-select-selection-selected-value` } title={ label }>{ label }</div>
              { multipleElement }
            </div>
            <span className={ `${ sprefix }-select-arrow` } unselectable="on">
              <i className={ `${ sprefix }-select-arrow-icon` }>
                <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
              </i>
            </span>
          </div>
        </div>
      </Dropdown>
    );
  }
}
export default Select;
