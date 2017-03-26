import React from "react";
import Filter from "./Filter.jsx";
import TableList from "./TableList.jsx";
import {connect} from "dva";
import {Popover, Icon,Breadcrumb} from 'antd';
const OderDetailDownload = function ({dispatch, orderDetailDownload}) {
  const {current, total, dataList, filter,defaultTime} = orderDetailDownload;
  const tableListProps = {
    dataList,
    current,
    total,
    downLoadFile: function (filename) {
      dispatch({type: 'orderDetailDownload/downLoadFile', payload: {filename: filename}})
    },
    onPageChange: function (page) {
      dispatch({type: 'orderDetailDownload/query', payload: {page: page, filter: filter}});
    }
  };
  const filterPros = {
    defaultTime,
    submitSearch: function (params) {
      dispatch({type: "orderDetailDownload/query", payload: {page: 1, filter: params}})
    }
  };

  const tipsContent = (
    <article style={{fontSize: 12}}>
      <p>1.订单按预计送达时间导出；</p>
      <p>2.每日上午可以下载昨日的订单明细</p>
    </article>);

  return (
    <div>
      <div style={{paddingLeft:10,paddingTop:7}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span>订单管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>订单列表明细</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{padding: 10}}>
        <Filter {...filterPros} />
        <TableList {...tableListProps} />
      </div>
    </div>)
};

//关联 view 和model
function mapStateToProps({orderDetailDownload}) {
  return {orderDetailDownload};
}

export default connect(mapStateToProps)(OderDetailDownload);



