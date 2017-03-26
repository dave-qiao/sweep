import request from '../utils/request';
import qs from 'qs';

//${qs.stringify(params)}` 将参数序列化
export async function queryOrderList(params) {
  //查询上传的订单列表
  return request(`/upload_tasks/orders?task_id=${params.task_id}&state=${params.state}&page=${params.page}&limit=${params.limit}`);
}
export async function publishOrders(params) {
  return request('/upload_tasks/publish_orders',
    {
      method:"POST",
      body:JSON.stringify(params)
    })
}
//获得文件名字
export async function getFileName(params) {
  return request(`/upload_tasks/${params.task_id}`)
}

//获得下载地址
export async function getFilePath(params) {
  return request(`/reports/download_file?filename=${params.fileName}`);
}
