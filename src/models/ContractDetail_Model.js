import {queryContractInfo} from "../services/Contract_service";
import appTools from "../utils/utils";
const ContractDetail = {
  namespace:"contractDetail",
  state: {
    loading: false,
    baseInfo:{
      state:'',
      vendorName:"--" , //服务商
      serviceName:"--", //产品名称
      biz_model:"--",   //业务模式
      updated_at:"--",  //更新时间
      biz_time:"--  --",//营业时间
      unsigned_at:"--", //解约时间
      delivery_time:"", //配送时间
      created_at:"",    //签约时间
      price_mode:"",    //定价模式
      price_plan:[],    //定价方案
      contractId:"",    //签约id
      price_plan_description: "",  //定价方案描述
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/contract_detail') {
          dispatch({
            type: 'query',
            payload: {contract_id:location.query.contract_id},
          });
        }
      });
    },
  },
  effects: {
    *query({payload}, {call, put, select}) {
      const {data} = yield call(queryContractInfo,payload.contract_id);
      if(data){
        //数据处理
        let obj = {};
        obj.contractId = payload.contract_id;
        obj.state = data.state;
        obj.serviceName = data.service.name;
        obj.vendorName = data.vendor.name;
        obj.biz_model = appTools.statusCodeTransform('biz_model',data.biz_mode);
        obj.updated_at = appTools.utcToDate(data.updated_at);
        obj.biz_time = `${data.biz_time[0]}-${data.biz_time[1]}`;
        obj.delivery_time = data.delivery_time;
        obj.created_at = appTools.utcToDate(data.created_at);
        obj.unsigned_at = appTools.utcToDate(data.unsigned_at);
        obj.price_model = appTools.statusCodeTransform('price_model',data.price_mode);
        obj.price_plan_description = appTools.statusCodeTransform('price_plan_description',data.price_mode);
        obj.price_plan = data.price_plan;
        yield put({type:"querySuccess",payload:{baseInfo:obj}})
      }
    }
    ,
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

export default ContractDetail;
