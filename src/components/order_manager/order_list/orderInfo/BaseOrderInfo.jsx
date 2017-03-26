import React from "react";
import {connect} from "dva";
import style from "./orderInfo.less";
import TableList from "./TableList.jsx";
import {Button, Row, Col,Breadcrumb} from "antd";

const BaseOrderInfo = function ({orderDetailInfo,dispatch}) {
  const {baseInfo, shipmentTrace, result_count,current, shipmentInfo} = orderDetailInfo;
  const tableListProps = {
    shipmentTrace,
    result_count,
    current,
    onPageChange:function (page) {
      //分页
      dispatch({
        type:"orderDetailInfo/queryShipmentInfo",
        payload:{page: page}
      })
    },
  };
  return (
    <div>
      <div style={{paddingLeft:10,paddingTop:7}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span>业务管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span><a href="#/order_list">订单列表</a></span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>订单详情</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div id={style.orderInfo_wrap}>
        <div>
          <div className={style.header}><span className={style.title}>订单基本信息</span></div>
          <div className={style.border}></div>
          {/*<ul>
           <li>
           <span><span>订单编号:&nbsp;</span>{baseInfo.org_order_id}</span>
           <span><span>期望送达:&nbsp;</span>{baseInfo.plan_shipping_time}</span>
           </li>
           <li>
           <span><b>商家名称:&nbsp;</b>{baseInfo.sellerName}</span>
           <span><b>下单时间:&nbsp;</b>{baseInfo.created_at}</span>
           </li>
           <li>
           <span><b>商品类型:&nbsp;</b>{baseInfo.item_type}</span>
           <span><b>顾客姓名:&nbsp;</b>{baseInfo.consignee_name}</span>
           </li>
           <li>
           <span><b>店铺名称:&nbsp;</b>{baseInfo.sellerName}</span>
           <span><b>顾客电话:&nbsp;</b>{baseInfo.consignee_mobile}</span>
           </li>
           <li>
           <span><b>商家联系人:&nbsp;</b>{baseInfo.consignor_name}</span>
           <span><b>顾客地址:&nbsp;</b>{baseInfo.consignee_address_detail}</span>
           </li>
           <li>
           <span><b>商家电话:&nbsp;</b>{baseInfo.consignor_mobile}</span>
           <span><b>物流商:&nbsp;</b>{baseInfo.vendorName}</span>
           </li>
           <li>
           <span><b>发货地址:&nbsp;</b>{baseInfo.consignor_address_detail}</span>
           <span><b>所属商圈:&nbsp;</b>{shipmentInfo.area_name}</span>
           </li>
           <li>
           <span><b>配送距离:&nbsp;</b>{baseInfo.distance} KM</span>
           <span><b>配送费:&nbsp;</b>{baseInfo.shipping_fee}</span>
           </li>
           <li>
           <span><b>订单备注:&nbsp;</b>{baseInfo.note || '--'}</span>
           <span><b>结算方式:&nbsp;</b>{baseInfo.pay_type}</span>
           </li>
           <li>
           <span><b>订单金额:&nbsp;</b>{baseInfo.order_amount}</span>
           <span><b>关闭原因:&nbsp;</b>{baseInfo.closed_type || '无'}</span>
           </li>
           <li>
           <span><b>小费:&nbsp;</b>{baseInfo.tip_fee}</span>
           </li>
           </ul>*/}
          <Row type="flex">
            <Col span={20} style={{lineHeight: 4}}>
              <Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>订单编号:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.org_order_id}</Col>
                <Col span={6} style={{textAlign: 'right'}}>期望送达:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.plan_shipping_time}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>条形编码:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.barcode}</Col>
                <Col span={6} style={{textAlign: 'right'}}>订单金额:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.order_amount}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>商家名称:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.sellerName}</Col>
                <Col span={6} style={{textAlign: 'right'}}>下单时间:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.created_at}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>商品类型:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.item_type}</Col>
                <Col span={6} style={{textAlign: 'right'}}>顾客姓名:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.consignee_name}</Col>
              </Row>
              <Row type="flex">
                {/*<Col span={6} style={{textAlign: 'right'}}>店铺名称:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.shopName}</Col>*/}
                <Col span={6} style={{textAlign: 'right'}}>结算方式:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.pay_type}</Col>
                <Col span={6} style={{textAlign: 'right'}}>顾客电话:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.consignee_mobile}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>商家联系人:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.consignor_name}</Col>
                <Col span={6} style={{textAlign: 'right'}}>顾客地址:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.consignee_address_detail}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>商家电话:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.consignor_mobile}</Col>
                <Col span={6} style={{textAlign: 'right'}}>物流商:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.vendorName}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>发货地址:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.consignor_address_detail}</Col>
                <Col span={6} style={{textAlign: 'right'}}>所属区域:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.areaName}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>代收顾客:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.codAmount}</Col>
                <Col span={6} style={{textAlign: 'right'}}>代付商家:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.payAmount}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>配送距离:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.distance} KM</Col>
                <Col span={6} style={{textAlign: 'right'}}>配送费:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.shipping_fee}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>异常原因:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.error_type || '无'}</Col>
                <Col span={6} style={{textAlign: 'right'}}>小费:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.tip_fee}</Col>
              </Row>
              <Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>关闭原因:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.closed_type || '无'}</Col>
                <Col span={6} style={{textAlign: 'right'}}>订单备注:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.note || '无'}</Col>
              </Row>
              {/*<Row type="flex">
                <Col span={6} style={{textAlign: 'right'}}>异常原因:</Col>
                <Col span={6}>&nbsp;&nbsp;{baseInfo.error_type || '无'}</Col>

              </Row>*/}
            </Col>
          </Row>
        </div>
        <div>
          <div className={style.header}><span className={style.title}>物流追踪</span></div>
          <div className={style.border} style={{ marginLeft: '15px'}}>
            <Row>
              <Col span={6}>运单号：{shipmentInfo.shipment_id}</Col>
              <Col span={6}>配送商圈：{shipmentInfo.area_name || '无'}</Col>
              <Col span={6}>骑士：{shipmentInfo.courier_name || '无'}</Col>
              <Col span={6}>联系电话：{shipmentInfo.courier_mobile || '无'}</Col>
            </Row>
          </div>
          <div style={{padding: 10}}>
            <TableList {...tableListProps}/>
          </div>
          <div style={{textAlign: "center"}}>
            <Button type="primary" style={{
              padding: "5px 100px",
              margin: "20px auto",
              fontSize: "15px"
            }}><a href="#/order_list">返回</a></Button>
          </div>
        </div>
      </div>
    </div>
  )
};

//关联 view 和model
function mapStateToProps({orderDetailInfo}) {
  return {orderDetailInfo};
}

export default connect(mapStateToProps)(BaseOrderInfo);
