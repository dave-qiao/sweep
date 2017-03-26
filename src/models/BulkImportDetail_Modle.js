//注意 effects 可以调用异步effects

import {
  queryOrderList,
  publishOrders,
  getFileName,
  getFilePath
} from '../services/BulkImportDetail_service';
import {message,Modal} from "antd";
import appTools from "../utils/utils"
//保存task_id
let task_id = '';

//获得最便宜服务商
function getCheaperVendor(shipping_fee_obj, vendor_list_obj) {
  if (shipping_fee_obj && !Array.isArray(vendor_list_obj)) {
    let shippingIdArr = Object.keys(shipping_fee_obj),
      realCheaperPrice = 0,
      realShippingId = shippingIdArr[0],
      defaultPrice = shipping_fee_obj[shippingIdArr[0]].fee;
    shippingIdArr.forEach(function (ele) {
      if (shipping_fee_obj[ele].fee < defaultPrice) {
        realCheaperPrice = shipping_fee_obj[ele].fee;
        realShippingId = ele;
      }
    });
    //得到最便宜的定价和服务商id
    return vendor_list_obj[realShippingId];
  }
  return "无";
}
//获得最便宜的配送费
function getCheaperFee(shipping_fee) {
  let _cheaperFee = 0;
  if (Object.keys(shipping_fee).length > 0) {
    let _list = [];
    //获得所有配送费
    for (let id in shipping_fee) {
      if (_list.indexOf(shipping_fee[id].fee) == -1) {
        _list.push(shipping_fee[id].fee);
      }
    }
    _cheaperFee = appTools.getMinInList(_list);
    return _cheaperFee;
  }
  return _cheaperFee;
};
function getErrorTips(error_flag_list) {
  let newArr = [];
  if (error_flag_list.length > 0) {
    error_flag_list.map(function (ele) {
      if (ele.shop_id) {
        newArr.push(ele.shop_id);
      }
      if (ele.plan_shipping_date) {
        newArr.push(ele.plan_shipping_date)
      }
      if (ele.plan_shipping_time) {
        newArr.push(ele.plan_shipping_time)
      }
      if (ele.customer_phone) {
        newArr.push(ele.customer_phone)
      }
    })
  }
  return newArr;
};
function dealWithData(data) {
  let newArr = [];
  data.map(function (ele) {
    let obj = {};
    obj.order_amount = `${(ele.order_amount / 100 ).toFixed(2)}`;
    obj.shop_id = ele.shop_id;
    obj.customer_name = ele.customer_name;
    obj.customer_phone = ele.customer_phone;
    obj.pickup_address = ele.pickup_address;
    obj.shipping_fee = `${getCheaperFee((ele.shipping_fee) / 100).toFixed(2)}`;
    obj.plan_shipping_date = appTools.numberDateToStr(ele.plan_shipping_date);
    obj.plan_shipping_time = ele.plan_shipping_time;
    obj.customer_address = ele.customer_address;
    obj.customer_address_detail = ele.customer_address_detail;
    obj.vendorName = getCheaperVendor(ele.shipping_fee, ele.vendor_list);
    obj.shop_name = ele.shop_name;
    obj.note = (ele.note ? ele.note : "--");
    if (ele.error_flag_list.length > 0) {
      obj.error_flag_list = getErrorTips(ele.error_flag_list);
    }
    obj.tip_fee = `${(ele.tip_fee / 100).toFixed(2)}`;
    newArr.push(obj)
  });
  return newArr;
};

const bulkImportDetail = {
  namespace: 'bulkImportDetail',
  state: {
    task_id: "",
    successList: [],
    failList: [],
    activeKey: "success",//切换Tab页
    current: 1,
    total: null,
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/bulk_import_detail') {
          //将task_id设成共有变量
          task_id = location.query.task_id;
          dispatch({
            type: 'defaultQueryOrderlist',
            payload: location.query.task_id, //传入taskId
          });
        }
      });
    },
  },
  effects: {
    *defaultQueryOrderlist({payload}, {call, put}){
      //默认请求成功的20条
      const param = {
        task_id: payload,
        state: 50,
        page: 1,
        limit: 10
      };
      const {data} = yield call(queryOrderList, param);
      if (data._meta) {
        yield put({
          type: "queryListFinish",
          payload: {
            successList: dealWithData(data.data),
            task_id: payload,
            activeKey: "success",
            total: data._meta.result_count
          }
        })
      }
    },
    *queryOrderlist({payload}, {call, put}){
      //初始属性
      const param = {
        task_id: task_id,
        page: 1,
        limit: 10
      };
      if (payload.activeKey == 'success') {
        //如果分页
        if (payload.page) {
          param.page = payload.page; //设为当前页;
        }
        param.state = 50; //50成功
        const {data} = yield call(queryOrderList, param);
        if (data._meta) {
          const currentPage = payload.page || 1;
          yield put({
            type: "queryListFinish",
            payload: {
              successList: dealWithData(data.data),
              activeKey: "success",
              total: data._meta.result_count,
              current: currentPage
            }
          })
        }
      }
      if (payload.activeKey == 'fail') {
        //如果分页
        if (payload.page) {
          param.page = payload.page; //设为当前页;
        }
        param.state = -100; //-100失败
        const {data} = yield call(queryOrderList, param);
        if (data._meta) {
          const currentPage = payload.page || 1;
          yield put({
            type: "queryListFinish",
            payload: {
              failList: dealWithData(data.data),
              activeKey: "fail",
              total: data._meta.result_count,
              current: currentPage
            }
          })
        }
      }

    },
    *changeTab({payload}, {call, put}){
      if (payload == "success") {
        yield put({type: "queryOrderlist", payload: {activeKey: "success"}});
      }
      if (payload == "fail") {
        yield put({type: "queryOrderlist", payload: {activeKey: "fail"}});
      }
    },
    *publishOrders({payload}, {call, put, select}){
      //获得用户信息 "全局login"
      const ACCOUNT_ID = localStorage.getItem("account_id");
      //发布成功
      const {data} = yield call(publishOrders,
        {
          "operator_id": ACCOUNT_ID,
          "task_id": task_id,
          "state": 50
        });
      //
      if (data.ok) {
        Modal.info({
          title: '小提示',
          content: `已成功发布${data.success_count},失败${data.failed_count}条!`,
        });
        yield put({type:"queryOrderlist",payload:{activeKey:'success'}})
      } else {
        message.error("批量发布失败,请重新上传订单再发布!");
      }
    },
    *downloadFile({payload}, {call, put}){
      const {data} =yield call(getFileName, {task_id: payload.task_id});
      let fileInfoObj = data;
      if (fileInfoObj) {
        //发请求获取链接
        if (payload.tag == "success") {
          //获取成功文件
          const {data} = yield call(getFilePath, {fileName: fileInfoObj.success_file_path});
          let successURlObj = data;
          if (successURlObj.ok) {
            appTools.downloadURI(successURlObj.url, fileInfoObj.success_file_path);
          } else {
            message.error("文件下载失败！");
          }
        }
        if (payload.tag == "fail") {
          //获取失败文件
          const {data} = yield call(getFilePath, {fileName: fileInfoObj.fail_file_path});
          let failUrlObj = data;
          if (failUrlObj.ok) {
            appTools.downloadURI(failUrlObj.url, fileInfoObj.fail_file_path);
          } else {
            message.error("文件下载失败！");
          }
        }
      } else {
        message.error("下载失败，请重新下载！")
      }
    }
  },
  reducers: {
    queryListFinish(state, action){
      //查询失败和成功公用返回状态  数据结构相同 则深拷贝
      Object.assign(state, action.payload);
      return {...state}
    }
  }
};

export default bulkImportDetail;
