import React from "react";
import {connect} from "dva";
import TabControl from "./BulkImportTab.jsx";
import DetailSuccessList from "./BulkImportSuccessList.jsx";
import DetailFailList from "./BulkImportFailList.jsx";


const BulkImportDetailEntry = function ({location, dispatch, bulkImportDetail }) {

  //解构从Model 传来props
  const {
    activeKey, //默认success
    successList,
    failList,
    total,
    current,
    visible,
    task_id
  }  = bulkImportDetail;

  //成功列表 属性 分页方法加数据
  const detailSuccessListProps = {
    successList,
    total,
    visible,
    current,
    task_id,
    dispatch
  };

  //失败比列表属性 分页方法加数据
  const detailFailListProps = {
    failList,
    total,
    current,
    task_id,
    dispatch
  };

  // tab 属性
  const tabControlProps = {
    activeKey,
    detailSuccessList:<DetailSuccessList {...detailSuccessListProps}/>,
    detailFailList:<DetailFailList {...detailFailListProps}/>,
    changeTab:function (value) {
      //调用异步方法，切换Tab的时候发送请求
      dispatch({
        type:"bulkImportDetail/changeTab",
        payload:value //"success/fail"
      })
    }
  };
  return(
    <div>
      <TabControl {...tabControlProps} />
    </div>
  )
};

//关联 view 和model
function mapStateToProps({ bulkImportDetail }) {
  return { bulkImportDetail };
}

export default connect(mapStateToProps)(BulkImportDetailEntry);

