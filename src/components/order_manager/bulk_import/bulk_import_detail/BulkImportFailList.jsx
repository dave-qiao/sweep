import React from "react";
import { Table, Icon,Popconfirm, Pagination,Button } from 'antd';

const btnCss = {
  marginRight:20,
  fontSize:14
};
const DetailFailList = function ({failList,total,task_id,current,dispatch}) {
  const columns = [{
    title: '店铺ID',
    dataIndex: 'shop_id',
    key: 'shop_id'
  }, {
    title: '店铺名称',
    dataIndex: 'shop_name',
    key: 'shop_name',
  }, {
    title: '顾客姓名',
    dataIndex: 'customer_name',
    key: 'customer_name',
  },
    {
      title: '顾客电话',
      dataIndex: 'customer_phone',
      key: 'customer_phone',
    },
    {
      title: '发货地址',
      dataIndex: 'pickup_address',
      key: 'pickup_address',
    },
    {
      title: '服务商',
      dataIndex: 'vendorName',
      key: 'vendorName',
    },
    {
      title: '顾客地址',
      dataIndex: 'customer_address',
      key: 'customer_address',
      render:(text,record)=>(
        <span>{text}{record.customer_address_detail}</span>)
    },{
      title: '配送费(元)',
      dataIndex: 'shipping_fee',
      key: 'shipping_fee',
    },{
      title: '订单金额(元)',
      dataIndex: 'order_amount',
      key: 'order_amount',
    },{
      title: '小费(元)',
      dataIndex: 'tip_fee',
      key: 'tip_fee',
    }
    ,{
      title: '捎句话',
      dataIndex: 'note',
      key: 'note',
    },{
      title: '期望送达',
      dataIndex: 'plan_shipping_date',
      key: 'plan_shipping_date',
      render:(text,record)=>(
        <span>{text}&nbsp;{record.plan_shipping_time}</span>
      )
    },{
      title: '错误提示',
      dataIndex: 'error_flag_list',
      key: 'error_flag_list',
      width: 200,
      render:(text,record)=>(
        <span style = {{color:"red"}}>{record.error_flag_list.join(",")}</span>
      )
}];

  function onPageChange(page) {
    dispatch({type:"bulkImportDetail/queryOrderlist",payload:{page:page,activeKey:"fail"}});
  }
  function downloadFile() {
    dispatch({type:"bulkImportDetail/downloadFile",payload:{task_id:task_id,tag:"fail"}});
  };
  return(
    <div style={{padding:15}}>
      <section style={{textAlign:"right",marginBottom:15}}>
        <Button style={btnCss} onClick={downloadFile} disabled={total===0?true:false}><Icon type="download" />下载失败订单</Button>
      </section>
      <Table columns={columns} dataSource={failList} pagination={false} />
      <Pagination
        className="ant-table-pagination"
        total={total} //总共条数
        showTotal={total => `共 ${total} 条`}
        current={current} //当前页
        pageSize={10} //每页显示几条
        onChange={onPageChange} //切换页码
      />
    </div>
  )
};
export  default DetailFailList;

