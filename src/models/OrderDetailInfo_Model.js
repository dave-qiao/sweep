import {
  queryOrdersInfo,
  queryShipmentTrace
} from "../services/OrderList_service";
import appTools from "../utils/utils";

const OrderDetail = {
  namespace: "orderDetailInfo",
  state: {
    baseInfo: {
      order_amount: "--",
      org_order_id: "--",//订单编号
      item_type: "--",
      created_at: "--",
      distance: "", //配送距离
      done_at: "--",
      state: "",//订单状态
      sellerName: "--",
      shopName: "--",
      seller_type: "--",
      shipping_fee: "--",
      shipping_date: "--",
      shipping_time: "",
      source_channel: "--",
      consignee_name: "--",//收货名字
      consignee_address_detail: "",//收货地址
      closed_type: "",//关闭原因
      consignor_name: "--",
      consignor_mobile: "--",//商家电话
      consignee_mobile: "--",
      consignor_address_detail: "--", //发货地址
      plan_shipping_time: "",
      pay_type: "--",
      note: "--",
      tip_fee: "--",
      vendorName: "--",// 服务商
      areaName: "--"  //所属商圈
    },
    shipmentTrace: [],
    shipmentInfo: {},
    result_count: 0,//物流追踪结果
    current : 1  //页码
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/order_detail_info') {
          dispatch({
            type: 'queryOrderInfo',
            payload: {order_id: location.query.order_id},
          });
        }
      });
    },
  },
  effects: {
    //订单详情
    *queryOrderInfo({payload}, {call, put, select}){
      const {data} = yield call(queryOrdersInfo, payload.order_id);
      if (data) {
        //清除缓存
        yield put({type: "clearState"});
        const dealWithData = function (sellerInfo_obj) {
          let getCheapVendor = function (vendorsArr, fee) {
            let vendorName = '';
            vendorsArr.forEach(function (ele) {
              if (ele.tms.estimate_shipping_fee === fee) {
                vendorName = ele.tms.name;
                return;
              }
            });
            return vendorName;
          };
          let showParams = {};
          showParams.closed_type = appTools.statusCodeTransform('closed_type', sellerInfo_obj.closed_type);   //关闭原因
          showParams.error_type = appTools.statusCodeTransform('error_type', sellerInfo_obj.error_type);      //异常原因
          showParams.created_at = appTools.utcToDate(sellerInfo_obj.created_at);
          showParams.consignee_address_detail = (sellerInfo_obj.consignee.address ? sellerInfo_obj.consignee.address : '') + (sellerInfo_obj.consignee.address_detail ? sellerInfo_obj.consignee.address_detail : '');  //收货地址
          showParams.consignor_address_detail = (sellerInfo_obj.consignor.address && sellerInfo_obj.consignor.address || '') + (sellerInfo_obj.consignor.address_detail && sellerInfo_obj.consignor.address_detail || '');            //发货地址
          showParams.consignee_name = sellerInfo_obj.consignee.name;
          showParams.consignor_name = sellerInfo_obj.consignor.name;
          showParams.consignor_mobile = sellerInfo_obj.consignor.mobile || sellerInfo_obj.consignor.tel;
          showParams.consignee_mobile = sellerInfo_obj.consignee.mobile || sellerInfo_obj.consignee.tel;
          showParams.distance = (sellerInfo_obj.distance / 1000).toFixed(3);
          showParams.pay_type = appTools.statusCodeTransform('pay_type', sellerInfo_obj.pay_type);
          showParams.plan_shipping_time = appTools.numberDateToStr(sellerInfo_obj.plan_shipping_date) + ' ' + sellerInfo_obj.plan_shipping_time;
          showParams.org_order_id = sellerInfo_obj.org_order_id;
          showParams.order_amount = `${(sellerInfo_obj.order_amount / 100).toFixed(2)} 元`;
          showParams.item_type = appTools.statusCodeTransform('seller_type', sellerInfo_obj.item_type);
          showParams.note = sellerInfo_obj.note;
          showParams.tip_fee = `${(sellerInfo_obj.tip_fee / 100).toFixed(2)} 元`;
          showParams.seller_type = appTools.statusCodeTransform('seller_type', sellerInfo_obj.seller.seller_type);
          showParams.sellerName = sellerInfo_obj.seller.name;       //商家名称
          showParams.shopName = sellerInfo_obj.shop_name || '--';           //店铺名称
          showParams.shipping_fee = `${(sellerInfo_obj.shipping_fee / 100).toFixed(2)} 元`;
          showParams.source_channel = appTools.statusCodeTransform('source_channel', sellerInfo_obj.source_channel);
          showParams.vendorName = getCheapVendor(sellerInfo_obj.tms_biz_info, sellerInfo_obj.shipping_fee);      //物流商
          showParams.areaName = sellerInfo_obj.area.name || "--";
          showParams.codAmount = sellerInfo_obj.extra_services && sellerInfo_obj.extra_services.cod && sellerInfo_obj.extra_services.cod.amount && ((sellerInfo_obj.extra_services.cod.amount/100).toFixed(2)) || '0.00' +' 元';               //代收顾客
          showParams.payAmount = sellerInfo_obj.extra_services && sellerInfo_obj.extra_services.payment && sellerInfo_obj.extra_services.payment.amount && ((sellerInfo_obj.extra_services.payment.amount/100).toFixed(2))||  '0.00' +' 元';   //代付商家
          showParams.barcode = sellerInfo_obj.barcode ; //条形编码
          return showParams;
        };
        // 查询基本基本订单信息
        yield put({type: "querySuccess", payload: {baseInfo: dealWithData(data)}});
        //查询物流信息
        if (data["tms_biz_info"][0].shipment_id) {
          yield put({type: "queryShipmentInfo", payload: {shipment_id: data["tms_biz_info"][0].shipment_id}})
          const shipmentId = data["tms_biz_info"][0].shipment_id;
          localStorage.setItem('shipmentId',shipmentId);
        }
      }
    },
    //运单信息
    *queryShipmentInfo({payload}, {call, put, select}){
      let page = 1;
      if (payload.page) {
       page = payload.page;
      }
      const SHIPMENTID = localStorage.getItem('shipmentId');
      const {data} = yield call(queryShipmentTrace, {seller_id: SHIPMENTID, page : page});
      if (data) {
        if (data.data.length) {
          const dealWithData = function (data) {
            let shipment_info = data.data,
              _showParams = [],
              _showShipmentParams = {};

            //获得物流追踪信息
            shipment_info.map(function (ele) {
              let _option = {};
              _option.state = appTools.statusCodeTransform('event_state', ele.event);
              _option.opration = appTools.statusCodeTransform('operation_state', ele.event);
              _option.created_at = appTools.utcToDate(ele.created_at);
              if (ele.operator_info) {
                _option.operator_name = ele.operator_info.name;
                _option.operator_mobile = ele.operator_info.mobile;
              } else {
                _option.operator_mobile = '无';
                _option.operator_name = '系统';
              }
              _option.note = ele.note || "无";
              _showParams.unshift(_option);
            });
            //获得物流最新信息
            if (shipment_info[data._meta.result_count - 1].courier_info) {
              _showShipmentParams = {
                shipment_id: shipment_info[data._meta.result_count - 1].shipment_id,
                area_name: shipment_info[data._meta.result_count - 1].courier_info.area_name,
                courier_name: shipment_info[data._meta.result_count - 1].courier_info.name,
                courier_mobile: shipment_info[data._meta.result_count - 1].courier_info.mobile
              };
            } else {
              _showShipmentParams = {
                shipment_id: shipment_info[data._meta.result_count - 1].shipment_id,
                area_name: '--',
                courier_name: '--',
                courier_mobile: '--'
              };
            }

            return {
              shipmentTrace: _showParams,
              shipmentInfo: _showShipmentParams
            };
          };
          const result = dealWithData(data);
          yield put({
            type: "querySuccess",
            payload: {
              shipmentTrace: result.shipmentTrace,
              shipmentInfo: result.shipmentInfo,
              result_count: data._meta.result_count,
              current: page,   //修改页码
            }
          })
        }
      }
    }
  },
  reducers: {
    clearState(state, action){
      let baseInfo = {
        order_amount: "--",
        org_order_id: "--",//订单编号
        item_type: "--",
        created_at: "--",
        distance: "", //配送距离
        done_at: "--",
        state: "",//订单状态
        sellerName: "--",
        seller_type: "--",
        shipping_fee: "--",
        shipping_date: "--",
        shipping_time: "",
        source_channel: "--",
        consignee_name: "--",//收货名字
        consignee_address_detail: "",//收货地址
        closed_type: "",//关闭原因
        consignor_name: "--",
        consignor_mobile: "--",//商家电话
        consignee_mobile: "--",
        consignor_address_detail: "--", //发货地址
        plan_shipping_time: "",
        pay_type: "--",
        note: "--",
        tip_fee: "--",
        vendorName: "--",// 服务商
        areaName: "--", //所属商圈
      };
      return {baseInfo: baseInfo, shipmentTrace: [], shipmentInfo: {}, result_count: 0}
    },
    querySuccess(state, action) {
      Object.assign(state, action.payload);
      return {...state};
    }
  }
};

export default OrderDetail;
