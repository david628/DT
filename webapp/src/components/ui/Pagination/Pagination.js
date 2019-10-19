import React ,{ Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
    static propTypes = {
        sprefix: PropTypes.string,
        disabled: PropTypes.bool,
        current: PropTypes.number,
        defaultCurrent: PropTypes.number,
        defaultSize: PropTypes.number,
        size: PropTypes.number,
        max: PropTypes.number,
        total: PropTypes.number,
        totalPage: PropTypes.number,
        onChange: PropTypes.func,
        onSizeChange: PropTypes.func
    };
    static defaultProps = {
        sprefix: 'dldh',
        disabled: false,
        defaultCurrent: 1,
        defaultSize: 20,
        max: 5,
        totalPage: 0,
        total: 100,
        onChange: () => {},
        onSizeChange: () => {}
    };
    constructor(props) {
        super(props);

        let current = props.defaultCurrent;
        if ('current' in props) {
            current = props.current;
        }

        let size = props.defaultSize;
        if ('size' in props) {
            size = props.size;
        }

        let total = props.total;
        if ('total' in props) {
            total = props.total;
        }

        this.state = {
            current,
            size,
            inputValue: current
        };
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        // const { size } = nextProps;
        // if(this.isInteger(size) && size !== this.state.size) {
        //     this.setState({
        //         size
        //     });
        // }
    }
    componentDidUpdate() {

    }
    getCls(is, isDisable) {
        let rs = [`${this.props.sprefix}-pagination-item`];
        if(is) {
            rs.push(`${ this.props.sprefix }-pagination-item-active`);
        }
        if(isDisable) {
            rs.push(`${ this.props.sprefix }-pagination-disabled`);
        }
        return rs.join(' ');
    }
    handleClick = (param, isDisabled) => {
        if(isDisabled) {
            return;
        }
        return (e) => {
            let totalPage = this.getTotalPage();
            if(param === 'first') {
                this.setCurrentPage(1);
            } else if(param === 'prev') {
                this.setCurrentPage(Math.max(1, this.state.current - 1));
            } else if(param === 'next') {
                this.setCurrentPage(Math.min(totalPage, this.state.current + 1));
            } else if(param === 'last') {
                this.setCurrentPage(totalPage);
            } else {
                this.setCurrentPage(Number(param));
            }
        }
    }
    // onChange = e => {
    //     this.setState({
    //         current: Number(e.target.value)
    //     });
    // }
    getTotalPage() {
        return Math.ceil(this.props.total / this.state.size);
    }
    handleChange = (e) => {
        //let v = e.target.value;
        //v = isNaN(v) ? this.state.current : Number(v);
        //inputValue
        //this.setCurrentPage(v);
        this.setState({
            inputValue: e.target.value,
        });
    }
    isInteger(value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    }
    isValid(page) {
        return this.isInteger(page) && page !== this.state.current;
    }
    getInputValue() {
        const { inputValue, current } = this.state;
        return isNaN(inputValue) ? current : Number(inputValue);
    }
    handleBlur = (e) => {
        const { current } = this.state;
        let v = this.getInputValue();
        if(v !== this.state.current) {
            this.setCurrentPage(v);
        } else {
            this.setState({
                inputValue: this.state.current
            });
        }
    }
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            e.target.blur();
        }
    }
    setCurrentPage = (p) => {
        const { disabled } = this.props;
        let page = p;
        if (this.isValid(page) && !disabled) {
            let totalPage = this.getTotalPage();
            if (page > totalPage) {
                page = totalPage;
            } else if (page < 1) {
                page = 1;
            }
            if (!('current' in this.props)) {
                this.setState({
                    current: page,
                    inputValue: page
                });
            }
            this.props.onChange(page, this.state.size);
            return page;
        }
        return this.state.current;
    }
    getParam() {
        let param = {};
        param.start = (this.state.current - 1) * this.state.size;
        param.limit = this.state.size;
        return param;
    }
    renderElement() {
        const { sprefix, max } = this.props;
        const rs = [];
        let totalPage = this.getTotalPage();
        if(totalPage <= max + 2) {
            for(let i = 0; i < totalPage; i++) {
                rs.push(
                    <li key={ i + 1 } className={ this.getCls(this.state.current === i + 1) } onClick={ this.handleClick(i + 1, this.state.current === i + 1) }>
                        <a className={ `${ sprefix }-pagination-link` }>{ i + 1 }</a>
                    </li>
                );
            }
        } else {
            if(this.state.current < max) {
                for(let i = 0; i < max; i++) {
                    rs.push(
                        <li key={ i + 1 } className={ this.getCls(this.state.current === i + 1) } onClick={ this.handleClick(i + 1, this.state.current === i + 1) }>
                            <a className={ `${ sprefix }-pagination-link` }>{ i + 1 }</a>
                        </li>
                    );
                }
                rs.push(
                    <li key={ -4 } className={ this.getCls() }>
                        <a className={ `${ sprefix }-pagination-link` }>...</a>
                    </li>
                );
                rs.push(
                    <li key={ totalPage } className={ this.getCls(this.state.current === totalPage) } onClick={ this.handleClick(totalPage, this.state.current === totalPage) }>
                        <a className={ `${ sprefix }-pagination-link` }>{ totalPage }</a>
                    </li>
                );
            }  else {
                rs.push(
                    <li key={ 1 } className={ this.getCls(this.state.current === 1) } onClick={ this.handleClick(1, this.state.current === 1) }>
                        <a className={ `${ sprefix }-pagination-link` }>{ 1 }</a>
                    </li>
                );
                rs.push(
                    <li key={ -3 } className={ this.getCls() }>
                        <a className={ `${ sprefix }-pagination-link` }>...</a>
                    </li>
                );
                let start = 0, end = this.state.current - 1 + max;
                if(end >= totalPage) {
                    if(end - totalPage === 1) {
                        start = 0;
                    } else if(end - totalPage >= 2) {
                        start = end - totalPage - 1;
                    }
                    end = totalPage + 1;
                }
                for(let i = this.state.current - 1 - start; i < end; i++) {
                    rs.push(
                        <li key={ i } className={ this.getCls(this.state.current === i) } onClick={ this.handleClick(i, this.state.current === i) }>
                            <a className={ `${ sprefix }-pagination-link` }>{ i }</a>
                        </li>
                    );
                }
                if(this.state.current + max < totalPage) {
                    rs.push(
                        <li key={ -4 } className={ this.getCls() }>
                            <a className={ `${ sprefix }-pagination-link` }>...</a>
                        </li>
                    );
                    rs.push(
                        <li key={ totalPage } className={ this.getCls(this.state.current === totalPage) } onClick={ this.handleClick(totalPage, this.state.current === totalPage) }>
                            <a className={ `${ sprefix }-pagination-link` }>{ totalPage }</a>
                        </li>
                    );
                } else if(this.state.current + max === totalPage) {
                    rs.push(
                        <li key={ totalPage - 1 } className={ this.getCls(this.state.current === totalPage - 1) } onClick={ this.handleClick(totalPage - 1, this.state.current === totalPage - 1) }>
                            <a className={ `${ sprefix }-pagination-link` }>{ totalPage - 1 }</a>
                        </li>
                    );
                    rs.push(
                        <li key={ totalPage } className={ this.getCls(this.state.current === totalPage) } onClick={ this.handleClick(totalPage, this.state.current === totalPage) }>
                            <a className={ `${ sprefix }-pagination-link` }>{ totalPage }</a>
                        </li>
                    );
                }
            }
        }
        return rs;
    }
    render() {
        const { sprefix } = this.props;
        let totalPage = this.getTotalPage();
        return (
            <div className={ `${ sprefix }-pagination` }>
                <ul className={ `${ sprefix }-pagination-list` }>
                    <li className={ this.getCls(false, this.state.current === 1) } onClick={ this.handleClick('first', this.state.current === 1) }>
                        <a className={ `${ sprefix }-pagination-link` }>
                            <i className={ `${ sprefix }-icon` }>
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="double-left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path>
                                </svg>
                            </i>
                        </a>
                    </li>
                    <li className={ this.getCls(false, this.state.current === 1) } onClick={ this.handleClick('prev', this.state.current === 1) }>
                        <a className={ `${ sprefix }-pagination-link` }>
                            <i className={ `${ sprefix }-icon` }>
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                                </svg>
                            </i>
                        </a>
                    </li>
                    { this.renderElement() }
                    <li className={ this.getCls(false, this.state.current === totalPage) } onClick={ this.handleClick('next', this.state.current === totalPage) }>
                        <a className={ `${ sprefix }-pagination-link` }>
                            <i className={ `${ sprefix }-icon` }>
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                                </svg>
                            </i>
                        </a>
                    </li>
                    <li className={ this.getCls(false, this.state.current === totalPage) } onClick={ this.handleClick('last', this.state.current === totalPage) }>
                        <a className={ `${ sprefix }-pagination-link` }>
                            <i className={ `${ sprefix }-icon` }>
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="double-right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"></path>
                                </svg>
                            </i>
                        </a>
                    </li>
                    <li className={ `${ sprefix }-pagination-options` }>
                        <div className={ `${ sprefix }-pagination-search` }>
                            <input
                                className={ `${ sprefix }-pagination-search-input` }
                                //value={ this.state.current }
                                type="text"
                                value={ this.state.inputValue }
                                onChange={ this.handleChange }
                                onKeyUp={ this.handleKeyUp }
                                onBlur={ this.handleBlur }
                                type="text"
                            />
                            <span className={ `${ sprefix }-pagination-divider` }></span>
                            <span className={ `${ sprefix }-pagination-unit` }>共</span>
                            <span className={ `${ sprefix }-pagination-total` }>{ this.props.total }</span>
                            <span className={ `${ sprefix }-pagination-unit` }>条</span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Pagination;
