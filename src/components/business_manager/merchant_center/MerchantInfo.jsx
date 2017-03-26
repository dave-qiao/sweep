import  React from "react";
import { Alert,Card,Spin,Row,Col} from 'antd';
import {connect} from "dva";
import {ChecKTag} from "./CheckTags.jsx";
import style from "./Merchant.less"
import appTools from "../../../utils/utils";
import TableList from "./TableList.jsx";
import {Breadcrumb} from 'antd';
 const MerchantInfo = function ({location, dispatch, merchant}) {
   const{baseInfo,shopList,result_count,current,loading,userInfo} = merchant;

   const TableListProps = {
     shopList,
     result_count,
     current,
     loading,
     onPageChange:function (page) {
       //分页
       dispatch({
         type:"merchant/queryShopsInfo",
         payload:{page: page}
       })
     },
   };

  return(
    <Spin tip="加载中..." spinning={merchant.loading}>
      <div style={{paddingLeft:10,paddingTop:7}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span>业务管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>商户中心</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div id={style.header}>
        <section className={style.navInfo}><span className={style.title}>基本信息</span></section>
        <div>
          <div className={style.baseInfo}>
            {/*<table>
              <tbody>
              <tr>
                <td><span>城市:</span></td>
                <td>{appTools.getProvinceName(baseInfo.city_code)}</td>
                <td><span>商户号:</span></td>
                <td>{baseInfo.seller_no}</td>
              </tr>
              <tr>
                <td><span>商户名称:</span></td>
                <td>{baseInfo.name}</td>
                <td><span>商户类型:</span></td>
                <td>{appTools.statusCodeTransform('seller_type',baseInfo.seller_type)}</td>
              </tr>
              <tr>
                <td><span>真实姓名:</span></td>
                <td>{baseInfo.biz_profile.legal_name}</td>
                <td><span>注册手机:</span></td>
                <td>{userInfo[0]?userInfo[0].mobile:""}</td>
              </tr>
              </tbody>
            </table>*/}
            <Row type="flex">
              <Col span={14} style={{lineHeight:4}}>
                <Row type="flex">
                  <Col span={6} style={{textAlign:'right'}}>城市:</Col>
                  <Col span={6}>&nbsp;{appTools.getProvinceName(baseInfo.city_code)}</Col>
                  <Col span={6} style={{textAlign:'right'}}>商户号:</Col>
                  <Col span={6}>&nbsp;{baseInfo.seller_no}</Col>
                </Row>
                <Row type="flex">
                  <Col span={6} style={{textAlign:'right'}}>商户名称:</Col>
                  <Col span={6}>&nbsp;{baseInfo.name}</Col>
                  <Col span={6} style={{textAlign:'right'}}>商户类型:</Col>
                  <Col span={6}>&nbsp;{appTools.statusCodeTransform('seller_type',baseInfo.seller_type)}</Col>
                </Row>
                <Row type="flex">
                  <Col span={6} style={{textAlign:'right'}}>真实姓名:</Col>
                  <Col span={6}>&nbsp;{baseInfo.biz_profile.legal_name}</Col>
                  <Col span={6} style={{textAlign:'right'}}>注册手机:</Col>
                  <Col span={6}>&nbsp;{userInfo[0]?userInfo[0].mobile:""}</Col>
                </Row>
              </Col>
              <Col span={10}><div className={style.sellerStatus}>
                <ChecKTag verify_state={merchant.baseInfo.verify_state}/>
              </div></Col>
            </Row>
            {/*商户状态*/}
          </div>
        </div>
        <section className={style.navInfo}><span className={style.title}>店铺信息</span></section>
        <div>
            <TableList {...TableListProps} />
        </div>
      </div>
     </Spin>
  )
};

//关联 view 和model
function mapStateToProps({ merchant }) {
  return { merchant };
}

export default connect(mapStateToProps)(MerchantInfo);
