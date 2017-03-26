/*
*
*model层写业务逻辑
* */
/*的引入service层获得数据*/
import {
  queryMerchant,
  queryShops,
  queryUserInfo
} from '../services/MerchantInfo_service';
import appTools from "../utils/utils";

const pageNumber = 1;

const MerchantModel = {
  namespace:"merchant",
  //初始化的属性,传递给view的props
  state: {
    loading: false,
    baseInfo: {
      "biz_profile": {
        "legal_name": ""
      },
      "city_code": "",
      "created_at": "",
      "id": "",
      "name": "",
      "order_count": "",
      "seller_no": "",
      "seller_type": "",
      "state": "",
      "verify_state": "",
      "wallet_id": ""
    },                     //商户基本信息
    shopList:[],           //店铺信息
    userInfo:[],           //户主信息
    result_count:0,        //分页:总数
    current:pageNumber,    //分页：当前页数
  },
  //监听
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/merchant') {
          dispatch({
            type: 'queryBaseInfo',
            payload: location.query,
          });
        }
      });
    },
  },
  //异步
  effects: {
    *queryBaseInfo({payload}, {call, put, select}) {
      //获得用户信息 "全局login"
      const SELLER_ID = localStorage.getItem("seller_id");
      yield put({type: 'showLoading'});
      //获取商户信息
      const {data}  = yield call(queryMerchant, {seller_id: SELLER_ID});
      //dispatch action 'querySuccess' to reducer create new state
      if (data) {
        yield put({type: "querySuccess", payload: {baseInfo: data}});
      }else {
        message.error("未知错误");
      }
      //查询商户店铺信息
      yield put({type:"queryShopsInfo",payload:{seller_id: SELLER_ID}});
      //查询账户信息
      yield put({type:"queryUserInfo",payload:{seller_id: SELLER_ID}})
    },
    *queryShopsInfo({payload}, {call, put, select}) {
      const SELLER_ID = localStorage.getItem("seller_id");
      let page = 1;
      if (payload.page) {
        page= payload.page;
      };
      const {data } = yield call(queryShops,{seller_id: SELLER_ID, page: page});
      if(data){
        const dealWithData = function (shopList) {
          let _resArr = [],
            count = 0;
          if(shopList.length){
            shopList.forEach(function (ele) {
              let _option = {};
              count+= 1;
              _option.orderNumber =count;
              _option.id = ele.id ;
              _option.linkman = ele.linkman;
              _option.mobile = ele.mobile;
              _option.tel = ele.tel;
              _option.name = ele.name;
              _option.address = ele.address;
              _option.address_detail = ele.address_detail;
              _option.created_at = appTools.utcToDate(ele.created_at);
              _resArr.push(_option);
            })
          }
          return _resArr;
        };
        yield put({type:"querySuccess",payload:{shopList:dealWithData(data.data),result_count:data._meta.result_count,current: page}})
      }
    },
    *queryUserInfo({payload}, {call, put, select}) {
      const {data } = yield call(queryUserInfo,payload.seller_id);
      if(data){
        yield put({type:"querySuccess",payload:{userInfo:data.data}})
      }
    }
  },
  //state 生产器
  reducers:{
    showLoading(state) {
      return { ...state, loading: true };
    },
    querySuccess(state, action) {
      Object.assign(state,action.payload);
      return { ...state, loading: false };
    }
  }
};

export default MerchantModel;
