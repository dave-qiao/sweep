import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'dva/router';
import LoginPage from './routes/login_page/LoginPage.jsx';
import NotFound from "./routes/not_found/NotFound.jsx"
import MainLayout from "./routes/MainLayout.jsx";
/*全局设置时间*/
import moment from 'moment-timezone/moment-timezone';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
moment.tz.add('Asia/Shanghai|CST CDT|-80 -90|01010101010101010|-1c1I0 LX0 16p0 1jz0 1Myp0 Rb0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6');
moment.tz.setDefault('Asia/Beijing');
/*导入路由部分*/
import Merchant from "./components/business_manager/merchant_center/MerchantInfo.jsx";
import Contract from "./components/business_manager/contract_list/Contract.jsx";
import ContractDetail from "./components/business_manager/contract_list/ContractDetail.jsx";
import BulkImport from "./components/order_manager/bulk_import/BulkImportEntry.jsx";
import BulkImportDetailEntry from"./components/order_manager/bulk_import/bulk_import_detail/BulkImportDetailEntry.jsx";
import OrderDetailEntry from"./components/order_manager/order_list/OrderDetailEntry.jsx";
import OrderListLog from "./components/order_manager/orderList_log/OrderListLog.jsx";
import OrderDetailDownLoad from "./components/order_manager/orderList_detail_download/OrderDetailDownLoad.jsx";
import  BaseOrderInfo from "./components/order_manager/order_list/orderInfo/BaseOrderInfo.jsx";
import  "antd/dist/antd.css";


/*
 *
 * 获得项目主路由
 * MainLayout 下面为嵌套路由
 * */
export default function ({history}) {
  return (
    <Router history={history}>
      {/*首页为登录页面*/}
      <Route path="/login" component={LoginPage}/>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Merchant}/>
        <Route path="/merchant" component={Merchant}/>
        <Route path="/contract_list" component={Contract}/>
        <Route path="/contract_detail" component={ContractDetail}/>
        <Route path="/bulk_import" component={BulkImport}/>
        <Route path="/bulk_import_detail" component={BulkImportDetailEntry}/>
        <Route path="/order_list" component={OrderDetailEntry}/>
        <Route path="/order_detail_info" component={BaseOrderInfo}/>
        <Route path="/orderlist_log" component={OrderListLog}/>
        <Route path="/orderdetail_download" component={OrderDetailDownLoad}/>
      </Route>
      {/*如果页面不存在则404*/}
      <Route path="*" component={NotFound}/>
    </Router>
  );
};
