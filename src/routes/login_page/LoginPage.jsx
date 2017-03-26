import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import style from "./loginPage.less";
import qrcode from "arale-qrcode";


const LoginPage = React.createClass({
  //退出页面
  componentWillReceiveProps: function(nextProps){
    if (nextProps.login.qrcode) {
      let url = `aoao://seaguard-` + nextProps.login.qrcode;
      let qrcode_opts = {
        text: url
      };
      let qrnode = new qrcode(qrcode_opts);
      let qrcontainer = document.getElementById('qrcodeDefault');
      qrcontainer.innerHTML = '';
      qrcontainer.appendChild(qrnode);
    }
  },

  render: function () {
    return (
      <div className={style.bg}>
        <div className={style.header}>
          <div className={style.marginCenter}>
            <div className={style.marginCenterLeft}><img src="images/logo_txt.png" className={style.logoImg}/> <span>工作平台</span> </div>
            <div className={style.marginCenterRight}>
              <a href='https://aoaosong.com/'>嗷嗷首页</a>
            </div>
          </div>
        </div>
        <div className={style.bgImg}>
          <div className={style.fixedCenter}>
            <article className={style.scanWrapper}>
              <section className={style.title}><b>嗷嗷商家登录</b></section>
              <section className={style.qrcodeWrap}>
                <p id="qrcodeDefault" />
              </section>
              <section className={style.info}>
                <p>请使用移动设备扫描二维码登录</p>
              </section>
            </article>
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.footerCenter}>
            <ul className={style.footerCenterLeft}>
              <li>
                <h4>产品</h4>
                <a href="//aoaosong.com/index.html#aoao-01">嗷嗷管家</a>
                <a href="//aoaosong.com/index.html#aoao-02">嗷嗷商家</a>
                <a href="//aoaosong.com/index.html#aoao-03">嗷嗷骑士</a>
              </li>
              <li>
                <h4>帮助</h4>
                <a href="//aoaosong.com/help.html">帮助文档</a>
                <a href="//aoaosong.com/help.html">常见问题</a>
                <a href="//aoaosong.com/help.html">视频教程</a>
              </li>
            </ul>
            <div className={style.footerCenterRight}>
              <p><img src="images/logo_txt.png" alt=""/></p>
              <p>北京欧客云科技有限公司旗下产品</p>
              <p>由o3cloud提供计算</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

//关联 view 和model
function mapStateToProps({login}) {
  return {login};
}

export default  connect(mapStateToProps)(LoginPage)

