import React from 'react';
import { Table,Icon,Pagination} from 'antd';

const columns = [{
  title: '签约ID',
  dataIndex: 'contract_id',
  key: 'contractId',
  render: (text,record)=> <a href={`#/contract_detail?contract_id=${record.contract_id}`} style={{color:'#58e2c2'}}>{text}</a>
},{
  title: '服务商',
  dataIndex: 'vendorName',
  key: 'vendorName'
}, {
  title: '产品名称',
  dataIndex: 'serviceName',
  key: 'serviceName'
}, {
  title: '最新更新时间',
  dataIndex: 'updated_at',
  key: 'updated_at'
}, {
  title: '签约时间',
  dataIndex: 'created_at',
  key: 'created_at'
}, {
  title: '解约时间',
  dataIndex: 'unsigned_at',
  key: 'unsigned_at'
}, {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  }
];


const ContractList = function ({total,current,onPageChange,dataSource,loading}) {
  //传入子组件的属性
    return (
      <div style={{padding:10}}>
        <Table columns={columns} dataSource={dataSource} pagination={false} loading={false}/>
        {
          total > 0 ?
            <Pagination
              className="ant-table-pagination"
              total={total} //总共条数
              showTotal={total => `共 ${total} 条`}
              current={current} //当前页
              pageSize={10} //每页显示几条
              onChange={onPageChange} //切换页码
            /> :
            ''
        }
      </div>
    );
};

export default ContractList;
