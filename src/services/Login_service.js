import request from '../utils/request';

//request(api, options,type)
//${qs.stringify(params)}` 将参数序列化
export async function getQrcode() {
  return request('/auth/qrcode_token', {method: 'POST'}, 'X-AUTH');
}
export async function getUserInfo(params) {
  return request('/auth/qrcode_token/check_qrcode', {
    method: "POST",
    body: JSON.stringify(params)
  }, 'X-AUTH');
}

export async function logout(params) {
  return request('/accounts/logout', {
    method: "POST",
    body: JSON.stringify(params)
  });
}
