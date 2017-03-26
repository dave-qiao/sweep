import {
  queryOrders,
  queryOrdersInfo
} from "../services/OrderList_service";
import appTools from "../utils/utils";

const getTimeBar = function (done_at, plan_shipping_date, plan_shipping_time, shipment_state) {
  if (shipment_state === 100) {
    // 如果订单完成
    const realTime = (new Date(done_at)).getTime(),
      plantime = (new Date(`${ appTools.numberDateToStr(plan_shipping_date)} ${plan_shipping_time}`)).getTime();
    const timeBar = (realTime - plantime) / 60000;//得到差值分钟数
    if (timeBar > 0) {
      return Math.ceil(timeBar);
    } else {
      return `(${Math.ceil(Math.abs(timeBar))})`;
    }
  } else {
    return '--'
  }

};

const dealWithData = function (dataArr) {
  let newArr = [];
  if (dataArr.length > 0) {
    dataArr.map(function (ele) {
      let obj = {};
      obj.id = ele.id; //订单id
      obj.org_order_id = ele.org_order_id;
      obj.sellerName = ele.seller.name;
      obj.consigneeName = ele.consignee.name;
      obj.mobile = ele.consignee.mobile;
      obj.consignor_address = ele.consignor.address;
      obj.consignor_address_detail = ele.consignor.address_detail;
      obj.shipment_name = ele.tms_biz_info[0].tms.name;
      obj.distance = `${(ele.distance / 1000).toFixed(3)}`;
      obj.state = appTools.statusCodeTransform("order_state", ele.state);
      obj.shippment_timeBar = getTimeBar(ele.done_at, ele.plan_shipping_date, ele.plan_shipping_time, ele.state);
      obj.order_amount = `${(ele.order_amount / 100).toFixed(2)}`;
      obj.shipping_fee = `${(ele.shipping_fee / 100).toFixed(2)}`;
      obj.tip_fee = `${(ele.tip_fee / 100).toFixed(2)}`;
      obj.pay_type = appTools.statusCodeTransform("pay_type", ele.pay_type);
      obj.created_at = appTools.utcToDate(ele.created_at);
      obj.done_at = (ele.done_at !==''?appTools.utcToDate(ele.done_at):'--');
      obj.plan_shipping_time = appTools.numberDateToStr(ele.plan_shipping_date) + ' ' + ele.plan_shipping_time;
      obj._source_channel = appTools.statusCodeTransform("source_channel", ele.source_channel);
      obj.codAmount = ele.extra_services && ele.extra_services.cod && ele.extra_services.cod.amount && ((ele.extra_services.cod.amount/100).toFixed(2)) || '0.00';               //代收顾客
      obj.payAmount = ele.extra_services && ele.extra_services.payment && ele.extra_services.payment.amount && ((ele.extra_services.payment.amount/100).toFixed(2))||  '0.00';   //代付商家
      newArr.push(obj);
    })
  }
  return newArr;
};
const OrderDetail = {
  namespace: "orderDetail",
  state: {
    current: 1,
    total: null,
    orderList: [],
    filter: null,
    baseInfo: {
      id: "--",
      plan_shipping_time: "",
      plan_shipping_date: "--",
      sellerName: "--",
      item_type: "--",
      created_at: "--",
      done_at: "--",
      state: "",//订单状态
      shipment_name: "",//物流商
      seller_type: "--",
      shipping_fee: "--",
      order_amount: "--",
      shipping_date: "--",
      shipping_time: "",
      source_channel: "--",
      pay_type: "",
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/order_list') {
          dispatch({
            type: 'query',
            payload: {page: 1},
          });
        }
      });
    },
  },
  //异步
  effects: {
    *query({payload}, {call, put, select}) {
      //获得用户信息 "全局login"
      const SELLER_ID = localStorage.getItem("seller_id");
      //初始化日期
      const today = appTools.utcToDateStrDay(new Date());

      const params = {
        seller_id: SELLER_ID,
        page: payload.page,
        org_order_id: null,
        start_date: today + ` 00:00:00`,
        end_date: today + ` 23:59:59`,
        mobile: null,
        state: null
      };

      //多条件查询
      if (payload.filter) {
        params.start_date = (payload.filter.start_date == null ? today : appTools.utcToDateStrDay(payload.filter.start_date) + ` 00:00:00`);
        params.end_date = (payload.filter.end_date == null ? null : appTools.utcToDateStrDay(payload.filter.end_date) + ` 23:59:59`);
        params.state = payload.filter.orderState;
        params.mobile = payload.filter.phoneNumber;
        params.org_order_id = payload.filter.orderNo;
        //更新查询状态
        yield put({
          type: "updateFilter",
          payload: {
            filter: {
              start_date: payload.filter.start_date
              , end_date: payload.filter.end_date
              , orderState: payload.filter.orderState
              , phoneNumber: payload.filter.phoneNumber
              , orderNo: payload.filter.orderNo
            },
            page: payload.page
          }
        });
      }
      //获取查询数据
      const {data} = yield call(queryOrders, params);
      if (data) {
        yield put({
          type: "querySuccess",
          payload: {orderList: dealWithData(data.data), current: payload.page, total: data._meta.result_count}
        });
      }
    },
  },
  //state 生产器
  reducers: {
    querySuccess(state, action) {
      Object.assign(state, action.payload);
      return {...state};
    },
    updateFilter(state, action){
      Object.assign(state, action.payload);
      return {...state, current: action.payload.page}
    }
  }
};

export default OrderDetail;
