import React from "react";
import Filter from "./Filter.jsx";
import LogTableList from "./LogTable_list.jsx";
import {connect} from "dva";
import {message,Breadcrumb} from "antd";
const OrderListLog = function ({dispatch, orderListLog}) {
  const {total, current, dataList, filter,defaultTime} = orderListLog;
  const logTableListProps = {
    total,
    current,
    dataList,
    onPageChange: function (page) {
      dispatch({type: "orderListLog/queryOrderList", payload: {page: page, filter: filter}})
    },
    downloadFile: function (fileName, event) {
      if (!fileName) {
        message.error("该文件没有地址");
        return;
      }
      //下载文件
      dispatch({
        type: "orderListLog/asyncDownloadFile",
        payload: {fileName: fileName}
      })
    }
  };
  //筛选条件属性
  const FilterProps = {
    defaultTime,
    submitSearch: function (filter) {
      dispatch({type: "orderListLog/queryOrderList", payload: {filter: filter, page: 1}})
    }
  };
  return (
    <div>
      <div style={{paddingLeft:10,paddingTop:7}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span>订单管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>订单导入记录</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{padding: 10}}>
        <Filter {...FilterProps}/>
        <LogTableList {...logTableListProps}/>
      </div>
    </div>)
};


//关联 view 和model
function mapStateToProps({orderListLog}) {
  return {orderListLog};
}

export default  connect(mapStateToProps)(OrderListLog);
