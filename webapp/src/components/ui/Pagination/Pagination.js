import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
function calculatePage(p, state, props) {
    let size = p;
    if (typeof size === 'undefined') {
        size = state.size;
    }
    return Math.floor((props.total - 1) / size) + 1;
}
class Pagination extends Component {
    static propTypes = {
        sprefix: PropTypes.string,
        current: PropTypes.number,
        size: PropTypes.number,
        total: PropTypes.number,
        onChange: PropTypes.func,
        onSizeChange: PropTypes.func
    };
    static defaultProps = {
        sprefix: 'dldh',
        current: 1,
        size: 20,
        total: 100,
        onChange: () => {},
        onSizeChange: () => {}
    };
    constructor(props) {
        super(props);
        let current = props.current;
        if ('current' in props) {
            current = props.current;
        }
        let size = props.size;
        if ('size' in props) {
            size = props.size;
        }
        this.state = {
            current,
            inputValue: current,
            size
        };
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

    }
    componentDidUpdate() {

    }
    render() {
        const { sprefix, current, total } = this.props;
        return (
            <div className={ `${ sprefix }-pagination` }>
                <ul className={ `${ sprefix }-pagination-list` }>
                    <li className={ `${ sprefix }-pagination-item` }>
                        <a className={ `${ sprefix }-pagination-link` }>
                            <i className={ `${ sprefix }-icon` }>
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="double-left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path>
                                </svg>
                            </i>
                        </a>
                    </li>
                    <li className={ `${ sprefix }-pagination-item` }>
                        <a className={ `${ sprefix }-pagination-link` }>
                            <i className={ `${ sprefix }-icon` }>
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                                </svg>
                            </i>
                        </a>
                    </li>
                    <li className={ `${ sprefix }-pagination-item ant-pagination-item-active` }>
                        <a className={ `${ sprefix }-pagination-link` }>1</a>
                    </li>
                    <li className={ `${ sprefix }-pagination-item` }>
                        <a className={ `${ sprefix }-pagination-link` }>2</a>
                    </li>
                    <li className={ `${ sprefix }-pagination-item` }>
                        <a className={ `${ sprefix }-pagination-link` }>3</a>
                    </li>
                    <li className={ `${ sprefix }-pagination-item` }>
                        <a className={ `${ sprefix }-pagination-link` }>
                            <i className={ `${ sprefix }-icon` }>
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                                </svg>
                            </i>
                        </a>
                    </li>
                    <li className={ `${ sprefix }-pagination-item` }>
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
                            <input className={ `${ sprefix }-pagination-search-input` } type="text"/>
                            <span className={ `${ sprefix }-pagination-divider` }>/</span>
                            <span className={ `${ sprefix }-pagination-total` }>100</span>
                            <span className={ `${ sprefix }-pagination-unit` }>页</span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Pagination;
