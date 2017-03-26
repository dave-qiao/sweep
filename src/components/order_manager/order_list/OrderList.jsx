import React from "react";
import {Table, Icon, Popconfirm, Pagination, Button,Popover,Tooltip} from 'antd';

const OrderList = function ({orderList, total, current, onPageChange}) {
  //定义列
  const columns = [{
    title: '订单编号',
    dataIndex: 'org_order_id',
    key: 'org_order_id',
    render: (text, record) => <a href={`#/order_detail_info?order_id=${record.id}`}
                                 style={{color: "#58e2c2"}}>{text}</a>,
    fixed:'left',
    width:130
  }, /*{
    title: '店铺名称',
    dataIndex: 'shopName',
    key: 'shopName',
    width:65
  }, */{
    title: '顾客姓名',
    dataIndex: 'consigneeName',
    key: 'consigneeName',
    width:65
  }, {
    title: '顾客电话',
    dataIndex: 'mobile',
    key: 'mobile',
    width:100
  }, {
    title: '发货地址',
    dataIndex: 'consignor_address',
    key: 'consignor_address',
    render: (text, record)=>(
      <span>{text}{record.consignor_address_detail}</span>
    )
  }, {
    title: '物流商',
    dataIndex: 'shipment_name',
    key: 'shipment_name',
    width:65
  }, {
    title: '配送距离（KM）',
    dataIndex: 'distance',
    key: 'distance',
    width:110
  }, {
    title: '订单状态',
    dataIndex: 'state',
    key: 'state',
    width:80
  }, {
    title: '配送时效（min）',
    dataIndex: 'shippment_timeBar',
    key: 'shippment_timeBar',
    width:120
  }, {
    title: '订单金额（元）',
    dataIndex: 'order_amount',
    key: 'order_amount',
    width:110
  }, {
    title: '配送费（元）',
    dataIndex: 'shipping_fee',
    key: 'shipping_fee',
    width:88
  }, {
    title: '小费（元）',
    dataIndex: 'tip_fee',
    key: 'tip_fee',
    width:80
  },
    {
      title: '代收顾客（元）',
      dataIndex: 'codAmount',
      key: 'codAmount',
      width:100,
    }, {
      title: '代付商家（元）',
      dataIndex: 'payAmount',
      key: 'payAmount',
      width:100,
    },{
    title:<div>
      <Tooltip title={<article style={{fontSize:14}}>
        <p><b>1.结算方式 ：</b>为配送费结算方式，包括余额支付和现金支付；</p>
        <p><b>2.配送时效 ：</b>为送达时间与期望送达时间的差值，带括号的为早达时长；</p>
      </article>}>
        <span>结算方式&nbsp;<Icon type="question-circle-o" style={{fontSize:14}}/></span>
      </Tooltip>
    </div>,
    dataIndex: 'pay_type',
    key: 'pay_type',
    width:87
  }, {
    title: '下单时间',
    dataIndex: 'created_at',
    key: 'created_at',
    width:80
  }, {
    title: '预计送达',
    dataIndex: 'plan_shipping_time',
    key: 'plan_shipping_time',
    width:80
  }, {
    title: '送达时间',
    dataIndex: 'done_at',
    key: 'done_at',
    width:80
  }, {
    title: '订单来源',
    dataIndex: '_source_channel',
    key: '_source_channel',
    width:80
  }
  ];

  return (
    <div style={{padding: 10,overflow:'hidden'}}>
      <Table columns={columns} dataSource={orderList} pagination={false} scroll={{ x: 1760}}/>
      { total > 0 ?
        <Pagination
          className="ant-table-pagination"
          total={total} //总共条数
          showTotal={total => `共 ${total} 条`}
          current={current} //当前页
          pageSize={10} //每页显示几条
          onChange={onPageChange} //切换页码
        /> : ''
      }
    </div>
  )
};
export  default OrderList;
