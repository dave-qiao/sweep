import React from "react";
import {Menu, Icon, Switch} from 'antd';
import {Link, IndexLink} from 'react-router'
import style from "./LeftSider.less";
import './reset.css';
const SubMenu = Menu.SubMenu;

export const LeftSider = React.createClass({
  getInitialState() {
    return {
      theme: 'light'
    };
  },
  handleClick(e) {
    this.setState({
      current: e.key,
    });
  },
  render() {
    return (
      <div className={style.sider}>
        <div className={style.logo}>
          <h2 className={style.siderHeader} id="aoao_icon">嗷嗷商家</h2>
          <div><img src="images/logo.png" alt=""/></div>
        </div>
        <div className={style.resets}>
          <Menu theme="dark"
                onClick={this.handleClick}
                style={{width: 80, padding: 0,background:'#282d36'}}
                //defaultOpenKeys={["business_manager", "order_manager"]}
                selectedKeys={[this.state.current]}
                mode="vertical"
          >
            <SubMenu key="business_manager" title={<span style={{padding: 0,fontSize:'12px'}}><Icon type="user" style={{padding: 0,fontSize:'20px'}}/><br/>业务管理</span>}
                     >
              <Menu.Item key="merchant"><Link to="merchant" activeStyle={{color: '#fff'}}
                                              style={{padding: 0}}>商户中心</Link></Menu.Item>
              <Menu.Item key="contract_list"><Link to="contract_list"
                                                   activeStyle={{color: '#fff'}}>签约记录</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="order_manager" title={<span style={{padding: 0,fontSize:'12px'}}><Icon type="appstore" style={{padding: 0,fontSize:'20px'}}/><br/>订单管理</span>}
                     >
              <Menu.Item key="bulk_import"><Link to="bulk_import" activeStyle={{color: '#fff'}}>批量导入 </Link></Menu.Item>
              <Menu.Item key="order_detail"><Link to="order_list" activeStyle={{color: '#fff'}}>订单列表</Link></Menu.Item>
              <Menu.Item key="orderlist_log"><Link to="orderlist_log"
                                                   activeStyle={{color: '#fff'}}>订单导入记录</Link></Menu.Item>
              <Menu.Item key="orderdetail_download"><Link to="orderdetail_download"
                                                          activeStyle={{color: '#fff'}}>订单列表明细下载</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    );
  },
});

