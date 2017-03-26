import React from "react";
import {connect} from "dva";
import OrderList from "./OrderList.jsx";
import {Popover, Icon, Breadcrumb} from "antd";
import Filter from "./Filter.jsx";

const OrderDetailEntry = function ({dispatch, location, orderDetail}) {
  const tipsContent = (
    <article style={{fontSize: 14}}>
      <p><b>1.结算方式 ：</b>为配送费结算方式，包括余额支付和现金支付；</p>
      <p><b>2.配送时效 ：</b>为送达时间与期望送达时间的差值，带括号的为早达时长；</p>
    </article>);
  //解构传来的model 数据
  const {orderList, total, current, filter} = orderDetail;

  //筛选条件属性
  const FilterProps = {
    submitSearch: function (paramsObj) {
      dispatch({type: "orderDetail/query", payload: {filter: paramsObj, page: 1}})
    }
  };
  //表格属性
  const orderListProps = {
    orderList,
    total,
    current,
    onPageChange: function (page) {
      //将更新的filte定义到分页组件
      dispatch({type: "orderDetail/query", payload: {page: page, filter: filter}})
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
            <span>订单列表</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{marginTop: 10}}>
        <section >
          <Filter {...FilterProps} />
        </section>
        <section>
          <OrderList {...orderListProps}/>
        </section>
      </div>
    </div>)
};

//关联 view 和model
function mapStateToProps({orderDetail}) {
  return {orderDetail};
}

export default connect(mapStateToProps)(OrderDetailEntry);


