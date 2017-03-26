import request from '../utils/request';
import qs from 'qs';

//${qs.stringify(params)}` 将参数序列化
export async function queryContractList(params) {
  //100签约,-100解约 0全部
  if(params.state === 0){
    return request(`/contracts?seller_id=${params.seller_id}&page	=${params.page}&limit=10`);
  }else{
    return request(`/contracts?seller_id=${params.seller_id}&page	=${params.page}&limit=10&state=${params.state}`);
  }
}

export async function queryContractInfo(params) {
  //查询签约详情
  return request(`/contracts/${params}`)
}
