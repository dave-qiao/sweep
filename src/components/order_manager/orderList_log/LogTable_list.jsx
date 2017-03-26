import React from "react";
import {Table, Icon, Pagination, Button, Popover} from 'antd';


const LogTableList = function ({dataList, total, current, onPageChange, downloadFile}) {
  const columns = [{
    title: '导入时间',
    dataIndex: 'created_at',
    key: 'created_at',
  }, {
    title: '总导入订单数',
    dataIndex: 'total',
    key: 'total',
  }, {
    title: '成功订单数',
    dataIndex: 'pre_success_cnt',
    key: 'pre_success_cnt',
  }, {
    title: '失败订单数',
    dataIndex: 'pre_failed_cnt',
    key: 'pre_failed_cnt',
  }, {
    title: '操作(下载)',
    key: 'action',
    render: function (text, record) {
      let tag = 'inline-block';
      if (record.pre_success_cnt === 0 && record.pre_failed_cnt === 0) {
        tag = 'none';
      }
      let downBtn = {fontSize: 15, fontWeight: 700, display: tag};
      return (
        <span style={downBtn}>
           <Popover content={"下载成功订单"}>
             <a onClick={downloadFile.bind(this, record.success_file_path)}><Icon type="download"/></a>
           </Popover>
          <Popover content={"下载失败订单"}>
             <a onClick={downloadFile.bind(this, record.fail_file_path)} style={{color: "red", marginLeft: 15}}><Icon
               type="download"/></a>
           </Popover>
        </span>
      )
    }
  }];

  return (
    <div>
      <Table columns={columns} dataSource={dataList} pagination={false}/>
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
  )
};
export  default LogTableList;
