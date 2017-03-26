import request from '../utils/request';
import qs from 'qs';

//request(api, options,type)
//${qs.stringify(params)}` 将参数序列化

export async function getFormWork(params) {
  return request(`/upload_tasks/download_order_template?${qs.stringify(params)}`);
}

export async function createUploadTask(params) {
  return request(`/upload_tasks`,
    {
      method:"POST",
      body:JSON.stringify(params)
    });
}
//上传七牛
export async function asyncUploadFile(params){
  return request('https://up.qbox.me', {
    method:"post",
    body:params
  })
}
//更新创建任务状态
export async function updateCreateTask(params) {
  console.log(params);
  return request(`/upload_tasks/${params.task_id}`, {
    method:"POST",
    body:JSON.stringify(params.bodyData)
  })
}
//查看任务状态
export async function asyncCheckTaskState(params){
  return request(`/upload_tasks/${params}`)
}
