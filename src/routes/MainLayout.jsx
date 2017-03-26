import React, {PropTypes} from "react";
import {message} from "antd";
import {LeftSider} from "../components/mainLayout/LeftSider.jsx";
import Header from "../components/mainLayout/Header.jsx"
import {connect} from "dva";
/*
 * 分为三大 组件 ：loginPage notFoundPage MainLayoutPage
 *
 * */
const MainLayout = React.createClass({

  render: function () {
    const _react = this;
    //接收的props:sellerInfo
    const {
      sellerInfo,
    } = this.props.login;
    const headerProps = {
      quit: function () {
        _react.props.dispatch({type: 'login/quit'});
      }
    };
    if (!localStorage.getItem("access_token")) {
      location.hash = "#/login";
      //message.error("用户已失效，请重新扫码登录!");
    }
    return (
      <div>
        <LeftSider/>
        <div style={{marginLeft: 80}}>
          <Header {...headerProps}/>
          {/*右侧路由切换部分*/}
          {this.props.children}
        </div>
      </div>
    )
  }
});
//关联 view 和model
function mapStateToProps({login}) {
  return {login};
}

export default  connect(mapStateToProps)(MainLayout)
