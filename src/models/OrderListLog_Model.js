import {
  queryOrderLog,
  downLoadFile
} from "../services/OrderListLog_service";
import appTools from "../utils/utils";
import {message} from "antd";
const dealWithData = function (dataList) {
  let newArr = [];
  dataList.map(function (ele) {
    let obj = {};
    obj.created_at = appTools.utcToDate(ele.created_at);
    obj.pre_success_cnt = ele.pre_success_cnt;
    obj.pre_failed_cnt = ele.pre_failed_cnt;
    obj.total = ele.pre_success_cnt + ele.pre_failed_cnt;
    obj.fail_file_path = ele.fail_file_path;
    obj.success_file_path = ele.success_file_path;
    newArr.push(obj);
  });
  return newArr;
};
const OrderListLog = {
  namespace: "orderListLog",
  state: {
    filter: null,//查询条件
    defaultTime: {
      startDate: (new Date()).toLocaleDateString(),
      endDate: (new Date()).toLocaleDateString()
    },
    total: null,
    current: 1,
    dataList: []
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/orderlist_log') {
          dispatch({
            type: 'queryOrderList',
            payload: {page: 1},
          });
        }
      });
    },
  },
  effects: {
    *queryOrderList({payload}, {call, put, select}){
      const SELLER_ID = localStorage.getItem("seller_id");

      let params = {
        start_time: "",
        end_time: "",
        seller_id: SELLER_ID,
        page: payload.page
      };
      if (payload.filter) {
        params.start_time = `${appTools.utcToDateStrDay(payload.filter.date[0]._d)} 00:00:00`;
        params.end_time = `${appTools.utcToDateStrDay(payload.filter.date[1]._d)} 23:59:59`;
      } else {
        let stamp = appTools.utcToDateStrDay(new Date());
        let start_time = `${stamp} 00:00:00`;
        let end_time = `${stamp} 23:59:59`;
        params.start_time = start_time;
        params.end_time = end_time;
      }
      //更新查询条件
      yield put({type: "updateFilter", payload: {filter: payload.filter}});
      const {data} = yield call(queryOrderLog, params);
      if (data) {
        yield put({
          type: "querySuccess",
          payload: {dataList: dealWithData(data.data), total: data._meta.result_count, current: payload.page}
        })
      }
    },
    *asyncDownloadFile({payload}, {call, put, select}){
      const {data} = yield call(downLoadFile, payload.fileName);
      if (data.ok) {
        //得到link
        appTools.downloadURI(data.url, payload.fileName);
      } else {
        message.error("下载文件失败!");
      }
    }
  },
  reducers: {
    querySuccess(state, action) {
      Object.assign(state, action.payload);
      return {...state};
    },
    updateFilter(state, action){
      Object.assign(state, action.payload);
      return {...state};
    }
  }
};

export default OrderListLog;
