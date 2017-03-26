import React from "react";
import {Table, Pagination} from "antd";
const TableList = function ({shipmentTrace,result_count,current, onPageChange}) {

  const columns = [{
    title: '运单状态',
    width:200,
    dataIndex: 'state',
    key: 'state',
  }, {
    title: '操作',
    width:200,
    dataIndex: 'opration',
    key: 'opration',
  }, {
    title: '操作时间',
    width:200,
    dataIndex: 'created_at',
    key: 'created_at',
  }, {
    title: '操作人（手机号）',
    width:200,
    dataIndex: 'operator_name',
    key: 'operator_name',
    render:(text,record)=>(<span>{`${text}(${record.operator_mobile})`}</span>)
  }, {
    title: '备注',
    width:300,
    dataIndex: 'note',
    key: 'note',
  }];
  //分页参数
  const pagination = {
    total: result_count,
    current: current,
    pageSize: 10,
    onChange: onPageChange,
  };
  const total = result_count;
  return(
    <div>
      <Table dataSource={shipmentTrace} columns={columns} pagination={false} />
      { result_count>0?
        <Pagination
          className="ant-table-pagination"
          showTotal={ () => `共 ${result_count} 条`}
          {...pagination}
        />: ''
      }
    </div>

  )
};

export default TableList;
