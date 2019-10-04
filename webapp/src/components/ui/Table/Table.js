import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
class Table extends Component {
    static propTypes = {

    };
    static defaultProps = {

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
        const { cm } = this.props;
        return cm.map((item, index) => {
            return (
                <td key={ "dldh-grid-hd" + index } className="dldh-grid-hd dldh-grid-cell" style={{ width: item.width,textAlign: item.align }}>
                    <div className="dldh-grid-hd-inner dldh-grid-hd-{id}">
                        <a className="dldh-grid-hd-btn" href=""></a>
                        <a className="dldh-grid-hd-custombtn" href=""></a>
                        <span>{ item.header }</span>
                        <span className="dldh-grid-sort-icon"></span>
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
        const { cm, data } = this.props;
        let rs = [];
        if(Array.isArray(data) && data.length) {
            for(let i = 0; i < data.length; i++) {
                rs.push(
                    <div key={ "dldh-grid-row" + i } className="dldh-grid-row">
                        <table className="dldh-grid-row-table" border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                            <tr>
                                {
                                    cm.map((item, index) => {
                                        return (
                                            <td key={ "dldh-grid-row" + i + "dldh-grid-col" + index } className="dldh-grid-col dldh-grid-cell" tabIndex="0" style={{ width: item.width,textAlign: item.align }}>
                                                <div className="dldh-grid-cell-inner">
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
        return (
            <div className="dldh-grid" hidefocus="true">
                <div className="dldh-grid-viewport">
                    <div className="dldh-grid-header">
                        <div className="dldh-grid-header-inner">
                            <div className="dldh-grid-header-offset">
                                <table border="0" cellSpacing="0" cellPadding="0">
                                    <thead>
                                        <tr className="dldh-grid-hd-row">
                                            { this.renderHeaders() }
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div className="dldh-clear"></div>
                    </div>
                    <div className="dldh-grid-scroller">
                        <div className="dldh-grid-body">
                            { this.loadData() }
                        </div>
                        <a href="#" className="dldh-grid-focus" tabIndex="-1"></a>
                        <div className="dldh-grid-loading"></div>
                    </div>
                </div>
                <div className="dldh-grid-resize-marker">&#160;</div>
                <div className="dldh-grid-resize-proxy">&#160;</div>
            </div>
        );
    }
}
export default Table;
