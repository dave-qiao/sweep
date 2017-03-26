import React from "react";
import {Table, Icon, Popconfirm, Pagination, Button,Tooltip} from 'antd';


const TableList = function ({dataList, current, total, onPageChange, downLoadFile}) {
  const columns = [{
    title: '日期',
    dataIndex: 'day',
    key: 'day',
  },
    {
      title: '更新日期',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },{
    title: '总订单量',
    dataIndex: 'total',
    key: 'total',
  }, {
    title: <Tooltip title={<article style={{fontSize:12,fontWeight:'none'}}>
      <div>1.订单按预计送达时间导出；</div>
      <div>2.每日上午可以下载昨日的订单明细</div>
    </article>}>
      <span>操作&nbsp;<Icon type="question-circle-o" style={{fontSize:14}}/></span>
    </Tooltip>,
    key: 'action',
    render: (text, record) => (
      <span style={{fontSize: 15, fontWeight: 700}}>
     <a onClick={downLoadFile.bind(this, record.filename)}><Icon type="download" style={{color:'#58e2c2'}}/></a>
    </span>
    ),
  }];


  return (
    <div>
      <Table columns={columns} dataSource={dataList} pagination={false}/>
      <Pagination
        className="ant-table-pagination"
        total={total} //总共条数
        current={current} //当前页
        showTotal={total => `共 ${total} 条`}
        pageSize={10} //每页显示几条
        onChange={onPageChange} //切换页码
      />
    </div>
  )
};
export  default TableList;
