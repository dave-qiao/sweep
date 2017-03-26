import appTools from "../utils/utils";
import {message} from "antd";
import {queryDetailOrderLog, downLoadFile} from "../services/OrderListLog_service";
export default {

  namespace: 'orderDetailDownload',

  state: {
    defaultTime:{
      startDate:appTools.getDateInt(-28),
      endDate:(new Date()).toLocaleDateString()
    },
    filter: {},//筛选条件
    current: 1,
    total: null,
    dtatList: []
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/orderdetail_download') {
          dispatch({
            type: 'query',
            payload: {page: 1},
          });
        }
      });
    },
  },

  effects: {
    *query({payload}, {call, put}) {
      const SELLER_ID = localStorage.getItem("seller_id");
      //默认查询当天的时间
      let start_time = appTools.getDateInt(-28);
      let end_time = appTools.utcToDateIntDay(new Date());
      let params = {
        seller_id: SELLER_ID,
        start_time: start_time,
        end_time: end_time,
        page: payload.page
      };
      if (payload.filter) {
        params.start_time = appTools.utcToDateIntDay(payload.filter.start_date);
        params.end_time = appTools.utcToDateIntDay(payload.filter.end_date);
      }
      const {data} = yield call(queryDetailOrderLog, params);
      if (data) {
        const dealWithData = function (logArr) {
          let _showParams = [];
          if (logArr.length > 0) {
            logArr.map(function (ele) {
              let _option = {};
              _option.day = appTools.numberDateToStr(ele.day);
              _option.updated_at = appTools.utcToDate(ele.updated_at);
              _option.total = ele.total;
              _option.filename = ele.filename;
              _showParams.push(_option);
            })
          }
          return _showParams;
        };
        yield put({
          type: "querySuccess",
          payload: {
            dataList: dealWithData(data.data),
            total: data._meta.result_count,
            current: payload.page,
            filter: payload.filter
          }
        })
      }
    },
    *downLoadFile({payload}, {call, put}){
      const {data} = yield call(downLoadFile, payload.filename);
      if (data.ok) {
        appTools.downloadURI(data.url);
      } else {
        message.error('文件路径获取失败 !');
      }
    }
  },
  reducers: {
    showLoading(state) {
      return {...state, loading: true};
    },
    querySuccess(state, action) {
      Object.assign(state, action.payload);
      return {...state, loading: false};
    }
  },
};
