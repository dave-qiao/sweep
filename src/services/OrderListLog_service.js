//订单列表和订单详情
import request from '../utils/request';

//查询订单上传记录
export async function queryOrderLog(params) {
  return request(`/upload_tasks?start_time=${params.start_time}&end_time=${params.end_time}&seller_id=${params.seller_id}&page=${params.page}&limit=10`)
}
//下载订单
export async function downLoadFile(params){
  return request(`/reports/download_file?filename=${params}`);
}
//查询订单详细记录
export async function queryDetailOrderLog(params){
  return request(`/reports/orders/daily/by_seller?start_date=${params.start_time}&end_date=${params.end_time}&seller_id=${params.seller_id}&page=${params.page}&limit=10`);
}


