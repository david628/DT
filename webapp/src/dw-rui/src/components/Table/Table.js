import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
class Table extends Component {
    static propTypes = {
        sprefix: PropTypes.string,
    };
    static defaultProps = {
        sprefix: 'dldh',
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
    renderHeaders() {
        const { cm, sprefix } = this.props;
        return cm.map((item, index) => {
            return (
                <td key={ sprefix + "-grid-hd" + index } className={ sprefix + "-grid-hd dldh-grid-cell" } style={{ width: item.width,textAlign: item.align }}>
                    <div className={ sprefix + "-grid-hd-inner" }>
                        <a className={ sprefix + "-grid-hd-btn" } href=""></a>
                        <a className={ sprefix + "-grid-hd-custombtn" } href=""></a>
                        <span>{ item.header }</span>
                        <span className={ sprefix + "-grid-sort-icon" }></span>
                    </div>
                </td>
            );
        });

        // for(let i = 0; i < cm.length; i++) {
        //     hcell.push(
        //
        //     )
        //     // cell_jq.bind("mouseover", {scope : this}, this._handleHdOver);
        //     // cell_jq.bind("mousemove", {scope : this}, this._handleHdMove);
        //     // cell_jq.bind("mouseout", {scope : this}, this._handleHdOut);
        //     // cell_jq.bind("mousedown", {scope : this}, this._handleHdDown);
        //     // cell_jq.bind("click", {scope : this}, this._handleHdClick);
        //     //jQuery(cell.firstChild.firstChild).bind("click", {scope : this}, this._handleColumnMenu);
        // }
        // //jQuery(this.scroller).bind("scroll", {scope : this}, this._syncScroll);
        // return hcell;
    }
    loadData() {
        const { cm, data, sprefix } = this.props;
        let rs = [];
        if(Array.isArray(data) && data.length) {
            for(let i = 0; i < data.length; i++) {
                rs.push(
                    <div key={ sprefix + "-grid-row" + i } className={ sprefix + "-grid-row" }>
                        <table className={ sprefix + "-grid-row-table" } border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                            <tr>
                                {
                                    cm.map((item, index) => {
                                        return (
                                            <td key={ sprefix + "-grid-row" + i + sprefix + "-grid-col" + index } className={ sprefix + "-grid-col " + sprefix + "-grid-cell" } tabIndex="0" style={{ width: item.width,textAlign: item.align }}>
                                                <div className={ sprefix + "-grid-cell-inner" }>
                                                    { item.render ? item.render(data[i]) : data[i][item.dataStore] }
                                                </div>
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                            </tbody>
                        </table>
                    </div>
                );

            }
        }
        return rs;
    }
    render() {
        const { sprefix } = this.props;
        return (
            <div className={ sprefix + "-grid" } hidefocus="true">
                <div className={ sprefix + "-grid-viewport" }>
                    <div className={ sprefix + "-grid-header" }>
                        <div className={ sprefix + "-grid-header-inner" }>
                            <div className={ sprefix + "-grid-header-offset" }>
                                <table border="0" cellSpacing="0" cellPadding="0">
                                    <thead>
                                        <tr className={ sprefix + "-grid-hd-row" }>
                                            { this.renderHeaders() }
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div className={ sprefix + "-clear" }></div>
                    </div>
                    <div className={ sprefix + "-grid-scroller" }>
                        <div className={ sprefix + "-grid-body" }>
                            { this.loadData() }
                        </div>
                        <a href="#" className={ sprefix + "-grid-focus" } tabIndex="-1"></a>
                        <div className={ sprefix + "-grid-loading" }></div>
                    </div>
                </div>
                <div className={ sprefix + "-grid-resize-marker" }>&#160;</div>
                <div className={ sprefix + "-grid-resize-proxy" }>&#160;</div>
            </div>
        );
    }
}
export default Table;
