import React from "react";
import style from "./Merchant.less";
import {Table, Pagination} from "antd";
import appTools from  "../../../utils/utils";

const TableList = function ({shopList,result_count,current,loading,onPageChange}) {
  const columns = [{
    title: '序号',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
  }, {
    title: '店铺ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '店铺名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '联系人',
    dataIndex: 'linkman',
    key: 'linkman',
  }, {
    title: '联系电话',
    dataIndex: 'mobile',
    key: 'mobile',
    render:(text,record)=>(<span>{text|| record.tel}</span>)
  }, {
    title: '店铺地址',
    dataIndex: 'address',
    key: 'address',
    render:(text,record)=>(<span>{text}{record.address_detail}</span>)
  }, {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
  }];
  //分页参数
  const pagination = {
    total: result_count,
    current: current,
    pageSize: 10,
    onChange: onPageChange,
  };
  return (
    <div>
      <Table dataSource={shopList} columns={columns} pagination={false} />
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

export  default  TableList;
