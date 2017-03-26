import React, { PropTypes } from 'react';
import {connect} from "dva";
import SelectFilter from "./SelectFilter.jsx";
import  ContractList  from "./ContractList.jsx"
import {Breadcrumb} from 'antd';
const Contract = function ({location, dispatch, contract}) {
  //解构props
  const {total,current,dataSource,loading,queryType} = contract;
  //更改筛选条件
  function selectFilter(value) {
    dispatch({
      type:"contract/filterOption",
      payload:value  //分页：当前页
    })
  }
  //定义传入子组件的属性
  const selectFilterProps = {
    selectFilter : selectFilter
  };
  const contractListProps = {
    total,
    current,
    dataSource,
    loading,
    onPageChange:function (page) {
      //分页
      dispatch({
        type:"contract/query",
        payload:{page:page,queryType:queryType}
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
            <span>签约记录</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/*条件筛选*/}
      <SelectFilter {...selectFilterProps}/>
      {/*数据展示*/}
      <ContractList {...contractListProps}/>
    </div>
  )
};
//关联 view 和model
function mapStateToProps({ contract }) {
  return { contract };
}

export default  connect(mapStateToProps)(Contract)
