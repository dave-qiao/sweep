import request from '../utils/request';
import qs from 'qs';

//${qs.stringify(params)}` 将参数序列化
export async function queryMerchant(params) {
  return request(`/sellers/${params.seller_id}`);
}
export async function queryShops(params) {
  return request(`/shops?seller_id=${params.seller_id}&page=${params.page}&limit=10`);
}

export async function queryUserInfo(params) {
  return request(`/accounts?org_id=${params}&org_type=2&is_owner=true`);
}
