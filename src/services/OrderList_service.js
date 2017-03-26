//订单列表和订单详情
import request from '../utils/request';
export async function queryOrders(params) {
  let url = `/seller_orders?seller_id=${params.seller_id}&limit=10&page=${params.page}`;
  if (params.start_date) {
    url = `${url}&start_date=${params.start_date}`;
  }
  if (params.end_date) {
    url = `${url}&end_date=${params.end_date}`;
  }
  if (params.mobile) {
    url = `${url}&mobile=${params.mobile}`;
  }
  if (params.state != null) {
    url = `${url}&state=${params.state}`;
  }
  if (params.org_order_id) {
    url = `${url}&org_order_id=${params.org_order_id}`;
  }
  return request(url);
}

export async function queryOrdersInfo(params) {
  return request(`/seller_orders/${params}`)
}

//查询运单信息
export async function queryShipmentTrace(params) {
  return request(`/shipments/${params.seller_id}/track_logs?page=${params.page}&limit=10`);
}


