import {
  getQrcode,
  getUserInfo,
  logout
}  from "../services/Login_service.js";
//引入delay机制
import {delay} from "../utils/delay";
import {message} from "antd";
import EXCEPTIONS from "../utils/exception";

const LoginModel = {
  namespace: "login",
  //初始化的属性,传递给view的props
  state: {
    qrcode: "",
    sellerInfo: {
      "access_token": "",
      "account_id": "",
      "account_name": "",
      "expired_at": "",
      "refresh_token": "",
      "seller_id": ""
    }
  },
  //监听
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/login') {
          dispatch({
            type: 'getScanCode',
            payload: '',
          });
        }
      });
    },
  },
  //异步
  effects: {
    *getScanCode({payload}, {call, put}) {
      const {data} = yield call(getQrcode);
      if (data.ok) {
        yield put({type: "getScanCodeSuccess", payload: data.qrcode});
        //轮询是否扫描授权
        yield put({type: "getSellerInfo", payload: data.qrcode})
      }
    },
    *getSellerInfo({payload}, {call, put}){
      while (true) {
        //当没有授权的时候延迟1秒轮询一直轮询
        yield call(delay, 3000);
        const {data} = yield call(getUserInfo, {'token': payload});
        if (data.ok) {
          //如果授权成功
          localStorage.setItem("account_name", data.account_name);
          localStorage.setItem("account_id", data.account_id);
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("seller_id", data.seller_id);
          localStorage.setItem("expired_at", data.expired_at);
          localStorage.setItem("refresh_token", data.refresh_token);
          yield put({type: "getSellerInfoSuccess", payload: {sellerInfo: data}});
          //获取用户信息
          break;
        }
        if (data.err_code) {
          //如果验证码失效了则重新获得二维码验证是否授权
          message.error(EXCEPTIONS[data.err_code]);
          yield put({type: "getScanCode"})
          break;
        }
      }
    },
    *quit({payload}, {call, put}){
      const params = {
        access_token: localStorage.getItem('access_token')
      };
      const {data} = yield call(logout, params);
      if (data.ok) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('account_id');
        localStorage.removeItem('expired_at');
        localStorage.removeItem('seller_id');
        localStorage.removeItem('refresh_token');
        location.hash = "#/login";
        const {data} = yield call(getQrcode);
        if (data.ok) {
          //轮询是否扫描授权
          yield put({type: "getScanCodeSuccess", payload: data.qrcode});
        }
      }else{
        message.error('退出异常 !')
      }
    }
  },
  //state 生产器
  reducers: {
    getScanCodeSuccess(state, action) {
      //将更新的数据部分作为props 传递给子组件
      Object.assign(state, {qrcode: action.payload});
      return {...state};
    },
    getSellerInfoSuccess(state, action){
      Object.assign(state, action.payload);
      location.hash = "#/merchant";
      return {...state};
    },
    clearState(state, action){
      Object.assign(state, action.payload);
      return {...state};
    }
  }
};

export default LoginModel;
