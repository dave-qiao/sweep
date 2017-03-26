import {queryContractList} from "../services/Contract_service";
import appTools from "../utils/utils";
/*
* 0:全部 自定义 后台参数为不传state
* 100：签约
* -100：解约
* */
const ContractModel = {
  namespace:"contract",
  //初始化的属性,传递给view的props
  state: {
    loading:false, //页面是否加载中
    total:null,//分页:总数
    current:1, //分页：当前页数
    dataSource:[],//表格数据
    queryType:100 //默认查询签约
  },
  //监听
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/contract_list') {
          dispatch({
            type: 'query',
            payload: {state:0,queryType:100},
          });
        }
      });
    },
  },
  //异步
  effects:{
    *query({ payload }, { call, put,select }) {
      //获得用户信息 "全局login"
      const SELLER_ID = localStorage.getItem("seller_id");
      //开启加载框
      yield put({type:"showLoading"});
      //控制分页查询
      let page =1;
      if(payload.page){
        page = payload.page;
      }
      const {data} = yield call(queryContractList,{page:page,state:payload.queryType,seller_id:SELLER_ID});
      if(data){
        //数据重构
        let newList = [];
        data.data.map(function (ele) {
          let obj = {};
          obj.created_at = appTools.utcToDate(ele.created_at);
          obj.serviceName = ele.service.name;
          obj.updated_at = appTools.utcToDate(ele.updated_at);
          obj.vendorName = ele.vendor.name;
          obj.contract_id = ele.id; //查询签约服务商

          if(ele.state ===100){
            obj.unsigned_at = '--'
          }else{
            obj.unsigned_at = appTools.utcToDate(ele.unsigned_at);
          }

          obj.status =(ele.state==100?"签约":"解约");
          newList.push(obj)
        });
        yield put({type:'querySuccess',payload:{dataSource:newList,total:data._meta.result_count,current:page,queryType:payload.queryType}});
      }
    },
    *filterOption({ payload }, { call, put }){

      //每更改一次筛选条件都要发送 一个请求

      switch (payload){
        case "sign":
          yield put({type:"query",payload:{queryType:100}});
          break;
        case "unsign":
          yield put({type:"query",payload:{queryType:-100}});
          break;
        case "all":
          yield put({type:"query",payload:{queryType:0}});
          break;
      }

    }
  },
  //state 生产器
  reducers:{
    showLoading(state,action){
      return { ...state, loading: true };
    },
    querySuccess(state, action) {
      Object.assign(state,action.payload);
      return { ...state, ...action.payload, loading: false };
    }
  }
};

export default ContractModel;
